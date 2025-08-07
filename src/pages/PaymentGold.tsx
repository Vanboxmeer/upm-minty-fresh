import Header from "@/components/Header";
import Payment from "@/components/Payment";
import Footer from "@/components/Footer";

const PaymentGold = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Payment planName="Gold Membership Plan" planType="gold" />
      <Footer />
    </div>
  );
};

export default PaymentGold;