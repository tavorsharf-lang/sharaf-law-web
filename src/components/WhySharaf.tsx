import { ArrowLeft } from 'lucide-react';

type Kpi = {
  number: string;
  label: string;
  ltr?: boolean;
};

const KPIS: Kpi[] = [
  { number: '1964', label: 'שנת הקמת המשרד', ltr: true },
  { number: '3', label: 'דורות במשפחה', ltr: true },
  { number: '+500', label: 'עסקאות מלוּות', ltr: true },
  { number: 'בת ים', label: 'מקומיים. עדיין כאן.' },
];

const focusRingDark =
  'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-light';

const WhySharaf = () => {
  return (
    <section
      id="about"
      className="bg-white px-4 md:px-10 lg:px-16 py-[120px]"
    >
      <div className="max-w-[1280px] mx-auto">
        <div className="bg-brand rounded-l text-white px-8 py-12 md:px-16 md:py-16 lg:px-[72px] lg:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
            {/* Copy */}
            <div>
              <p
                className="text-eyebrow text-brand-light mb-5"
              >
                למה משרד שׂרף
              </p>
              <h2 className="font-display text-[32px] md:text-[40px] lg:text-[44px] font-semibold leading-[1.10] tracking-[-0.020em] text-white">
                משרד מקומי בבת ים,
                <br />
                בליווי אישי.
              </h2>
              <p className="text-[17px] leading-[1.70] text-white/85 mt-6 max-w-[480px]">
                המשרד נוסד בידי דוב ואביבה שׂרף, וממשיך כיום עם הדור השני וצעירי הדור
                השלישי. אותה כתובת, אותם ערכים — יחס אישי, זמינות, ושקיפות מלאה.
              </p>
              <a
                href="#contact"
                className={`group inline-flex items-center gap-2 text-[14px] font-medium text-brand-light hover:text-white transition-colors duration-150 mt-8 rounded-sm ${focusRingDark}`}
              >
                קראו על המשרד
                <ArrowLeft
                  size={16}
                  strokeWidth={2}
                  aria-hidden="true"
                  className="transition-transform duration-150 group-hover:-translate-x-0.5"
                />
              </a>
            </div>

            {/* KPIs */}
            <div className="grid grid-cols-2 gap-4 md:gap-5">
              {KPIS.map((kpi) => (
                <div
                  key={kpi.label}
                  className="rounded-floater p-6 md:p-7 bg-white/[0.06] border border-white/[0.08]"
                >
                  <p
                    {...(kpi.ltr ? { dir: 'ltr' as const } : {})}
                    className="font-display text-[36px] font-semibold leading-none text-brand-light"
                  >
                    {kpi.number}
                  </p>
                  <p className="text-[14px] leading-[1.5] text-white/[0.78] mt-3">
                    {kpi.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhySharaf;
