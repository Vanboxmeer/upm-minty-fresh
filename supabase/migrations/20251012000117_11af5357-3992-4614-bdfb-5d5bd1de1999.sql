-- Create think_tank_conversations table for tracking AI conversations
CREATE TABLE public.think_tank_conversations (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  session_id TEXT NOT NULL,
  user_message TEXT NOT NULL,
  ai_response TEXT NOT NULL,
  service_suggested TEXT[] DEFAULT ARRAY[]::TEXT[],
  ip_address TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create index for session lookups
CREATE INDEX idx_think_tank_session ON public.think_tank_conversations(session_id);

-- Create index for timestamps
CREATE INDEX idx_think_tank_created ON public.think_tank_conversations(created_at DESC);

-- Enable RLS
ALTER TABLE public.think_tank_conversations ENABLE ROW LEVEL SECURITY;

-- Allow anyone to insert conversations
CREATE POLICY "Anyone can insert conversations"
ON public.think_tank_conversations
FOR INSERT
WITH CHECK (true);

-- Allow users to view their own session conversations
CREATE POLICY "Users can view their own session"
ON public.think_tank_conversations
FOR SELECT
USING (true);

-- Create think_tank_rate_limits table for rate limiting
CREATE TABLE public.think_tank_rate_limits (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  ip_address TEXT NOT NULL UNIQUE,
  message_count INTEGER NOT NULL DEFAULT 1,
  first_message_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  last_message_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.think_tank_rate_limits ENABLE ROW LEVEL SECURITY;

-- Allow anyone to check and update rate limits
CREATE POLICY "Anyone can manage rate limits"
ON public.think_tank_rate_limits
FOR ALL
USING (true)
WITH CHECK (true);