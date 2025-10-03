-- Create webmentions table for WebMention & Pingback system
CREATE TABLE IF NOT EXISTS public.webmentions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  source_url TEXT NOT NULL,
  target_url TEXT NOT NULL,
  post_id UUID REFERENCES public.blog_posts(id) ON DELETE CASCADE,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'sent', 'received', 'verified', 'failed')),
  sent_at TIMESTAMP WITH TIME ZONE,
  response_code INTEGER,
  error_message TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create index for faster lookups
CREATE INDEX idx_webmentions_post_id ON public.webmentions(post_id);
CREATE INDEX idx_webmentions_status ON public.webmentions(status);

-- Enable RLS
ALTER TABLE public.webmentions ENABLE ROW LEVEL SECURITY;

-- Policies for webmentions
CREATE POLICY "Admin users can manage webmentions"
  ON public.webmentions
  FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM public.admin_users 
      WHERE admin_users.email = (auth.jwt() ->> 'email')
    )
  );

CREATE POLICY "Service role can manage webmentions"
  ON public.webmentions
  FOR ALL
  USING (auth.role() = 'service_role');

-- Create content_freshness_tracking table
CREATE TABLE IF NOT EXISTS public.content_freshness_tracking (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  post_id UUID REFERENCES public.blog_posts(id) ON DELETE CASCADE UNIQUE,
  last_reviewed_date TIMESTAMP WITH TIME ZONE DEFAULT now(),
  freshness_score INTEGER DEFAULT 100 CHECK (freshness_score >= 0 AND freshness_score <= 100),
  needs_update BOOLEAN DEFAULT false,
  update_suggestions TEXT[],
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create function to calculate content age in days
CREATE OR REPLACE FUNCTION public.get_content_age_days(reviewed_date TIMESTAMP WITH TIME ZONE)
RETURNS INTEGER
LANGUAGE sql
IMMUTABLE
AS $$
  SELECT EXTRACT(DAY FROM (now() - reviewed_date))::INTEGER;
$$;

-- Create index
CREATE INDEX idx_freshness_needs_update ON public.content_freshness_tracking(needs_update);
CREATE INDEX idx_freshness_reviewed_date ON public.content_freshness_tracking(last_reviewed_date);

-- Enable RLS
ALTER TABLE public.content_freshness_tracking ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Admin users can manage content freshness"
  ON public.content_freshness_tracking
  FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM public.admin_users 
      WHERE admin_users.email = (auth.jwt() ->> 'email')
    )
  );

CREATE POLICY "Service role can manage content freshness"
  ON public.content_freshness_tracking
  FOR ALL
  USING (auth.role() = 'service_role');

-- Create case_study_templates table
CREATE TABLE IF NOT EXISTS public.case_study_templates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT,
  template_content TEXT NOT NULL,
  template_variables JSONB DEFAULT '[]'::jsonb,
  preview_image TEXT,
  is_active BOOLEAN DEFAULT true,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.case_study_templates ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Anyone can view active templates"
  ON public.case_study_templates
  FOR SELECT
  USING (is_active = true);

CREATE POLICY "Admin users can manage templates"
  ON public.case_study_templates
  FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM public.admin_users 
      WHERE admin_users.email = (auth.jwt() ->> 'email')
    )
  );

-- Insert default case study templates
INSERT INTO public.case_study_templates (name, description, template_content, template_variables, sort_order) VALUES
(
  'Challenge-Solution-Results',
  'Traditional case study format focusing on problem, approach, and outcomes',
  '<h2>The Challenge</h2>
<p>{{client_name}}, a {{industry}} company, faced {{challenge_description}}. This was impacting their {{impact_area}} and needed immediate attention.</p>

<h2>Our Solution</h2>
<p>We implemented a comprehensive strategy that included:</p>
<ul>
<li>{{solution_point_1}}</li>
<li>{{solution_point_2}}</li>
<li>{{solution_point_3}}</li>
</ul>

<h2>The Results</h2>
<div class="case-study-metrics">
<div class="metric">
<h3>{{metric_1_value}}</h3>
<p>{{metric_1_label}}</p>
</div>
<div class="metric">
<h3>{{metric_2_value}}</h3>
<p>{{metric_2_label}}</p>
</div>
<div class="metric">
<h3>{{metric_3_value}}</h3>
<p>{{metric_3_label}}</p>
</div>
</div>

<h2>Client Testimonial</h2>
<blockquote>
<p>"{{testimonial_quote}}"</p>
<footer>— {{client_contact_name}}, {{client_contact_title}}</footer>
</blockquote>',
  '["client_name", "industry", "challenge_description", "impact_area", "solution_point_1", "solution_point_2", "solution_point_3", "metric_1_value", "metric_1_label", "metric_2_value", "metric_2_label", "metric_3_value", "metric_3_label", "testimonial_quote", "client_contact_name", "client_contact_title"]'::jsonb,
  1
),
(
  'Timeline Format',
  'Chronological story with milestones and progress tracking',
  '<h2>Project Overview</h2>
<p>{{client_name}} partnered with UPM to {{project_goal}}. Here''s how we achieved success over {{timeline_duration}}.</p>

<h2>The Journey</h2>
<div class="timeline">
<div class="timeline-item">
<h3>Month 1: {{phase_1_title}}</h3>
<p>{{phase_1_description}}</p>
<p><strong>Key Milestone:</strong> {{phase_1_milestone}}</p>
</div>

<div class="timeline-item">
<h3>Month 2-3: {{phase_2_title}}</h3>
<p>{{phase_2_description}}</p>
<p><strong>Key Milestone:</strong> {{phase_2_milestone}}</p>
</div>

<div class="timeline-item">
<h3>Month 4+: {{phase_3_title}}</h3>
<p>{{phase_3_description}}</p>
<p><strong>Key Milestone:</strong> {{phase_3_milestone}}</p>
</div>
</div>

<h2>Final Results</h2>
<p>After {{timeline_duration}}, {{client_name}} achieved:</p>
<ul>
<li>{{result_1}}</li>
<li>{{result_2}}</li>
<li>{{result_3}}</li>
</ul>',
  '["client_name", "project_goal", "timeline_duration", "phase_1_title", "phase_1_description", "phase_1_milestone", "phase_2_title", "phase_2_description", "phase_2_milestone", "phase_3_title", "phase_3_description", "phase_3_milestone", "result_1", "result_2", "result_3"]'::jsonb,
  2
),
(
  'Metrics-Focused',
  'Heavy emphasis on numbers, ROI, and quantifiable results',
  '<h2>{{client_name}} Success Story</h2>
<p>Industry: <strong>{{industry}}</strong> | Campaign Duration: <strong>{{campaign_duration}}</strong></p>

<h2>The Numbers Don''t Lie</h2>
<div class="metrics-grid">
<div class="metric-card">
<h3>{{kpi_1_value}}</h3>
<p>{{kpi_1_label}}</p>
<span class="change">{{kpi_1_change}}</span>
</div>
<div class="metric-card">
<h3>{{kpi_2_value}}</h3>
<p>{{kpi_2_label}}</p>
<span class="change">{{kpi_2_change}}</span>
</div>
<div class="metric-card">
<h3>{{kpi_3_value}}</h3>
<p>{{kpi_3_label}}</p>
<span class="change">{{kpi_3_change}}</span>
</div>
<div class="metric-card">
<h3>{{kpi_4_value}}</h3>
<p>{{kpi_4_label}}</p>
<span class="change">{{kpi_4_change}}</span>
</div>
</div>

<h2>ROI Breakdown</h2>
<p><strong>Investment:</strong> {{investment_amount}}</p>
<p><strong>Return:</strong> {{return_amount}}</p>
<p><strong>ROI:</strong> {{roi_percentage}}</p>

<h2>What We Did</h2>
<p>{{strategy_summary}}</p>

<h2>Why It Worked</h2>
<p>{{success_factors}}</p>',
  '["client_name", "industry", "campaign_duration", "kpi_1_value", "kpi_1_label", "kpi_1_change", "kpi_2_value", "kpi_2_label", "kpi_2_change", "kpi_3_value", "kpi_3_label", "kpi_3_change", "kpi_4_value", "kpi_4_label", "kpi_4_change", "investment_amount", "return_amount", "roi_percentage", "strategy_summary", "success_factors"]'::jsonb,
  3
);

-- Create trigger for updating updated_at
CREATE TRIGGER update_webmentions_updated_at
  BEFORE UPDATE ON public.webmentions
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_content_freshness_updated_at
  BEFORE UPDATE ON public.content_freshness_tracking
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_case_study_templates_updated_at
  BEFORE UPDATE ON public.case_study_templates
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();