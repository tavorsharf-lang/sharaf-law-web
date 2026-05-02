
import { Home, FileText, Calculator, Building, Key, Scale } from 'lucide-react';
import { CONTACT, telHref } from '@/lib/contact';

const Services = () => {
  const services = [
    {
      icon: Home,
      title: "רכישת דירה מיד שנייה",
      description: "ליווי מלא בתהליך רכישת דירה מיד שנייה, כולל בדיקת מסמכים, משא ומתן וחתימה על החוזה",
      features: ["בדיקת תב״ע ורישום במח״ל", "ליווי משפטי מלא", "בדיקת משכנתאות וחובות"]
    },
    {
      icon: Building,
      title: "רכישת דירה מקבלן",
      description: "ייעוץ וליווי בקניית דירה מקבלן, בדיקת חוזים והבטחת זכויותיכם",
      features: ["בדיקת חוזה קבלן", "ליווי עד מסירת דירה", "הבטחת זכויות הרוכש"]
    },
    {
      icon: Key,
      title: "מכירת דירה",
      description: "ליווי מקצועי בתהליך מכירת הנכס מהערכת שווי ועד לחתימה סופית",
      features: ["הכנת חוזה מכר", "ליווי עד חתימה", "ייצוג משפטי מלא"]
    },
    {
      icon: FileText,
      title: "צוואות וירושות",
      description: "עריכת צוואות, טיפול בהליכי ירושה וחלוקת עיזבונות",
      features: ["עריכת צוואות", "הליכי ירושה", "חלוקת עיזבונות"]
    },
    {
      icon: Calculator,
      title: "מיסוי מקרקעין",
      description: "ייעוץ מיסויי מקיף בעסקאות נדל״ן וטיפול במס רכישה ומס שבח",
      features: ["חישוב מס רכישה", "מס שבח", "ייעוץ מיסויי"]
    },
    {
      icon: Scale,
      title: "ליווי משפטי כללי",
      description: "ליווי משפטי מקיף בכל הנושאים הקשורים לנדל״ן ועסקאות מקרקעין",
      features: ["ייעוץ משפטי", "ייצוג בערכאות", "הכנת מסמכים"]
    }
  ];

  return (
    <section id="services" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-[#2A2826] mb-4">
            השירותים שלנו
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            אנו מתמחים במגוון רחב של שירותים משפטיים בתחום המקרקעין והצוואות, 
            ומספקים ליווי מקצועי ואישי לכל לקוח
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-gray-50 rounded-lg p-8 hover:shadow-lg transition-all duration-300 hover:bg-white border border-gray-100"
            >
              <div className="w-16 h-16 bg-[#2A2826] rounded-lg flex items-center justify-center mb-6">
                <service.icon size={32} className="text-[#A68D4F]" />
              </div>
              
              <h3 className="text-xl font-bold text-[#2A2826] mb-4">
                {service.title}
              </h3>
              
              <p className="text-gray-600 mb-6 leading-relaxed">
                {service.description}
              </p>
              
              <ul className="space-y-2">
                {service.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center text-sm text-gray-600">
                    <div className="w-2 h-2 bg-[#A68D4F] rounded-full ml-3"></div>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <div className="bg-[#A68D4F] text-[#2A2826] rounded-lg p-8">
            <h3 className="text-2xl font-bold mb-4">
              זקוקים לייעוץ משפטי?
            </h3>
            <p className="text-lg mb-6">
              פנו אלינו לייעוץ ראשוני חינם ונשמח לעזור לכם
            </p>
            <div className="flex flex-col md:flex-row gap-4 justify-center">
              {CONTACT.phones.map((p) => (
                <a
                  key={p.tel}
                  href={telHref(p.tel)}
                  className="bg-[#2A2826] hover:bg-[#404040] text-white px-8 py-3 rounded-lg font-bold transition-colors"
                >
                  {p.display}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
