import React, { useState } from "react";
import "../../Main/Main.css";
import BillList from "./Pages/BillList";  // BillList component for listing bills
import PendingPayments from "./Pages/PendingPayments";  // PendingPayments component for pending payments
import { Container, Nav } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import PageTitle from "../../Common/PageTitle";

const Payments = () => {
  const [activeTab, setActiveTab] = useState("BillList");

  return (
    <main id="main" className="main">
      <PageTitle title="Payments" url="/hospitaladmin/payment"/>

      {/* Tab Navigation */}
      <Container className="tabs-container mt-3">
        <Nav variant="tabs" className="justify-content-start">
          <Nav.Item>
            <Nav.Link
              eventKey="BillList"
              active={activeTab === "BillList"}
              onClick={() => setActiveTab("BillList")}
              style={{ fontWeight: activeTab === "BillList" ? 'bold' : 'normal', color: activeTab === "BillList" ? '#007bff' : '#6c757d', fontSize: '1rem' }}
            >
              Bill List
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link
              eventKey="PendingPayments"
              active={activeTab === "PendingPayments"}
              onClick={() => setActiveTab("PendingPayments")}
              style={{ fontWeight: activeTab === "PendingPayments" ? 'bold' : 'normal', color: activeTab === "PendingPayments" ? '#007bff' : '#6c757d', fontSize: '1rem' }}
            >
              Pending Payments
            </Nav.Link>
          </Nav.Item>
        </Nav>
      </Container>

      {/* Tab Content */}
      <div className="tab-content mt-3">
        {activeTab === "BillList" && (
          <div id="bill-list" className="tab-pane fade show active">
            <BillList />
          </div>
        )}
        {activeTab === "PendingPayments" && (
          <div id="pending-payments" className="tab-pane fade show active">
            <PendingPayments />
          </div>
        )}
      </div>
    </main>
  );
};

export default Payments;
