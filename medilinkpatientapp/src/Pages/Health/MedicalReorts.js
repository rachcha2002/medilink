import React, { useState } from "react";
import { Tabs, Tab, Container } from "react-bootstrap";
import ReportList from "./ReportList"; // Import your ReportList component

const MedicalReports = () => {
  // State to manage which tab is active
  const [key, setKey] = useState("laboratory");

  return (
    <Container>
      <h3 className="mt-3">Patient Reports</h3>

      {/* Tabs for Laboratory and Radiology Reports */}
      <Tabs
        id="report-tabs"
        activeKey={key}
        onSelect={(k) => setKey(k)}
        className="mb-3"
      >
        {/* Laboratory Reports Tab */}
        <Tab eventKey="laboratory" title="Laboratory Reports">
          <ReportList reportType="laboratory" />
        </Tab>

        {/* Radiology Reports Tab */}
        <Tab eventKey="radiology" title="Radiology Reports">
          <ReportList reportType="radiology" />
        </Tab>
      </Tabs>
    </Container>
  );
};

export default MedicalReports;
