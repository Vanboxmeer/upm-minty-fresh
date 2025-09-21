import { createContext, useContext, useState, ReactNode } from 'react';

export interface PackageData {
  name: string;
  price: string;
  description: string;
  features: string[];
  popular: boolean;
}

export interface SubscriptionData {
  name: string;
  subtitle: string;
  price: string;
  monthlyPrice: number;
  annualPrice: number;
  description: string;
  features: string[];
  excludedFeatures: string[];
  popular: boolean;
  hasBilling: boolean;
}

export interface CampaignData {
  projectName?: string;
  website?: string;
  projectDescription?: string;
  marketingObjectives?: string[];
  targetAudience?: string;
  geographicTarget?: string;
  launchDate?: string;
  campaignDuration?: string;
  contentNeeds?: string[];
  preferredChannels?: string[];
  successMetrics?: string[];
  additionalRequirements?: string;
}

interface PackageSelectionContextType {
  selectedPackage: PackageData | null;
  selectedSubscription: SubscriptionData | null;
  billingFrequency: string;
  customBudget: string;
  campaignData: CampaignData;
  setSelectedPackage: (pkg: PackageData | null) => void;
  setSelectedSubscription: (sub: SubscriptionData | null) => void;
  setBillingFrequency: (frequency: string) => void;
  setCustomBudget: (budget: string) => void;
  setCampaignData: (data: CampaignData) => void;
  updateCampaignField: (field: keyof CampaignData, value: any) => void;
  clearSelection: () => void;
  getSelectionSummary: () => string;
}

const PackageSelectionContext = createContext<PackageSelectionContextType | undefined>(undefined);

export const usePackageSelection = () => {
  const context = useContext(PackageSelectionContext);
  if (context === undefined) {
    throw new Error('usePackageSelection must be used within a PackageSelectionProvider');
  }
  return context;
};

interface PackageSelectionProviderProps {
  children: ReactNode;
}

export const PackageSelectionProvider = ({ children }: PackageSelectionProviderProps) => {
  const [selectedPackage, setSelectedPackage] = useState<PackageData | null>(null);
  const [selectedSubscription, setSelectedSubscription] = useState<SubscriptionData | null>(null);
  const [billingFrequency, setBillingFrequency] = useState<string>("monthly");
  const [customBudget, setCustomBudget] = useState<string>("");
  const [campaignData, setCampaignData] = useState<CampaignData>({});

  const updateCampaignField = (field: keyof CampaignData, value: any) => {
    setCampaignData(prev => ({ ...prev, [field]: value }));
  };

  const clearSelection = () => {
    setSelectedPackage(null);
    setSelectedSubscription(null);
    setBillingFrequency("monthly");
    setCustomBudget("");
    setCampaignData({});
  };

  const getSelectionSummary = (): string => {
    if (!selectedPackage || !selectedSubscription) return "";

    let summary = `SELECTED PACKAGE & SUBSCRIPTION:\n\n`;
    
    if (selectedPackage.name === "Custom Budget" && customBudget) {
      summary += `Coverage Package: ${selectedPackage.name} - $${Number(customBudget).toLocaleString()}\n`;
    } else {
      summary += `Coverage Package: ${selectedPackage.name} - ${selectedPackage.price}\n`;
    }
    summary += `Description: ${selectedPackage.description}\n\n`;
    
    summary += `Subscription Level: ${selectedSubscription.name}\n`;
    if (selectedSubscription.hasBilling && billingFrequency === "annual") {
      summary += `Billing: Annual - $${selectedSubscription.annualPrice} (Save $${(selectedSubscription.monthlyPrice * 12) - selectedSubscription.annualPrice})\n`;
    } else if (selectedSubscription.hasBilling) {
      summary += `Billing: Monthly - $${selectedSubscription.monthlyPrice}\n`;
    }
    summary += `Service Fee: ${selectedSubscription.subtitle}\n`;
    summary += `Subscription Details: ${selectedSubscription.description}\n`;
    summary += `\n`;

    // Add campaign details if provided
    if (Object.keys(campaignData).length > 0) {
      summary += `CAMPAIGN DETAILS:\n\n`;
      
      if (campaignData.projectName) summary += `Project Name: ${campaignData.projectName}\n`;
      if (campaignData.website) summary += `Website: ${campaignData.website}\n`;
      if (campaignData.projectDescription) summary += `Project Description: ${campaignData.projectDescription}\n`;
      if (campaignData.marketingObjectives?.length) summary += `Marketing Objectives: ${campaignData.marketingObjectives.join(', ')}\n`;
      if (campaignData.targetAudience) summary += `Target Audience: ${campaignData.targetAudience}\n`;
      if (campaignData.geographicTarget) summary += `Geographic Focus: ${campaignData.geographicTarget}\n`;
      if (campaignData.launchDate) summary += `Launch Date: ${campaignData.launchDate}\n`;
      if (campaignData.campaignDuration) summary += `Campaign Duration: ${campaignData.campaignDuration}\n`;
      if (campaignData.contentNeeds?.length) summary += `Content Needs: ${campaignData.contentNeeds.join(', ')}\n`;
      if (campaignData.preferredChannels?.length) summary += `Preferred Channels: ${campaignData.preferredChannels.join(', ')}\n`;
      if (campaignData.successMetrics?.length) summary += `Success Metrics: ${campaignData.successMetrics.join(', ')}\n`;
      if (campaignData.additionalRequirements) summary += `Additional Requirements: ${campaignData.additionalRequirements}\n`;
      summary += `\n`;
    }

    return summary;
  };

  const value = {
    selectedPackage,
    selectedSubscription,
    billingFrequency,
    customBudget,
    campaignData,
    setSelectedPackage,
    setSelectedSubscription,
    setBillingFrequency,
    setCustomBudget,
    setCampaignData,
    updateCampaignField,
    clearSelection,
    getSelectionSummary,
  };

  return (
    <PackageSelectionContext.Provider value={value}>
      {children}
    </PackageSelectionContext.Provider>
  );
};