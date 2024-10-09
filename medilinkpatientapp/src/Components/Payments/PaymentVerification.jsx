import React, { useEffect, useState } from "react";
import PaymentSuccess from "./PaymentSuccess"; // Importing PaymentSuccess component
import PaymentFailure from "./PaymentFailure";
import { Spinner } from "react-bootstrap"; // Importing Spinner from react-bootstrap
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS

const PaymentVerification = () => {
  const [paymentData, setPaymentData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [orderId, setOrderId] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const urlParams = new URLSearchParams(window.location.search);
      const orderIdParam = urlParams.get("order_id"); // Get orderId from URL parameters
      setOrderId(orderIdParam);

      // Simulating fetching data without showing any server response
      try {
        const response = await fetch(
          `${process.env.REACT_APP_BACKEND_URL}/api/payment/billing/onlinepayment/${orderIdParam}`
        );
        const data = await response.json();
        setPaymentData(data);
      } catch {
        // No error handling or server response display
        setPaymentData({ status_code: 0 });
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ height: "100vh" }}
      >
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>
    );
  }

  // If payment is successful, call the PaymentSuccess component
  if (paymentData.status_code === 2 && paymentData.sv) {
    return <PaymentSuccess />; // Call PaymentSuccess component
  } else {
    // If payment fails, call the PaymentFailure component
    return <PaymentFailure />;
  }
};

export default PaymentVerification;
