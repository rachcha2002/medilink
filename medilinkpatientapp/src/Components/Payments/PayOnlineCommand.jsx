class PayOnlineCommand {
    constructor(billDetails) {
      this.paymentData = {
        first_name: billDetails.patientName.split(" ")[0],
        last_name: billDetails.patientName.split(" ")[1] || "",
        email: billDetails.patientEmail,
        phone: billDetails.contactNumber,
        address: "Colombo, Sri Lanka",
        city: "Colombo",
        country: "Sri Lanka",
        order_id: billDetails.billNo,
        items: billDetails.billNo,
        currency: "LKR",
        amount: billDetails.totalAmount.toFixed(2),
      };
    }
  
    async execute() {
      try {
        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/payment/billing/onlinepayment/initiate`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(this.paymentData),
        });
  
        if (response.ok) {
          const responseData = await response.text();
          const tempDiv = document.createElement("div");
          tempDiv.innerHTML = responseData;
          const form = tempDiv.querySelector("form");
          document.body.appendChild(form);
          form.submit();  // Automatically submit the form to redirect to PayHere
        } else {
          throw new Error("Failed to initiate payment");
        }
      } catch (error) {
        console.error("Error initiating payment:", error.message);
        alert("Error initiating payment. Please try again later.");
      }
    }
  }
  
  export default PayOnlineCommand;