import Header from "@/components/Header";
import Payment from "@/components/Payment";
import Footer from "@/components/Footer";

const PaymentScale = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Payment planName="Scale Package" planType="scale" />
      <Footer />
    </div>
  );
};

export default PaymentScale;