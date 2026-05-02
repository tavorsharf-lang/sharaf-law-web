import { describe, it, expect } from 'vitest';
import { escapeHtml, isValidEmail, isValidPhone } from './sanitize';

describe('escapeHtml', () => {
  it('escapes &, <, >, ", and \'', () => {
    expect(escapeHtml(`<script>alert("x")</script>`)).toBe(
      '&lt;script&gt;alert(&quot;x&quot;)&lt;/script&gt;'
    );
    expect(escapeHtml(`O'Brien`)).toBe('O&#39;Brien');
    expect(escapeHtml('Tom & Jerry')).toBe('Tom &amp; Jerry');
  });

  it('escapes & first to avoid double-escaping', () => {
    expect(escapeHtml('&lt;')).toBe('&amp;lt;');
  });

  it('coerces null/undefined/numbers safely', () => {
    expect(escapeHtml(null)).toBe('');
    expect(escapeHtml(undefined)).toBe('');
    expect(escapeHtml(42)).toBe('42');
  });

  it('passes Hebrew text through unchanged', () => {
    expect(escapeHtml('שלום עולם')).toBe('שלום עולם');
  });
});

describe('isValidPhone', () => {
  it('accepts Israeli mobile in common formats', () => {
    expect(isValidPhone('0501234567')).toBe(true);
    expect(isValidPhone('050-1234567')).toBe(true);
    expect(isValidPhone('+972-50-123-4567')).toBe(true);
    expect(isValidPhone('+972 50 123 4567')).toBe(true);
  });

  it('accepts Israeli landline', () => {
    expect(isValidPhone('03-5073749')).toBe(true);
    expect(isValidPhone('035073749')).toBe(true);
  });

  it('rejects too-short numbers', () => {
    expect(isValidPhone('1234')).toBe(false);
    expect(isValidPhone('050')).toBe(false);
  });

  it('rejects too-long numbers', () => {
    expect(isValidPhone('1234567890123456')).toBe(false);
  });

  it('rejects letters and SQL/HTML attempts', () => {
    expect(isValidPhone('abcdefghi')).toBe(false);
    expect(isValidPhone(`<script>alert(1)</script>`)).toBe(false);
    expect(isValidPhone(`'; DROP TABLE--`)).toBe(false);
  });
});

describe('isValidEmail', () => {
  it('accepts common formats', () => {
    expect(isValidEmail('foo@bar.com')).toBe(true);
    expect(isValidEmail('first.last@sub.example.co.il')).toBe(true);
    expect(isValidEmail('a+b@c.io')).toBe(true);
  });

  it('rejects empty / malformed / no-domain', () => {
    expect(isValidEmail('')).toBe(false);
    expect(isValidEmail('foo')).toBe(false);
    expect(isValidEmail('foo@')).toBe(false);
    expect(isValidEmail('foo@bar')).toBe(false);
    expect(isValidEmail('@bar.com')).toBe(false);
  });

  it('rejects whitespace inside the address', () => {
    expect(isValidEmail('foo bar@baz.com')).toBe(false);
  });
});
