// Single source of truth for office contact details.
// Update values here — every component reads from this module.

export const CONTACT = {
  phones: [
    { display: '03-5073749', tel: '035073749' },
    { display: '03-6596922', tel: '036596922' },
  ],
  fax: { display: '03-6591399' },
  whatsapp: {
    display: '054-202-8695',
    number: '972542028695',
  },
  email: 'sharflaw@bezeqint.net',
  address: {
    street: 'ירושלים 28',
    city: 'בת ים',
    postalCode: '5938302',
  },
  hours: {
    weekdays: { label: 'ראשון - חמישי', time: '9:00 - 18:00' },
    friday: { label: 'שישי', time: '9:00 - 13:00' },
    emergency: 'במקרי חירום - זמינים 24/7',
  },
} as const;

export const whatsappUrl = (text?: string): string => {
  const base = `https://wa.me/${CONTACT.whatsapp.number}`;
  return text ? `${base}?text=${encodeURIComponent(text)}` : base;
};

export const telHref = (tel: string): string => `tel:${tel}`;

export const mailtoHref = (email: string = CONTACT.email): string => `mailto:${email}`;
