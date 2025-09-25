-- Security fixes based on linter warnings

-- Move any extensions from public schema to extensions schema for security
-- Check if uuid-ossp extension is in public schema and move it
DO $$
BEGIN
    -- Create extensions schema if it doesn't exist
    CREATE SCHEMA IF NOT EXISTS extensions;
    
    -- Move uuid-ossp extension if it exists in public
    IF EXISTS (
        SELECT 1 FROM pg_extension e 
        JOIN pg_namespace n ON e.extnamespace = n.oid 
        WHERE e.extname = 'uuid-ossp' AND n.nspname = 'public'
    ) THEN
        ALTER EXTENSION "uuid-ossp" SET SCHEMA extensions;
    END IF;
    
    -- Move other common extensions from public if they exist
    IF EXISTS (
        SELECT 1 FROM pg_extension e 
        JOIN pg_namespace n ON e.extnamespace = n.oid 
        WHERE e.extname = 'pgcrypto' AND n.nspname = 'public'
    ) THEN
        ALTER EXTENSION "pgcrypto" SET SCHEMA extensions;
    END IF;
    
END $$;

-- Update search_path to include extensions schema
ALTER DATABASE postgres SET search_path = "$user", public, extensions;

-- Add security comment for tracking
COMMENT ON SCHEMA extensions IS 'Extensions moved here for security compliance - keeps extensions out of public schema';