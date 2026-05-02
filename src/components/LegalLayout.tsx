import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import Footer from '@/components/Footer';

type LegalLayoutProps = {
  title: string;
  lastUpdated: string;
  children: ReactNode;
};

const LegalLayout = ({ title, lastUpdated, children }: LegalLayoutProps) => {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <header className="bg-[#2A2826] text-white">
        <div className="container mx-auto px-4 py-4">
          <Link to="/" className="flex items-center gap-3 hover:opacity-90 transition-opacity">
            <img
              src="/logo.png"
              alt="לוגו משרד עו״ד שרף"
              width={56}
              height={56}
              className="w-12 h-12 md:w-14 md:h-14"
            />
            <div>
              <p className="text-xl md:text-2xl font-bold text-[#A68D4F]">משרד עו״ד שרף</p>
              <p className="text-xs md:text-sm text-gray-300">מקרקעין וצוואות</p>
            </div>
          </Link>
        </div>
      </header>

      <main className="flex-1 py-12">
        <div className="container mx-auto px-4 max-w-3xl">
          <Link
            to="/"
            className="inline-flex items-center gap-1 text-[#2A2826] hover:text-[#A68D4F] transition-colors mb-6"
          >
            <ArrowRight size={18} />
            <span>חזרה לדף הבית</span>
          </Link>

          <h1 className="text-3xl md:text-4xl font-bold text-[#2A2826] mb-2">{title}</h1>
          <p className="text-sm text-gray-500 mb-8">עודכן לאחרונה: {lastUpdated}</p>

          <article className="prose prose-slate max-w-none text-right [&_h2]:text-[#2A2826] [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:mt-8 [&_h2]:mb-3 [&_h3]:text-[#2A2826] [&_h3]:text-xl [&_h3]:font-bold [&_h3]:mt-6 [&_h3]:mb-2 [&_p]:mb-4 [&_p]:leading-relaxed [&_ul]:list-disc [&_ul]:pr-6 [&_ul]:mb-4 [&_li]:mb-1 [&_a]:text-[#2A2826] [&_a]:underline hover:[&_a]:text-[#A68D4F]">
            {children}
          </article>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default LegalLayout;
