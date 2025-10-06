import { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useCaseStudyTemplates, CaseStudyTemplate } from '@/hooks/useCaseStudyTemplates';
import { FileText } from 'lucide-react';

interface TemplateSelectorProps {
  open: boolean;
  onClose: () => void;
  onSelect: (content: string) => void;
}

export const TemplateSelector = ({ open, onClose, onSelect }: TemplateSelectorProps) => {
  const { templates, loading, applyTemplate } = useCaseStudyTemplates();
  const [selectedTemplate, setSelectedTemplate] = useState<CaseStudyTemplate | null>(null);
  const [variables, setVariables] = useState<Record<string, string>>({});

  const handleTemplateSelect = (template: CaseStudyTemplate) => {
    setSelectedTemplate(template);
    const initialVars: Record<string, string> = {};
    template.template_variables.forEach(varName => {
      initialVars[varName] = '';
    });
    setVariables(initialVars);
  };

  const handleApply = () => {
    if (selectedTemplate) {
      const content = applyTemplate(selectedTemplate.template_content, variables);
      onSelect(content);
      onClose();
      setSelectedTemplate(null);
      setVariables({});
    }
  };

  const handleCancel = () => {
    onClose();
    setSelectedTemplate(null);
    setVariables({});
  };

  return (
    <Dialog open={open} onOpenChange={handleCancel}>
      <DialogContent className="max-w-4xl max-h-[80vh]">
        <DialogHeader>
          <DialogTitle>Case Study Templates</DialogTitle>
          <DialogDescription>
            Choose a template to get started quickly with a professional case study format
          </DialogDescription>
        </DialogHeader>

        {!selectedTemplate ? (
          <ScrollArea className="h-[500px] pr-4">
            {loading ? (
              <div className="space-y-4">
                {[1, 2, 3].map(i => (
                  <div key={i} className="h-32 bg-muted animate-pulse rounded" />
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                {templates.map((template) => (
                  <Card
                    key={template.id}
                    className="cursor-pointer hover:border-primary transition-colors"
                    onClick={() => handleTemplateSelect(template)}
                  >
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <FileText className="h-5 w-5" />
                        {template.name}
                      </CardTitle>
                      <CardDescription>{template.description}</CardDescription>
                    </CardHeader>
                  </Card>
                ))}
              </div>
            )}
          </ScrollArea>
        ) : (
          <div>
            <h3 className="font-semibold mb-4">{selectedTemplate.name}</h3>
            <ScrollArea className="h-[400px] pr-4">
              <div className="space-y-4">
                {selectedTemplate.template_variables.map((varName) => (
                  <div key={varName}>
                    <Label htmlFor={varName}>
                      {varName.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                    </Label>
                    <Input
                      id={varName}
                      value={variables[varName] || ''}
                      onChange={(e) => setVariables(prev => ({
                        ...prev,
                        [varName]: e.target.value,
                      }))}
                      placeholder={`Enter ${varName.replace(/_/g, ' ')}`}
                    />
                  </div>
                ))}
              </div>
            </ScrollArea>
            <div className="flex justify-end gap-2 mt-4">
              <Button variant="outline" onClick={() => setSelectedTemplate(null)}>
                Back
              </Button>
              <Button onClick={handleApply}>
                Apply Template
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};