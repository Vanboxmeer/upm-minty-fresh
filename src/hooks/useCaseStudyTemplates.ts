import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface CaseStudyTemplate {
  id: string;
  name: string;
  description: string;
  template_content: string;
  template_variables: string[];
  preview_image?: string;
  is_active: boolean;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

export const useCaseStudyTemplates = () => {
  const [templates, setTemplates] = useState<CaseStudyTemplate[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchTemplates();
  }, []);

  const fetchTemplates = async () => {
    try {
      const { data, error } = await supabase
        .from('case_study_templates')
        .select('*')
        .eq('is_active', true)
        .order('sort_order');

      if (error) throw error;
      
      const formattedData = (data || []).map(item => ({
        ...item,
        template_variables: Array.isArray(item.template_variables) 
          ? item.template_variables 
          : [],
      }));
      
      setTemplates(formattedData as CaseStudyTemplate[]);
    } catch (error) {
      console.error('Error fetching templates:', error);
      toast({
        title: 'Error',
        description: 'Failed to load templates',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const applyTemplate = (templateContent: string, variables: Record<string, string>): string => {
    let content = templateContent;
    
    Object.entries(variables).forEach(([key, value]) => {
      const regex = new RegExp(`{{${key}}}`, 'g');
      content = content.replace(regex, value);
    });
    
    return content;
  };

  return {
    templates,
    loading,
    applyTemplate,
  };
};