-- Adds IP tracking to contact_submissions for rate-limiting and spam mitigation.
-- Disclosed in the privacy policy under "מידע טכני בסיסי".

ALTER TABLE public.contact_submissions
  ADD COLUMN IF NOT EXISTS ip text;

-- Index for the rate-limit lookup (last N submissions per IP).
CREATE INDEX IF NOT EXISTS contact_submissions_ip_recent_idx
  ON public.contact_submissions (ip, created_at DESC);
