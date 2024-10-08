import React from "react";
import Spacing from "../../Components/Spacing/Spacing";
import PaymentHistory from "../../Components/Payments/PaymentHistory";
import Invoice from "../../Components/Payments/Invoice";

const OnlinePayment = () => {
  return (
    <>
      <Spacing lg={10} md={80} />
      <hr />
      <Invoice/>
      <Spacing lg={200} md={80} />
    </>
  );
};

export default OnlinePayment;
