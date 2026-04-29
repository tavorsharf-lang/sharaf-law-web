
import { Shield, Users, Clock, DollarSign, CheckCircle } from 'lucide-react';

const WhyChooseUs = () => {
  const reasons = [
    {
      icon: Users,
      title: "3 דורות של ניסיון וידע משפטי",
      description: "משרד משפחתי עם מסורת של מעל 40 שנה בתחום המקרקעין והצוואות"
    },
    {
      icon: Shield,
      title: "ליווי אישי וצמוד לאורך כל התהליך",
      description: "מהרגע הראשון ועד חתימה על המסמכים - אנחנו איתכם בכל שלב"
    },
    {
      icon: CheckCircle,
      title: "מאות עסקאות מוצלחות",
      description: "ניסיון עשיר ומוכח בהצלחת עסקאות מורכבות ומגוונות"
    },
    {
      icon: Clock,
      title: "זמינות מלאה ומענה מהיר",
      description: "מענה מיידי לפניותיכם ויעילות מקסימלית בטיפול"
    },
    {
      icon: DollarSign,
      title: "שקיפות מלאה בתהליך ובעלויות",
      description: "ללא הפתעות - כל העלויות ברורות מראש"
    }
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-[#1a365d] mb-4">
            למה לבחור במשרד עו״ד שרף?
          </h2>
          <p className="text-xl text-gray-600">
            המשרד המוביל בתחום המקרקעין והצוואות בבת ים והסביבה
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reasons.map((reason, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-lg p-8 text-center hover:shadow-xl transition-shadow duration-300"
            >
              <div className="w-16 h-16 bg-[#d4af37] rounded-full flex items-center justify-center mx-auto mb-6">
                <reason.icon size={32} className="text-[#1a365d]" />
              </div>
              <h3 className="text-xl font-bold text-[#1a365d] mb-4">
                {reason.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {reason.description}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-16 bg-[#1a365d] rounded-lg p-8 text-center text-white">
          <h3 className="text-2xl font-bold mb-4 text-[#d4af37]">
            מוכנים להתחיל?
          </h3>
          <p className="text-lg mb-6">
            צרו קשר עוד היום לייעוץ ראשוני חינם ובלי התחייבות
          </p>
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <a
              href="tel:035073749"
              className="bg-[#d4af37] hover:bg-[#b8941f] text-[#1a365d] px-8 py-3 rounded-lg font-bold transition-colors"
            >
              התקשרו: 03-5073749
            </a>
            <a
              href="tel:036591399"
              className="bg-[#d4af37] hover:bg-[#b8941f] text-[#1a365d] px-8 py-3 rounded-lg font-bold transition-colors"
            >
              התקשרו: 03-6591399
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
