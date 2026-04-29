import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version',
};

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { name, phone, service, message } = await req.json();

    if (!name || !phone) {
      return new Response(
        JSON.stringify({ error: 'שם וטלפון הם שדות חובה' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    if (name.length > 100 || phone.length > 20 || (service && service.length > 200) || (message && message.length > 2000)) {
      return new Response(
        JSON.stringify({ error: 'הקלט חורג מהאורך המותר' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const supabase = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    );

    const { error: dbError } = await supabase
      .from('contact_submissions')
      .insert({ name, phone, service: service || null, message: message || null });

    if (dbError) {
      console.error('DB error:', dbError);
      return new Response(
        JSON.stringify({ error: 'שגיאה בשמירת הפנייה' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Send email notification via Resend
    const resendApiKey = Deno.env.get('RESEND_API_KEY');
    if (resendApiKey) {
      const emailBody = `
        <div dir="rtl" style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 8px;">
          <h2 style="color: #1a365d; border-bottom: 2px solid #d4af37; padding-bottom: 10px;">פנייה חדשה התקבלה</h2>
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 10px; font-weight: bold; color: #1a365d; width: 30%;">שם:</td>
              <td style="padding: 10px; color: #333;">${name}</td>
            </tr>
            <tr style="background-color: #f7fafc;">
              <td style="padding: 10px; font-weight: bold; color: #1a365d;">טלפון:</td>
              <td style="padding: 10px; color: #333;">${phone}</td>
            </tr>
            ${service ? `
            <tr>
              <td style="padding: 10px; font-weight: bold; color: #1a365d;">סוג שירות:</td>
              <td style="padding: 10px; color: #333;">${service}</td>
            </tr>` : ''}
            ${message ? `
            <tr style="background-color: #f7fafc;">
              <td style="padding: 10px; font-weight: bold; color: #1a365d;">הודעה:</td>
              <td style="padding: 10px; color: #333;">${message}</td>
            </tr>` : ''}
          </table>
          <div style="margin-top: 20px; padding: 15px; background-color: #d4af37; border-radius: 6px; text-align: center;">
            <p style="color: #1a365d; font-weight: bold; margin: 0;">יש לחזור ללקוח בהקדם האפשרי</p>
          </div>
        </div>
      `;

      try {
        const emailRes = await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${resendApiKey}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            from: 'onboarding@resend.dev',
            to: ['tavor.sharf.law@gmail.com'],
            subject: `פנייה חדשה מ-${name} - ${service || 'ללא שירות מוגדר'}`,
            html: emailBody,
          }),
        });

        if (!emailRes.ok) {
          const errText = await emailRes.text();
          console.error('Resend error:', errText);
        } else {
          console.log('Email sent successfully');
        }
      } catch (emailErr) {
        console.error('Email sending failed:', emailErr);
      }
    }

    return new Response(
      JSON.stringify({ success: true }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (err) {
    console.error('Error:', err);
    return new Response(
      JSON.stringify({ error: 'שגיאה בשרת' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
