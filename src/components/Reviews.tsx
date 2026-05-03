type Quote = {
  text: string;
  name: string;
  service: string;
};

const QUOTES: Quote[] = [
  {
    text: 'משרד מקצועי ואמין. ליוו אותנו לאורך כל תהליך רכישת הדירה הראשונה שלנו בסבלנות ובמקצועיות. ממליצים בחום.',
    name: 'משפחת כהן',
    service: 'רכישת דירה ראשונה',
  },
  {
    text: 'שירות מעולה. דאגו לכל הפרטים הקטנים וחסכו לנו הרבה כאב ראש. התהליך היה חלק ומקצועי מההתחלה ועד הסוף.',
    name: 'רונית ל.',
    service: 'מכירת דירה',
  },
  {
    text: 'משרד משפחתי עם יחס חם ואישי. הרגשנו שאנחנו בידיים טובות לאורך כל התהליך.',
    name: 'דני ומיכל א.',
    service: 'צוואה וירושה',
  },
];

const Reviews = () => {
  return (
    <section
      id="reviews"
      className="bg-brand-soft px-4 md:px-10 lg:px-16 py-[120px]"
    >
      <div className="max-w-[1280px] mx-auto">
        <header className="mb-16">
          <p className="text-eyebrow text-brand mb-4">לקוחות מספרים</p>
          <h2 className="font-display text-[36px] md:text-[44px] lg:text-[48px] font-semibold leading-[1.10] tracking-[-0.020em] text-ink">
            המלצות מלקוחותינו.
          </h2>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-7">
          {QUOTES.map((q) => (
            <figure
              key={q.name}
              className="bg-white rounded-m p-9 pt-10 pb-8 flex flex-col"
            >
              <span
                aria-hidden="true"
                className="font-display text-[56px] font-semibold leading-[0.5] text-brand mb-2 self-start"
              >
                ״
              </span>
              <blockquote className="font-display text-[20px] font-medium leading-[1.5] tracking-[-0.005em] text-ink flex-1">
                {q.text}
              </blockquote>
              <figcaption className="mt-7 pt-5 border-t border-rule">
                <p className="text-[14px] font-semibold text-ink">{q.name}</p>
                <p className="text-[12px] text-ink-mute mt-1">{q.service}</p>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Reviews;
