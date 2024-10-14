import React, { useEffect, useState } from 'react';
import MultiplePageHeading from '../../Components/Hero/MultiplePageHeading';
import axios from 'axios';
import { useAuthContext } from "../../Context/AuthContext";
import { Table, Button, Modal, Row, Col } from 'react-bootstrap';

import PayOnlineCommand from "../../Components/Payments/PayOnlineCommand"

const heroData = {
  bgImg: `/images/hero-bg4.jpg`,
  title: `My Appointments`,
};

const MyAppointmentPage = () => {
  const auth = useAuthContext();
  const userid = auth?.user?.patientID; // Ensure auth.user and patientID exist
  const [appointments, setAppointments] = useState([]);
  const [testsandscans, settestsandscans] = useState([]);
  const [showClinicModal, setShowClinicModal] = useState(false);
  const [showScanModal, setShowScanModal] = useState(false);
  const [selectedClinicAppointment, setSelectedClinicAppointment] = useState(null);
  const [selectedScanAppointment, setSelectedScanAppointment] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState('all');


  

  useEffect(() => {
    if (!userid) return; // Exit if userid is not available

    const fetchAppointments = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/appointment/getappointmentlist/${userid}`);
        console.log('API Response:', response.data);

        // Ensure response data has the expected properties
        const clinicandchannelingAppointments = [
          ...(response.data.clinicappointments || []),
          ...(response.data.channelingappointments || []),
        ];
        const scanappointments = [...(response.data.testscanappointments || [])];

        setAppointments(clinicandchannelingAppointments);
        settestsandscans(scanappointments); 
      } catch (error) {
        console.error('Error fetching appointments:', error);
      }
    };

    fetchAppointments();
  }, [userid]);



  const PayForAppointment = async (selectedAppointment) => {
    try {
      console.log('Selected Appointment:', selectedAppointment);
      
      // Step 1: Fetch the bill details for the selected appointment
      const response = await axios.get(`http://localhost:5000/api/payment/billing/appointment/${selectedAppointment._id}`);
      
      const billDetails = response.data;

      // Step 2: Ensure bill details are available
      if (!billDetails || !billDetails.billNo || !billDetails.totalAmount) {
        throw new Error('Bill details are missing or incomplete');
      }

      // Step 3: Create an instance of PayOnlineCommand with the fetched bill details
      const payCommand = new PayOnlineCommand(billDetails);

      // Step 4: Execute the payment initiation process
      await payCommand.execute();
    } catch (error) {
      console.error('Error initiating payment:', error);
      // Optionally show an alert or handle error gracefully
    }
  };

  const handleCloseClinicModal = () => setShowClinicModal(false);
  const handleShowClinicModal = (appointment) => {
    setSelectedClinicAppointment(appointment);
    setShowClinicModal(true);
  };

  const handleCloseScanModal = () => setShowScanModal(false);
  const handleShowScanModal = (appointment) => {
    setSelectedScanAppointment(appointment);
    setShowScanModal(true);
  };

  const filterAppointments = (appointmentsList) => {
    return appointmentsList.filter(appointment => {
      const appointmentStatus = appointment.status ? appointment.status.toLowerCase() : '';
      const statusMatch = selectedStatus === 'all' || appointmentStatus === selectedStatus.toLowerCase();
      return statusMatch;
    });
  };

  // Filter both clinic/channeling and scan/test appointments
  const filteredAppointments = filterAppointments(appointments);
  const filteredTestsAndScans = filterAppointments(testsandscans);

  return (
    <>
      <MultiplePageHeading {...heroData} />
      <Row className="m-3">
        <Col>
          {['all', 'pending', 'rejected', 'approved', 'completed'].map(status => (
            <Button
              key={status}
              className={`me-3 st-btn st-style1 st-color1 st-size-medium ${selectedStatus === status ? 'active' : ''}`}
              onClick={() => setSelectedStatus(status)}
            >
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </Button>
          ))}
        </Col>
      </Row>

      <h3 className="m-3">Channeling and Clinic Appointments</h3>
      <div className="m-2 table-responsive">
      <Table className="m-3">
        <thead>
          <tr>
            <th>Appointment Date</th>
            <th>Appointment Time</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredAppointments.length === 0 ? (
            <tr>
              <td colSpan="4" className="text-center">No appointments found.</td>
            </tr>
          ) : (
            filteredAppointments.map(appointment => (
              <tr key={appointment._id}>
                <td>{new Date(appointment.appointmentDate).toLocaleDateString()}</td>
                <td>{appointment.appointmentTime}</td>
                <td>
                  <Button className="st-btn st-style1 st-color1 st-size-medium" onClick={() => handleShowClinicModal(appointment)}>View</Button>
                  {appointment.status === 'approved' && (
                     <Button variant="success" style={{ marginLeft: '10px' }}  onClick={()=>PayForAppointment(appointment)}>Pay</Button>
                  )}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </Table>
      </div>

      <h3 className="m-3">Test and Scan Appointments</h3>
      <div className="m-2 table-responsive">
      <Table className="m-3">
        <thead>
          <tr>
            <th>Appointment Date</th>
            <th>Appointment Time</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredTestsAndScans.length === 0 ? (
            <tr>
              <td colSpan="4" className="text-center">No appointments found.</td>
            </tr>
          ) : (
            filteredTestsAndScans.map(appointment => (
              <tr key={appointment._id}>
                <td>{new Date(appointment.appointmentDate).toLocaleDateString()}</td>
                <td>{appointment.appointmentTime}</td>
                <td>
                  <Button className="st-btn st-style1 st-color1 st-size-medium" onClick={() => handleShowScanModal(appointment)}>View</Button>
                  {appointment.status === 'approved' && (
                     <Button variant="success" onClick={()=>PayForAppointment(appointment)}>Pay</Button>
                  )}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </Table></div>

      <Modal show={showClinicModal} onHide={handleCloseClinicModal}>
        <Modal.Header closeButton>
          <Modal.Title>Clinic Appointment Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedClinicAppointment && (
            <>
              <p><strong>Appointment Date:</strong> {new Date(selectedClinicAppointment.appointmentDate).toLocaleDateString()}</p>
              <p><strong>Appointment Time:</strong> {selectedClinicAppointment.appointmentTime}</p>
              <p><strong>Doctor Name:</strong> {selectedClinicAppointment.doctorName}</p>
              {(selectedClinicAppointment.status === 'approved' || selectedClinicAppointment.status === 'completed') && (
                <>
                  <p><strong>Payment:</strong> Rs.{selectedClinicAppointment.payment}</p>
                  {selectedClinicAppointment.status === 'approved' && (
                     <Button variant="success" style={{ marginLeft: '10px' }} onClick={()=>PayForAppointment(selectedClinicAppointment)}>Pay</Button>
                  )}
                </>
              )}
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseClinicModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showScanModal} onHide={handleCloseScanModal}>
        <Modal.Header closeButton>
          <Modal.Title>Scan Appointment Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedScanAppointment && (
            <>
              <p><strong>Appointment Date:</strong> {new Date(selectedScanAppointment.appointmentDate).toLocaleDateString()}</p>
              <p><strong>Appointment Time:</strong> {selectedScanAppointment.appointmentTime}</p>
              <p><strong>Scan Name:</strong> {selectedScanAppointment.scanName}</p>
              {(selectedScanAppointment.status === 'approved' || selectedScanAppointment.status === 'completed') && (
                <>
                  <p><strong>Payment:</strong> Rs.{selectedScanAppointment.payment}</p>
                  {selectedScanAppointment.status === 'approved' && (
                    <Button variant="success" onClick={()=>PayForAppointment(selectedScanAppointment)}>Pay</Button>
                  )}
                </>
              )}
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseScanModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default MyAppointmentPage;
