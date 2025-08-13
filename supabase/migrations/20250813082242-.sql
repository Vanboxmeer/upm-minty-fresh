-- Newsletter subscribers table for blog/newsletter opt-ins
CREATE TABLE IF NOT EXISTS public.newsletter_subscribers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT NOT NULL,
  name TEXT,
  source TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  consent BOOLEAN NOT NULL DEFAULT true,
  ip TEXT,
  user_agent TEXT
);

-- Ensure case-insensitive uniqueness on email
CREATE UNIQUE INDEX IF NOT EXISTS unique_newsletter_email ON public.newsletter_subscribers (lower(email));

-- Helpful index for time-based analytics
CREATE INDEX IF NOT EXISTS idx_newsletter_created_at ON public.newsletter_subscribers (created_at);

-- Enable Row Level Security
ALTER TABLE public.newsletter_subscribers ENABLE ROW LEVEL SECURITY;

-- Allow anonymous inserts (front-end) while preventing reads/updates/deletes by default
DROP POLICY IF EXISTS "Anyone can insert newsletter subscriptions" ON public.newsletter_subscribers;
CREATE POLICY "Anyone can insert newsletter subscriptions"
ON public.newsletter_subscribers
FOR INSERT
TO anon
WITH CHECK (true);
