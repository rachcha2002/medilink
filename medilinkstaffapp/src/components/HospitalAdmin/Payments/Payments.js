import React, { useState } from "react";
import "../../Main/Main.css";
import BillingForm from "./Pages/BillingForm";
import BillList from "./Pages/BillList";
import { Container, Nav } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import PageTitle from "../../Common/PageTitle";

const Payments = () => {
  const [activeTab, setActiveTab] = useState("BillingForm");

  return (
    <main id="main" className="main">
      <PageTitle title="Payments" url="/hospitaladmin/payment"/>

      {/* Tab Navigation */}
      <Container className="tabs-container mt-3">
        <Nav variant="tabs" className="justify-content-start">
          <Nav.Item>
            <Nav.Link
              eventKey="Bills"
              active={activeTab === "Bills"}
              onClick={() => setActiveTab("Bills")}
              style={{ fontWeight: activeTab === "Bills" ? 'bold' : 'normal', color: activeTab === "Bills" ? '#007bff' : '#6c757d', fontSize: '1rem' }}
            >
              Bills
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link
              eventKey="BillingForm"
              active={activeTab === "BillingForm"}
              onClick={() => setActiveTab("BillingForm")}
              style={{ fontWeight: activeTab === "BillingForm" ? 'bold' : 'normal', color: activeTab === "BillingForm" ? '#007bff' : '#6c757d', fontSize: '1rem' }}
            >
              Billing Form
            </Nav.Link>
          </Nav.Item>
        </Nav>
      </Container>

      {/* Tab Content */}
      <div className="tab-content mt-3">
        {activeTab === "Bills" && (
          <div id="bills" className="tab-pane fade show active">
            <BillList />
          </div>
        )}
        {activeTab === "BillingForm" && (
          <div id="billing-form" className="tab-pane fade show active">
             <BillList />
          </div>
        )}
      </div>
    </main>
  );
};

export default Payments;
