import React, { useState } from 'react';
import { Table, Button, Modal, Badge, Form, Row, Col } from 'react-bootstrap';
import html2pdf from "html2pdf.js";
import image from "../../../../images/logo.png";

function Filteredtestandscans({ appointments }) {
    const [show, setShow] = useState(false);
    const [selectedAppointment, setSelectedAppointment] = useState(null);
    const [searchName, setSearchName] = useState(''); // Search by patient/hospital name
    const [searchDate, setSearchDate] = useState(''); // Search by date
    const [searchTime, setSearchTime] = useState(''); // Search by time

    const handleClose = () => setShow(false);
    const handleShow = (appointment) => {
        setSelectedAppointment(appointment);
        setShow(true);
    };

    const generatePDF = () => {
        const element = document.createElement("div");
        element.innerHTML = `
          <div style="padding: 30px; font-family: 'Poppins', sans-serif; line-height: 1.6; color: #333;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
              <div>
                <img src="${image}" alt="Hospital Logo" style="width: 150px;">
              </div>
              <div style="text-align: right;">
                <h2 style="color: #555; margin: 0;">Test and Scan Appointment List</h2>
                <p style="margin: 5px 0;"><strong>Date:</strong> ${new Date().toLocaleDateString()}</p>
              </div>
            </div>
            <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
              <thead style="background-color: #f2f2f2;">
                <tr>
                  <th style="padding: 10px; border: 1px solid #ddd;">Patient Name</th>
                  <th style="padding: 10px; border: 1px solid #ddd;">Hospital Name</th>
                  <th style="padding: 10px; border: 1px solid #ddd;">Scan Name</th>
                </tr>
              </thead>
              <tbody>
                ${filteredAppointments.map(appointment => `
                  <tr>
                    <td style="padding: 10px; border: 1px solid #ddd;">${appointment.username}</td>
                    <td style="padding: 10px; border: 1px solid #ddd;">${appointment.hospitalName}</td>
                    <td style="padding: 10px; border: 1px solid #ddd;">${appointment.scanName}</td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        `;
      
        const options = {
          margin: 1,
          filename: `test-scan-appointment-list-${new Date().toLocaleDateString()}.pdf`,
          html2canvas: { scale: 2 },
          jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
        };
      
        html2pdf().set(options).from(element).save();
    };

    const handleApprove = async () => {
        if (selectedAppointment) {
            const payment = window.prompt('Enter the payment for the appointment:');
            if (payment) {
                console.log('Approving appointment:', selectedAppointment._id);
                try {
                    const response = await fetch(`http://localhost:5000/api/appointment/approveappointment/testscan/${selectedAppointment._id}`, {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({ payment })
                    });

                    if (response.ok) {
                        setShow(false);
                        window.location.reload(); // Refresh the page
                    } else {
                        console.error('Failed to approve the appointment');
                    }
                } catch (error) {
                    console.error('Error:', error);
                }
            }
        }
    }

    const handleReject = async () => {
        if (selectedAppointment) {
            console.log('Rejecting appointment:', selectedAppointment._id);
            try {
                const response = await fetch(`http://localhost:5000/api/appointment/rejectappointment/testscan/${selectedAppointment._id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });

                if (response.ok) {
                    setShow(false);
                    window.location.reload(); // Refresh the page
                } else {
                    console.error('Failed to reject the appointment');
                }
            } catch (error) {
                console.error('Error:', error);
            }
        }
    }

    // Filtered appointments based on search criteria
    const filteredAppointments = appointments.filter(appointment => {
        const formattedAppointmentDate = new Date(appointment.appointmentDate).toISOString().split('T')[0];
        const nameMatch = (appointment.username && appointment.username.toLowerCase().includes(searchName.toLowerCase())) || 
                          (appointment.scanName && appointment.scanName.toLowerCase().includes(searchName.toLowerCase()));
        const dateMatch = searchDate === '' || formattedAppointmentDate === searchDate;
        const timeMatch = searchTime === '' || appointment.appointmentTime === searchTime;

        return nameMatch && dateMatch && timeMatch;
    });

    return (
        <>
            <Row>
                <Col>{/* Search by patient or hospital name */}
                    <Form.Group className="mb-3" controlId="searchName">
                        <Form.Label>Search by Patient/Hospital Name</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter name"
                            value={searchName}
                            onChange={(e) => setSearchName(e.target.value)}
                        />
                    </Form.Group>
                </Col>
                <Col>
                    {/* Search by appointment date */}
                    <Form.Group className="mb-3" controlId="searchDate">
                        <Form.Label>Search by Date</Form.Label>
                        <Form.Control
                            type="date"
                            value={searchDate}
                            onChange={(e) => setSearchDate(e.target.value)}
                        />
                    </Form.Group>
                </Col>
                <Col>
                    {/* Search by appointment time */}
                    <Form.Group className="mb-3" controlId="searchTime">
                        <Form.Label>Search by Time</Form.Label>
                        <Form.Control
                            type="time"
                            value={searchTime}
                            onChange={(e) => setSearchTime(e.target.value)}
                        />
                    </Form.Group>
                </Col>
                <Col> 
                    <Button
                        onClick={generatePDF}
                        variant="danger"
                        style={{ marginLeft: "20px" }}
                    >
                        Generate PDF
                        <span className="bi bi-file-earmark-pdf"></span>
                    </Button>
                </Col>
            </Row>
            <Table>
                <thead>
                    <tr>
                        <th>Patient name</th>
                        <th>Appointment Date</th>
                        <th>Appointment Time</th>
                        <th>Hospital</th>
                        <th>Scan</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredAppointments.map(appointment => (
                        <tr key={appointment._id}>
                            <td>{appointment.username}</td>
                            <td>{new Date(appointment.appointmentDate).toLocaleDateString()}</td>
                            <td>{appointment.appointmentTime}</td>
                            <td>{appointment.hospitalName}</td>
                            <td>{appointment.scanName}</td>
                            <td>
                                <Badge bg={
                                    appointment.status === 'pending' ? 'warning' :
                                    appointment.status === 'approved' ? 'primary' :
                                    appointment.status === 'completed' ? 'success' : 'secondary'
                                }>
                                    {appointment.status}
                                </Badge>
                            </td>
                            <td><Button variant="secondary" onClick={() => handleShow(appointment)}>View details</Button></td>
                        </tr>
                    ))}
                </tbody>
            </Table>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Appointment Details</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {selectedAppointment && (
                        <>
                            <p><strong>Patient Name:</strong> {selectedAppointment.username}</p>
                            <p><strong>Mobile:</strong> {selectedAppointment.mobile}</p>
                            <p><strong>Appointment Date:</strong> {new Date(selectedAppointment.appointmentDate).toLocaleDateString()}</p>
                            <p><strong>Appointment Time:</strong> {selectedAppointment.appointmentTime}</p>
                            <p><strong>Hospital:</strong> {selectedAppointment.hospitalName}</p>
                            <p><strong>Scan:</strong> {selectedAppointment.scanName}</p>
                            <p><strong>Status:</strong> {selectedAppointment.status}</p>
                            {(selectedAppointment.status === 'approved' || selectedAppointment.status === 'completed') && (
                                <p><strong>Payment:</strong> Rs.{selectedAppointment.payment}</p>
                            )}
                        </>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    {selectedAppointment && selectedAppointment.status === 'pending' ? (
                        <>
                            <Button variant="success" onClick={handleApprove}>Approve</Button>
                            <Button variant="danger" onClick={handleReject}>Reject</Button>
                        </>
                    ) : null}
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default Filteredtestandscans;
