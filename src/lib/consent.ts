// Tracks user consent for non-essential cookies (currently: GA only).
// Decision is persisted in localStorage. No server-side state.

const STORAGE_KEY = 'sharflaw.consent.v1';

export type ConsentState = 'granted' | 'denied' | 'unknown';

export function readConsent(): ConsentState {
  if (typeof window === 'undefined') return 'unknown';
  const v = window.localStorage.getItem(STORAGE_KEY);
  return v === 'granted' || v === 'denied' ? v : 'unknown';
}

export function writeConsent(state: Exclude<ConsentState, 'unknown'>): void {
  if (typeof window === 'undefined') return;
  window.localStorage.setItem(STORAGE_KEY, state);
  window.dispatchEvent(new CustomEvent('consent-change', { detail: state }));
}
