// Mirrors supabase/functions/_shared/sanitize.ts — keep in sync.
// Israeli phone: at least 9 digits (with optional + and separators).

export function isValidPhone(phone: string): boolean {
  const digits = phone.replace(/[^\d]/g, '');
  return digits.length >= 9 && digits.length <= 15 && /^[\d+\-\s()]+$/.test(phone);
}

// Pragmatic email check — catches typos, not full RFC 5322. Good enough for a contact form.
export function isValidEmail(email: string): boolean {
  if (email.length === 0 || email.length > 254) return false;
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}
