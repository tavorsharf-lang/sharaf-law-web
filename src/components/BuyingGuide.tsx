
import { CheckCircle, AlertTriangle, DollarSign, FileText } from 'lucide-react';

const BuyingGuide = () => {
  const steps = [
    {
      title: "בדיקה ראשונית",
      description: "בדיקת המסמכים הבסיסיים של הנכס"
    },
    {
      title: "בדיקת זכויות במקרקעין",
      description: "וידוא בעלות ובדיקת עיקולים וחובות"
    },
    {
      title: "הכנת חוזה קדם מכר",
      description: "עריכת חוזה המגן על זכויותיכם"
    },
    {
      title: "בדיקות משפטיות מעמיקות",
      description: "בדיקת תב״ע, היתרי בנייה וועדים"
    },
    {
      title: "חתימה על החוזה הסופי",
      description: "ליווי בחתימה והעברת הכספים"
    }
  ];

  const tips = [
    "בדקו תמיד את תעודת הזהות של המוכר מול בעלות במקרקעין",
    "וודאו שאין עיקולים או חובות על הנכס",
    "בדקו את תב״ע המקומית ותוכניות פיתוח עתידיות",
    "שימו לב לעלויות נלוות: מס רכישה, שכ״ט, היטלים",
    "קבלו אישור עו״ד לחוזה לפני החתימה"
  ];

  const costs = [
    { item: "מס רכישה", percentage: "0.5%-10%" },
    { item: "שכר טרחת עו״ד", percentage: "1%-1.5%" },
    { item: "דמי תיווך", percentage: "2%" },
    { item: "מדידה ובדיקות", percentage: "0.2%" }
  ];

  return (
    <section id="articles" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-[#1a365d] mb-4">
            מדריך לרוכשי דירה
          </h2>
          <p className="text-xl text-gray-600">
            כל מה שחשוב לדעת לפני רכישת דירה
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Steps */}
          <div className="bg-white rounded-lg shadow-lg p-8">
            <div className="flex items-center mb-6">
              <CheckCircle className="text-[#d4af37] ml-3" size={32} />
              <h3 className="text-2xl font-bold text-[#1a365d]">
                שלבי רכישת הדירה
              </h3>
            </div>
            <div className="space-y-4">
              {steps.map((step, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-[#d4af37] text-[#1a365d] rounded-full flex items-center justify-center font-bold text-sm">
                    {index + 1}
                  </div>
                  <div>
                    <h4 className="font-bold text-[#1a365d] mb-1">
                      {step.title}
                    </h4>
                    <p className="text-gray-600 text-sm">
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Tips */}
          <div className="bg-white rounded-lg shadow-lg p-8">
            <div className="flex items-center mb-6">
              <AlertTriangle className="text-[#d4af37] ml-3" size={32} />
              <h3 className="text-2xl font-bold text-[#1a365d]">
                טיפים חשובים
              </h3>
            </div>
            <div className="space-y-4">
              {tips.map((tip, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-[#d4af37] rounded-full mt-2"></div>
                  <p className="text-gray-700 text-sm leading-relaxed">
                    {tip}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Costs */}
          <div className="bg-white rounded-lg shadow-lg p-8">
            <div className="flex items-center mb-6">
              <DollarSign className="text-[#d4af37] ml-3" size={32} />
              <h3 className="text-2xl font-bold text-[#1a365d]">
                עלויות נלוות
              </h3>
            </div>
            <div className="space-y-4">
              {costs.map((cost, index) => (
                <div key={index} className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="text-gray-700">{cost.item}</span>
                  <span className="font-bold text-[#1a365d]">{cost.percentage}</span>
                </div>
              ))}
            </div>
            <div className="mt-6 bg-[#d4af37] text-[#1a365d] rounded-lg p-4 text-center">
              <FileText size={24} className="mx-auto mb-2" />
              <p className="font-bold text-sm">
                התייעצו איתנו לחישוב מדויק של העלויות
              </p>
            </div>
          </div>
        </div>

        <div className="mt-16 text-center">
          <div className="bg-[#1a365d] text-white rounded-lg p-8 max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold mb-4 text-[#d4af37]">
              רוצים ליווי מקצועי בקניית הדירה?
            </h3>
            <p className="text-lg mb-6">
              הייעוץ הראשוני שלנו חינם ויכול לחסוך לכם הרבה כסף וכאב ראש
            </p>
            <a
              href="tel:036596922"
              className="bg-[#d4af37] hover:bg-[#b8941f] text-[#1a365d] px-8 py-4 rounded-lg font-bold text-lg transition-colors inline-block"
            >
              התקשרו עכשיו לייעוץ חינם
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BuyingGuide;
