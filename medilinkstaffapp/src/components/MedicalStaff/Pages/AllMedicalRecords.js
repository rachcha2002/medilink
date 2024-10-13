import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import PageTitle from "../../Common/PageTitle";
import "../../Main/Main.css";
import MedicalRecords from "./MedicalRecords";
import { useAuthContext } from "../../../context/AuthContext"; // Assuming you have an AuthContext

function AllMedicalRecords({ type, toggleLoading }) {
  const { user } = useAuthContext(); // Fetch user from context
  const [hospitalName, setHospitalName] = useState("");
  const [apiUrl, setApiUrl] = useState(""); // State to store dynamic API URL
  const [pageTitle, setPageTitle] = useState("All Medical Reports"); // Set default page title
  const [isLoading, setIsLoading] = useState(true); // Loading state to prevent premature rendering

  // Effect to set hospital name from user context
  useEffect(() => {
    if (user && user.hospital) {
      setHospitalName(user.hospital); // Set hospital name from user context
    }
  }, [user]);

  // Effect to set API URL once the hospital name is available
  useEffect(() => {
    if (hospitalName) {
      const generatedApiUrl = `${process.env.REACT_APP_BACKEND_URL}/api/medicalinfo/medical-records/hospital/${hospitalName}`;
      setApiUrl(generatedApiUrl);

      console.log("API URL generated: ", generatedApiUrl); // Debugging
      setIsLoading(false); // Stop loading after setting API URL
    }
  }, [hospitalName]);

  // Conditional rendering based on loading state
  if (isLoading) {
    return (
      <main id="main" className="main">
        <h4>Loading...</h4> {/* Loading state before rendering the component */}
      </main>
    );
  }

  return (
    <main id="main" className="main">
      <PageTitle title={pageTitle} url="/mltstaff/reportlist" />
      <MedicalRecords
        apiUrl={apiUrl}
        title={pageTitle}
        toggleLoading={toggleLoading}
      />
    </main>
  );
}

export default AllMedicalRecords;
