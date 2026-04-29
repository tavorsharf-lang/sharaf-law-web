
import { Phone, MapPin, Clock, Mail } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-[#1a365d] text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo & Description */}
          <div>
            <h3 className="text-2xl font-bold text-[#d4af37] mb-4">
              משרד עו״ד שרף
            </h3>
            <p className="text-gray-300 leading-relaxed mb-4">
              3 דורות של מסורת משפטית במקרקעין וצוואות. 
              ליווי אישי ומקצועי לכל משפחה.
            </p>
            <div className="flex space-x-4 space-x-reverse">
              <a
                href="tel:035073749"
                className="bg-[#d4af37] hover:bg-[#b8941f] text-[#1a365d] p-2 rounded-full transition-colors"
              >
                <Phone size={20} />
              </a>
              <a
                href="https://wa.me/972505073749"
                className="bg-green-500 hover:bg-green-600 text-white p-2 rounded-full transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Phone size={20} />
              </a>
            </div>
          </div>

          {/* Services */}