
import { Phone, MapPin, Clock, Mail, MessageCircle, Printer } from 'lucide-react';
import { Link } from 'react-router-dom';
import { CONTACT, mailtoHref, telHref, whatsappUrl } from '@/lib/contact';

const Footer = () => {
  return (
    <footer className="bg-[#2A2826] text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo & Description */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <img
                src="/logo.png"
                alt="לוגו משרד עו״ד שרף"
                width={56}
                height={56}
                className="w-14 h-14"
              />
              <h3 className="text-2xl font-bold text-[#A68D4F]">
                משרד עו״ד שרף
              </h3>
            </div>
            <p className="text-gray-300 leading-relaxed mb-4">
              3 דורות של מסורת משפטית במקרקעין וצוואות. 
              ליווי אישי ומקצועי לכל משפחה.
            </p>
            <div className="flex space-x-4 space-x-reverse">
              <a
                href={telHref(CONTACT.phones[0].tel)}
                className="bg-[#A68D4F] hover:bg-[#8A7340] text-[#2A2826] p-2 rounded-full transition-colors"
                aria-label={`התקשרו ל-${CONTACT.phones[0].display}`}
              >
                <Phone size={20} />
              </a>
              <a
                href={whatsappUrl()}
                className="bg-green-500 hover:bg-green-600 text-white p-2 rounded-full transition-colors"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="פנו אלינו בווטסאפ"
              >
                <MessageCircle size={20} />
              </a>
              <a
                href={mailtoHref()}
                className="bg-[#A68D4F] hover:bg-[#8A7340] text-[#2A2826] p-2 rounded-full transition-colors"
                aria-label={`שלחו אלינו דוא״ל ל-${CONTACT.email}`}
              >
                <Mail size={20} />
              </a>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-bold text-[#A68D4F] mb-4">
              השירותים שלנו
            </h4>
            <ul className="space-y-2 text-gray-300">
              <li>רכישת דירה מיד שנייה</li>
              <li>רכישת דירה מקבלן</li>
              <li>מכירת דירה</li>
              <li>צוואות וירושות</li>
              <li>מיסוי מקרקעין</li>
              <li>ליווי משפטי כללי</li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-bold text-[#A68D4F] mb-4">
              פרטי קשר
            </h4>
            <div className="space-y-3 text-gray-300">
              <div className="flex items-center gap-3">
                <Phone size={16} />
                <div>
                  {CONTACT.phones.map((p) => (
                    <div key={p.tel}>{p.display}</div>
                  ))}
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Printer size={16} />
                <div>פקס: {CONTACT.fax.display}</div>
              </div>
              <div className="flex items-center gap-3">
                <Mail size={16} />
                <a href={mailtoHref()} className="hover:text-[#A68D4F] transition-colors">
                  {CONTACT.email}
                </a>
              </div>
              <div className="flex items-start gap-3">
                <MapPin size={16} className="mt-1" />
                <div>
                  {CONTACT.address.street}<br />
                  {CONTACT.address.city}, {CONTACT.address.postalCode}
                </div>
              </div>
            </div>
          </div>

          {/* Working Hours */}
          <div>
            <h4 className="text-lg font-bold text-[#A68D4F] mb-4">
              שעות פעילות
            </h4>
            <div className="space-y-2 text-gray-300">
              <div className="flex items-start gap-3">
                <Clock size={16} className="mt-1" />
                <div>
                  <div>{CONTACT.hours.weekdays.label}</div>
                  <div className="text-sm">{CONTACT.hours.weekdays.time}</div>
                  <div className="mt-2">{CONTACT.hours.friday.label}</div>
                  <div className="text-sm">{CONTACT.hours.friday.time}</div>
                  <div className="mt-2 text-[#A68D4F] text-sm font-medium">
                    {CONTACT.hours.emergency}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-600 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-gray-300 text-sm">
              © 2026 משרד עו״ד שרף. כל הזכויות שמורות.
            </div>
            <nav aria-label="קישורים משפטיים" className="flex gap-4 text-sm">
              <Link to="/privacy" className="text-gray-300 hover:text-[#A68D4F] transition-colors">
                מדיניות פרטיות
              </Link>
              <Link to="/accessibility" className="text-gray-300 hover:text-[#A68D4F] transition-colors">
                הצהרת נגישות
              </Link>
            </nav>
          </div>
          <div className="text-gray-300 text-sm text-center md:text-right mt-4">
            {`מיקום: ${CONTACT.address.street}, ${CONTACT.address.city} | טלפון: ${CONTACT.phones.map((p) => p.display).join(', ')}`}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
