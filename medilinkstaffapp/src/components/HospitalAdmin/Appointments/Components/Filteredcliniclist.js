import React, { useState } from 'react';
import { Table, Button, Modal, Badge, Form, Row, Col } from 'react-bootstrap';
import html2pdf from "html2pdf.js";
import image from "../../../../images/logo.png";
import { useAuthContext } from "../../../../context/AuthContext"; 
import { submitBilling } from '../../../../Service/billService';

function Filteredcliniclist({ appointments }) {
    const [show, setShow] = useState(false);
    const [selectedAppointment, setSelectedAppointment] = useState(null);
    const [searchName, setSearchName] = useState(''); // Search by patient/doctor name
    const [searchDate, setSearchDate] = useState(''); // Search by date
    const [searchTime, setSearchTime] = useState(''); // Search by time
    const auth = useAuthContext();
    const hospital = auth.user?.hospitalName || '';
    const type = 'clinic';


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
                <h4 style="color: #333; margin: 0;">${hospital}</h4>
                <h5 style="color: #555; margin: 0;">Clinic Appointment List</h5>
              </div>
              <div style="text-align: right;">
                <p style="margin: 5px 0;"><strong>Date:</strong> ${new Date().toLocaleDateString()}</p>
              </div>
            </div>
            <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
              <thead style="background-color: #f2f2f2;">
                <tr>
                  <th style="padding: 10px; border: 1px solid #ddd;">Patient Name</th>
                  <th style="padding: 10px; border: 1px solid #ddd;">Doctor Name</th>
                  <th style="padding: 10px; border: 1px solid #ddd;">Attendance</th>
                </tr>
              </thead>
              <tbody>
                ${filteredAppointments.map(appointment => `
                  <tr>
                    <td style="padding: 10px; border: 1px solid #ddd;">${appointment.username}</td>
                    <td style="padding: 10px; border: 1px solid #ddd;">${appointment.doctorName}</td>
                    <td style="padding: 10px; border: 1px solid #ddd;">  </td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        `;
      
        const options = {
          margin: 1,
          filename: `appointment-list-${new Date().toLocaleDateString()}.pdf`,
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
                    const response = await fetch(`http://localhost:5000/api/appointment/approveappointment/clinic/${selectedAppointment._id}`, {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({ payment })
                    });

                    if (response.ok) {
                        await submitBilling(type,selectedAppointment, payment, auth.user);
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
    };

    const handleReject = async () => {
        if (selectedAppointment) {
            console.log('Rejecting appointment:', selectedAppointment._id);
            try {
                const response = await fetch(`http://localhost:5000/api/appointment/rejectappointment/clinic/${selectedAppointment._id}`, {
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
    };

    // Filtered appointments based on search criteria
    const filteredAppointments = appointments.filter(appointment => {
        const formattedAppointmentDate = new Date(appointment.appointmentDate).toISOString().split('T')[0];
        const nameMatch = (appointment.username && appointment.username.toLowerCase().includes(searchName.toLowerCase())) || 
                          (appointment.doctorName && appointment.doctorName.toLowerCase().includes(searchName.toLowerCase()));
        const dateMatch = searchDate === '' || formattedAppointmentDate === searchDate;
        const timeMatch = searchTime === '' || appointment.appointmentTime === searchTime;

        return nameMatch && dateMatch && timeMatch;
    });

    return (
        <>
            <Row>
                <Col>{/* Search by patient or doctor name */}
                    <Form.Group className="mb-3" controlId="searchName">
                        <Form.Label>Search by Patient/Doctor Name</Form.Label>
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
                        <th>Doctor name</th>
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
                            <td>{appointment.doctorName}</td>
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
                            <p><strong>Doctor:</strong> {selectedAppointment.doctorName}</p>
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

export default Filteredcliniclist;
