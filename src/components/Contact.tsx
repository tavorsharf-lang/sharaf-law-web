import ContactForm from '@/components/ContactForm';

type Item = {
  label: string;
  value: string;
  caption?: string;
  ltr?: boolean;
};

const ITEMS: Item[] = [
  {
    label: 'טלפון',
    value: '03-5073749',
    caption: 'ראשון–חמישי 9:00–18:00',
    ltr: true,
  },
  {
    label: 'ווטסאפ',
    value: '054-2028695',
    caption: 'זמינות מהירה',
    ltr: true,
  },
  {
    label: 'כתובת',
    value: 'ירושלים 28א, בת ים',
  },
  {
    label: 'חירום',
    value: 'זמינים 24/7',
    caption: 'במקרים דחופים',
  },
];

const MapPlaceholder = () => (
  <div
    role="img"
    aria-label="מפה — ירושלים 28א, בת ים"
    className="relative w-full h-[280px] rounded-m bg-white/[0.06] border border-white/[0.12] overflow-hidden mt-8"
  >
    {/* Grid lines — 2 horizontal, 2 vertical, forming a faint street grid */}
    <div
      aria-hidden="true"
      className="absolute inset-0 pointer-events-none"
      style={{
        backgroundImage:
          'linear-gradient(to right, rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.06) 1px, transparent 1px)',
        backgroundSize: '33.333% 50%',
      }}
    />
    {/* Two perpendicular roads — slightly brighter */}
    <div
      aria-hidden="true"
      className="absolute top-1/2 inset-x-0 -translate-y-1/2 h-[3px] bg-white/[0.18]"
    />
    <div
      aria-hidden="true"
      className="absolute start-[42%] inset-y-0 w-[3px] bg-white/[0.18]"
    />

    {/* Pin */}
    <div
      aria-hidden="true"
      className="absolute top-1/2 start-[42%] -translate-x-1/2 -translate-y-[140%]"
    >
      {/* Drop pin: red dot with subtle ring */}
      <div className="relative">
        <div className="w-4 h-4 rounded-full bg-[#E55B4F] shadow-[0_0_0_4px_rgba(229,91,79,0.18)]" />
        <div className="absolute top-full start-1/2 -translate-x-1/2 w-0 h-0 border-x-4 border-x-transparent border-t-[6px] border-t-[#E55B4F]" />
      </div>
    </div>

    {/* Address pill near the pin */}
    <div className="absolute top-1/2 start-[42%] translate-x-3 translate-y-1.5 bg-white text-ink text-[12px] font-semibold px-3 py-1.5 rounded-pill shadow-floater whitespace-nowrap">
      ירושלים 28א
    </div>
  </div>
);

const Contact = () => {
  return (
    <section
      id="contact"
      className="bg-white px-4 md:px-10 lg:px-16 py-[120px]"
    >
      <div className="max-w-[1280px] mx-auto">
        <div className="bg-brand rounded-l lg:rounded-xl2 text-white px-6 py-12 md:px-12 md:py-14 lg:px-16 lg:py-[72px]">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
            {/* Left column: copy + items + map */}
            <div>
              <p className="text-eyebrow text-brand-light mb-4">יצירת קשר</p>
              <h2 className="font-display text-[40px] md:text-[48px] lg:text-[56px] font-semibold leading-[1.05] tracking-[-0.025em] text-white">
                בואו נדבר.
              </h2>
              <p className="text-[17px] leading-[1.7] text-white/85 mt-6 max-w-[480px]">
                שיחה קצרה ראשונה היא ללא התחייבות. נשמח להבין מה אתם צריכים, ולומר אם
                אנחנו האנשים הנכונים לעזור.
              </p>

              <dl className="grid grid-cols-2 gap-x-6 gap-y-7 mt-10">
                {ITEMS.map((item) => (
                  <div key={item.label}>
                    <dt className="text-[12px] font-semibold tracking-[0.06em] text-brand-light">
                      {item.label}
                    </dt>
                    <dd className="mt-1.5">
                      <span
                        {...(item.ltr ? { dir: 'ltr' as const } : {})}
                        className="font-display text-[17px] font-medium text-white block"
                      >
                        {item.value}
                      </span>
                      {item.caption && (
                        <span className="text-[12px] text-white/65 block mt-1">
                          {item.caption}
                        </span>
                      )}
                    </dd>
                  </div>
                ))}
              </dl>

              <MapPlaceholder />
            </div>

            {/* Right column: floating form card */}
            <div className="bg-white text-ink rounded-m shadow-form p-8 md:p-10">
              <ContactForm />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
