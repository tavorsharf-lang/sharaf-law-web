
import { MessageCircle } from 'lucide-react';

const WhatsAppFloat = () => {
  return (
    <a
      href="https://wa.me/970542028695?text=שלום,%20אני%20מעוניין%20בייעוץ%20משפטי"
      className="fixed bottom-6 left-6 bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg transition-all duration-300 hover:scale-110 z-50"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="פנה אלינו בווטסאפ"
    >
      <MessageCircle size={24} />
    </a>
  );
};

export default WhatsAppFloat;
