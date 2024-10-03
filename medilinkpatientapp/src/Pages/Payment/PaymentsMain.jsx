import React from 'react'
import {
    BrowserRouter as Router,
    Route,
    Routes,
    Navigate,
  } from "react-router-dom";
import PayOnline from '../../Components/Payments/PayOnline';
import PaymentHistory from '../../Components/Payments/PaymentHistory';
import OnlinePayment from './OnlinePayment';
import MyPayments from "./MyPayments"

export default function PaymentsMain(){
    return(
        <Routes>
           
            <Route path="/payonline" element={<OnlinePayment />} />
            <Route path="/mypayments" element={<MyPayments />} />
          
        </Routes>
    );     

}