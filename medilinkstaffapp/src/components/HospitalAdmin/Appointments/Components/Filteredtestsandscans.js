import React, { useState } from 'react';
import { Table, Button, Modal } from 'react-bootstrap';

function Filteredchannelinglist({appointments }) {
    const [show, setShow] = useState(false);
    const [selectedAppointment, setSelectedAppointment] = useState(null);

    const handleClose = () => setShow(false);
    const handleShow = (appointment) => {
        setSelectedAppointment(appointment);
        setShow(true);
    };

    const handleApprove = async () => {
        if (selectedAppointment) {
            console.log('Approving appointment:', selectedAppointment._id);
            try {
                const response = await fetch(`http://localhost:5000/api/appointment/approveappointment/testscan/${selectedAppointment._id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    }
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

    return (
        <>
            <Table>
                <thead>
                    <tr>
                        <th>Patient name</th>
                        <th>Appointment Date</th>
                        <th>Appointment Time</th>
                        <th>Hospital</th>
                        <th>Scan Type</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {appointments.map(appointment => (
                        <tr key={appointment._id}>
                            <td>{appointment.username}</td>
                            <td>{new Date(appointment.appointmentDate).toLocaleDateString()}</td>
                            <td>{appointment.appointmentTime}</td>
                            <td>{appointment.hospitalName}</td>
                            <td>{appointment.scanName}</td>
                            <td>{appointment.status}</td>
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

export default Filteredchannelinglist;
