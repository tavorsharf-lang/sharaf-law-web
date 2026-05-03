import { ArrowLeft } from 'lucide-react';
import Photo from '@/components/ui/Photo';

type Practice = {
  tag: string;
  title: string;
  body: string;
  href: string;
};

const ITEMS: Practice[] = [
  {
    tag: '01 · נדל״ן',
    title: 'עסקאות נדל״ן',
    body: 'רכישה ומכירה של דירות יד שנייה ודירות מקבלן. בדיקות זכויות, חוזה, מיסוי, ורישום בטאבו — כל התהליך תחת קורת גג אחת.',
    href: '#contact',
  },
  {
    tag: '02 · צוואות',
    title: 'צוואות וירושות',
    body: 'עריכת צוואות, ליווי הליכי ירושה, צווי קיום צוואה וטיפול בעיזבונות. ברגישות שמתאימה לרגעים האלה.',
    href: '#contact',
  },
  {
    tag: '03 · מיסוי',
    title: 'מיסוי מקרקעין',
    body: 'ייעוץ ותכנון מס שבח ומס רכישה, פטורים והקלות, וייצוג מול רשויות המס.',
    href: '#contact',
  },
];

const focusRing =
  'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand';

const PracticeAreas = () => {
  return (
    <section
      id="practice"
      className="bg-bg-alt px-4 md:px-10 lg:px-16 py-[120px]"
    >
      <div className="max-w-[1280px] mx-auto">
        <header className="mb-16">
          <p className="text-eyebrow text-brand mb-4">תחומי התמחות</p>
          <h2 className="font-display text-[36px] md:text-[44px] lg:text-[48px] font-semibold leading-[1.10] tracking-[-0.020em] text-ink">
            שלוש זרועות פרקטיקה,
            <br />
            משרד אחד.
          </h2>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-7">
          {ITEMS.map((item) => (
            <article
              key={item.tag}
              className="bg-white rounded-card overflow-hidden flex flex-col"
            >
              <Photo aspectRatio="4/3" radius="none" />
              <div className="p-8 pb-9 flex flex-col flex-1">
                <p className="text-meta text-brand mb-3">{item.tag}</p>
                <h3 className="font-display text-[24px] font-semibold leading-[1.15] tracking-[-0.010em] text-ink">
                  {item.title}
                </h3>
                <p className="text-[15px] leading-[1.7] text-ink-soft mt-3.5 flex-1">
                  {item.body}
                </p>
                <a
                  href={item.href}
                  className={`group inline-flex items-center gap-2 text-[14px] font-medium text-brand hover:text-brand-deep transition-colors duration-150 mt-6 self-start rounded-sm ${focusRing}`}
                >
                  פרטים נוספים
                  <ArrowLeft
                    size={16}
                    strokeWidth={2}
                    aria-hidden="true"
                    className="transition-transform duration-150 group-hover:-translate-x-0.5"
                  />
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PracticeAreas;
