import React from "react";

import Spacing from "../../Components/Spacing/Spacing";

import PaymentHistory from "../../Components/Payments/PaymentHistory";
import AddNewAlert from "../../Components/Payments/AddNewAlert";

const OnlinePayment = () => {
  return (
    <>
      <Spacing lg={10} md={80} />

      <hr />
     <AddNewAlert/>
      <Spacing lg={200} md={80} />
    </>
  );
};

export default OnlinePayment;
