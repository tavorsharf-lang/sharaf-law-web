# Sharaf Law — Design Handoff Spec
**For:** Claude Code · existing repo (`tavorsharf-lang/sharaf-law-web`)
**Stack:** Vite + React 18 + TypeScript + Tailwind 3.4
**Direction:** "Modern boutique" — deep brand green, airy, type-forward, RTL Hebrew
**Type system:** Rubik (display, h1–h4 + numerics) + Heebo (body)

---

## 1 · Design Tokens

### 1.1 Color

| Role | Value | Where used |
|---|---|---|
| `--ink` | `#1A1A1A` | Body text, headings on light bg |
| `--ink-soft` | `#4A4A4A` | Secondary copy, paragraphs |
| `--ink-mute` | `#6B6B6B` | Tertiary, captions, helper text |
| `--rule` | `#E5E5E5` | Hairline borders (cards, form fields, dividers) |
| `--rule-soft` | `#EFEFEF` | Header bottom border |
| `--white` | `#FFFFFF` | Surface white |
| `--bg` | `#FFFFFF` | Page background |
| `--bg-alt` | `#FAFBFA` | Alternating section bg, form field fill, secondary card surface |
| `--warm` | `#F4F0E8` | Reserved for future warm accents |
| `--brand` | `#2D4A3A` | **Primary brand.** Buttons, eyebrow text, KPI numbers, links, contact band, why band |
| `--brand-deep` | `#1F3528` | Primary button hover |
| `--brand-soft` | `#EAF1EC` | Testimonials section background |
| `--brand-ink` | `#0F1F17` | **Footer background only** — darker than `--brand` to ground page bottom |
| `--brand-light` | `#C9D7CD` | Eyebrow text on brand band, secondary headline accent on brand |
| `--photo-tile` | `#EEEAE2` | `<Photo />` placeholder fill (warm cream) |
| `--map-pin` | `#E55B4F` | Map pin only (single accent use) |

**On-brand text colors** (when bg is `var(--brand)` or `var(--brand-ink)`):
- Headline: `#FFFFFF`
- Body: `rgba(255,255,255,0.85)`
- Helper / labels: `rgba(255,255,255,0.65–0.78)`
- Borders: `rgba(255,255,255,0.12)`
- Inset cards: `rgba(255,255,255,0.06)` fill

### 1.2 Typography

```css
--font-display: 'Rubik', 'Heebo', system-ui, sans-serif;  /* h1–h4, KPIs, eyebrow numerics */
--font-sans:    'Heebo', system-ui, sans-serif;           /* body, labels, buttons */
```

**Google Fonts import** (replaces Heebo-only import in `src/index.css`):
```css
@import url('https://fonts.googleapis.com/css2?family=Heebo:wght@300;400;500;600;700;800&family=Rubik:wght@400;500;600;700&display=swap');
```

**Type scale** (all `letter-spacing: -0.01em` to `-0.025em` for display):

| Token | Size | Weight | Line | LS | Use |
|---|---|---|---|---|---|
| `display-hero` | 68 / 56 / 40 | 600 | 1.05 | -0.025em | Hero h1 |
| `display-xl` | 56 | 600 | 1.05 | -0.025em | Contact h2 |
| `display-l` | 48 | 600 | 1.10 | -0.020em | Section h2 (Practice, Guide, Testimonials) |
| `display-m` | 44 | 600 | 1.10 | -0.020em | Why band h2 |
| `display-s` | 26 | 600 | 1.20 | -0.010em | Guide chapter title |
| `display-xs` | 24 | 600 | 1.15 | -0.010em | Practice card title |
| `display-quote` | 20 | 500 | 1.50 | -0.005em | Testimonial blockquote |
| `display-form` | 22 | 600 | 1.20 | -0.010em | Form heading |
| `display-kpi-l` | 36 | 600 | 1.0 | — | Why-band KPI numbers |
| `display-kpi-s` | 28 | 700 | 1.0 | — | Floating "1964" card |
| `body-lead` | 19 | 400 | 1.60 | — | Hero subhead |
| `body-l` | 17 | 400 | 1.70 | — | Section intro paragraphs |
| `body-m` | 16 | 400 | 1.65 | — | Standard body |
| `body-s` | 15 | 400 | 1.70 | — | Card body |
| `body-xs` | 14.5 | 400 | 1.70 | — | Footer body |
| `label` | 14 | 500 | 1.4 | — | Nav links, footer links |
| `caption` | 13 | 400 | 1.5 | — | Sub-labels under contact items |
| `eyebrow` | 13 | 600 | 1.4 | 0.08em | Section eyebrow text (uppercase-feeling but not transformed) |
| `meta` | 12 | 600 | 1.4 | 0.06em | Card tags, form labels, footer meta |
| `tiny` | 11 | 500 | 1.5 | 0.04em | Caption labels, "EST. 1964" — 0.18em |

**Italics:** none. **Underline:** none on links by default.

### 1.3 Spacing

8-pt grid, but with named section paddings used heavily:

| Token | Value | Use |
|---|---|---|
| `--space-section-y` | `120px` | Standard vertical section padding (Practice, Guide, Why, Testimonials, Contact) |
| `--space-section-y-sm` | `100px` | Hero top |
| `--space-section-x` | `64px` | Standard horizontal section padding (desktop) |
| `--space-card-p` | `32px` | Card inner padding |
| `--space-card-p-lg` | `40px 36px 32px` | Testimonial figure |
| `--space-band-p` | `80px 72px` | Why-band inner padding |
| `--space-contact-p` | `72px 64px` | Contact-band inner padding |
| `--space-header-h` | `88px` | Sticky header height |
| `--gap-grid` | `28px` | 3-up card grids |
| `--gap-grid-lg` | `48–80px` | Hero columns / Why columns |

### 1.4 Radius

| Token | Value | Use |
|---|---|---|
| `--radius-pill` | `999px` | Primary CTAs, chip toggles ("נדל״ן/צוואות/אחר"), header CTA |
| `--radius-xl` | `32px` | Contact band container |
| `--radius-l` | `28px` | Why band container |
| `--radius-m` | `24px` | Hero photo, contact form, testimonial figures |
| `--radius-card` | `20px` | Practice cards, Guide cards |
| `--radius-input` | `12px` | Form inputs, textarea |
| `--radius-floater` | `16px` | Floating "1964" card, KPI inset cards on brand |
| `--radius-pin` | `4px` | Logo image corner |

### 1.5 Shadows

```css
--shadow-floater: 0 12px 40px rgba(20,40,30,0.12);   /* "1964" floating card */
--shadow-form:    0 24px 60px rgba(15,30,22,0.25);   /* contact form floats over brand band */
--shadow-page:    0 2px 12px rgba(0,0,0,0.08);       /* PDF print page only */
```

No shadows on standard cards — relies on background contrast (`#FFF` on `#FAFBFA`) and hairlines instead.

### 1.6 Transitions

```css
--ease-default: cubic-bezier(0.4, 0, 0.2, 1);
--dur-fast:   150ms;
--dur-base:   200ms;
--dur-slow:   300ms;
```

| Element | Transition |
|---|---|
| `btn-primary` | `background var(--dur-base) var(--ease-default)` |
| `btn-text` arrow | `transform var(--dur-fast)` — arrow translates `-2px` on x on hover |
| Card hover (optional) | `transform var(--dur-slow)`, `translateY(-2px)` + shadow fade-in |
| Form field focus | `border-color var(--dur-fast)`, `box-shadow var(--dur-fast)` |
| Sticky header | `backdrop-filter: blur(10px)` always on; bg goes `rgba(255,255,255,0.94)` |

### 1.7 Drop into `src/index.css`

```css
@import url('https://fonts.googleapis.com/css2?family=Heebo:wght@300;400;500;600;700;800&family=Rubik:wght@400;500;600;700&display=swap');

@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    /* color */
    --ink: #1A1A1A;
    --ink-soft: #4A4A4A;
    --ink-mute: #6B6B6B;
    --rule: #E5E5E5;
    --rule-soft: #EFEFEF;
    --bg: #FFFFFF;
    --bg-alt: #FAFBFA;
    --warm: #F4F0E8;
    --brand: #2D4A3A;
    --brand-deep: #1F3528;
    --brand-soft: #EAF1EC;
    --brand-ink: #0F1F17;
    --brand-light: #C9D7CD;
    --photo-tile: #EEEAE2;

    /* type */
    --font-display: 'Rubik', 'Heebo', system-ui, sans-serif;
    --font-sans: 'Heebo', system-ui, sans-serif;

    /* radius */
    --radius-pill: 999px;
    --radius-xl: 32px;
    --radius-l: 28px;
    --radius-m: 24px;
    --radius-card: 20px;
    --radius-input: 12px;
    --radius-floater: 16px;
  }

  html { direction: rtl; }
  body {
    @apply bg-white text-[#1A1A1A] antialiased;
    font-family: var(--font-sans);
    font-feature-settings: "kern", "liga";
  }
  h1, h2, h3, h4 {
    font-family: var(--font-display);
    letter-spacing: -0.015em;
  }
}
```

### 1.8 `tailwind.config.ts` extension

```ts
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: { DEFAULT: '#1A1A1A', soft: '#4A4A4A', mute: '#6B6B6B' },
        rule: { DEFAULT: '#E5E5E5', soft: '#EFEFEF' },
        bg: { DEFAULT: '#FFFFFF', alt: '#FAFBFA', warm: '#F4F0E8' },
        brand: {
          DEFAULT: '#2D4A3A',
          deep: '#1F3528',
          soft: '#EAF1EC',
          ink: '#0F1F17',
          light: '#C9D7CD',
        },
        photo: '#EEEAE2',
      },
      fontFamily: {
        display: ['Rubik', 'Heebo', 'system-ui', 'sans-serif'],
        sans: ['Heebo', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        // optional aliases — using arbitrary values is also fine
        'eyebrow': ['13px', { lineHeight: '1.4', letterSpacing: '0.08em', fontWeight: '600' }],
        'meta': ['12px', { lineHeight: '1.4', letterSpacing: '0.06em', fontWeight: '600' }],
        'display-hero': ['68px', { lineHeight: '1.05', letterSpacing: '-0.025em' }],
        'display-l': ['48px', { lineHeight: '1.10', letterSpacing: '-0.020em' }],
        'display-m': ['44px', { lineHeight: '1.10', letterSpacing: '-0.020em' }],
      },
      borderRadius: {
        pill: '999px',
        floater: '16px',
        card: '20px',
        m: '24px',
        l: '28px',
        xl2: '32px',
      },
      boxShadow: {
        floater: '0 12px 40px rgba(20,40,30,0.12)',
        form: '0 24px 60px rgba(15,30,22,0.25)',
      },
      transitionTimingFunction: {
        default: 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
    },
  },
  plugins: [],
};
```

---

## 2 · Component Inventory

> All components live under `src/components/`. Each replaces an existing component of the same role. Use `<section>` semantics; one `<h1>` total (in Hero); h2 per section.

### 2.1 `<Header />`

**Replaces:** `src/components/Header.tsx`
**Purpose:** Sticky top nav, brand, CTA.

```tsx
<header role="banner" className="sticky top-0 z-30 bg-white/94 backdrop-blur-md border-b border-rule-soft">
  <div className="max-w-[1280px] mx-auto px-16 h-[88px] flex items-center justify-between">
    <a href="/" className="flex items-center gap-3">
      <img src="/logo.png" alt="משרד עו״ד שרף" className="h-16 w-16 object-contain rounded" />
      <span className="flex flex-col leading-[1.15]">
        <span className="font-display text-[17px] font-bold tracking-tight">משרד עו״ד שׂרף</span>
        <span className="font-display text-[11px] font-medium tracking-[0.14em] text-ink-mute mt-0.5">EST. 1964</span>
      </span>
    </a>
    <nav role="navigation" aria-label="ראשי" className="hidden lg:flex gap-10">
      {/* "המשרד" "תחומי התמחות" "המדריך" "בת ים" */}
    </nav>
    <a href="#contact" className="btn-primary rounded-pill px-[22px] py-2.5 text-sm">קביעת פגישה</a>
    {/* Mobile: hamburger toggles a fullscreen drawer with same items + CTA */}
  </div>
</header>
```

**Behavior:**
- Sticky; backdrop-blur always on.
- Mobile (`<lg`): nav collapses to hamburger; CTA stays visible (compressed to icon if needed at `<sm`).
- Active link gets `text-ink` (instead of `text-ink-soft`).
- Focus: `outline: 2px solid var(--brand); outline-offset: 4px;` on every interactive element.

**Breakpoints:**
- `<768`: logo h-12 w-12, hide nav, hide subtitle, CTA = "פגישה"
- `768–1023`: show full logo, hide nav, full CTA
- `≥1024`: full layout

### 2.2 `<Hero />`

**Replaces:** `src/components/Hero.tsx`
**Purpose:** Two-column above-the-fold; left = headline + lede + CTA + secondary phone, right = vertical photo with floating "1964" card.

```tsx
<section id="home" className="bg-white px-16 pt-[100px] pb-20">
  <div className="max-w-[1280px] mx-auto grid grid-cols-1 lg:grid-cols-[1.1fr_1fr] gap-20 items-center">
    <div>
      <p className="eyebrow text-brand">· משרד עורכי דין למקרקעין · בת ים</p>
      <h1 className="font-display text-[40px] md:text-[56px] lg:text-[68px] font-semibold leading-[1.05] tracking-[-0.025em] mt-6">
        עסקת נדל״ן,<br />
        <span className="text-brand">בליווי שמרגיש</span><br />
        <span className="text-brand">אישי.</span>
      </h1>
      <p className="text-[19px] leading-[1.6] text-ink-soft max-w-[480px] mt-8">…</p>
      <div className="flex items-center gap-4 mt-11">
        <a href="#contact" className="btn-primary rounded-pill px-8 py-4">קביעת פגישה ראשונה</a>
        <span className="text-sm text-ink-mute">או <span dir="ltr" className="font-medium text-ink">054-2028695</span></span>
      </div>
    </div>
    <div className="relative">
      <Photo aspectRatio="4/5" radius="m" />
      <aside className="absolute bottom-6 -right-8 bg-white rounded-floater shadow-floater max-w-[240px] p-5 px-6">…</aside>
    </div>
  </div>
</section>
```

**Behavior:** none beyond hover states. The "1964" floater stays static; consider entrance fade-up on first paint (`opacity 0→1`, `translateY(8px→0)` over 600ms) but it's optional.

**Breakpoints:**
- `<768`: single column; floater becomes inline below photo (centered, no negative offset); h1 = 40px
- `768–1023`: single column; h1 = 56px
- `≥1024`: two-column as designed; h1 = 68px

### 2.3 `<PracticeAreas />`

**Replaces:** `src/components/Services.tsx`
**Purpose:** 3-up grid of practice areas with photo + tag + title + body + text-link.

```tsx
<section id="practice" className="bg-bg-alt px-16 py-[120px]">
  <div className="max-w-[1280px] mx-auto">
    <header className="flex justify-between items-end mb-16">…h2 + "כל תחומי הפרקטיקה" link…</header>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-7">
      {items.map(it => (
        <article className="bg-white rounded-card overflow-hidden">
          <Photo aspectRatio="4/3" radius={0} />
          <div className="p-8 pb-9">
            <p className="meta text-brand mb-3">{it.tag}</p>
            <h3 className="display-xs font-semibold">{it.title}</h3>
            <p className="text-[15px] leading-[1.7] text-ink-soft mt-3.5">{it.body}</p>
            <a href={it.href} className="btn-text mt-6">פרטים נוספים</a>
          </div>
        </article>
      ))}
    </div>
  </div>
</section>
```

**Items (data):** `[{tag:'01 · נדל״ן',title:'עסקאות נדל״ן',body:'…',href:'/practice/real-estate'}, …]`

**Breakpoints:**
- `<768`: 1-up
- `768–1023`: 1-up (cards full width, more breathing room)
- `≥1024`: 3-up

### 2.4 `<WhySharaf />`

**Replaces:** `src/components/WhyChooseUs.tsx`
**Purpose:** Full-bleed brand band, copy left + 4 KPI cards right (2×2).

KPIs are hardcoded: `1964 · 3 · 500+ · בת ים`.

**Breakpoints:**
- `<768`: stack copy → KPIs (2×2 stays on phone)
- `≥1024`: 2-col

### 2.5 `<BuyingGuide />`

**Replaces:** `src/components/BuyingGuide.tsx`
**Purpose:** Single guide presented as 3 chapters in a 3-up grid. Each card has top brand stripe, "פרק 0X" eyebrow, title, body, "קריאת הפרק".

**Important:** This is **one guide**, three chapters. Section title: "המדריך לרוכשי דירה." (singular). Header right-aligned link: "קריאת המדריך המלא". Do **not** add "עוד מדריכים בקרוב".

```tsx
<article className="bg-bg-alt rounded-card pt-9 px-8 pb-8 flex flex-col border-t-[3px] border-brand">
  <p className="font-display text-[12px] font-semibold tracking-[0.12em] text-brand mb-4">פרק 01</p>
  <h3 className="font-display text-[26px] font-semibold leading-tight tracking-[-0.01em]">…</h3>
  <p className="text-[15px] leading-[1.7] text-ink-soft mt-3.5 flex-1">…</p>
  <a className="btn-text mt-6 self-start">קריאת הפרק</a>
</article>
```

### 2.6 `<Reviews />`

**Replaces:** `src/components/Reviews.tsx`
**Purpose:** 3 equal-weight quotes on `bg-brand-soft`. Each = `<figure>` with large brand opening quote glyph, `<blockquote>`, `<figcaption>` (name + service) separated by hairline.

```tsx
<figure className="bg-white rounded-m p-9 px-9 pt-10 pb-8 flex flex-col">
  <span aria-hidden className="font-display text-[56px] font-semibold text-brand leading-[0.5] mb-2">״</span>
  <blockquote className="font-display text-[20px] font-medium leading-[1.5] text-ink tracking-[-0.005em] flex-1">{q.text}</blockquote>
  <figcaption className="mt-7 pt-5 border-t border-rule">
    <p className="text-sm font-semibold">{q.name}</p>
    <p className="text-xs text-ink-mute mt-1">{q.service}</p>
  </figcaption>
</figure>
```

### 2.7 `<Contact />` + `<ContactForm />`

**Replaces:** `src/components/ContactForm.tsx`
**Purpose:** Green band container holding (left) intro + 4 contact items + map placeholder, (right) floating white form.

**Map placeholder** (CSS-only): grid lines + 2 perpendicular roads + drop pin at intersection + "ירושלים 28א" pill. Replace with live Google Maps `<iframe>` when wiring.

**Form fields & integration with existing Edge Function:**

| Field | name | type | required | notes |
|---|---|---|---|---|
| שם מלא | `name` | text | ✅ | min 2, max 80 |
| טלפון | `phone` | tel | ✅ | Israeli format; reuse existing `lib/validation.ts` rules |
| דוא״ל | `email` | email | optional | RFC + length |
| תחום הפנייה | `service` | string | ✅ | enum: `'נדל״ן' \| 'צוואות' \| 'אחר'` — chip toggle |
| הודעה | `message` | textarea | optional | max 1000 |
| Honeypot | `website` | text | hidden | Must remain empty; reject non-empty submissions server-side |
| Consent | `consent` | checkbox | ✅ if `lib/consent` enforces it | Add a tiny consent line above submit. Wire to existing `lib/consent.ts` |

**Endpoint:** Keep posting to the **same existing Supabase Edge Function** that today's `ContactForm.tsx` posts to. Reuse `lib/contact.ts` helper (do not rewrite it). Field names match the existing schema — verify in repo and rename UI labels only if the schema differs.

**Submit states:** idle → submitting (button shows spinner + "שולח…", disable form) → success (replace form with success card showing "תודה. נחזור אליכם בתוך יום עסקים.") → error (toast via existing `useToast`, keep form filled).

**Validation:** client-side via `react-hook-form` + `zod` (already in repo, per Tailwind config detected). Reuse existing `lib/validation.ts` schemas where they exist; extend for `service`.

**Form fine print under submit:** "השליחה אינה מהווה ייעוץ משפטי."

### 2.8 `<Footer />`

**Replaces:** `src/components/Footer.tsx`
**Purpose:** 4-col footer on `bg-brand-ink` (#0F1F17), white "שׂרף · משרד עורכי דין · EST. 1964" mark on left.

**No social icons.** No newsletter. Just: brand block · practice areas · contact details · hours · copyright row with policy links.

**Phone numbers shown:** only `03-5073749` and `054-2028695`. Email `office@sharaf-law.co.il` (placeholder — confirm). Address `ירושלים 28א, בת ים`.

**Breakpoints:**
- `<768`: 1-col stacked
- `768–1023`: 2-col
- `≥1024`: 4-col as designed

### 2.9 `<Photo />` (shared placeholder)

```tsx
type PhotoProps = {
  src?: string;
  alt?: string;
  aspectRatio?: string;       // '4/3' | '4/5' | '16/10'
  radius?: 'm' | 'card' | 'none' | number;
  label?: string;             // shown only when src is undefined
};
```

When `src` is provided, render a real `<img loading="lazy" decoding="async" />`. Otherwise render the placeholder (warm cream tile, subtle 135° stripes, mountain icon SVG, small "תמונה" caption bottom-right). This way the dev can swap real photos in without restructuring layouts.

---

## 3 · RTL Notes

The site is `dir="rtl"` on `<html>`. Tailwind 3.4 supports logical properties natively when you opt in. Practical guidelines:

1. **Use `ms-*`/`me-*` instead of `ml-*`/`mr-*`** for inline-direction margins/padding.
2. **Use `ps-*`/`pe-*` instead of `pl-*`/`pr-*`**.
3. **`start-*` / `end-*`** for absolute positioning when the inset should mirror in LTR.
4. **Exceptions — keep `left/right` literal:**
   - Phone numbers, emails, URLs: wrap in `dir="ltr"` and `text-align: right` (visual alignment within RTL flow).
   - The floating "1964" card sits at `bottom-6 -right-8` on purpose — this is **visual right** (i.e., `inset-inline-end: -32px`). Use `end-[-32px]` with the logical property approach, OR keep `right-[-32px]` and accept it'll flip if you ever LTR — recommend logical.
   - `<input type="tel|email|url">` get `direction: ltr; text-align: right;` so digits read left-to-right but stay visually right-aligned in the form.
5. **Icons and arrows:** the chevron after CTAs (`btn-text`) currently points using a CSS pseudo-element rotated. In RTL it should point **left** (toward inline-end). Use `[dir="rtl"] .icon-arrow { transform: scaleX(-1); }` or use a Lucide `<ArrowLeft />` and rotate per dir.
6. **Number-only blocks (KPIs, "EST. 1964"):** wrap in `dir="ltr"` so digits/periods render correctly.
7. **Star ratings (if you add them):** `unicode-bidi: isolate` on the container.
8. **Quote glyph:** Hebrew opening quote `״` (Gershayim) — already correct in code. Don't substitute Latin `"`.
9. **Letter-spacing on Hebrew:** keep negative `letter-spacing` modest (`-0.005` to `-0.025em`). Hebrew breaks at `-0.03em` and below.

---

## 4 · Repo Integration

### 4.1 Replace entirely

- `src/components/Header.tsx`
- `src/components/Hero.tsx`
- `src/components/Services.tsx` → rename to `PracticeAreas.tsx`, update imports in `App.tsx`
- `src/components/WhyChooseUs.tsx` → rename to `WhySharaf.tsx`
- `src/components/BuyingGuide.tsx`
- `src/components/Reviews.tsx`
- `src/components/ContactForm.tsx` → split into `Contact.tsx` (section shell) + `ContactForm.tsx` (form only)
- `src/components/Footer.tsx`
- `src/components/About.tsx` → **delete.** No standalone About section in this design; the "Why Sharaf" band carries that copy. Remove import from `App.tsx`.
- `src/index.css` — replace contents with section 1.7 above (preserve `@tailwind` directives)
- `tailwind.config.ts` — merge `extend` from section 1.8

### 4.2 Keep as-is (do not rewrite)

- `src/lib/contact.ts` — submission helper to Supabase Edge Function
- `src/lib/validation.ts` — Zod schemas for phone/email
- `src/lib/consent.ts` — consent gate
- `src/lib/utils.ts` — `cn()` helper
- `src/hooks/*` — toast, mobile, etc.
- `index.html` — already has `lang="he" dir="rtl"` ✅
- Supabase Edge Function — **do not touch.** Field names in the new form must match existing schema: `name`, `phone`, `email`, `service`, `message`, `website` (honeypot).

### 4.3 Page composition (`src/App.tsx`)

```tsx
export default function App() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <PracticeAreas />
        <WhySharaf />
        <BuyingGuide />
        <Reviews />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
```

### 4.4 Asset handling

- `public/logo.png` — already exists, keep at root path. `<img src="/logo.png" />`.
- For the white footer mark: render as inline JSX (no PNG). Code is in section 2.8 of this spec / the design source.

---

## 5 · Build Order

**Step 1 — Tokens & base.** Replace `src/index.css` and merge `tailwind.config.ts`. Verify Heebo + Rubik load (Network tab: `Heebo-*.woff2`, `Rubik-*.woff2`). Verify `:root` CSS variables resolve. **Test:** view existing pages — they should look broken in a structured way (right colors, wrong layouts). That's expected.

**Step 2 — `<Photo />` primitive.** Build the shared placeholder. Drop it into one existing card to confirm radius & aspect props work.

**Step 3 — `<Header />` + `<Footer />`.** Frame the page. **Test:** logo loads, nav renders, mobile hamburger opens, footer shows on `bg-brand-ink`, focus rings visible on all interactive elements.

**Step 4 — `<Hero />`.** **Test:** mobile single-column reflow; floater becomes inline below photo on mobile; tab order goes h1 → lede → CTA → phone link.

**Step 5 — `<PracticeAreas />`, `<WhySharaf />`, `<BuyingGuide />`, `<Reviews />`** in that order. Static content, simple grids. **Test after each:** Lighthouse layout shift < 0.05; heading hierarchy h1→h2→h3; reduced-motion preference respected (skip any `transition` on `prefers-reduced-motion`).

**Step 6 — `<Contact />` + `<ContactForm />`.** **Wire to existing Edge Function.** Test:
- Empty submit → 3 inline errors (name, phone, service)
- Valid submit → button → spinner → success card
- Honeypot filled → reject (server-side; UI shows generic error)
- Hebrew name with diacritics passes validation
- Phone formats: `0501234567`, `050-1234567`, `+972501234567` all pass
- Replace map placeholder with live `<iframe src="https://www.google.com/maps/embed?pb=…">` for ירושלים 28א, בת ים. Set `loading="lazy"`, `referrerPolicy="no-referrer-when-downgrade"`, `title="מפת המשרד"`.

**Step 7 — Polish.** Reduced-motion media query, focus-visible audit, axe-core scan, Lighthouse mobile run (target: Performance ≥90, Accessibility ≥95). RTL audit: tab through entire page, verify nothing misaligns inline-end.

**Step 8 — Final.** Test on real iPhone Safari (RTL bugs love mobile Safari) + real Android Chrome. Ship.

---

## Open questions for you to confirm before Step 1

1. Email address `office@sharaf-law.co.il` — is this real, or do you want a different one shown?
2. "כתובת" sub-line is empty in the design. Add "קומה 2, חניה זמינה" or similar, or leave blank?
3. Practice page deep-links (`/practice/real-estate`, `/practice/wills`, `/practice/tax`) — do these pages exist, or should the buttons all anchor to `#contact` for now?
4. The "המדריך" CTA — does the full guide exist as a route (`/guide`), or do the chapter cards link to anchors on a future single guide page?
