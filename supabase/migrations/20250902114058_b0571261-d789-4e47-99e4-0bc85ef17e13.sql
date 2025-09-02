-- Update cron job to run every 6 hours instead of every minute
SELECT cron.unschedule('publish-scheduled-posts');

-- Create new cron job that runs every 6 hours (at 00:00, 06:00, 12:00, 18:00)
SELECT cron.schedule(
  'publish-scheduled-posts',
  '0 */6 * * *', -- every 6 hours
  $$
  SELECT
    net.http_post(
        url:='https://ftjdmvdyeetiubmziwav.supabase.co/functions/v1/publish-scheduled-posts',
        headers:='{"Content-Type": "application/json", "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZ0amRtdmR5ZWV0aXVibXppd2F2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQ5NDYxNDcsImV4cCI6MjA3MDUyMjE0N30.FxpqvXDjsPIjD6k2toPLUCYrhprjv9sGYFc9Y2Znmgw"}'::jsonb,
        body:=concat('{"time": "', now(), '"}')::jsonb
    ) as request_id;
  $$
);