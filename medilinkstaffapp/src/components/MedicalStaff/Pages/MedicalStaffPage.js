import React, { useState } from "react";
import { Tabs, Tab, Button, Container } from "react-bootstrap";
import DoctorsList from "./DoctorsList";
import NursesList from "./NursesList";
import { useNavigate } from "react-router-dom";
import "./Main.css";
import PageTitle from "../../Common/PageTitle";

const MedicalStaffPage = () => {
  const [key, setKey] = useState("doctors");
  const navigate = useNavigate();

  return (
    <>
      <main id="main" className="main">
        <PageTitle title="Medical Staff" url="/hospitaladmin/mediaclstaff" />
        <Container className="mt-4">
          <div className="d-flex justify-content-between mb-3">
            <Button
              variant="dark"
              onClick={() => navigate("/hospitaladmin/addmedicalstaff")}
            >
              Add New Staff
            </Button>
          </div>

          <Tabs activeKey={key} onSelect={(k) => setKey(k)} className="mb-3">
            <Tab eventKey="doctors" title="Doctors">
              <DoctorsList />
            </Tab>
            <Tab eventKey="nurses" title="Nurses">
              <NursesList />
            </Tab>
          </Tabs>
        </Container>
      </main>
    </>
  );
};

export default MedicalStaffPage;
