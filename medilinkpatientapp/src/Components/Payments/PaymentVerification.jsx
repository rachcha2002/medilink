import React, { useEffect, useState } from 'react';
import PaymentSuccess from './PaymentSuccess';  // Importing PaymentSuccess component
import PaymentFailure from './PaymentFailure';

const PaymentVerification = () => {
  const [paymentData, setPaymentData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [orderId, setOrderId] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const urlParams = new URLSearchParams(window.location.search);
        const orderIdParam = urlParams.get('order_id'); // Get orderId from URL parameters
        setOrderId(orderIdParam);
      
        const response = await fetch(`${process.env.React_App_Backend_URL}/api/payment/billing/onlinepayment/${orderIdParam}`);
        const data = await response.json();
        setPaymentData(data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  // If payment is successful, call the PaymentSuccess component
  if (paymentData.status_code === 2 && paymentData.sv) {
    return <PaymentSuccess  />;  // Call PaymentSuccess component with paymentId
  } else {
    // If payment fails, call the PaymentFailure component
    return <PaymentFailure  />;
  }
};

export default PaymentVerification;
