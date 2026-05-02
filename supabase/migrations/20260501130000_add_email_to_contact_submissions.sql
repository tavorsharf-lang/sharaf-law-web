-- Adds optional email column to contact_submissions.
-- The form collects email as an optional field; this column stores it when provided.

ALTER TABLE public.contact_submissions
  ADD COLUMN IF NOT EXISTS email text;
