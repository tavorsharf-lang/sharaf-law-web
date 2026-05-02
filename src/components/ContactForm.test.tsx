import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ContactForm from './ContactForm';

const invokeMock = vi.fn();

vi.mock('@/integrations/supabase/client', () => ({
  supabase: {
    functions: {
      invoke: (...args: unknown[]) => invokeMock(...args),
    },
  },
}));

const toastMock = vi.fn();
vi.mock('@/hooks/use-toast', () => ({
  toast: (...args: unknown[]) => toastMock(...args),
}));

describe('ContactForm', () => {
  beforeEach(() => {
    invokeMock.mockReset();
    toastMock.mockReset();
  });

  it('submits with name, phone, and selected services', async () => {
    invokeMock.mockResolvedValueOnce({ data: { success: true }, error: null });
    const user = userEvent.setup();
    render(<ContactForm />);

    await user.type(screen.getByLabelText(/שם מלא/), 'תבור שרף');
    await user.type(screen.getByLabelText(/מספר טלפון/), '0501234567');
    await user.click(screen.getByLabelText(/רכישת דירה מקבלן/));
    await user.click(screen.getByLabelText(/מיסוי מקרקעין/));
    await user.click(screen.getByRole('button', { name: /שלח בקשה לייעוץ חינם/ }));

    expect(invokeMock).toHaveBeenCalledWith('submit-contact', expect.objectContaining({
      body: expect.objectContaining({
        name: 'תבור שרף',
        phone: '0501234567',
        service: ['רכישת דירה מקבלן', 'מיסוי מקרקעין'],
      }),
    }));
  });

  it('renders success state after a successful submission', async () => {
    invokeMock.mockResolvedValueOnce({ data: { success: true }, error: null });
    const user = userEvent.setup();
    render(<ContactForm />);

    await user.type(screen.getByLabelText(/שם מלא/), 'דנה כהן');
    await user.type(screen.getByLabelText(/מספר טלפון/), '0501234567');
    await user.click(screen.getByRole('button', { name: /שלח בקשה לייעוץ חינם/ }));

    expect(await screen.findByText('תודה רבה!')).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: /שלח בקשה לייעוץ חינם/ })).not.toBeInTheDocument();
    expect(screen.getByRole('button', { name: /שליחת פנייה נוספת/ })).toBeInTheDocument();
  });

  it('blocks submission and shows phone error when phone is invalid', async () => {
    const user = userEvent.setup();
    render(<ContactForm />);

    await user.type(screen.getByLabelText(/שם מלא/), 'תבור');
    await user.type(screen.getByLabelText(/מספר טלפון/), '123');
    await user.click(screen.getByRole('button', { name: /שלח בקשה לייעוץ חינם/ }));

    expect(invokeMock).not.toHaveBeenCalled();
    expect(toastMock).toHaveBeenCalledWith(expect.objectContaining({
      title: 'מספר טלפון לא תקין',
      variant: 'destructive',
    }));
    expect(await screen.findByText(/מספר לא תקין/)).toBeInTheDocument();
  });

  it('shows the phone format hint by default', () => {
    render(<ContactForm />);
    expect(screen.getByText(/לדוגמה: 050-1234567/)).toBeInTheDocument();
  });

  it('marks the phone field as invalid (aria-invalid) on blur with bad input', async () => {
    const user = userEvent.setup();
    render(<ContactForm />);

    const phone = screen.getByLabelText(/מספר טלפון/);
    await user.type(phone, 'abc');
    await user.tab(); // blur

    expect(phone).toHaveAttribute('aria-invalid', 'true');
  });

  it('submits successfully without filling the optional email', async () => {
    invokeMock.mockResolvedValueOnce({ data: { success: true }, error: null });
    const user = userEvent.setup();
    render(<ContactForm />);

    await user.type(screen.getByLabelText(/שם מלא/), 'דנה');
    await user.type(screen.getByLabelText(/מספר טלפון/), '0501234567');
    await user.click(screen.getByRole('button', { name: /שלח בקשה לייעוץ חינם/ }));

    expect(invokeMock).toHaveBeenCalledWith('submit-contact', expect.objectContaining({
      body: expect.objectContaining({ email: '' }),
    }));
  });

  it('blocks submission when email is filled but invalid', async () => {
    const user = userEvent.setup();
    render(<ContactForm />);

    await user.type(screen.getByLabelText(/שם מלא/), 'דנה');
    await user.type(screen.getByLabelText(/מספר טלפון/), '0501234567');
    await user.type(screen.getByLabelText(/דוא״ל/), 'not-an-email');
    await user.click(screen.getByRole('button', { name: /שלח בקשה לייעוץ חינם/ }));

    expect(invokeMock).not.toHaveBeenCalled();
    expect(toastMock).toHaveBeenCalledWith(expect.objectContaining({
      title: 'כתובת דוא״ל לא תקינה',
      variant: 'destructive',
    }));
  });

  it('submits with a valid email', async () => {
    invokeMock.mockResolvedValueOnce({ data: { success: true }, error: null });
    const user = userEvent.setup();
    render(<ContactForm />);

    await user.type(screen.getByLabelText(/שם מלא/), 'דנה');
    await user.type(screen.getByLabelText(/מספר טלפון/), '0501234567');
    await user.type(screen.getByLabelText(/דוא״ל/), 'dana@example.com');
    await user.click(screen.getByRole('button', { name: /שלח בקשה לייעוץ חינם/ }));

    expect(invokeMock).toHaveBeenCalledWith('submit-contact', expect.objectContaining({
      body: expect.objectContaining({ email: 'dana@example.com' }),
    }));
  });

  it('renders a hidden honeypot field', () => {
    render(<ContactForm />);
    const honeypot = document.querySelector('input[name="website"]') as HTMLInputElement;
    expect(honeypot).toBeTruthy();
    expect(honeypot.tabIndex).toBe(-1);
    expect(honeypot.autocomplete).toBe('off');
  });
});
