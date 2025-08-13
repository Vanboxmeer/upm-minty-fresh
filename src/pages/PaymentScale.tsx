import { useEffect } from "react";

const PaymentScale = () => {
  useEffect(() => {
    const packageDetails = encodeURIComponent("Package: Scale Package - $25,000 (one-time)");
    window.location.href = `/?selection=${packageDetails}#contact-form`;
  }, []);

  return null;
};

export default PaymentScale;