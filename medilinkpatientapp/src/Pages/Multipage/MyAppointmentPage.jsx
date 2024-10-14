import React, { useEffect, useState } from 'react';
import MultiplePageHeading from '../../Components/Hero/MultiplePageHeading';
import axios from 'axios';
import { useAuthContext } from "../../Context/AuthContext";
import { Table, Button, Modal, Row, Col, Form } from 'react-bootstrap';

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
  const [editableDate, setEditableDate] = useState('');
  const [editableTime, setEditableTime] = useState('');

  useEffect(() => {
    if (!userid) return; // Exit if userid is not available

    const fetchAppointments = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/appointment/getappointmentlist/${userid}`);
        console.log('API Response:', response.data);

        // Ensure response data has the expected properties
        const clinicandchannelingAppointments = [
          ...(response.data.clinicappointments || []).map(appointment => ({ ...appointment, type: 'clinic' })),
          ...(response.data.channelingappointments || []).map(appointment => ({ ...appointment, type: 'channeling' })),
        ];
        const scanappointments = [
          ...(response.data.testscanappointments || []).map(appointment => ({ ...appointment, type: 'testscan' }))
        ];

        setAppointments(clinicandchannelingAppointments);
        settestsandscans(scanappointments); 
        console.log('Appointments:', clinicandchannelingAppointments);
        console.log('Tests and Scans:', scanappointments);
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
    setEditableDate(appointment.appointmentDate);
    setEditableTime(appointment.appointmentTime);
    setShowClinicModal(true);
  };

  const handleCloseScanModal = () => setShowScanModal(false);
  const handleShowScanModal = (appointment) => {
    setSelectedScanAppointment(appointment);
    setEditableDate(appointment.appointmentDate);
    setEditableTime(appointment.appointmentTime);
    setShowScanModal(true);
  };

  const filterAppointments = (appointmentsList) => {
    return appointmentsList.filter(appointment => {
      const appointmentStatus = appointment.status ? appointment.status.toLowerCase() : '';
      const statusMatch = selectedStatus === 'all' || appointmentStatus === selectedStatus.toLowerCase();
      return statusMatch;
    });
  };

  const handleReschedule = async (appointment) => {
    try {
      const updatedAppointment = {
        ...appointment,
        appointmentDate: editableDate,
        appointmentTime: editableTime,
      };

      await axios.put(`${process.env.REACT_APP_BACKEND_URL}/api/appointment/updateappointment/${appointment.type}/${appointment._id}`, updatedAppointment);
      setAppointments(prevAppointments => prevAppointments.map(appt => appt._id === appointment._id ? updatedAppointment : appt));
      settestsandscans(prevTestsAndScans =>prevTestsAndScans.map(appt => appt._id === appointment._id ? updatedAppointment : appt));
      setShowClinicModal(false);
      setShowScanModal(false);
    } catch (error) {
      console.error('Error rescheduling appointment:', error);
    }
  };

  const handleDelete = async (appointment) => {
    try {
      await axios.delete(`${process.env.REACT_APP_BACKEND_URL}/api/appointment/deleteappointment/${appointment.type}/${appointment._id}`);
      setAppointments(prevAppointments => prevAppointments.filter(appt => appt._id !== appointment._id));
      settestsandscans(prevTestsAndScans => prevTestsAndScans.filter(appt => appt._id !== appointment._id));
      setShowClinicModal(false);
      setShowScanModal(false);
    } catch (error) {
      console.error('Error deleting appointment:', error);
    }
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
              className={`me-3 mb-2 st-btn st-style1 st-color1 st-size-medium ${selectedStatus === status ? 'active' : ''}`}
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
                  <Button className="st-btn st-style1 st-color1 st-size-medium me-2 mb-2" onClick={() => { handleShowClinicModal(appointment); setEditableDate(appointment.appointmentDate.split('T')[0]); }}>View</Button>
                  {appointment.status === 'approved' && (
                     <Button variant="success" size="lg" className="mb-2" onClick={()=>PayForAppointment(appointment)}>Pay</Button>
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
                  <Button className="st-btn st-style1 st-color1 st-size-medium me-2 mb-2" onClick={() => { handleShowScanModal(appointment); setEditableDate(appointment.appointmentDate.split('T')[0]); }}>View</Button>
                  {appointment.status === 'approved' && (
                     <Button variant="success" size="lg" className="mb-2" onClick={()=>PayForAppointment(appointment)}>Pay</Button>
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
              {selectedClinicAppointment.status === 'pending' ? (
                <>
                <p><strong>Hospital:</strong>{selectedClinicAppointment.hospitalName}</p>
                <p><strong>Doctor Name:</strong> {selectedClinicAppointment.doctorName}</p>
                  <Form.Group controlId="formAppointmentDate">
                    <Form.Label>Appointment Date</Form.Label>
                    <Form.Control
                      type="date"
                      value={editableDate}
                      onChange={(e) => setEditableDate(e.target.value)}
                    />
                  </Form.Group>
                  <Form.Group controlId="formAppointmentTime">
                    <Form.Label>Appointment Time</Form.Label>
                    <Form.Control
                      type="time"
                      value={editableTime}
                      onChange={(e) => setEditableTime(e.target.value)}
                    />
                  </Form.Group>
                  <Button className="mt-2 st-btn st-style1 st-color1 st-size-medium me-2" onClick={() => handleReschedule(selectedClinicAppointment)}>Reschedule</Button>
                  <Button variant="danger" size="lg" className="mt-2" onClick={() => handleDelete(selectedClinicAppointment)}>Delete</Button>
                </>
              ) : selectedClinicAppointment.status === 'rejected' ? (
                <>

                  <p><strong>Appointment Date:</strong> {new Date(selectedClinicAppointment.appointmentDate).toLocaleDateString()}</p>
                  <p><strong>Appointment Time:</strong> {selectedClinicAppointment.appointmentTime}</p>
                  <p><strong>Hospital:</strong>{selectedClinicAppointment.hospitalName}</p>
                  <p><strong>Doctor Name:</strong> {selectedClinicAppointment.doctorName}</p>
                  <Button variant="danger" size="lg" onClick={() => handleDelete(selectedClinicAppointment)}>Delete</Button>
                </>
              ) : (
                <>
                  <p><strong>Appointment Date:</strong> {new Date(selectedClinicAppointment.appointmentDate).toLocaleDateString()}</p>
                  <p><strong>Appointment Time:</strong> {selectedClinicAppointment.appointmentTime}</p>
                  <p><strong>Hospital:</strong>{selectedClinicAppointment.hospitalName}</p>
                  <p><strong>Doctor Name:</strong> {selectedClinicAppointment.doctorName}</p>
                  {(selectedClinicAppointment.status === 'approved' || selectedClinicAppointment.status === 'completed') && (
                    <>
                      <p><strong>Payment:</strong> Rs.{selectedClinicAppointment.payment}</p>
                      {selectedClinicAppointment.status === 'approved' && (
                        <Button variant="success" size="lg" onClick={()=>PayForAppointment(selectedClinicAppointment)}>Pay</Button>
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
              {selectedScanAppointment.status === 'pending' ? (
                <>
                <p><strong>Hospital:</strong>{selectedScanAppointment.hospitalName}</p>
                <p><strong>Scan Name:</strong> {selectedScanAppointment.scanName}</p>
                  <Form.Group controlId="formAppointmentDate">
                    <Form.Label>Appointment Date</Form.Label>
                    <Form.Control
                      type="date"
                      value={editableDate}
                      onChange={(e) => setEditableDate(e.target.value)}
                    />
                  </Form.Group>
                  <Form.Group controlId="formAppointmentTime">
                    <Form.Label>Appointment Time</Form.Label>
                    <Form.Control
                      type="time"
                      value={editableTime}
                      onChange={(e) => setEditableTime(e.target.value)}
                    />
                  </Form.Group>
                  <Button className="mt-2 st-btn st-style1 st-color1 st-size-medium me-2" onClick={() => handleReschedule(selectedScanAppointment)}>Reschedule</Button>
                  <Button variant="danger" size="lg" className="mt-2" onClick={() => handleDelete(selectedScanAppointment)}>Delete</Button>
                </>
              ) : selectedScanAppointment.status === 'rejected' ? (
                <>
                   <p><strong>Appointment Date:</strong> {new Date(selectedScanAppointment.appointmentDate).toLocaleDateString()}</p>
                   <p><strong>Appointment Time:</strong> {selectedScanAppointment.appointmentTime}</p>
                   <p><strong>Hospital:</strong>{selectedScanAppointment.hospitalName}</p>
                  <p><strong>Scan Name:</strong> {selectedScanAppointment.scanName}</p>
                  <Button variant="danger" size="lg" onClick={() => handleDelete(selectedScanAppointment)}>Delete</Button>
                </>
              ) : (
                <>
                  <p><strong>Appointment Date:</strong> {new Date(selectedScanAppointment.appointmentDate).toLocaleDateString()}</p>
                  <p><strong>Appointment Time:</strong> {selectedScanAppointment.appointmentTime}</p>
                  <p><strong>Hospital:</strong>{selectedScanAppointment.hospitalName}</p>
                  <p><strong>Scan Name:</strong> {selectedScanAppointment.scanName}</p>
                  {(selectedScanAppointment.status === 'approved' || selectedScanAppointment.status === 'completed') && (
                    <>
                      <p><strong>Payment:</strong> Rs.{selectedScanAppointment.payment}</p>
                      {selectedScanAppointment.status === 'approved' && (
                        <Button variant="success" size="lg" onClick={()=>PayForAppointment(selectedScanAppointment)}>Pay</Button>
                      )}
                    </>
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
