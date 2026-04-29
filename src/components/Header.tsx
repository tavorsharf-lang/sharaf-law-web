
import { Phone, MessageCircle } from 'lucide-react';
import { useState } from 'react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  return (
    <header className="sticky top-0 bg-[#1a365d] text-white z-50">
      {/* Top Bar */}
      <div className="bg-[#d4af37] text-[#1a365d] py-2">
        <div className="container mx-auto px-4 flex justify-between items-center text-sm font-medium">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-2">
              <Phone size={16} />
              03-6596922 | 03-5073749
            </span>
          </div>
          <div className="hidden md:block">
            <span>ירושלים 28 א, בת ים</span>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div className="flex items-center">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-[#d4af37]">
                משרד עו״ד שרף
              </h1>
              <p className="text-sm md:text-base text-gray-300">
                מקרקעין וצוואות
              </p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8 space-x-reverse">
            <a
              href="#home"
              onClick={() => scrollToSection('home')}
              className="hover:text-[#d4af37] transition-colors"
            >
              ראשי
            </a>
            <a
              href="#about"
              onClick={() => scrollToSection('about')}
              className="hover:text-[#d4af37] transition-colors"
            >
              אודות
            </a>
            <a
              href="#services"
              onClick={() => scrollToSection('services')}
              className="hover:text-[#d4af37] transition-colors"
            >
              שירותים
            </a>
            <a
              href="#articles"
              onClick={() => scrollToSection('articles')}
              className="hover:text-[#d4af37] transition-colors"
            >
              מאמרים
            </a>
            <a
              href="#reviews"
              onClick={() => scrollToSection('reviews')}
              className="hover:text-[#d4af37] transition-colors"
            >
              ביקורות
            </a>
            <a
              href="#contact"
              onClick={() => scrollToSection('contact')}
              className="hover:text-[#d4af37] transition-colors"
            >
              צור קשר
            </a>
          </nav>

          {/* WhatsApp & Menu */}
          <div className="flex items-center gap-4">
            <a
              href="https://wa.me/970542028695"
              className="bg-green-500 hover:bg-green-600 text-white p-2 rounded-full transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              <MessageCircle size={20} />
            </a>
            
            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden flex flex-col gap-1"
            >
              <span className="w-6 h-0.5 bg-white"></span>
              <span className="w-6 h-0.5 bg-white"></span>
              <span className="w-6 h-0.5 bg-white"></span>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="lg:hidden mt-4 bg-[#1a365d] rounded-lg p-4">
            <div className="flex flex-col space-y-3">
              <a
                href="#home"
                onClick={() => scrollToSection('home')}
                className="text-right hover:text-[#d4af37] transition-colors"
              >
                ראשי
              </a>
              <a
                href="#about"
                onClick={() => scrollToSection('about')}
                className="text-right hover:text-[#d4af37] transition-colors"
              >
                אודות
              </a>
              <a
                href="#services"
                onClick={() => scrollToSection('services')}
                className="text-right hover:text-[#d4af37] transition-colors"
              >
                שירותים
              </a>
              <a
                href="#articles"
                onClick={() => scrollToSection('articles')}
                className="text-right hover:text-[#d4af37] transition-colors"
              >
                מאמרים
              </a>
              <a
                href="#reviews"
                onClick={() => scrollToSection('reviews')}
                className="text-right hover:text-[#d4af37] transition-colors"
              >
                ביקורות
              </a>
              <a
                href="#contact"
                onClick={() => scrollToSection('contact')}
                className="text-right hover:text-[#d4af37] transition-colors"
              >
                צור קשר
              </a>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
