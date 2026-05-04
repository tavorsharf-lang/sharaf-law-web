import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from '@/components/ui/toaster';
import Index from './pages/Index';
import Analytics from './components/Analytics';
import CookieBanner from './components/CookieBanner';

const Privacy = lazy(() => import('./pages/Privacy'));
const Accessibility = lazy(() => import('./pages/Accessibility'));
const NotFound = lazy(() => import('./pages/NotFound'));
const PhotoTest = lazy(() => import('./pages/PhotoTest'));

const RouteFallback = () => (
  <div className="min-h-screen flex items-center justify-center">
    <p className="text-ink-mute" role="status" aria-live="polite">
      טוען...
    </p>
  </div>
);

const App = () => (
  <BrowserRouter>
    <Toaster />
    <Analytics />
    <Suspense fallback={<RouteFallback />}>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/accessibility" element={<Accessibility />} />
        <Route path="/photo-test" element={<PhotoTest />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
    <CookieBanner />
  </BrowserRouter>
);

export default App;
