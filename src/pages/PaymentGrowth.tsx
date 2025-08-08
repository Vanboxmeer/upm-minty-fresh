import Header from "@/components/Header";
import Payment from "@/components/Payment";
import Footer from "@/components/Footer";

const PaymentGrowth = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Payment planName="Growth Package" planType="growth" />
      <Footer />
    </div>
  );
};

export default PaymentGrowth;