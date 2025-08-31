-- Add admin user for unitedpress.media@gmail.com
INSERT INTO public.admin_users (email, password_hash, name)
VALUES (
  'unitedpress.media@gmail.com',
  'magic_link_auth', -- placeholder since we're using magic links
  'UPM Admin'
)
ON CONFLICT (email) DO NOTHING;