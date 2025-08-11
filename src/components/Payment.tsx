import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { CreditCard, Coins, Calendar } from "lucide-react";
import { useState } from "react";
interface PaymentProps {
  planName: string;
  planType: "gold" | "silver" | "growth" | "scale" | "dominate";
}
interface PlanDetails {
  price: number;
  setupFee: number;
  savings?: number;
}
const Payment = ({
  planName,
  planType
}: PaymentProps) => {
  const [billingFrequency, setBillingFrequency] = useState("monthly");
  const getPlanDetails = (type: "gold" | "silver" | "growth" | "scale" | "dominate", isAnnual: boolean): PlanDetails => {
    const plans = {
      gold: {
        monthly: {
          price: 995,
          setupFee: 0
        },
        annual: {
          price: 995 * 10,
          setupFee: 0,
          savings: 995 * 2
        }
      },
      silver: {
        monthly: {
          price: 250,
          setupFee: 0
        },
        annual: {
          price: 250 * 10,
          setupFee: 0,
          savings: 250 * 2
        }
      },
      growth: {
        monthly: {
          price: 5000,
          setupFee: 0
        }
      },
      scale: {
        monthly: {
          price: 25000,
          setupFee: 0
        }
      },
      dominate: {
        monthly: {
          price: 100000,
          setupFee: 0
        }
      }
    };

    // Package plans don't have annual options
    if (type === "growth" || type === "scale" || type === "dominate") {
      return plans[type].monthly;
    }
    return isAnnual ? plans[type].annual : plans[type].monthly;
  };
  const planDetails = getPlanDetails(planType, billingFrequency === "annual");
  const isPackagePlan = ["growth", "scale", "dominate"].includes(planType);
  return <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            Complete Your {planName} {isPackagePlan ? "Package" : "Subscription"}
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {isPackagePlan ? "Choose your preferred payment method to order your package." : "Choose your billing frequency and preferred payment method to get started."}
          </p>
        </div>

        {!isPackagePlan ? <Tabs value={billingFrequency} onValueChange={setBillingFrequency} className="mb-8">
            <TabsList className="grid w-full grid-cols-2 max-w-md mx-auto">
              <TabsTrigger value="monthly">Monthly</TabsTrigger>
              <TabsTrigger value="annual">Annual</TabsTrigger>
            </TabsList>
            
            <TabsContent value="monthly" className="space-y-6">
              <Card className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-semibold">Monthly Plan</h3>
                  <div className="text-right">
                    <div className="text-2xl font-bold">${planDetails.price}</div>
                    <div className="text-sm text-muted-foreground">per month</div>
                  </div>
                </div>
                {planDetails.setupFee > 0 && <div className="flex justify-between items-center text-sm text-muted-foreground">
                    <span>Setup Fee</span>
                    <span>${planDetails.setupFee}</span>
                  </div>}
              </Card>
            </TabsContent>

            <TabsContent value="annual" className="space-y-6">
              <Card className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-semibold">Annual Plan</h3>
                  <div className="text-right">
                    <div className="text-2xl font-bold">${planDetails.price}</div>
                    <div className="text-sm text-muted-foreground">per year</div>
                    {planDetails.savings && <div className="text-sm text-green-600 font-medium">
                        Save ${planDetails.savings}
                      </div>}
                  </div>
                </div>
                {planDetails.setupFee > 0 && <div className="flex justify-between items-center text-sm text-muted-foreground">
                    <span>Setup Fee</span>
                    <span>${planDetails.setupFee}</span>
                  </div>}
              </Card>
            </TabsContent>
          </Tabs> : <Card className="p-6 mb-8">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold">{planName}</h3>
              <div className="text-right">
                <div className="text-2xl font-bold">${planDetails.price.toLocaleString()}</div>
                <div className="text-sm text-muted-foreground">one-time package</div>
              </div>
            </div>
          </Card>}

        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardHeader className="text-center">
              <CardTitle className="flex items-center justify-center gap-2">
                <CreditCard className="h-5 w-5" />
                Fiat Payment Options
              </CardTitle>
              <CardDescription>
                Traditional payment methods available
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="w-full p-3 border rounded-md bg-muted/50 text-center text-sm font-medium">
                Credit/Debit Card
              </div>
              
              <div className="w-full p-3 border rounded-md bg-muted/50 text-center text-sm font-medium">
                PayPal
              </div>
              
              <div className="w-full p-3 border rounded-md bg-muted/50 text-center text-sm font-medium">
                Bank Transfer
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="text-center">
              <CardTitle className="flex items-center justify-center gap-2">
                <Coins className="h-5 w-5" />
                Crypto Payment Options
              </CardTitle>
              <CardDescription>
                Cryptocurrency options available
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="w-full p-3 border rounded-md bg-muted/50 text-center text-sm font-medium">
                Bitcoin (BTC)
              </div>
              <div className="w-full p-3 border rounded-md bg-muted/50 text-center text-sm font-medium">
                Ethereum (ETH)
              </div>
              <div className="w-full p-3 border rounded-md bg-muted/50 text-center text-sm font-medium">
                USDC/USDT
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="text-center mt-8">
          <p className="text-sm text-muted-foreground">All payments are processed securely. contact@unitedpress.media for custom payment arrangements.</p>
        </div>
      </div>
    </section>;
};
export default Payment;