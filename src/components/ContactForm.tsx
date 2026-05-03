import { useState } from 'react';
import { ArrowLeft, CheckCircle2, Loader2 } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { isValidEmail, isValidPhone } from '@/lib/validation';

const SERVICES = ['נדל״ן', 'צוואות', 'אחר'] as const;
type Service = (typeof SERVICES)[number];

const emptyForm = {
  name: '',
  phone: '',
  email: '',
  service: '' as Service | '',
  message: '',
  website: '', // honeypot
};

const focusRing =
  'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand';

const inputBase =
  'w-full px-4 py-3 rounded-input bg-bg-alt border text-ink placeholder:text-ink-mute transition-colors duration-150 focus:outline-none focus:border-brand focus:ring-2 focus:ring-brand/15';

const ContactForm = () => {
  const [formData, setFormData] = useState(emptyForm);
  const [phoneTouched, setPhoneTouched] = useState(false);
  const [emailTouched, setEmailTouched] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const phoneHasError =
    phoneTouched && formData.phone.length > 0 && !isValidPhone(formData.phone);
  const emailHasError =
    emailTouched && formData.email.length > 0 && !isValidEmail(formData.email);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const setService = (svc: Service) => {
    setFormData((prev) => ({ ...prev, service: svc }));
  };

  const resetForm = () => {
    setFormData(emptyForm);
    setPhoneTouched(false);
    setEmailTouched(false);
    setSubmitted(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.phone) {
      toast({
        title: 'שגיאה',
        description: 'אנא מלאו את כל השדות הנדרשים',
        variant: 'destructive',
      });
      return;
    }

    if (!isValidPhone(formData.phone)) {
      setPhoneTouched(true);
      toast({
        title: 'מספר טלפון לא תקין',
        description: 'אנא הזינו מספר טלפון בפורמט תקני (לדוגמה 050-1234567).',
        variant: 'destructive',
      });
      return;
    }

    if (formData.email.length > 0 && !isValidEmail(formData.email)) {
      setEmailTouched(true);
      toast({
        title: 'כתובת דוא״ל לא תקינה',
        description:
          'בדקו שהכתובת מכילה @ ודומיין תקני, או השאירו את השדה ריק.',
        variant: 'destructive',
      });
      return;
    }

    if (!formData.service) {
      toast({
        title: 'נא לבחור תחום',
        description: 'בחרו אחד מהתחומים: נדל״ן, צוואות, או אחר.',
        variant: 'destructive',
      });
      return;
    }

    setIsSubmitting(true);
    try {
      const { error } = await supabase.functions.invoke('submit-contact', {
        body: formData,
      });

      if (error) throw error;
      setSubmitted(true);
    } catch (err) {
      console.error('Submit error:', err);
      toast({
        title: 'שגיאה',
        description: 'אירעה שגיאה בשליחת הטופס. אנא נסו שוב.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div role="status" aria-live="polite" className="text-center py-6">
        <CheckCircle2
          className="text-brand mx-auto mb-4"
          size={64}
          strokeWidth={1.5}
          aria-hidden="true"
        />
        <h3 className="font-display text-[22px] font-semibold text-ink mb-2">
          תודה רבה!
        </h3>
        <p className="text-[15px] text-ink-soft mb-8">
          נחזור אליכם בתוך יום עסקים.
        </p>
        <button
          type="button"
          onClick={resetForm}
          className={`text-[13px] text-ink-mute hover:text-brand underline transition-colors duration-150 rounded-sm ${focusRing}`}
        >
          שליחת פנייה נוספת
        </button>
      </div>
    );
  }

  return (
    <>
      <h3 className="font-display text-[22px] font-semibold text-ink leading-[1.20] tracking-[-0.010em]">
        השאירו פרטים
      </h3>
      <p className="text-[14px] text-ink-mute mt-1.5 mb-7">
        נחזור אליכם בתוך יום עסקים.
      </p>

      <form onSubmit={handleSubmit} className="space-y-5" noValidate>
        {/* Honeypot */}
        <div className="absolute opacity-0 pointer-events-none -z-10" aria-hidden="true">
          <label htmlFor="website">השאר ריק</label>
          <input
            type="text"
            id="website"
            name="website"
            tabIndex={-1}
            autoComplete="off"
            value={formData.website}
            onChange={handleChange}
          />
        </div>

        {/* Name + Phone (2-col on sm+) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="name"
              className="block text-[14px] font-medium text-ink mb-1.5"
            >
              שם מלא <span className="text-brand">*</span>
            </label>
            <input
              type="text"
              id="name"
              name="name"
              autoComplete="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="שם משפחה ופרטי"
              required
              className={`${inputBase} border-rule`}
            />
          </div>

          <div>
            <label
              htmlFor="phone"
              className="block text-[14px] font-medium text-ink mb-1.5"
            >
              טלפון <span className="text-brand">*</span>
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              autoComplete="tel"
              inputMode="tel"
              dir="ltr"
              value={formData.phone}
              onChange={handleChange}
              onBlur={() => setPhoneTouched(true)}
              aria-invalid={phoneHasError}
              aria-describedby="phone-hint phone-error"
              placeholder="050-0000000"
              required
              className={`${inputBase} text-right ${
                phoneHasError ? 'border-red-500 focus:border-red-500 focus:ring-red-500/15' : 'border-rule'
              }`}
            />
            {phoneHasError ? (
              <p id="phone-error" className="text-[12px] text-red-600 mt-1">
                מספר לא תקין. נסו: 050-1234567
              </p>
            ) : (
              <p id="phone-hint" className="text-[12px] text-ink-mute mt-1">
                לדוגמה: 050-1234567
              </p>
            )}
          </div>
        </div>

        {/* Email (full row) */}
        <div>
          <label
            htmlFor="email"
            className="block text-[14px] font-medium text-ink mb-1.5"
          >
            דוא״ל
            <span className="text-[12px] text-ink-mute font-normal mx-2">· אופציונלי</span>
          </label>
          <input
            type="text"
            id="email"
            name="email"
            autoComplete="email"
            inputMode="email"
            dir="ltr"
            value={formData.email}
            onChange={handleChange}
            onBlur={() => setEmailTouched(true)}
            aria-invalid={emailHasError}
            aria-describedby="email-error"
            placeholder="optional@email.com"
            className={`${inputBase} text-right ${
              emailHasError ? 'border-red-500 focus:border-red-500 focus:ring-red-500/15' : 'border-rule'
            }`}
          />
          {emailHasError && (
            <p id="email-error" className="text-[12px] text-red-600 mt-1">
              כתובת דוא״ל לא תקינה
            </p>
          )}
        </div>

        {/* Service chips */}
        <fieldset>
          <legend className="block text-[14px] font-medium text-ink mb-2">
            תחום הפנייה <span className="text-brand">*</span>
          </legend>
          <div role="radiogroup" className="flex flex-wrap gap-2">
            {SERVICES.map((svc) => {
              const selected = formData.service === svc;
              return (
                <button
                  key={svc}
                  type="button"
                  role="radio"
                  aria-checked={selected}
                  onClick={() => setService(svc)}
                  className={`rounded-pill px-5 py-2 text-[14px] font-medium transition-colors duration-150 border ${focusRing} ${
                    selected
                      ? 'bg-brand text-white border-brand'
                      : 'bg-bg-alt text-ink-soft border-rule hover:border-brand hover:text-ink'
                  }`}
                >
                  {svc}
                </button>
              );
            })}
          </div>
        </fieldset>

        {/* Message */}
        <div>
          <label
            htmlFor="message"
            className="block text-[14px] font-medium text-ink mb-1.5"
          >
            הודעה
            <span className="text-[12px] text-ink-mute font-normal mx-2">· אופציונלי</span>
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            rows={4}
            maxLength={1000}
            placeholder="ספרו בקצרה במה נוכל לעזור..."
            className={`${inputBase} border-rule resize-none`}
          />
        </div>

        {/* Submit */}
        <div className="pt-2">
          <button
            type="submit"
            disabled={isSubmitting}
            className={`group w-full inline-flex items-center justify-center gap-2 bg-brand hover:bg-brand-deep text-white rounded-pill py-3.5 text-[15px] font-medium transition-colors duration-200 ease-default disabled:opacity-60 disabled:cursor-not-allowed ${focusRing}`}
          >
            {isSubmitting ? (
              <>
                <Loader2 size={18} className="animate-spin" aria-hidden="true" />
                שולח...
              </>
            ) : (
              <>
                שליחת בקשה
                <ArrowLeft
                  size={16}
                  strokeWidth={2}
                  aria-hidden="true"
                  className="transition-transform duration-150 group-hover:-translate-x-0.5"
                />
              </>
            )}
          </button>
          <p className="text-[12px] text-ink-mute text-center mt-3">
            השליחה אינה מהווה ייעוץ משפטי.
          </p>
        </div>
      </form>
    </>
  );
};

export default ContactForm;
