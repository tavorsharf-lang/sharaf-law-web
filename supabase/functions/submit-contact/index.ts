import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { escapeHtml, isValidEmail, isValidPhone } from "../_shared/sanitize.ts";

const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000; // 1 hour
const RATE_LIMIT_MAX = 3;
const DEFAULT_FROM = 'onboarding@resend.dev';
const DEFAULT_TO = 'sharflaw@bezeqint.net';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version',
};

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  });

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const body = await req.json();
    const { name, phone, email, service, message, website } = body;

    // Honeypot — silently accept and discard. Bots fill hidden fields; humans don't.
    if (typeof website === 'string' && website.length > 0) {
      return json({ success: true });
    }

    if (!name || !phone) {
      return json({ error: 'שם וטלפון הם שדות חובה' }, 400);
    }

    // Normalize service: accept string OR string[] (multi-select). Store as comma-separated.
    const serviceList: string[] = Array.isArray(service)
      ? service.filter((s) => typeof s === 'string' && s.length > 0)
      : (service ? [String(service)] : []);
    const serviceString = serviceList.join(', ');

    if (name.length > 100 || phone.length > 20 || serviceString.length > 200 || (message && message.length > 2000) || (email && email.length > 254)) {
      return json({ error: 'הקלט חורג מהאורך המותר' }, 400);
    }

    if (!isValidPhone(phone)) {
      return json({ error: 'מספר טלפון לא תקין' }, 400);
    }

    if (email && !isValidEmail(email)) {
      return json({ error: 'כתובת דוא״ל לא תקינה' }, 400);
    }

    const ip = req.headers.get('x-forwarded-for')?.split(',')[0].trim() || 'unknown';

    const supabase = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    );

    // Rate limit: max RATE_LIMIT_MAX submissions per IP per RATE_LIMIT_WINDOW_MS.
    if (ip !== 'unknown') {
      const since = new Date(Date.now() - RATE_LIMIT_WINDOW_MS).toISOString();
      const { count, error: countError } = await supabase
        .from('contact_submissions')
        .select('id', { count: 'exact', head: true })
        .eq('ip', ip)
        .gte('created_at', since);

      if (countError) {
        console.error('Rate-limit query error:', countError);
        // fail-open: do not block on infra error, but log
      } else if ((count ?? 0) >= RATE_LIMIT_MAX) {
        return json({ error: 'יותר מדי פניות מהכתובת הזו. אנא נסו שוב מאוחר יותר.' }, 429);
      }
    }

    const { error: dbError } = await supabase
      .from('contact_submissions')
      .insert({
        name,
        phone,
        email: email || null,
        service: serviceString || null,
        message: message || null,
        ip,
      });

    if (dbError) {
      console.error('DB error:', dbError);
      return json({ error: 'שגיאה בשמירת הפנייה' }, 500);
    }

    // Send email notification via Resend (best-effort — failure does not block success).
    const resendApiKey = Deno.env.get('RESEND_API_KEY');
    if (resendApiKey) {
      const safeName = escapeHtml(name);
      const safePhone = escapeHtml(phone);
      const safeEmail = email ? escapeHtml(email) : '';
      const safeService = serviceString ? escapeHtml(serviceString) : '';
      const safeMessage = message ? escapeHtml(message) : '';

      const emailBody = `
        <div dir="rtl" style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 8px;">
          <h2 style="color: #1a365d; border-bottom: 2px solid #d4af37; padding-bottom: 10px;">פנייה חדשה התקבלה</h2>
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 10px; font-weight: bold; color: #1a365d; width: 30%;">שם:</td>
              <td style="padding: 10px; color: #333;">${safeName}</td>
            </tr>
            <tr style="background-color: #f7fafc;">
              <td style="padding: 10px; font-weight: bold; color: #1a365d;">טלפון:</td>
              <td style="padding: 10px; color: #333;">${safePhone}</td>
            </tr>
            ${safeEmail ? `
            <tr>
              <td style="padding: 10px; font-weight: bold; color: #1a365d;">דוא״ל:</td>
              <td style="padding: 10px; color: #333;"><a href="mailto:${safeEmail}" style="color: #1a365d;">${safeEmail}</a></td>
            </tr>` : ''}
            ${safeService ? `
            <tr>
              <td style="padding: 10px; font-weight: bold; color: #1a365d;">סוג שירות:</td>
              <td style="padding: 10px; color: #333;">${safeService}</td>
            </tr>` : ''}
            ${safeMessage ? `
            <tr style="background-color: #f7fafc;">
              <td style="padding: 10px; font-weight: bold; color: #1a365d;">הודעה:</td>
              <td style="padding: 10px; color: #333;">${safeMessage}</td>
            </tr>` : ''}
          </table>
          <div style="margin-top: 20px; padding: 15px; background-color: #d4af37; border-radius: 6px; text-align: center;">
            <p style="color: #1a365d; font-weight: bold; margin: 0;">יש לחזור ללקוח בהקדם האפשרי</p>
          </div>
        </div>
      `;

      const from = Deno.env.get('RESEND_FROM') || DEFAULT_FROM;
      const to = Deno.env.get('RESEND_TO') || DEFAULT_TO;

      try {
        const emailRes = await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${resendApiKey}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            from,
            to: [to],
            subject: `פנייה חדשה מ-${safeName} - ${safeService || 'ללא שירות מוגדר'}`,
            html: emailBody,
          }),
        });

        if (!emailRes.ok) {
          const errText = await emailRes.text();
          console.error('Resend error:', errText);
        }
      } catch (emailErr) {
        console.error('Email sending failed:', emailErr);
      }
    }

    return json({ success: true });
  } catch (err) {
    console.error('Error:', err);
    return json({ error: 'שגיאה בשרת' }, 500);
  }
});
