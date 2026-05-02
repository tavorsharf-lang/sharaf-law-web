# מדריך פריסה ראשונה

האתר אינו דופלאי עדיין. המדריך הזה מתאר את הצעדים מקצה לקצה. בסוף תוכלו לחזור עליו בקלות גם אחרי שיתופים, רק שהפעם רוב הצעדים יהיו חד־פעמיים.

## 1. פריסה ראשונית ל-Vercel

### דרישות מוקדמות

- חשבון Vercel: <https://vercel.com/signup>
- ה-CLI מותקן: `npm i -g vercel`
- הזדהות פעם אחת: `vercel login` (פותח דפדפן)

### הצעד עצמו

מהשורש של הפרויקט:

```sh
vercel              # preview deploy — מקבלים URL זמני
vercel --prod       # אחרי שמוודאים שהפריוויו תקין, פורסים לפרודקשן
```

### חיבור הדומיין `sharflaw.co.il`

ב-Vercel Dashboard → Project → Settings → Domains:
1. Add Domain → `sharflaw.co.il` ו-`www.sharflaw.co.il`
2. Vercel יציג רשומות DNS להגדיר אצל רשם הדומיין:
   - לרוב `CNAME` עבור `www` שמצביע ל-`cname.vercel-dns.com`
   - ו-`A` או `ALIAS` עבור הדומיין הריק
3. ההפצה ב-DNS אורכת לרוב 5–60 דקות. Vercel ינפיק SSL אוטומטית (Let's Encrypt) אחרי האימות.

## 2. משתני סביבה ב-Vercel

ל-Vercel Dashboard → Project → Settings → Environment Variables:

| משתנה | ערך | הערות |
|---|---|---|
| `VITE_SUPABASE_URL` | `https://dmfwoypnzerajrfowhqx.supabase.co` | חובה |
| `VITE_SUPABASE_PUBLISHABLE_KEY` | (anon key מ-Supabase) | חובה |
| `VITE_GA_MEASUREMENT_ID` | `G-XXXXXXXXXX` | אופציונלי. ראו סעיף 3 |
| `VITE_GOOGLE_SITE_VERIFICATION` | (טוקן מ-Search Console) | אופציונלי. ראו סעיף 4 |

או דרך ה-CLI:

```sh
vercel env add VITE_GA_MEASUREMENT_ID production
# יבקש להדביק את הערך
```

אחרי שינוי env vars צריך לבצע `vercel --prod` מחדש כדי שיכנסו לתוקף.

## 3. Google Analytics 4

### יצירת ה-property

1. כניסה ל-<https://analytics.google.com> עם חשבון Google.
2. **Admin** (גלגל שיניים בפינה) → **Create** → **Account** (אם אין; שם: "Sharflaw") → **Continue**.
3. **Create Property**:
   - Property name: "משרד עו״ד שרף"
   - Time zone: Israel
   - Currency: ILS
4. **Continue** → **Business details** (השאירו כברירת מחדל) → **Create**.
5. **Web** → URL: `https://www.sharflaw.co.il` → Stream name: "Web" → **Create stream**.
6. בעמוד שנפתח, העתיקו את **Measurement ID** (פורמט `G-XXXXXXXXXX`).

### חיבור לאתר

1. ב-Vercel Settings → Environment Variables:
   ```
   VITE_GA_MEASUREMENT_ID = G-XXXXXXXXXX (הערך שהעתקתם)
   ```
2. Redeploy: `vercel --prod`
3. אחרי כדקה, ב-GA Dashboard → **Realtime** תוכלו לראות את הביקור שלכם.

GA לא נטען עד שמשתמש מאשר את באנר העוגיות. זה חוקי בישראל ומתאים גם ל-GDPR אם פעם תכנסו לאירופה.

## 4. Google Search Console

ההמלצה: **שיטת DNS** — היא לא תלויה בדיפלוי.

### שיטת DNS (מומלץ)

1. <https://search.google.com/search-console> → Add property → **Domain** → `sharflaw.co.il`.
2. Google יציג רשומת `TXT` להגדיר ב-DNS של רשם הדומיין:
   ```
   google-site-verification=Ab1Cd2Ef3Gh4Ij5Kl6Mn7Op8Qr9St0Uv1Wx2Yz
   ```
3. אחרי הוספת ה-TXT (5–60 דקות), חזרו ל-Search Console ולחצו **Verify**.
4. **יתרון**: מאמת גם את `sharflaw.co.il`, גם את `www.sharflaw.co.il`, וגם כל subdomain עתידי, בלי תלות בקוד האתר.

### שיטת HTML (אלטרנטיבה — אם DNS לא זמין)

1. Search Console → Add property → **URL prefix** → `https://www.sharflaw.co.il/`.
2. בחרו **HTML tag** (ולא DNS). העתיקו את ה-content בלבד מתוך `<meta name="google-site-verification" content="..." />`.
3. ב-Vercel Settings → Environment Variables:
   ```
   VITE_GOOGLE_SITE_VERIFICATION = הטוקן (בלי המרכאות)
   ```
4. Redeploy: `vercel --prod`. ה-meta tag מוזרק אוטומטית בזמן build (ראו [vite.config.ts](../vite.config.ts)).
5. חזרו ל-Search Console → **Verify**.

### לאחר האימות

1. **Sitemap** → הוסיפו: `https://www.sharflaw.co.il/sitemap.xml`.
2. גוגל יתחיל לסרוק את האתר. ייקח 1–7 ימים עד שהעמודים יופיעו בחיפושים.

## 5. אימות דומיין ב-Resend

בלי זה — מיילי הפנייה נופלים לספאם.

### הצעדים

1. <https://resend.com/domains> → Add Domain → `sharflaw.co.il`.
2. Resend יציג 3 רשומות DNS להגדיר (SPF / DKIM / DMARC):
   - `TXT` עבור `_resend.sharflaw.co.il` — פלט מתוך Resend
   - `MX` עבור `send.sharflaw.co.il` (אם ההגדרה של inbound)
   - `TXT` עבור `_dmarc.sharflaw.co.il` — מדיניות DMARC
3. אחרי שכל הרשומות ירוקות ב-Resend Dashboard, הוסיפו ב-Supabase Edge Functions Settings:
   ```
   RESEND_FROM = info@sharflaw.co.il (או noreply@sharflaw.co.il)
   ```
4. בדקו: שלחו פנייה לבדיקה דרך הטופס ב-www.sharflaw.co.il, וודאו שהמייל מגיע ל-`sharflaw@bezeqint.net` ולא לספאם.

## 6. הפעלת הדאטה־בייס (חד־פעמי)

הריצו את המיגרציה שמוסיפה את עמודת `ip` ל-`contact_submissions`:

```sh
supabase login                       # פעם אחת, פותח דפדפן
supabase link --project-ref dmfwoypnzerajrfowhqx
supabase db push                     # מריץ מיגרציות חדשות
supabase functions deploy submit-contact
```

## 7. בדיקות שלאחר פריסה

לבדוק לפני שמכריזים שהאתר חי:

- [ ] `https://www.sharflaw.co.il/` נטען עם הלוגו וה-RTL נכון
- [ ] `/foo-bar` מציג NotFound בעברית (rewrite פעיל)
- [ ] `/sitemap.xml` ו-`/robots.txt` נגישים כקובץ XML / טקסט
- [ ] ב-DevTools → Console: אין שגיאות `Refused to ...` (CSP נקי)
- [ ] טופס יצירת קשר: שולח, נכנסת רשומה ל-DB, מייל מגיע (לא לספאם)
- [ ] [Google Rich Results Test](https://search.google.com/test/rich-results) מאשר את ה-LegalService JSON-LD
- [ ] [Open Graph Debugger](https://developers.facebook.com/tools/debug/) מציג את og-image עם הטקסט
- [ ] בדיקת Lighthouse (DevTools → Lighthouse) ב-Performance / Accessibility / SEO — שואפים ל-90+ בכל התחומים