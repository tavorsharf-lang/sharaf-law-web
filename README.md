# sharaf-law-web

האתר הציבורי של משרד עו״ד שרף — מקרקעין וצוואות, בת ים.

## סטאק

- Vite + React 18 + TypeScript
- Tailwind CSS + shadcn/ui (toaster/sonner/tooltip בלבד)
- React Router (SPA, נתיב יחיד `/`)
- Supabase — מסד נתונים + Edge Function לטופס יצירת קשר
- Resend — מייל התראה על פנייה חדשה (אופציונלי)

## פיתוח מקומי

דרושים Node.js 18+ ו־npm.

```sh
npm install
cp .env.example .env   # ולמלא ערכים
npm run dev            # http://localhost:8080
```

### משתני סביבה (frontend)

| משתנה | תיאור |
|---|---|
| `VITE_SUPABASE_URL` | URL של פרויקט ה־Supabase |
| `VITE_SUPABASE_PUBLISHABLE_KEY` | מפתח public (anon) |

### משתני סביבה (Supabase Edge Function `submit-contact`)

| משתנה | תיאור |
|---|---|
| `SUPABASE_URL` | מוגדר אוטומטית ע״י Supabase |
| `SUPABASE_SERVICE_ROLE_KEY` | מוגדר אוטומטית ע״י Supabase |
| `RESEND_API_KEY` | אופציונלי — אם מוגדר, נשלחת התראה במייל |
| `RESEND_FROM` | אופציונלי — כתובת השולח. ברירת מחדל: `onboarding@resend.dev` (sandbox). בייצור: שנו לכתובת בדומיין שאומת ב-Resend, למשל `info@sharflaw.co.il` |
| `RESEND_TO` | אופציונלי — נמען המייל. ברירת מחדל: `sharflaw@bezeqint.net` |

### מיגרציות

לפני הפעלה ראשונית, יש להריץ את המיגרציות שב-`supabase/migrations/`. דרכים:

1. **Supabase CLI**: `supabase db push`
2. **Supabase Dashboard**: SQL Editor → להעתיק את תוכן הקובץ ולהריץ.

### אימות דומיין ב-Resend (לייצור)

ברירת המחדל `onboarding@resend.dev` היא sandbox — מיילים נופלים לספאם או נחסמים. לייצור:
1. ב-Resend Dashboard → Domains, הוסיפו דומיין (`sharflaw.co.il`).
2. הגדירו את רשומות ה-DNS שמופיעות (SPF, DKIM, DMARC).
3. אחרי אימות, הגדירו ב-Supabase: `RESEND_FROM=info@sharflaw.co.il` (או דומה).

## פקודות

| פקודה | מה היא עושה |
|---|---|
| `npm run dev` | שרת פיתוח עם HMR |
| `npm run build` | build production ל־`dist/` |
| `npm run preview` | preview של ה־build |
| `npm run lint` | ESLint |

## מבנה

```
src/
  components/      רכיבי דף הבית (Header, Hero, Services, ...)
  components/ui/   shadcn ראשונים (Toaster, Sonner, Tooltip, Toast)
  hooks/           use-toast, use-mobile
  integrations/    client של Supabase + טיפוסי DB
  lib/contact.ts   מקור-אמת לפרטי קשר (טלפונים, וואטסאפ, אימייל, כתובת)
  pages/           Index (דף הבית), NotFound
supabase/functions/submit-contact/  Edge Function לטופס
```

## פריסה

האתר הוא SPA — יעד הפריסה (Vercel/Netlify) חייב לבצע rewrite לכל הנתיבים אל `index.html`.

ראו [docs/DEPLOY.md](docs/DEPLOY.md) למתכונים מלאים של GA, Search Console, ואימות דומיין ב-Resend.

### תחזוקת CSP בעתיד

ה-Content-Security-Policy מוגדר ב-[vercel.json](vercel.json) ומגביל מאיפה אפשר לטעון משאבים. כל פעם שמוסיפים שירות חיצוני חדש (סקריפט, iframe, fetch ל-API) צריך להוסיף את הדומיין שלו לדירקטיבה הרלוונטית. אחרת הדפדפן יחסום את הבקשה ותראו בקונסולה `Refused to ...`.

המיפוי בין סוג שירות לדירקטיבה:

| סוג השירות | הדירקטיבה ב-CSP | דוגמאות |
|---|---|---|
| סקריפט מארג חיצוני | `script-src` | Hotjar, Crisp, Intercom, Segment |
| iframe מוטמע | `frame-src` | Calendly, YouTube, Vimeo, Loom |
| בקשות AJAX/fetch | `connect-src` | Mailchimp API, Stripe API, REST endpoint |
| תמונה ממקור חיצוני | `img-src` | CDN של תמונות, Cloudinary, S3 |
| גופן חיצוני | `font-src` | Adobe Fonts, Typekit |
| סטיילים חיצוניים | `style-src` | פחות נפוץ — לרוב נטען inline |

דוגמאות מוכנות (להעתיק ולהוסיף בערך הקיים, מופרדים ברווח):

- **Hotjar**: `script-src` += `https://*.hotjar.com`; `connect-src` += `https://*.hotjar.com https://*.hotjar.io wss://*.hotjar.com`; `img-src` += `https://*.hotjar.com`
- **Calendly**: `frame-src` += `https://calendly.com`; `script-src` += `https://assets.calendly.com`; `style-src` += `https://assets.calendly.com`
- **Crisp Chat**: `script-src` += `https://client.crisp.chat`; `connect-src` += `https://client.crisp.chat wss://client.relay.crisp.chat`; `img-src` += `https://client.crisp.chat`; `style-src` += `https://client.crisp.chat`; `font-src` += `https://client.crisp.chat`
- **Mailchimp embed**: `frame-src` += `https://*.list-manage.com`; `connect-src` += `https://*.list-manage.com`
- **Stripe Checkout**: `script-src` += `https://js.stripe.com`; `frame-src` += `https://js.stripe.com https://hooks.stripe.com`; `connect-src` += `https://api.stripe.com`
- **YouTube embed**: `frame-src` += `https://www.youtube.com https://www.youtube-nocookie.com`
- **Vimeo embed**: `frame-src` += `https://player.vimeo.com`

אחרי כל שינוי ב-CSP, בדקו ב-DevTools → Console (במצב Production מקומי או preview deploy) שאין שגיאות `Refused to ...`. כל שירות חדש שמוסיפים גם דורש בדיקה אם הוא משתמש בעוגיות ועדכון [מדיניות הפרטיות](src/pages/Privacy.tsx) בהתאם.
