import React, { useState, useEffect } from "react";
import SystemAdminDbCard from "./SystemAdminDbcard";

function SystemAdminDashboard({ toggleLoading }) {
  const [hospitalAdminData, setHospitalAdminData] = useState([]);
  const [hospitalData, setHospitalData] = useState([]);

  useEffect(() => {
    // Fetch the data from backend API for hospital admins
    fetch(`${process.env.REACT_APP_BACKEND_URL}/api/hospitaladmin/gethospitaladmins`)
      .then((response) => response.json())
      .then((data) => {
        console.log("Fetched Hospital Admin Data:", data);
        setHospitalAdminData(data); // Set the fetched hospital admin data into state
      })
      .catch((error) => console.error("Error fetching hospital admin data:", error));
  }, []);

  useEffect(() => {
    // Fetch the data from backend API for hospitals
    fetch(`${process.env.REACT_APP_BACKEND_URL}/api/hospital/gethospitals`)
      .then((response) => response.json())
      .then((data) => {
        console.log("Fetched Hospital Data:", data);
        setHospitalData(data); // Set the fetched hospital data into state
      })
      .catch((error) => console.error("Error fetching hospital data:", error));
  }, []);

  // Get the counts of hospital admins and hospitals
  const hospitalAdminCount = hospitalAdminData.length;
  const hospitalCount = hospitalData.length;
  const registrationCount = hospitalCount;

  return (
    <section>
      <div className="col">
        <div className="row">
          <SystemAdminDbCard
            title="Total Hospital Admins"
            value={hospitalAdminCount}
            iconClass="bi-people-fill"
            duration="Today"
          />
          <SystemAdminDbCard
            title="Total Hospitals"
            value={hospitalCount}
            iconClass="bi bi-hospital-fill"
            duration="Today"
          />
          <SystemAdminDbCard
            title="Total Registrations"
            value={registrationCount}
            iconClass="bi bi-clipboard2-data"
            duration="Today"
          />
        </div>
      </div>
    </section>
  );
}

export default SystemAdminDashboard;
