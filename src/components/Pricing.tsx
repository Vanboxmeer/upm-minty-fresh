import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Check } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
const Pricing = () => {
  const navigate = useNavigate();
  const [selectedCurrency, setSelectedCurrency] = useState<'USD' | 'BTC' | 'ETH' | 'SOL'>('USD');
  const [cryptoPrices, setCryptoPrices] = useState<{BTC: number, ETH: number, SOL: number}>({
    BTC: 0,
    ETH: 0,
    SOL: 0
  });

  useEffect(() => {
    const fetchCryptoPrices = async () => {
      try {
        const response = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,solana&vs_currencies=usd');
        const data = await response.json();
        setCryptoPrices({
          BTC: data.bitcoin?.usd || 0,
          ETH: data.ethereum?.usd || 0,
          SOL: data.solana?.usd || 0
        });
      } catch (error) {
        console.error('Failed to fetch crypto prices:', error);
      }
    };

    fetchCryptoPrices();
    const interval = setInterval(fetchCryptoPrices, 60000); // Update every minute
    return () => clearInterval(interval);
  }, []);

  const formatPrice = (usdPrice: string) => {
    const numericPrice = parseFloat(usdPrice.replace(/[$,]/g, ''));
    
    if (selectedCurrency === 'USD') {
      return usdPrice;
    }
    
    const cryptoPrice = cryptoPrices[selectedCurrency];
    if (cryptoPrice === 0) return usdPrice;
    
    const convertedAmount = numericPrice / cryptoPrice;
    const symbol = selectedCurrency === 'BTC' ? '₿' : selectedCurrency === 'ETH' ? 'Ξ' : '◎';
    
    if (convertedAmount >= 1) {
      return `${symbol}${convertedAmount.toFixed(2)}`;
    } else {
      return `${symbol}${convertedAmount.toFixed(4)}`;
    }
  };
  
  const handleOrderPackage = (planName: string) => {
    const routeMap: { [key: string]: string } = {
      "Growth": "/payment-growth",
      "Scale": "/payment-scale", 
      "Dominate": "/payment-dominate"
    };
    const selectedPlan = plans.find(plan => plan.name === planName);
    const packageDetails = encodeURIComponent(`Package: ${planName} Package - ${selectedPlan?.price} (${selectedPlan?.description})`);
    navigate(`${routeMap[planName] || "/payment-growth"}?package=${packageDetails}`);
  };

  const plans = [{
    name: "Growth",
    price: "$5,000",
    period: "per package",
    description: "Perfect for emerging projects looking to establish market presence",
    features: [
      "Press Release Distribution to 150+ crypto & tech outlets",
      "3-5 KOL Collaborations with verified micro-influencers",
      "Feature placement in 2-3 tier 2 crypto publications",
      "Social media amplification across key platforms",
      "Basic analytics and performance reporting",
      "Web3 directory listing services",
      "Email campaign to targeted investor lists"
    ],
    cta: "Order Package",
    popular: false
  }, {
    name: "Scale",
    price: "$25,000",
    period: "per package",
    description: "Comprehensive marketing for projects ready to scale significantly",
    features: [
      "Press Release Distribution to 500+ premium outlets worldwide",
      "8-12 Premium KOL Partnerships with top-tier influencers",
      "Executive interviews in 4-6 major crypto publications",
      "Feature articles in Forbes, CoinDesk, and Decrypt",
      "Podcast appearances on leading crypto shows",
      "Community AMA hosting and event coordination",
      "Web3 directory listing services",
      "Dedicated account manager and priority support",
      "Advanced analytics with ROI tracking"
    ],
    cta: "Order Package",
    popular: true
  }, {
    name: "Dominate",
    price: "$100,000",
    period: "per package",
    description: "Maximum exposure package for industry-leading projects",
    features: [
      "Press Release Distribution to 1000+ global media outlets",
      "20+ Elite KOL Collaborations with celebrity endorsers",
      "Cover stories in top-tier publications (Wall Street Journal, Bloomberg)",
      "TV interviews on CNBC, Fox Business, and Bloomberg TV",
      "Speaking slots at major industry conferences",
      "Exclusive media tours and investor roadshows",
      "Custom content creation and thought leadership articles",
      "Web3 directory listing services",
      "White-glove service with 24/7 priority support",
      "Direct access to tier-1 journalists and editors"
    ],
    cta: "Order Package",
    popular: false
  }];
  return <section id="coverage-packages" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            UPM Coverage Packages
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">Choose the perfect plan to accelerate your digital marketing success. All plans include our core distribution network and analytics. If its your first time ordering with UPM please reach out to discuss your coverage requests before placing your order.</p>
          
          <div className="flex justify-center mb-8">
            <ToggleGroup 
              type="single" 
              value={selectedCurrency} 
              onValueChange={(value) => value && setSelectedCurrency(value as 'USD' | 'BTC' | 'ETH' | 'SOL')}
              className="border rounded-lg p-1 bg-background"
            >
              <ToggleGroupItem value="USD" className="data-[state=on]:bg-primary data-[state=on]:text-primary-foreground">
                USD
              </ToggleGroupItem>
              <ToggleGroupItem value="BTC" className="data-[state=on]:bg-primary data-[state=on]:text-primary-foreground">
                ₿ BTC
              </ToggleGroupItem>
              <ToggleGroupItem value="ETH" className="data-[state=on]:bg-primary data-[state=on]:text-primary-foreground">
                Ξ ETH
              </ToggleGroupItem>
              <ToggleGroupItem value="SOL" className="data-[state=on]:bg-primary data-[state=on]:text-primary-foreground">
                ◎ SOL
              </ToggleGroupItem>
            </ToggleGroup>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => <Card key={index} className={`relative ${plan.popular ? 'border-primary shadow-lg scale-105' : 'border-border'} transition-all hover:shadow-lg`}>
              {plan.popular && <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <span className="bg-primary text-primary-foreground px-4 py-1 rounded-full text-sm font-medium">
                    Most Popular
                  </span>
                </div>}
              
              <CardHeader className="text-center">
                <CardTitle className="text-2xl">{plan.name}</CardTitle>
                <div className="mt-4">
                  <span className="text-4xl font-bold">{formatPrice(plan.price)}</span>
                  <span className="text-muted-foreground ml-2">{plan.period}</span>
                </div>
                <CardDescription className="mt-4">
                  {plan.description}
                </CardDescription>
              </CardHeader>

              <CardContent>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, idx) => <li key={idx} className="flex items-center gap-3">
                      <Check className="h-5 w-5 text-primary flex-shrink-0" />
                      <span className="text-sm">{feature}</span>
                    </li>)}
                </ul>

                <Button 
                  variant={plan.popular ? "hero" : "outline"} 
                  className="w-full" 
                  size="lg"
                  onClick={() => handleOrderPackage(plan.name)}
                >
                  {plan.cta}
                </Button>
              </CardContent>
            </Card>)}
        </div>
      </div>
    </section>;
};
export default Pricing;