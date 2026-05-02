import { describe, it, expect, beforeEach } from 'vitest';
import { readConsent, writeConsent } from './consent';

const KEY = 'sharflaw.consent.v1';

describe('consent storage', () => {
  beforeEach(() => {
    window.localStorage.removeItem(KEY);
  });

  it('returns "unknown" when nothing is stored', () => {
    expect(readConsent()).toBe('unknown');
  });

  it('round-trips a granted decision', () => {
    writeConsent('granted');
    expect(readConsent()).toBe('granted');
  });

  it('round-trips a denied decision', () => {
    writeConsent('denied');
    expect(readConsent()).toBe('denied');
  });

  it('treats unrecognized values as unknown', () => {
    window.localStorage.setItem(KEY, 'maybe');
    expect(readConsent()).toBe('unknown');
  });

  it('dispatches a consent-change event when written', () => {
    let received: string | null = null;
    const handler = (e: Event) => {
      received = (e as CustomEvent<string>).detail;
    };
    window.addEventListener('consent-change', handler);
    writeConsent('granted');
    window.removeEventListener('consent-change', handler);
    expect(received).toBe('granted');
  });
});
