
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