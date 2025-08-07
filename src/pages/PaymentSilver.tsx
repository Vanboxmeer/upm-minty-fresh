import Header from "@/components/Header";
import Payment from "@/components/Payment";
import Footer from "@/components/Footer";

const PaymentSilver = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Payment planName="Silver Membership Plan" planType="silver" />
      <Footer />
    </div>
  );
};

export default PaymentSilver;