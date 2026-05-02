import { describe, it, expect } from 'vitest';
import { isValidEmail, isValidPhone } from './validation';

describe('isValidPhone (frontend)', () => {
  it('accepts valid Israeli formats', () => {
    expect(isValidPhone('0501234567')).toBe(true);
    expect(isValidPhone('050-1234567')).toBe(true);
    expect(isValidPhone('03-5073749')).toBe(true);
    expect(isValidPhone('+972-50-123-4567')).toBe(true);
  });

  it('rejects too short / too long / non-phone garbage', () => {
    expect(isValidPhone('123')).toBe(false);
    expect(isValidPhone('1234567890123456')).toBe(false);
    expect(isValidPhone('hello')).toBe(false);
    expect(isValidPhone(`<script>`)).toBe(false);
  });
});

describe('isValidEmail (frontend)', () => {
  it('accepts common email formats', () => {
    expect(isValidEmail('foo@bar.com')).toBe(true);
    expect(isValidEmail('first.last@sub.example.co.il')).toBe(true);
    expect(isValidEmail('a+b@c.io')).toBe(true);
  });

  it('rejects malformed emails', () => {
    expect(isValidEmail('')).toBe(false);
    expect(isValidEmail('foo')).toBe(false);
    expect(isValidEmail('foo@')).toBe(false);
    expect(isValidEmail('foo@bar')).toBe(false);
    expect(isValidEmail('@bar.com')).toBe(false);
    expect(isValidEmail('foo bar@baz.com')).toBe(false);
  });

  it('rejects emails over 254 characters', () => {
    const longLocal = 'a'.repeat(250);
    expect(isValidEmail(`${longLocal}@x.com`)).toBe(false);
  });
});
