import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { readConsent, writeConsent } from '@/lib/consent';

const GA_ID = import.meta.env.VITE_GA_MEASUREMENT_ID as string | undefined;

const CookieBanner = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!GA_ID) return;
    if (readConsent() === 'unknown') setVisible(true);
  }, []);

  if (!visible) return null;

  const accept = () => {
    writeConsent('granted');
    setVisible(false);
  };

  const decline = () => {
    writeConsent('denied');
    setVisible(false);
  };

  return (
    <div
      role="dialog"
      aria-labelledby="cookie-banner-title"
      className="fixed inset-x-0 bottom-0 z-50 bg-[#2A2826] text-white shadow-2xl border-t-2 border-[#A68D4F]"
    >
      <div className="container mx-auto px-4 py-4 flex flex-col md:flex-row items-start md:items-center gap-4">
        <div className="flex-1 text-sm leading-relaxed">
          <p id="cookie-banner-title" className="font-bold text-[#A68D4F] mb-1">עוגיות באתר</p>
          <p>
            אנו משתמשים בעוגיות אנליטיקה כדי להבין איך משתמשים באתר ולשפר אותו. ניתן
            לקרוא עוד ב<Link to="/privacy" className="underline hover:text-[#A68D4F]">מדיניות הפרטיות</Link>.
          </p>
        </div>
        <div className="flex gap-3 flex-shrink-0">
          <button
            onClick={decline}
            className="px-4 py-2 rounded-lg border border-gray-400 text-gray-200 hover:bg-white/10 transition-colors text-sm"
          >
            דחייה
          </button>
          <button
            onClick={accept}
            className="px-5 py-2 rounded-lg bg-[#A68D4F] text-[#2A2826] font-bold hover:bg-[#8A7340] transition-colors text-sm"
          >
            אישור
          </button>
        </div>
      </div>
    </div>
  );
};

export default CookieBanner;
