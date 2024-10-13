import React from "react";
import "../Main/Main.css";
import PageTitle from "../Common/PageTitle";
import PendingPayments from "./Payments/Pages/PendingPayments";


const HealthAdminDashboard = () => {
  return (
    <main id="main" className="main">
      <div  style={{ marginTop: "30px" }}>
      <PageTitle title="Health Admin Dashboard" url="/hospitaladmin" />
      </div>

      <PendingPayments/>
    </main>
  );
};

export default HealthAdminDashboard;
