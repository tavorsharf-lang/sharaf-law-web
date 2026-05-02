import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';

const NAV_ITEMS: { href: string; label: string }[] = [
  { href: '#about', label: 'המשרד' },
  { href: '#practice', label: 'תחומי התמחות' },
  { href: '#guide', label: 'המדריך' },
  { href: '#bat-yam', label: 'בת ים' },
];

const CTA_HREF = '#contact';

const focusRing =
  'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Lock body scroll while the mobile drawer is open.
  useEffect(() => {
    if (!isMenuOpen) return;
    const original = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = original;
    };
  }, [isMenuOpen]);

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <header
      role="banner"
      className="sticky top-0 z-30 bg-white/[0.94] backdrop-blur-md border-b border-rule-soft"
    >
      <div className="max-w-[1280px] mx-auto px-4 md:px-10 lg:px-16 h-[88px] flex items-center justify-between">
        {/* Brand mark */}
        <a
          href="/"
          className={`flex items-center gap-3 rounded-sm ${focusRing}`}
          aria-label="משרד עו״ד שרף — דף הבית"
        >
          <img
            src="/logo.png"
            alt="משרד עו״ד שרף"
            width={64}
            height={64}
            className="h-12 w-12 md:h-16 md:w-16 object-contain rounded"
          />
          <span className="hidden md:flex flex-col leading-[1.15]">
            <span className="font-display text-[17px] font-bold tracking-tight text-ink">
              משרד עו״ד שׂרף
            </span>
            <span
              dir="ltr"
              className="font-display text-[11px] font-medium tracking-[0.14em] text-ink-mute mt-0.5 self-end"
            >
              EST. 1964
            </span>
          </span>
        </a>

        {/* Desktop nav */}
        <nav
          role="navigation"
          aria-label="ראשי"
          className="hidden lg:flex items-center gap-10"
        >
          {NAV_ITEMS.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className={`font-sans text-[14px] font-medium leading-[1.4] text-ink-soft hover:text-ink transition-colors duration-150 ${focusRing} rounded-sm`}
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* CTA + mobile menu toggle */}
        <div className="flex items-center gap-3">
          <a
            href={CTA_HREF}
            className={`inline-flex items-center justify-center bg-brand text-white hover:bg-brand-deep transition-colors duration-200 ease-default rounded-pill px-[22px] py-2.5 text-sm font-medium ${focusRing}`}
          >
            <span className="hidden sm:inline">קביעת פגישה</span>
            <span className="sm:hidden">פגישה</span>
          </a>

          <button
            type="button"
            onClick={() => setIsMenuOpen(true)}
            aria-label="פתח תפריט"
            aria-expanded={isMenuOpen}
            aria-controls="mobile-drawer"
            className={`lg:hidden inline-flex items-center justify-center w-10 h-10 rounded-md text-ink ${focusRing}`}
          >
            <Menu size={22} aria-hidden="true" />
          </button>
        </div>
      </div>

      {/* Mobile fullscreen drawer */}
      {isMenuOpen && (
        <div
          id="mobile-drawer"
          role="dialog"
          aria-modal="true"
          aria-label="ניווט ראשי"
          className="lg:hidden fixed inset-0 z-40 bg-white"
        >
          <div className="h-full flex flex-col px-6 sm:px-8 pt-5 pb-10">
            <div className="flex items-center justify-between h-[88px] -mt-5">
              <a
                href="/"
                onClick={closeMenu}
                className={`flex items-center gap-3 rounded-sm ${focusRing}`}
                aria-label="משרד עו״ד שרף — דף הבית"
              >
                <img
                  src="/logo.png"
                  alt=""
                  width={48}
                  height={48}
                  className="h-12 w-12 object-contain rounded"
                />
                <span className="flex flex-col leading-[1.15]">
                  <span className="font-display text-[17px] font-bold tracking-tight text-ink">
                    משרד עו״ד שׂרף
                  </span>
                  <span
                    dir="ltr"
                    className="font-display text-[11px] font-medium tracking-[0.14em] text-ink-mute mt-0.5 self-end"
                  >
                    EST. 1964
                  </span>
                </span>
              </a>

              <button
                type="button"
                onClick={closeMenu}
                aria-label="סגור תפריט"
                className={`inline-flex items-center justify-center w-10 h-10 rounded-md text-ink ${focusRing}`}
              >
                <X size={22} aria-hidden="true" />
              </button>
            </div>

            <nav
              role="navigation"
              aria-label="ראשי"
              className="flex-1 flex flex-col gap-6 mt-12"
            >
              {NAV_ITEMS.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={closeMenu}
                  className={`font-display text-[28px] font-semibold leading-tight tracking-tight text-ink hover:text-brand transition-colors duration-150 ${focusRing} rounded-sm`}
                >
                  {item.label}
                </a>
              ))}
            </nav>

            <a
              href={CTA_HREF}
              onClick={closeMenu}
              className={`inline-flex items-center justify-center bg-brand text-white hover:bg-brand-deep transition-colors duration-200 ease-default rounded-pill px-8 py-4 text-base font-medium ${focusRing}`}
            >
              קביעת פגישה
            </a>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
