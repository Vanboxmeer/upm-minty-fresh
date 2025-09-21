import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useState } from "react";

interface CampaignDetailsFormProps {
  onSubmit: (formData: CampaignFormData) => void;
  onSkip: () => void;
}

export interface CampaignFormData {
  projectName?: string;
  projectDescription?: string;
  website?: string;
  marketingObjectives?: string[];
  targetAudience?: string;
  geographicTarget?: string;
  launchDate?: string;
  campaignDuration?: string;
  contentNeeds?: string[];
  preferredChannels?: string[];
  competitorAnalysis?: string;
  keyMessages?: string;
  successMetrics?: string[];
  additionalRequirements?: string;
}

const CampaignDetailsForm = ({ onSubmit, onSkip }: CampaignDetailsFormProps) => {
  const [formData, setFormData] = useState<CampaignFormData>({
    marketingObjectives: [],
    contentNeeds: [],
    preferredChannels: [],
    successMetrics: []
  });

  const handleCheckboxChange = (field: keyof Pick<CampaignFormData, 'marketingObjectives' | 'contentNeeds' | 'preferredChannels' | 'successMetrics'>, value: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      [field]: checked 
        ? [...(prev[field] || []), value]
        : (prev[field] || []).filter(item => item !== value)
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="py-16 bg-background">
      <div className="container mx-auto px-4 max-w-4xl">
        <Card className="shadow-lg">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl md:text-3xl">Campaign Details (Optional)</CardTitle>
            <CardDescription className="text-lg">
              Help us understand your project better to provide more targeted recommendations.
              This information is optional but will help us create a more effective campaign.
            </CardDescription>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Project Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="projectName">Project/Company Name</Label>
                  <Input
                    id="projectName"
                    value={formData.projectName || ''}
                    onChange={(e) => setFormData(prev => ({ ...prev, projectName: e.target.value }))}
                    placeholder="Enter your project name"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="website">Website URL</Label>
                  <Input
                    id="website"
                    type="url"
                    value={formData.website || ''}
                    onChange={(e) => setFormData(prev => ({ ...prev, website: e.target.value }))}
                    placeholder="https://yourwebsite.com"
                  />
                </div>
              </div>

              {/* Project Description */}
              <div className="space-y-2">
                <Label htmlFor="projectDescription">Project Description</Label>
                <Textarea
                  id="projectDescription"
                  value={formData.projectDescription || ''}
                  onChange={(e) => setFormData(prev => ({ ...prev, projectDescription: e.target.value }))}
                  placeholder="Briefly describe your project, product, or service"
                  rows={3}
                />
              </div>

              {/* Marketing Objectives */}
              <div className="space-y-3">
                <Label>Primary Marketing Objectives (Select all that apply)</Label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {[
                    "Brand Awareness",
                    "Lead Generation", 
                    "Community Building",
                    "Token/Product Launch",
                    "Investor Relations",
                    "User Acquisition",
                    "Media Coverage",
                    "Thought Leadership"
                  ].map((objective) => (
                    <div key={objective} className="flex items-center space-x-2">
                      <Checkbox
                        id={objective}
                        checked={formData.marketingObjectives?.includes(objective)}
                        onCheckedChange={(checked) => 
                          handleCheckboxChange('marketingObjectives', objective, !!checked)
                        }
                      />
                      <Label htmlFor={objective} className="text-sm font-normal">{objective}</Label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Target Audience & Geographic Targeting */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="targetAudience">Target Audience</Label>
                  <Textarea
                    id="targetAudience"
                    value={formData.targetAudience || ''}
                    onChange={(e) => setFormData(prev => ({ ...prev, targetAudience: e.target.value }))}
                    placeholder="Describe your ideal customers/users"
                    rows={3}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="geographicTarget">Geographic Focus</Label>
                  <Select onValueChange={(value) => setFormData(prev => ({ ...prev, geographicTarget: value }))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select target regions" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="global">Global</SelectItem>
                      <SelectItem value="north-america">North America</SelectItem>
                      <SelectItem value="europe">Europe</SelectItem>
                      <SelectItem value="asia-pacific">Asia Pacific</SelectItem>
                      <SelectItem value="latin-america">Latin America</SelectItem>
                      <SelectItem value="specific-countries">Specific Countries</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Timeline */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="launchDate">Preferred Launch Date</Label>
                  <Input
                    id="launchDate"
                    type="date"
                    value={formData.launchDate || ''}
                    onChange={(e) => setFormData(prev => ({ ...prev, launchDate: e.target.value }))}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="campaignDuration">Campaign Duration</Label>
                  <Select onValueChange={(value) => setFormData(prev => ({ ...prev, campaignDuration: value }))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select duration" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1-2-weeks">1-2 weeks</SelectItem>
                      <SelectItem value="1-month">1 month</SelectItem>
                      <SelectItem value="2-3-months">2-3 months</SelectItem>
                      <SelectItem value="6-months">6 months</SelectItem>
                      <SelectItem value="ongoing">Ongoing</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Content Needs */}
              <div className="space-y-3">
                <Label>Content Creation Needs</Label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {[
                    "Press Releases",
                    "Blog Articles", 
                    "Social Media Content",
                    "Video Content",
                    "Infographics",
                    "Case Studies",
                    "White Papers",
                    "Email Campaigns"
                  ].map((content) => (
                    <div key={content} className="flex items-center space-x-2">
                      <Checkbox
                        id={content}
                        checked={formData.contentNeeds?.includes(content)}
                        onCheckedChange={(checked) => 
                          handleCheckboxChange('contentNeeds', content, !!checked)
                        }
                      />
                      <Label htmlFor={content} className="text-sm font-normal">{content}</Label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Preferred Channels */}
              <div className="space-y-3">
                <Label>Preferred Marketing Channels</Label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {[
                    "Twitter/X",
                    "LinkedIn", 
                    "YouTube",
                    "Telegram",
                    "Discord",
                    "Reddit",
                    "Industry Publications",
                    "Podcasts"
                  ].map((channel) => (
                    <div key={channel} className="flex items-center space-x-2">
                      <Checkbox
                        id={channel}
                        checked={formData.preferredChannels?.includes(channel)}
                        onCheckedChange={(checked) => 
                          handleCheckboxChange('preferredChannels', channel, !!checked)
                        }
                      />
                      <Label htmlFor={channel} className="text-sm font-normal">{channel}</Label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Success Metrics */}
              <div className="space-y-3">
                <Label>Key Success Metrics</Label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {[
                    "Website Traffic",
                    "Social Media Engagement", 
                    "Media Mentions",
                    "Lead Generation",
                    "Brand Awareness",
                    "Community Growth",
                    "Conversion Rate",
                    "ROI/Revenue"
                  ].map((metric) => (
                    <div key={metric} className="flex items-center space-x-2">
                      <Checkbox
                        id={metric}
                        checked={formData.successMetrics?.includes(metric)}
                        onCheckedChange={(checked) => 
                          handleCheckboxChange('successMetrics', metric, !!checked)
                        }
                      />
                      <Label htmlFor={metric} className="text-sm font-normal">{metric}</Label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Additional Requirements */}
              <div className="space-y-2">
                <Label htmlFor="additionalRequirements">Additional Requirements or Special Considerations</Label>
                <Textarea
                  id="additionalRequirements"
                  value={formData.additionalRequirements || ''}
                  onChange={(e) => setFormData(prev => ({ ...prev, additionalRequirements: e.target.value }))}
                  placeholder="Any specific requirements, compliance needs, or special considerations..."
                  rows={3}
                />
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-6">
                <Button
                  type="button"
                  variant="outline"
                  className="flex-1"
                  onClick={onSkip}
                >
                  Skip Details - Proceed to Contact
                </Button>
                <Button
                  type="submit"
                  className="flex-1"
                >
                  Add Details to Contact Form
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CampaignDetailsForm;