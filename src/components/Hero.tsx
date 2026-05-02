
import { Phone, MessageCircle } from 'lucide-react';
import { CONTACT, telHref, whatsappUrl } from '@/lib/contact';

const Hero = () => {
  return (
    <section id="home" className="bg-gradient-to-l from-[#2A2826] to-[#404040] text-white py-20 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 right-10 w-32 h-32 border border-[#A68D4F] rounded-full"></div>
        <div className="absolute bottom-20 left-10 w-24 h-24 border border-[#A68D4F] rounded-full"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            משרד עו״ד שרף
            <span className="block text-[#A68D4F] text-3xl md:text-5xl mt-2">
              3 דורות של מצוינות משפטית
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl mb-8 text-gray-200 leading-relaxed">
            ליווי משפטי אישי ומקצועי בעסקאות מקרקעין, צוואות ומיסוי
          </p>

          <div className="flex flex-col md:flex-row gap-4 justify-center items-center mb-12">
            <a
              href={telHref(CONTACT.phones[0].tel)}
              className="bg-[#A68D4F] hover:bg-[#8A7340] text-[#2A2826] px-8 py-4 rounded-lg font-bold text-lg transition-all transform hover:scale-105 flex items-center gap-2"
            >
              <Phone size={20} />
              לייעוץ ראשוני חינם - התקשרו עכשיו
            </a>

            <a
              href={whatsappUrl()}
              className="bg-green-500 hover:bg-green-600 text-white px-8 py-4 rounded-lg font-bold text-lg transition-all transform hover:scale-105 flex items-center gap-2"
              target="_blank"
              rel="noopener noreferrer"
            >
              <MessageCircle size={20} />
              שלח הודעה בווטסאפ
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
              <div className="text-3xl font-bold text-[#A68D4F] mb-2">3</div>
              <div className="text-sm text-gray-300">דורות של ניסיון</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
              <div className="text-3xl font-bold text-[#A68D4F] mb-2">500+</div>
              <div className="text-sm text-gray-300">עסקאות מוצלחות</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
              <div className="text-3xl font-bold text-[#A68D4F] mb-2">24/7</div>
              <div className="text-sm text-gray-300">זמינות ומענה</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
