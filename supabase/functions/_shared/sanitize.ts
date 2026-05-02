// Pure helpers shared by Edge Functions and tested via Vitest.
// Keep this file free of Deno-specific imports so it can run in Node (test) and Deno (runtime).

export function escapeHtml(value: unknown): string {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

// Israeli phone: at least 9 digits (with optional + and separators).
export function isValidPhone(phone: string): boolean {
  const digits = phone.replace(/[^\d]/g, '');
  return digits.length >= 9 && digits.length <= 15 && /^[\d+\-\s()]+$/.test(phone);
}

// Pragmatic email check — catches typos, not full RFC 5322.
export function isValidEmail(email: string): boolean {
  if (email.length === 0 || email.length > 254) return false;
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}
