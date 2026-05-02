import { useEffect, useState } from 'react';
import { readConsent, type ConsentState } from '@/lib/consent';

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

const GA_ID = import.meta.env.VITE_GA_MEASUREMENT_ID as string | undefined;

const Analytics = () => {
  const [consent, setConsent] = useState<ConsentState>(() => readConsent());

  useEffect(() => {
    const onChange = (e: Event) => setConsent((e as CustomEvent<ConsentState>).detail);
    window.addEventListener('consent-change', onChange);
    return () => window.removeEventListener('consent-change', onChange);
  }, []);

  useEffect(() => {
    if (!GA_ID || consent !== 'granted') return;
    if (document.getElementById('ga-script')) return;

    const script = document.createElement('script');
    script.id = 'ga-script';
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
    document.head.appendChild(script);

    window.dataLayer = window.dataLayer || [];
    window.gtag = function gtag(...args: unknown[]) {
      window.dataLayer!.push(args);
    };
    window.gtag('js', new Date());
    window.gtag('config', GA_ID, { anonymize_ip: true });
  }, [consent]);

  return null;
};

export default Analytics;
