import { useState } from 'react';
import { Send, Phone, MapPin, Clock, Mail, Printer, CheckCircle2 } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { CONTACT, mailtoHref, telHref, whatsappUrl } from '@/lib/contact';
import { isValidEmail, isValidPhone } from '@/lib/validation';

const SERVICES = [
  'רכישת דירה מיד שנייה',
  'רכישת דירה מקבלן',
  'מכירת דירה',
  'צוואות וירושות',
  'מיסוי מקרקעין',
  'ליווי משפטי כללי',
  'אחר',
];

const emptyForm = {
  name: '',
  phone: '',
  email: '',
  service: [] as string[],
  message: '',
  website: '', // honeypot — must remain empty
};

const ContactForm = () => {
  const [formData, setFormData] = useState(emptyForm);
  const [phoneTouched, setPhoneTouched] = useState(false);
  const [emailTouched, setEmailTouched] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const phoneHasError = phoneTouched && formData.phone.length > 0 && !isValidPhone(formData.phone);
  const emailHasError = emailTouched && formData.email.length > 0 && !isValidEmail(formData.email);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const toggleService = (svc: string) => {
    setFormData((prev) => ({
      ...prev,
      service: prev.service.includes(svc)
        ? prev.service.filter((s) => s !== svc)
        : [...prev.service, svc],
    }));
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
        description: 'בדקו שהכתובת מכילה @ ודומיין תקני, או השאירו את השדה ריק.',
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

  return (
    <section id="contact" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-[#2A2826] mb-4">צרו קשר</h2>
          <p className="text-xl text-gray-600">נשמח לעזור לכם בכל שאלה או בקשה</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form OR Success State */}
          <div className="bg-gray-50 rounded-lg p-8">
            {submitted ? (
              <div role="status" aria-live="polite" className="text-center py-6">
                <CheckCircle2 className="text-[#A68D4F] mx-auto mb-4" size={72} strokeWidth={1.5} />
                <h3 className="text-3xl font-bold text-[#2A2826] mb-3">תודה רבה!</h3>
                <p className="text-lg text-gray-700 mb-2">פנייתך התקבלה.</p>
                <p className="text-gray-600 mb-8">ניצור איתך קשר בהקדם, בדרך כלל תוך יום עסקים.</p>

                <div className="bg-white border border-[#A68D4F]/30 rounded-lg p-6 mb-6">
                  <p className="text-sm text-gray-600 mb-3">
                    דחוף? אפשר ליצור איתנו קשר ישירות:
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <a
                      href={telHref(CONTACT.phones[0].tel)}
                      className="bg-[#2A2826] hover:bg-[#404040] text-white px-6 py-3 rounded-lg font-bold transition-colors inline-flex items-center justify-center gap-2"
                    >
                      <Phone size={18} />
                      {CONTACT.phones[0].display}
                    </a>
                    <a
                      href={whatsappUrl()}
                      className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg font-bold transition-colors inline-flex items-center justify-center gap-2"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      ווטסאפ
                    </a>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={resetForm}
                  className="text-sm text-[#2A2826] hover:text-[#A68D4F] underline transition-colors"
                >
                  שליחת פנייה נוספת
                </button>
              </div>
            ) : (
              <>
                <h3 className="text-2xl font-bold text-[#2A2826] mb-6">שלחו לנו הודעה</h3>
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Honeypot — hidden from humans, bots fill it. */}
                  <div className="absolute left-[-9999px]" aria-hidden="true">
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

                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                      שם מלא *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      autoComplete="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#A68D4F] focus:border-transparent"
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                      מספר טלפון *
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      autoComplete="tel"
                      inputMode="tel"
                      value={formData.phone}
                      onChange={handleChange}
                      onBlur={() => setPhoneTouched(true)}
                      aria-invalid={phoneHasError}
                      aria-describedby="phone-hint phone-error"
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:border-transparent transition-colors ${
                        phoneHasError
                          ? 'border-red-500 focus:ring-red-500'
                          : 'border-gray-300 focus:ring-[#A68D4F]'
                      }`}
                      required
                    />
                    {phoneHasError ? (
                      <p id="phone-error" className="text-xs text-red-600 mt-1">
                        מספר לא תקין. נסו: 050-1234567
                      </p>
                    ) : (
                      <p id="phone-hint" className="text-xs text-gray-500 mt-1">
                        לדוגמה: 050-1234567
                      </p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                      דוא״ל
                      <span className="text-xs text-gray-500 font-normal mr-2">(אופציונלי)</span>
                    </label>
                    <input
                      type="text"
                      id="email"
                      name="email"
                      autoComplete="email"
                      inputMode="email"
                      value={formData.email}
                      onChange={handleChange}
                      onBlur={() => setEmailTouched(true)}
                      aria-invalid={emailHasError}
                      aria-describedby="email-hint email-error"
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:border-transparent transition-colors ${
                        emailHasError
                          ? 'border-red-500 focus:ring-red-500'
                          : 'border-gray-300 focus:ring-[#A68D4F]'
                      }`}
                      placeholder="name@example.com"
                    />
                    {emailHasError ? (
                      <p id="email-error" className="text-xs text-red-600 mt-1">
                        כתובת דוא״ל לא תקינה
                      </p>
                    ) : (
                      <p id="email-hint" className="text-xs text-gray-500 mt-1">
                        אם תרצו שנענה גם בכתב
                      </p>
                    )}
                  </div>

                  <fieldset>
                    <legend className="block text-sm font-medium text-gray-700 mb-2">
                      סוג השירות הנדרש
                      <span className="text-xs text-gray-500 font-normal mr-2">
                        (ניתן לבחור יותר מאחד)
                      </span>
                    </legend>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {SERVICES.map((svc) => {
                        const checked = formData.service.includes(svc);
                        return (
                          <label
                            key={svc}
                            className={`flex items-center gap-2 px-3 py-2 rounded-lg border cursor-pointer transition-colors text-sm ${
                              checked
                                ? 'border-[#A68D4F] bg-[#A68D4F]/10 text-[#2A2826]'
                                : 'border-gray-300 bg-white hover:border-[#A68D4F]/50 text-gray-700'
                            }`}
                          >
                            <input
                              type="checkbox"
                              checked={checked}
                              onChange={() => toggleService(svc)}
                              className="accent-[#A68D4F]"
                            />
                            <span>{svc}</span>
                          </label>
                        );
                      })}
                    </div>
                  </fieldset>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                      הערות נוספות
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={4}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#A68D4F] focus:border-transparent"
                      placeholder="תארו בקצרה את הצרכים שלכם..."
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-[#A68D4F] hover:bg-[#8A7340] text-[#2A2826] px-8 py-4 rounded-lg font-bold text-lg transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Send size={20} />
                    {isSubmitting ? 'שולח...' : 'שלח בקשה לייעוץ חינם'}
                  </button>
                </form>
              </>
            )}
          </div>

          {/* Contact Information */}
          <div className="space-y-8">
            <div className="bg-[#2A2826] text-white rounded-lg p-8">
              <h3 className="text-2xl font-bold text-[#A68D4F] mb-6">פרטי יצירת קשר</h3>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <Phone className="text-[#A68D4F] mt-1" size={24} />
                  <div>
                    <h4 className="font-bold mb-2">טלפונים</h4>
                    {CONTACT.phones.map((p) => (
                      <p key={p.tel} className="text-gray-300">{p.display}</p>
                    ))}
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <Printer className="text-[#A68D4F] mt-1" size={24} />
                  <div>
                    <h4 className="font-bold mb-2">פקס</h4>
                    <p className="text-gray-300">{CONTACT.fax.display}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <Mail className="text-[#A68D4F] mt-1" size={24} />
                  <div>
                    <h4 className="font-bold mb-2">דואר אלקטרוני</h4>
                    <a href={mailtoHref()} className="text-gray-300 hover:text-[#A68D4F] transition-colors">
                      {CONTACT.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <MapPin className="text-[#A68D4F] mt-1" size={24} />
                  <div>
                    <h4 className="font-bold mb-2">כתובת</h4>
                    <p className="text-gray-300">
                      {CONTACT.address.street}<br />
                      {CONTACT.address.city}, {CONTACT.address.postalCode}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <Clock className="text-[#A68D4F] mt-1" size={24} />
                  <div>
                    <h4 className="font-bold mb-2">שעות פעילות</h4>
                    <p className="text-gray-300">
                      {CONTACT.hours.weekdays.label}: {CONTACT.hours.weekdays.time}<br />
                      {CONTACT.hours.friday.label}: {CONTACT.hours.friday.time}<br />
                      {CONTACT.hours.emergency}
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-6 rounded-lg overflow-hidden border border-[#A68D4F]/30">
                <iframe
                  src={`https://maps.google.com/maps?q=${encodeURIComponent(`${CONTACT.address.street}, ${CONTACT.address.city}`)}&output=embed`}
                  width="100%"
                  height="280"
                  style={{ border: 0 }}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title={`מפה - ${CONTACT.address.street}, ${CONTACT.address.city}`}
                />
              </div>
            </div>

            <div className="bg-[#A68D4F] text-[#2A2826] rounded-lg p-8 text-center">
              <h4 className="text-xl font-bold mb-4">ייעוץ ראשוני חינם!</h4>
              <p className="mb-6">התקשרו עכשיו ונשמח להעניק לכם ייעוץ ראשוני ללא עלות</p>
              <div className="flex flex-col gap-3">
                <a
                  href={telHref(CONTACT.phones[0].tel)}
                  className="bg-[#2A2826] hover:bg-[#404040] text-white px-6 py-3 rounded-lg font-bold transition-colors"
                >
                  התקשרו: {CONTACT.phones[0].display}
                </a>
                <a
                  href={whatsappUrl()}
                  className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg font-bold transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  ווטסאפ: {CONTACT.whatsapp.display}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;
