import Header from "@/components/Header";
import Payment from "@/components/Payment";
import Footer from "@/components/Footer";

const PaymentDominate = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Payment planName="Dominate Package" planType="dominate" />
      <Footer />
    </div>
  );
};

export default PaymentDominate;