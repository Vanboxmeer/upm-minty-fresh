
CREATE OR REPLACE FUNCTION public.get_admin_dashboard_stats()
RETURNS json
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE result json;
BEGIN
  -- Verify caller is admin
  IF NOT EXISTS (
    SELECT 1 FROM admin_users 
    WHERE email = (auth.jwt() ->> 'email')
  ) THEN
    RAISE EXCEPTION 'Unauthorized';
  END IF;
  
  SELECT json_build_object(
    'total_posts', (SELECT count(*) FROM blog_posts),
    'published_posts', (SELECT count(*) FROM blog_posts WHERE status = 'published'),
    'draft_posts', (SELECT count(*) FROM blog_posts WHERE status = 'draft'),
    'total_claps', (SELECT COALESCE(sum(claps), 0) FROM blog_posts),
    'total_affiliates', (SELECT count(*) FROM affiliates),
    'pending_affiliates', (SELECT count(*) FROM affiliates WHERE status = 'pending'),
    'approved_affiliates', (SELECT count(*) FROM affiliates WHERE status = 'approved'),
    'newsletter_subscribers', (SELECT count(*) FROM newsletter_subscribers),
    'recent_subscribers', (
      SELECT COALESCE(json_agg(row_to_json(s)), '[]'::json)
      FROM (SELECT id, email, source, created_at FROM newsletter_subscribers ORDER BY created_at DESC LIMIT 20) s
    ),
    'recent_posts', (
      SELECT COALESCE(json_agg(row_to_json(p)), '[]'::json)
      FROM (SELECT id, title, status, publish_date, created_at FROM blog_posts ORDER BY created_at DESC LIMIT 5) p
    ),
    'recent_affiliates', (
      SELECT COALESCE(json_agg(row_to_json(a)), '[]'::json)
      FROM (SELECT id, affiliate_name, affiliate_email, status, created_at FROM affiliates ORDER BY created_at DESC LIMIT 5) a
    )
  ) INTO result;
  
  RETURN result;
END;
$$;
