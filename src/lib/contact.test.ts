import { describe, it, expect } from 'vitest';
import { CONTACT, whatsappUrl, telHref, mailtoHref } from './contact';

describe('contact helpers', () => {
  describe('whatsappUrl', () => {
    it('returns base URL when no text is provided', () => {
      expect(whatsappUrl()).toBe(`https://wa.me/${CONTACT.whatsapp.number}`);
    });

    it('appends URL-encoded text query', () => {
      const url = whatsappUrl('שלום, אני מעוניין בייעוץ');
      expect(url).toContain(`https://wa.me/${CONTACT.whatsapp.number}`);
      expect(url).toContain('?text=');
      expect(url).toContain('%D7%A9%D7%9C%D7%95%D7%9D');
    });
  });

  describe('telHref', () => {
    it('prefixes a tel scheme', () => {
      expect(telHref('035073749')).toBe('tel:035073749');
    });
  });

  describe('mailtoHref', () => {
    it('defaults to the office email', () => {
      expect(mailtoHref()).toBe(`mailto:${CONTACT.email}`);
    });

    it('accepts a custom address', () => {
      expect(mailtoHref('foo@bar.com')).toBe('mailto:foo@bar.com');
    });
  });

  describe('CONTACT data integrity', () => {
    it('has the Israel WhatsApp country code', () => {
      expect(CONTACT.whatsapp.number.startsWith('972')).toBe(true);
    });

    it('has phones in synced display/tel format', () => {
      for (const p of CONTACT.phones) {
        expect(p.tel).toBe(p.display.replace(/-/g, ''));
      }
    });

    it('has a non-empty email', () => {
      expect(CONTACT.email).toMatch(/@/);
    });
  });
});
