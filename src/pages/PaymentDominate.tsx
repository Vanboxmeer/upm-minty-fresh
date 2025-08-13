import { useEffect } from "react";

const PaymentDominate = () => {
  useEffect(() => {
    const packageDetails = encodeURIComponent("Package: Dominate Package - $100,000 (one-time)");
    window.location.href = `/?selection=${packageDetails}#contact-form`;
  }, []);

  return null;
};

export default PaymentDominate;