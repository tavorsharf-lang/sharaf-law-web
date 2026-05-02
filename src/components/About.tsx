
import { Users, Award, Clock, Heart } from 'lucide-react';

const About = () => {
  return (
    <section id="about" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-[#2A2826] mb-4">
            אודות משרד עו״ד שרף
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            מסורת משפחתית של מעל 60 שנה בשירות הציבור והמשפט (מאז 1964)
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <h3 className="text-3xl font-bold text-[#2A2826] mb-6">
              3 דורות, מסורת אחת
            </h3>
            <div className="space-y-4 text-gray-700 leading-relaxed">
              <p>
                משרד עו״ד שרף נוסד על ידי <strong>דוב ואביבה שרף</strong> במטרה להעניק 
                שירות משפטי מקצועי ואישי בתחום המקרקעין והצוואות. מאז ההקמה, המשרד 
                צבר מוניטין של אמינות, מקצועיות וחמימות משפחתית.
              </p>
              <p>
                <strong>אריאל שרף</strong>, הדור השני, המשיך במסורת המשפחתית והרחיב 
                את פעילות המשרד. כיום, גם הדור הצעיר נכנס לעסק המשפחתי ומוסיף 
                גישות חדשניות תוך שמירה על הערכים המסורתיים.
              </p>
              <p>
                לאורך השנים ליוונו מאות משפחות בעסקאות הנדל״ן החשובות ביותר שלהן, 
                ועזרנו בטיפול בצוואות ובירושות במהלך הרגעים הקשים והעדינים ביותר.
              </p>
            </div>
          </div>

          <div className="bg-[#2A2826] text-white rounded-lg p-8">
            <h4 className="text-2xl font-bold text-[#A68D4F] mb-6 text-center">
              הערכים שלנו
            </h4>
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <Heart className="text-[#A68D4F] mt-1" size={24} />
                <div>
                  <h5 className="font-bold mb-2">יחס אישי וחם</h5>
                  <p className="text-gray-300 text-sm">
                    כל לקוח הוא חלק מהמשפחה שלנו
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <Award className="text-[#A68D4F] mt-1" size={24} />
                <div>
                  <h5 className="font-bold mb-2">מקצועיות ללא פשרות</h5>
                  <p className="text-gray-300 text-sm">
                    עדכניות מתמדת ומומחיות בתחום
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <Clock className="text-[#A68D4F] mt-1" size={24} />
                <div>
                  <h5 className="font-bold mb-2">זמינות ומהירות</h5>
                  <p className="text-gray-300 text-sm">
                    מענה מיידי ולליווי רציף
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <Users className="text-[#A68D4F] mt-1" size={24} />
                <div>
                  <h5 className="font-bold mb-2">מסורת משפחתית</h5>
                  <p className="text-gray-300 text-sm">
                    ניסיון של 3 דורות בשירותכם
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
          <div className="bg-gray-50 rounded-lg p-6">
            <div className="text-4xl font-bold text-[#A68D4F] mb-2">60+</div>
            <div className="text-gray-600">שנות ניסיון</div>
          </div>
          <div className="bg-gray-50 rounded-lg p-6">
            <div className="text-4xl font-bold text-[#A68D4F] mb-2">500+</div>
            <div className="text-gray-600">עסקאות מוצלחות</div>
          </div>
          <div className="bg-gray-50 rounded-lg p-6">
            <div className="text-4xl font-bold text-[#A68D4F] mb-2">98%</div>
            <div className="text-gray-600">שביעות רצון</div>
          </div>
          <div className="bg-gray-50 rounded-lg p-6">
            <div className="text-4xl font-bold text-[#A68D4F] mb-2">3</div>
            <div className="text-gray-600">דורות</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
