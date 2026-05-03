import { ArrowLeft } from 'lucide-react';

type Chapter = {
  number: string;
  title: string;
  body: string;
  href: string;
};

const CHAPTERS: Chapter[] = [
  {
    number: 'פרק 01',
    title: '5 שלבי רכישת דירה',
    body: 'מבדיקה ראשונית של הנכס ועד חתימה על החוזה הסופי — כל שלב, מה לבדוק, ולמה זה חשוב.',
    href: '#contact',
  },
  {
    number: 'פרק 02',
    title: 'מה לבדוק לפני חתימה',
    body: 'בעלות, עיקולים, תב״ע, היתרי בנייה, עלויות נלוות — רשימת הבדיקות שאסור לדלג עליהן לפני שחותמים.',
    href: '#contact',
  },
  {
    number: 'פרק 03',
    title: 'מה עולה לקנות דירה',
    body: 'מס רכישה, שכר טרחת עו״ד, דמי תיווך, מדידות — מבט כן על העלויות הנלוות שמעבר למחיר הדירה.',
    href: '#contact',
  },
];

const focusRing =
  'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand';

const BuyingGuide = () => {
  return (
    <section
      id="guide"
      className="bg-bg-alt px-4 md:px-10 lg:px-16 py-[120px]"
    >
      <div className="max-w-[1280px] mx-auto">
        <header className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16">
          <div>
            <p className="text-eyebrow text-brand mb-4">מאמרים ומשאבים</p>
            <h2 className="font-display text-[36px] md:text-[44px] lg:text-[48px] font-semibold leading-[1.10] tracking-[-0.020em] text-ink">
              המדריך לרוכשי דירה.
            </h2>
          </div>
          <a
            href="#contact"
            className={`group inline-flex items-center gap-2 text-[14px] font-medium text-brand hover:text-brand-deep transition-colors duration-150 self-start md:self-end rounded-sm ${focusRing}`}
          >
            קריאת המדריך המלא
            <ArrowLeft
              size={16}
              strokeWidth={2}
              aria-hidden="true"
              className="transition-transform duration-150 group-hover:-translate-x-0.5"
            />
          </a>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-7">
          {CHAPTERS.map((chapter) => (
            <article
              key={chapter.number}
              className="bg-white rounded-card pt-9 px-8 pb-8 flex flex-col border-t-[3px] border-brand"
            >
              <p className="font-display text-[12px] font-semibold tracking-[0.12em] text-brand mb-4">
                {chapter.number}
              </p>
              <h3 className="font-display text-[26px] font-semibold leading-tight tracking-[-0.010em] text-ink">
                {chapter.title}
              </h3>
              <p className="text-[15px] leading-[1.7] text-ink-soft mt-3.5 flex-1">
                {chapter.body}
              </p>
              <a
                href={chapter.href}
                className={`group inline-flex items-center gap-2 text-[14px] font-medium text-brand hover:text-brand-deep transition-colors duration-150 mt-6 self-start rounded-sm ${focusRing}`}
              >
                קריאת הפרק
                <ArrowLeft
                  size={16}
                  strokeWidth={2}
                  aria-hidden="true"
                  className="transition-transform duration-150 group-hover:-translate-x-0.5"
                />
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BuyingGuide;
