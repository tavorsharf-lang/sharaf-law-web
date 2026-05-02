import { ArrowLeft } from 'lucide-react';
import Photo from '@/components/ui/Photo';

const focusRing =
  'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand';

const Hero = () => {
  return (
    <section
      id="home"
      className="bg-white px-4 md:px-10 lg:px-16 pt-[100px] pb-20"
    >
      <div className="max-w-[1280px] mx-auto grid grid-cols-1 lg:grid-cols-[1.1fr_1fr] gap-12 lg:gap-20 items-center">
        {/* Copy column */}
        <div>
          <p className="text-eyebrow text-brand">
            · משרד עורכי דין למקרקעין · בת ים
          </p>

          <h1 className="font-display text-[40px] md:text-[56px] lg:text-[68px] font-semibold leading-[1.05] tracking-[-0.025em] text-ink mt-6">
            עסקת נדל״ן,
            <br />
            <span className="text-brand">בליווי שמרגיש</span>
            <br />
            <span className="text-brand">אישי.</span>
          </h1>

          <p className="text-[19px] leading-[1.6] text-ink-soft max-w-[480px] mt-8">
            ליווי משפטי לרוכשים ומוכרים באזור בת ים, חולון וראשון לציון. רכישה,
            מכירה, צוואות ומיסוי מקרקעין — בקצב של אנשים, לא של חוזים.
          </p>

          <div className="flex flex-wrap items-center gap-4 mt-11">
            <a
              href="#contact"
              className={`group inline-flex items-center gap-2 bg-brand text-white hover:bg-brand-deep transition-colors duration-200 ease-default rounded-pill px-8 py-4 text-base font-medium ${focusRing}`}
            >
              קביעת פגישה ראשונה
              <ArrowLeft
                size={18}
                strokeWidth={2}
                aria-hidden="true"
                className="transition-transform duration-150 group-hover:-translate-x-0.5"
              />
            </a>

            <span className="text-sm text-ink-mute">
              או{' '}
              <a
                href="tel:0542028695"
                dir="ltr"
                className={`font-medium text-ink hover:text-brand transition-colors duration-150 rounded-sm ${focusRing}`}
              >
                054-2028695
              </a>
            </span>
          </div>
        </div>

        {/* Photo column */}
        <div className="relative">
          <Photo aspectRatio="4/5" radius="m" />

          {/* Floating "1964" card.
              Mobile: static, centered below photo.
              Desktop (≥lg): absolute, bottom-6, sticking 32px past inline-end (logical = visually outward in RTL). */}
          <aside
            className="relative mt-4 mx-auto max-w-[240px] bg-white rounded-floater shadow-floater p-5 px-6
                       lg:absolute lg:mt-0 lg:mx-0 lg:bottom-6 lg:end-[-32px]"
          >
            <p className="text-[11px] font-semibold tracking-[0.06em] text-ink-mute">
              פעיל מאז
            </p>
            <p
              dir="ltr"
              className="font-display text-[28px] font-bold leading-none text-ink mt-1.5"
            >
              1964
            </p>
            <p className="text-[13px] leading-[1.5] text-ink-soft mt-3">
              שלושה דורות, אותה כתובת.
            </p>
          </aside>
        </div>
      </div>
    </section>
  );
};

export default Hero;
