import React from 'react'
import {
    BrowserRouter as Router,
    Route,
    Routes,
    Navigate,
  } from "react-router-dom";
import PayOnline from '../../Components/Payments/PayOnline';
import PaymentHistory from '../../Components/Payments/PaymentHistory';

export default function PaymentsMain(){
    return(
        <Routes>
           
            <Route path="/payonline" element={<PayOnline />} />
            <Route path="/mypayments" element={<PaymentHistory />} />
          
        </Routes>
    );     

}