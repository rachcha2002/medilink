import React from "react";

import Spacing from "../../Components/Spacing/Spacing";
import PayOnline from "../../Components/Payments/PayOnline";

const OnlinePayment = () => {
  return (
    <>
      <Spacing lg={10} md={80} />

      <hr />
      <PayOnline />
      <Spacing lg={200} md={80} />
    </>
  );
};

export default OnlinePayment;
