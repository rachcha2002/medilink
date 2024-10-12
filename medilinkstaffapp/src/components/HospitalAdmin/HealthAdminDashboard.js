import React from "react";
import "../Main/Main.css";
import PageTitle from "../Common/PageTitle";


const HealthAdminDashboard = () => {
  return (
    <main id="main" className="main">
      <div  style={{ marginTop: "30px" }}>
      <PageTitle title="Health Admin Dashboard" url="/hospitaladmin" />
      </div>
    </main>
  );
};

export default HealthAdminDashboard;
