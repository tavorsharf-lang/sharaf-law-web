
import { Star, Quote } from 'lucide-react';

const Reviews = () => {
  const reviews = [
    {
      name: "משפחת כהן",
      text: "משרד מקצועי ואמין. ליוו אותנו לאורך כל תהליך רכישת הדירה הראשונה שלנו בסבלנות ומקצועיות. ממליצים בחום!",
      rating: 5,
      service: "רכישת דירה ראשונה"
    },
    {
      name: "רונית ל.",
      text: "שירות מעולה! עו״ד שרף דאג לכל הפרטים הקטנים וחסך לנו הרבה כאב ראש. התהליך היה חלק ומקצועי מהתחלה ועד הסוף.",
      rating: 5,
      service: "מכירת דירה"
    },
    {
      name: "דני ומיכל א.",
      text: "משרד משפחתי עם יחס חם ואישי. הרגשנו שאנחנו בידיים טובות לאורך כל התהליך. מומלץ בחום!",
      rating: 5,
      service: "צוואה וירושה"
    },
    {
      name: "אבי מ.",
      text: "מקצועיות ברמה הגבוהה ביותר. עזרו לנו בעסקה מורכבת וטיפלו בכל עד הפרט הקטן. שווה כל שקל!",
      rating: 5,
      service: "רכישת דירה מקבלן"
    }
  ];

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        size={20}
        className={index < rating ? "text-[#A68D4F] fill-[#A68D4F]" : "text-gray-300"}
      />
    ));
  };

  return (
    <section id="reviews" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-[#2A2826] mb-4">
            מה אומרים הלקוחות שלנו
          </h2>
          <p className="text-xl text-gray-600">
            ביקורות אמיתיות מלקוחותינו המרוצים
          </p>
          <p className="text-xs text-gray-500 mt-3">* הביקורות המוצגות הן לדוגמה</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {reviews.map((review, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-lg p-8 relative hover:shadow-xl transition-shadow duration-300"
            >
              <div className="absolute top-4 right-4">
                <Quote size={32} className="text-[#A68D4F] opacity-20" />
              </div>
              
              <div className="flex items-center mb-4">
                {renderStars(review.rating)}
              </div>
              
              <p className="text-gray-700 text-lg leading-relaxed mb-6 italic">
                "{review.text}"
              </p>
              
              <div className="border-t pt-4">
                <div className="font-bold text-[#2A2826] text-lg">
                  {review.name}
                </div>
                <div className="text-[#A68D4F] text-sm font-medium">
                  {review.service}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <div className="bg-[#2A2826] text-white rounded-lg p-8 max-w-4xl mx-auto">
            <h3 className="text-3xl font-bold mb-4">
              <span className="text-[#A68D4F]">98%</span> שביעות רצון לקוחות
            </h3>
            <p className="text-xl mb-6">
              מאות לקוחות מרוצים סומכים עלינו בעסקאות הנדל״ן החשובות ביותר שלהם
            </p>
            <div className="flex justify-center">
              <a
                href="#contact"
                className="bg-[#A68D4F] hover:bg-[#8A7340] text-[#2A2826] px-8 py-4 rounded-lg font-bold text-lg transition-colors"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                הצטרפו ללקוחות המרוצים שלנו
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Reviews;
