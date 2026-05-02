import { Photo } from '@/components/ui/Photo';

export default function PhotoTest() {
  return (
    <div className="mx-auto min-h-screen max-w-4xl space-y-12 p-12">
      <header className="space-y-2">
        <h1 className="text-3xl font-semibold">Photo primitive — drop test</h1>
        <p className="text-ink-soft">
          ארבע וריאציות. שלוש placeholder, אחת עם src אמיתי.
        </p>
      </header>

      <section className="space-y-3">
        <h2 className="text-xl font-medium">
          1. <code>aspectRatio="4/3"</code> (placeholder, defaults: radius="card", label="תמונה")
        </h2>
        <Photo aspectRatio="4/3" />
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-medium">
          2. <code>aspectRatio="4/5"</code> <code>radius="m"</code>
        </h2>
        <div className="max-w-sm">
          <Photo aspectRatio="4/5" radius="m" />
        </div>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-medium">
          3. <code>aspectRatio="16/10"</code> <code>radius="none"</code>{' '}
          <code>label="באנר"</code>
        </h2>
        <Photo aspectRatio="16/10" radius="none" label="באנר" />
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-medium">
          4. <code>src="/logo.png"</code> <code>aspectRatio="4/3"</code>{' '}
          <code>radius="card"</code> (real image)
        </h2>
        <Photo
          src="/logo.png"
          alt="לוגו לבדיקה"
          aspectRatio="4/3"
          radius="card"
        />
      </section>
    </div>
  );
}
