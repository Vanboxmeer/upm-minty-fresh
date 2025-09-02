-- Enable required extensions for cron jobs
CREATE EXTENSION IF NOT EXISTS pg_cron;
CREATE EXTENSION IF NOT EXISTS pg_net;

-- Create cron job to publish scheduled posts every minute
SELECT cron.schedule(
  'publish-scheduled-posts',
  '* * * * *', -- every minute
  $$
  SELECT
    net.http_post(
        url:='https://ftjdmvdyeetiubmziwav.supabase.co/functions/v1/publish-scheduled-posts',
        headers:='{"Content-Type": "application/json", "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZ0amRtdmR5ZWV0aXVibXppd2F2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQ5NDYxNDcsImV4cCI6MjA3MDUyMjE0N30.FxpqvXDjsPIjD6k2toPLUCYrhprjv9sGYFc9Y2Znmgw"}'::jsonb,
        body:=concat('{"time": "', now(), '"}')::jsonb
    ) as request_id;
  $$
);