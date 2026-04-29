
import { useState } from 'react';
import { Send, Phone, MapPin, Clock } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    service: '',
    message: ''
  });

  const services = [
    'רכישת דירה מיד שנייה',
    'רכישת דירה מקבלן',
    'מכירת דירה',
    'צוואות וירושות',
    'מיסוי מקרקעין',
    'ליווי משפטי כללי',
    'אחר'
  ];

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.phone) {
      toast({
        title: "שגיאה",
        description: "אנא מלאו את כל השדות הנדרשים",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);
    try {
      const { data, error } = await supabase.functions.invoke('submit-contact', {
        body: formData
      });

      if (error) throw error;

      toast({
        title: "הפנייה נשלחה בהצלחה!",
        description: "ניצור איתכם קשר בהקדם האפשרי",
      });

      setFormData({ name: '', phone: '', service: '', message: '' });
    } catch (err) {
      console.error('Submit error:', err);
      toast({
        title: "שגיאה",
        description: "אירעה שגיאה בשליחת הטופס. אנא נסו שוב.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <section id="contact" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-[#1a365d] mb-4">
            צרו קשר
          </h2>
          <p className="text-xl text-gray-600">
            נשמח לעזור לכם בכל שאלה או בקשה
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="bg-gray-50 rounded-lg p-8">
            <h3 className="text-2xl font-bold text-[#1a365d] mb-6">
              שלחו לנו הודעה
            </h3>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                  שם מלא *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#d4af37] focus:border-transparent"
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
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#d4af37] focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label htmlFor="service" className="block text-sm font-medium text-gray-700 mb-2">
                  סוג השירות הנדרש
                </label>
                <select
                  id="service"
                  name="service"
                  value={formData.service}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#d4af37] focus:border-transparent"
                >
                  <option value="">בחרו שירות</option>
                  {services.map((service, index) => (
                    <option key={index} value={service}>
                      {service}
                    </option>
                  ))}
                </select>
              </div>

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
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#d4af37] focus:border-transparent"
                  placeholder="תארו בקצרה את הצרכים שלכם..."
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-[#d4af37] hover:bg-[#b8941f] text-[#1a365d] px-8 py-4 rounded-lg font-bold text-lg transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send size={20} />
                {isSubmitting ? 'שולח...' : 'שלח בקשה לייעוץ חינם'}
              </button>
            </form>
          </div>

          {/* Contact Information */}
          <div className="space-y-8">
            <div className="bg-[#1a365d] text-white rounded-lg p-8">
              <h3 className="text-2xl font-bold text-[#d4af37] mb-6">
                פרטי יצירת קשר
              </h3>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <Phone className="text-[#d4af37] mt-1" size={24} />
                  <div>
                    <h4 className="font-bold mb-2">טלפונים</h4>
                    <p className="text-gray-300">03-5073749</p>
                    <p className="text-gray-300">03-6591399</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <MapPin className="text-[#d4af37] mt-1" size={24} />
                  <div>
                    <h4 className="font-bold mb-2">כתובת</h4>
                    <p className="text-gray-300">
                      ירושלים 28 א<br />
                      בת ים
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <Clock className="text-[#d4af37] mt-1" size={24} />
                  <div>
                    <h4 className="font-bold mb-2">שעות פעילות</h4>
                    <p className="text-gray-300">
                      ראשון - חמישי: 9:00 - 18:00<br />
                      שישי: 9:00 - 13:00<br />
                      במקרי חירום - זמינים 24/7
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-[#d4af37] text-[#1a365d] rounded-lg p-8 text-center">
              <h4 className="text-xl font-bold mb-4">
                ייעוץ ראשוני חינם!
              </h4>
              <p className="mb-6">
                התקשרו עכשיו ונשמח להעניק לכם ייעוץ ראשוני ללא עלות
              </p>
              <div className="flex flex-col gap-3">
                <a
                  href="tel:035073749"
                  className="bg-[#1a365d] hover:bg-[#2d5a87] text-white px-6 py-3 rounded-lg font-bold transition-colors"
                >
                  התקשרו: 03-5073749
                </a>
                <a
                  href="https://wa.me/972505073749"
                  className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg font-bold transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  ווטסאפ: 050-5073749
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
