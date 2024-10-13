import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";

import OnlinePayment from "./OnlinePayment";
import MyPayments from "./MyPayments";

import PaymentFailure from "../../Components/Payments/PaymentFailure";
import PaymentVerification from "../../Components/Payments/PaymentVerification";
import PayementsFullPage from "./PayementsFullPage";

export default function PaymentsMain() {
  return (
    <Routes>
      <Route path="/payonline" element={<OnlinePayment />} />
      <Route path="/mypayments" element={<MyPayments />} />
      <Route path="/verifypay/*" element={<PaymentVerification />} />
      <Route path="/failedpay/*" element={<PaymentFailure />} />
      <Route path="/fullpage" element={<PayementsFullPage />} />
    </Routes>
  );
}
