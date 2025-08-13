import { useEffect } from "react";

const PaymentGrowth = () => {
  useEffect(() => {
    const packageDetails = encodeURIComponent("Package: Growth Package - $5,000 (one-time)");
    window.location.href = `/?selection=${packageDetails}#contact-form`;
  }, []);

  return null;
};

export default PaymentGrowth;