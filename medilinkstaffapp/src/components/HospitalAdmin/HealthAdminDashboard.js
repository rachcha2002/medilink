import React from "react";
import "../Main/Main.css";
import PageTitle from "../Common/PageTitle";

import Container from "react-bootstrap/Container";
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from 'recharts';

import PendingPayments from "./Payments/Pages/PendingPayments";


// Function to generate dummy data
const generateDummyData = () => {
  const data = [];
  const today = new Date();
  
  // Calculate the end date (14 days from today)
  const endDate = new Date(today);
  endDate.setDate(today.getDate() + 7);

  // Define rush hour times
  const rushHours = [
    '08:00', '09:00', '10:00', // Morning rush hour
    '16:00', '17:00', '18:00', // Evening rush hour
  ];

  // Generate data for each day
  while (today <= endDate) {
    rushHours.forEach(hour => {
      const appointmentCount = Math.floor(Math.random() * 10) + 1; // Random appointments count (1 to 10)
      data.push({
        dateTime: `${today.toISOString().split('T')[0]} ${hour}`, // Format date and time
        appointmentCount,
      });
    });
    today.setDate(today.getDate() + 1); // Move to the next day
  }

  return data;
};

const HealthAdminDashboard = () => {
  const dummyData = generateDummyData();

  return (
    <main id="main" className="main">
      <div style={{ marginTop: "30px" }}>
        <PageTitle title="Health Admin Dashboard" url="/hospitaladmin" />
      </div>
      <Container
      className="mt-3"
      style={{
        backgroundColor: "rgba(255, 255, 255, 0.8)",
        borderRadius: "10px",
        padding: "20px",
      }}
    >
      <div style={{ width: '100%', height: 500 }}>
        <ResponsiveContainer>
          <BarChart data={dummyData} >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis 
              dataKey="dateTime" 
              angle={-45} 
              textAnchor="end" 
              interval={0} // Show all labels
              tick={{ fontSize: 10 }} // Reduce font size
            />
            <YAxis />
            <Tooltip />
            <Bar dataKey="appointmentCount" fill="#82ca9d" />
          </BarChart>
        </ResponsiveContainer>
      </div>
      </Container>


      <PendingPayments/>

    </main>
  );
};

export default HealthAdminDashboard;
