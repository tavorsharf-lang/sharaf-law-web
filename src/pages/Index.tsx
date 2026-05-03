import Header from '@/components/Header';
import Hero from '@/components/Hero';
import PracticeAreas from '@/components/PracticeAreas';
import WhySharaf from '@/components/WhySharaf';
import BuyingGuide from '@/components/BuyingGuide';
import Reviews from '@/components/Reviews';
import ContactForm from '@/components/ContactForm';
import Footer from '@/components/Footer';
import WhatsAppFloat from '@/components/WhatsAppFloat';

const Index = () => {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        <Hero />
        <PracticeAreas />
        <WhySharaf />
        <BuyingGuide />
        <Reviews />
        <ContactForm />
      </main>
      <Footer />
      <WhatsAppFloat />
    </div>
  );
};

export default Index;
