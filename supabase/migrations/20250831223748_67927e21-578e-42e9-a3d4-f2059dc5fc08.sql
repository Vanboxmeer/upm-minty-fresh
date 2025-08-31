-- Enable pg_cron extension for scheduled tasks
CREATE EXTENSION IF NOT EXISTS pg_cron;

-- Create a scheduled job to run every minute to check for scheduled posts
SELECT cron.schedule(
  'publish-scheduled-posts',
  '* * * * *', -- every minute
  $$
  SELECT
    net.http_post(
        url:='https://ftjdmvdyeetiubmziwav.supabase.co/functions/v1/publish-scheduled-posts',
        headers:='{"Content-Type": "application/json", "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZ0amRtdmR5ZWV0aXVibXppd2F2Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1NDk0NjE0NywiZXhwIjoyMDcwNTIyMTQ3fQ.Wt-2w1j6Z3o6oNrIKWQgEQsKPaePDPg7Giv3AzKJm54"}'::jsonb,
        body:='{"triggered_by": "cron", "timestamp": "' || now()::text || '"}'::jsonb
    ) as request_id;
  $$
);