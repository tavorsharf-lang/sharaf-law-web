// TODO: confirm icon choice with design — using lucide `Image` for now;
// Mountain or other could fit better depending on photo subject matter.
import { Image as ImageIcon } from 'lucide-react';
import type { CSSProperties } from 'react';

export type PhotoProps = {
  src?: string;
  alt?: string;
  aspectRatio?: string;
  radius?: 'm' | 'card' | 'none' | number;
  label?: string;
};

function resolveRadius(radius: PhotoProps['radius']): string {
  if (radius === undefined || radius === 'card') return 'var(--radius-card)';
  if (radius === 'm') return 'var(--radius-m)';
  if (radius === 'none') return '0';
  return `${radius}px`;
}

export function Photo({
  src,
  alt = '',
  aspectRatio = '4/3',
  radius = 'card',
  label = 'תמונה',
}: PhotoProps) {
  const boxStyle: CSSProperties = {
    aspectRatio: aspectRatio.replace('/', ' / '),
    borderRadius: resolveRadius(radius),
  };

  if (src) {
    // Wrap in a container so aspect-ratio comes from the box, not the <img>.
    // Tailwind's preflight sets `img { height: auto }`, which would override
    // an aspect-ratio applied directly to the img.
    return (
      <div className="relative w-full overflow-hidden" style={boxStyle}>
        <img
          src={src}
          alt={alt}
          loading="lazy"
          decoding="async"
          className="absolute inset-0 h-full w-full object-cover"
        />
      </div>
    );
  }

  return (
    <div
      className="relative w-full overflow-hidden bg-photo"
      style={boxStyle}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            'repeating-linear-gradient(135deg, rgba(0,0,0,0.025) 0, rgba(0,0,0,0.025) 1px, transparent 1px, transparent 9px)',
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 flex items-center justify-center"
      >
        <ImageIcon
          strokeWidth={1.25}
          className="h-12 w-12 text-ink-mute opacity-70"
        />
      </div>
      <span className="absolute bottom-3 end-3 text-[11px] text-ink-mute opacity-80">
        {label}
      </span>
    </div>
  );
}

export default Photo;
