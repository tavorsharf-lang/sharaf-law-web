
import { Phone, MapPin, Clock, Mail } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-[#1a365d] text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo & Description */}
          <div>
            <h3 className="text-2xl font-bold text-[#d4af37] mb-4">
              משרד עו״ד שרף
            </h3>
            <p className="text-gray-300 leading-relaxed mb-4">
              3 דורות של מסורת משפטית במקרקעין וצוואות. 
              ליווי אישי ומקצועי לכל משפחה.
            </p>
            <div className="flex space-x-4 space-x-reverse">
              <a
                href="tel:035073749"
                className="bg-[#d4af37] hover:bg-[#b8941f] text-[#1a365d] p-2 rounded-full transition-colors"
              >
                <Phone size={20} />
              </a>
              <a
                href="https://wa.me/972505073749"
                className="bg-green-500 hover:bg-green-600 text-white p-2 rounded-full transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Phone size={20} />
              </a>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-bold text-[#d4af37] mb-4">
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
            <h4 className="text-lg font-bold text-[#d4af37] mb-4">
              פרטי קשר
            </h4>
            <div className="space-y-3 text-gray-300">
              <div className="flex items-center gap-3">
                <Phone size={16} />
                <div>
                  <div>03-5073749</div>
                  <div>03-6591399</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <MapPin size={16} className="mt-1" />
                <div>
                  ירושלים 28 א<br />
                  בת ים
                </div>
              </div>
            </div>
          </div>

          {/* Working Hours */}
          <div>
            <h4 className="text-lg font-bold text-[#d4af37] mb-4">
              שעות פעילות
            </h4>
            <div className="space-y-2 text-gray-300">
              <div className="flex items-start gap-3">
                <Clock size={16} className="mt-1" />
                <div>
                  <div>ראשון - חמישי</div>
                  <div className="text-sm">9:00 - 18:00</div>
                  <div className="mt-2">שישי</div>
                  <div className="text-sm">9:00 - 13:00</div>
                  <div className="mt-2 text-[#d4af37] text-sm font-medium">
                    חירום: זמינים 24/7
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-600 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-gray-300 text-sm mb-4 md:mb-0">
              © 2024 משרד עו״ד שרף. כל הזכויות שמורות.
            </div>
            <div className="text-gray-300 text-sm">
              מיקום: ירושלים 28 א, בת ים | טלפון: 03-5073749, 03-6591399
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
