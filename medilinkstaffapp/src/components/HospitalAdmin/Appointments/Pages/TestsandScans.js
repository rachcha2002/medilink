import React, { useState, useEffect } from 'react';
import {Tab,Container,Tabs} from 'react-bootstrap';
import PageTitle from "../../../Common/PageTitle";
import Filteredtestsandscanslist from "../Components/Filteredtestsandscans"; // Assuming this is the table component to display records
import axios from 'axios';

function TestsandScans() {
  const [selectedTab, setSelectedTab] = useState('pending');
  const [appointments, setAppointments] = useState([]);

  // Fetch data whenever the tab (status) changes
  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/appointment/hospitalappointments/testscan/H001');
        const allAppointments = response.data;
        
        // Filter appointments based on selected tab (status)
        const filteredAppointments = allAppointments.filter(appointment => appointment.status === selectedTab);
        setAppointments(filteredAppointments);
      } catch (error) {
        console.error('Error fetching appointments:', error);
      }
    };

    fetchAppointments();
  }, [selectedTab]); // Re-fetch whenever `selectedTab` changes

  return (
    <main id="main" className="main">
      <PageTitle title="Tests and Scans appointments" url="/hospitaladmin/TestsandScansappointments" />
      <Container
      className="mt-3"
      style={{
        backgroundColor: "rgba(255, 255, 255, 0.8)",
        borderRadius: "10px",
        padding: "20px",
      }}
    >
      <Tabs
        defaultActiveKey="Pending"
        id="justify-tab-example"
        className="mb-3"
        variant="pills"
        justify
        onSelect={(tabKey) => setSelectedTab(tabKey.toLowerCase())} // Update selected tab when user clicks on a tab
      >
        <Tab eventKey="Pending" title="Pending">
          {/* Render filtered records for 'Pending' status */}
          <Filteredtestsandscanslist appointments={appointments} />
        </Tab>
        <Tab eventKey="Approved" title="Approved">
          {/* Render filtered records for 'Approved' status */}
          <Filteredtestsandscanslist appointments={appointments} />
        </Tab>
        <Tab eventKey="Completed" title="Completed">
          {/* Render filtered records for 'Completed' status */}
          <Filteredtestsandscanslist appointments={appointments} />
        </Tab>
      </Tabs>
      </Container>
    </main>
  );
}

export default TestsandScans