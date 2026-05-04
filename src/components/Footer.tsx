import { Link } from 'react-router-dom';

const PRACTICE_LINKS = [
  { label: 'עסקאות נדל״ן', href: '#practice' },
  { label: 'צוואות וירושות', href: '#practice' },
  { label: 'מיסוי מקרקעין', href: '#practice' },
];

const focusRing =
  'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-light';

const focusRingDark =
  'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-light';

// Inline white wordmark — replaces the legacy logo PNG in the footer.
const FooterMark = () => (
  <div className="flex items-baseline flex-wrap gap-x-3 gap-y-1">
    <span className="font-display text-[26px] font-semibold tracking-tight text-white">
      שׂרף
    </span>
    <span aria-hidden="true" className="text-white/30">·</span>
    <span className="font-display text-[15px] font-medium text-white/85">
      משרד עורכי דין
    </span>
    <span aria-hidden="true" className="text-white/30">·</span>
    <span
      dir="ltr"
      className="font-display text-[11px] font-medium tracking-[0.18em] text-white/65"
    >
      EST. 1964
    </span>
  </div>
);

const Footer = () => {
  return (
    <footer className="bg-brand-ink text-white">
      <div className="max-w-[1280px] mx-auto px-4 md:px-10 lg:px-16 pt-16 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-10 gap-y-12">
          {/* 1 — Brand block */}
          <div className="lg:col-span-1 md:col-span-2">
            <FooterMark />
            <p className="mt-5 text-[14.5px] leading-[1.7] text-white/80 max-w-sm">
              ליווי משפטי אישי לעסקאות נדל״ן וצוואות. בת ים, מאז 1964.
            </p>
          </div>

          {/* 2 — Practice areas */}
          <div>
            <h3 className="font-display text-[12px] font-semibold tracking-[0.06em] text-white/65 mb-5">
              תחומי התמחות
            </h3>
            <ul className="space-y-3">
              {PRACTICE_LINKS.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    className={`text-[14.5px] font-medium leading-[1.4] text-white/85 hover:text-white transition-colors duration-150 ${focusRingDark} rounded-sm`}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* 3 — Contact */}
          <div>
            <h3 className="font-display text-[12px] font-semibold tracking-[0.06em] text-white/65 mb-5">
              יצירת קשר
            </h3>
            <ul className="space-y-3 text-[14.5px] leading-[1.5] text-white/85">
              <li>
                <a
                  href="tel:035073749"
                  dir="ltr"
                  className={`hover:text-white transition-colors duration-150 ${focusRingDark} rounded-sm inline-block`}
                >
                  03-5073749
                </a>
              </li>
              <li>
                <a
                  href="https://wa.me/972542028695"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`hover:text-white transition-colors duration-150 ${focusRingDark} rounded-sm inline-flex items-baseline gap-2`}
                >
                  <span className="text-white/65 text-[12px] font-semibold tracking-[0.06em]">
                    WhatsApp
                  </span>
                  <span dir="ltr">054-2028695</span>
                </a>
              </li>
              <li>
                <a
                  href="mailto:office@sharaf-law.co.il"
                  dir="ltr"
                  className={`hover:text-white transition-colors duration-150 ${focusRingDark} rounded-sm inline-block`}
                >
                  office@sharaf-law.co.il
                </a>
              </li>
              <li className="pt-1 text-white/75">
                ירושלים 28א, בת ים
              </li>
            </ul>
          </div>

          {/* 4 — Hours */}
          <div>
            <h3 className="font-display text-[12px] font-semibold tracking-[0.06em] text-white/65 mb-5">
              שעות פעילות
            </h3>
            <ul className="space-y-2 text-[14.5px] leading-[1.5] text-white/85">
              <li className="flex justify-between gap-4 max-w-[200px]">
                <span>ראשון–חמישי</span>
                <span dir="ltr" className="text-white/75">9:00–18:00</span>
              </li>
              <li className="flex justify-between gap-4 max-w-[200px]">
                <span>שישי</span>
                <span dir="ltr" className="text-white/75">9:00–13:00</span>
              </li>
              <li className="pt-2 text-white/65 text-[13px]">
                במקרי חירום — זמינים 24/7
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom row */}
        <div className="mt-16 pt-6 border-t border-white/10 flex flex-col md:flex-row md:items-center md:justify-between gap-4 text-[13px] text-white/60">
          <p>© 2026 משרד עו״ד שרף. כל הזכויות שמורות.</p>
          <nav aria-label="קישורים משפטיים" className="flex gap-6">
            <Link
              to="/privacy"
              className={`hover:text-white transition-colors duration-150 ${focusRing} rounded-sm`}
            >
              מדיניות פרטיות
            </Link>
            <Link
              to="/accessibility"
              className={`hover:text-white transition-colors duration-150 ${focusRing} rounded-sm`}
            >
              הצהרת נגישות
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
