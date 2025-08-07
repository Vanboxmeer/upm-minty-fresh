import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { CreditCard, Coins, Calendar } from "lucide-react";

interface PaymentProps {
  planName: string;
  planType: "gold" | "silver";
}

const Payment = ({ planName, planType }: PaymentProps) => {
  const planDetails = {
    gold: {
      monthly: { price: "$250", fee: "1%" },
      annual: { price: "$2,700", fee: "0.75%", savings: "10%" }
    },
    silver: {
      monthly: { price: "$995", fee: "3.45%" },
      annual: { price: "$10,746", fee: "2.96%", savings: "10%" }
    }
  };

  const currentPlan = planDetails[planType];

  return (
    <section id="payment" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Subscribe to {planName}
          </h2>
          <p className="text-lg text-muted-foreground">
            Choose your billing frequency and payment method
          </p>
        </div>

        <Tabs defaultValue="monthly" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="monthly" className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              Monthly
            </TabsTrigger>
            <TabsTrigger value="annual" className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              Annual
              <Badge variant="secondary" className="ml-2">Save {currentPlan.annual.savings}</Badge>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="monthly">
            <Card className="mb-8">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl">{planName} - Monthly</CardTitle>
                <div className="text-4xl font-bold mt-4">
                  {currentPlan.monthly.price}
                  <span className="text-lg text-muted-foreground ml-2">per month</span>
                </div>
                <CardDescription>
                  Service fees reduced to {currentPlan.monthly.fee}
                </CardDescription>
              </CardHeader>
            </Card>
          </TabsContent>

          <TabsContent value="annual">
            <Card className="mb-8 border-primary">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl">{planName} - Annual</CardTitle>
                <div className="text-4xl font-bold mt-4">
                  {currentPlan.annual.price}
                  <span className="text-lg text-muted-foreground ml-2">per year</span>
                </div>
                <CardDescription>
                  Service fees reduced to {currentPlan.annual.fee} - Save {currentPlan.annual.savings} annually!
                </CardDescription>
              </CardHeader>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardHeader className="text-center">
              <CardTitle className="flex items-center justify-center gap-2">
                <CreditCard className="h-5 w-5" />
                Fiat Payment
              </CardTitle>
              <CardDescription>
                Pay with traditional payment methods
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button className="w-full" variant="outline">
                Credit/Debit Card
              </Button>
              <Button className="w-full" variant="outline">
                Bank Transfer
              </Button>
              <Button className="w-full" variant="outline">
                PayPal
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="text-center">
              <CardTitle className="flex items-center justify-center gap-2">
                <Coins className="h-5 w-5" />
                Crypto Payment
              </CardTitle>
              <CardDescription>
                Pay with cryptocurrency
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button className="w-full" variant="outline">
                Bitcoin (BTC)
              </Button>
              <Button className="w-full" variant="outline">
                Ethereum (ETH)
              </Button>
              <Button className="w-full" variant="outline">
                USDC/USDT
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="text-center mt-8">
          <p className="text-sm text-muted-foreground">
            All payments are processed securely. Contact us for custom payment arrangements.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Payment;