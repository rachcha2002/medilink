import React, { useState, useEffect } from "react";
import { Table, Spinner, Alert, Modal, Button } from "react-bootstrap";
import axios from "axios";
import { useAuthContext } from "../../Context/AuthContext";
import SectionHeading from "../../Components/SectionHeading/SectionHeading";
import { FaFilePdf } from "react-icons/fa"; // To display PDF link icon

const ReportList = ({ reportType }) => {
  const { user } = useAuthContext(); // Use context to get the patient ID
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedReport, setSelectedReport] = useState(null); // For the modal
  const [showModal, setShowModal] = useState(false);

  // Fetch reports for the specific patient based on the reportType
  useEffect(() => {
    const fetchReports = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}/api/medicalinfo/reports/patients/${user.patientID}`
        );

        // Filter reports based on the reportType (labReports or radiologyReports)
        const filteredReports =
          reportType === "laboratory"
            ? response.data.labReports
            : response.data.radiologyReports;

        setReports(filteredReports);
        setLoading(false);
      } catch (error) {
        if (error.response && error.response.status === 404) {
          setError("No reports found.");
        } else {
          setError("Failed to fetch reports. Please try again.");
        }
        setLoading(false);
      }
    };

    fetchReports();
  }, [user.patientID, reportType]);

  // Show the modal with report details
  const handleShowModal = (report) => {
    setSelectedReport(report);
    setShowModal(true);
  };

  // Close the modal
  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedReport(null);
  };

  // Render loading state
  if (loading) {
    return (
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    );
  }

  // Render error state
  if (error) {
    return <Alert variant="danger">{error}</Alert>;
  }

  return (
    <section className="st-shape-wrap" id="reports-list">
      <div className="st-shape1">
        <img src="/shape/contact-shape1.svg" alt="shape1" />
      </div>
      <div className="st-shape2">
        <img src="/shape/contact-shape2.svg" alt="shape2" />
      </div>
      <div className="st-height-b120 st-height-lg-b80" />
      <SectionHeading
        title={`${
          reportType === "laboratory"
            ? "Laboratory Reports"
            : "Radiology Reports"
        }`}
        subTitle={`Below is a list of all your ${
          reportType === "laboratory" ? "laboratory" : "radiology"
        } reports.`}
      />
      <div className="container">
        <div className="row">
          <div className="col-lg-10 offset-lg-1">
            <div className="st-table-wrapper">
              {reports.length > 0 ? (
                <Table hover responsive className="st-reports-table">
                  <thead>
                    <tr>
                      <th>Date</th>
                      <th>Doctor Name</th>
                      <th>Hospital</th>
                      <th>Test Name</th>
                      <th>PDF Link</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {reports.map((report) => (
                      <tr key={report._id}>
                        <td>{new Date(report.date).toLocaleDateString()}</td>
                        <td>{report.doctor}</td>
                        <td>{report.hospital}</td>
                        <td>{report.testName}</td>
                        <td>
                          <a
                            href={report.resultPdf}
                            target="_blank"
                            rel="noreferrer"
                          >
                            <FaFilePdf style={{ marginRight: "5px" }} />
                            View PDF
                          </a>
                        </td>
                        <td>
                          <button
                            className="st-btn st-style1 st-color2 st-size-small st-btn-align"
                            onClick={() => handleShowModal(report)}
                          >
                            View
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              ) : (
                <Alert variant="info">
                  No {reportType === "laboratory" ? "laboratory" : "radiology"}{" "}
                  reports found for this patient.
                </Alert>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="st-height-b120 st-height-lg-b80" />

      {/* Modal for report details */}
      {selectedReport && (
        <Modal show={showModal} onHide={handleCloseModal} centered>
          <Modal.Header closeButton>
            <Modal.Title>
              {reportType === "laboratory"
                ? "Laboratory Report Details"
                : "Radiology Report Details"}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>
              <strong>Date:</strong>{" "}
              {new Date(selectedReport.date).toLocaleDateString()}
            </p>
            <p>
              <strong>Doctor Name:</strong> {selectedReport.doctor}
            </p>
            <p>
              <strong>Hospital:</strong> {selectedReport.hospital}
            </p>
            <p>
              <strong>Test Name:</strong> {selectedReport.testName}
            </p>
            <p>
              <strong>Remarks:</strong> {selectedReport.remarks}
            </p>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseModal}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      )}

      <style jsx>{`
        .st-reports-table {
          width: 100%;
          border-collapse: collapse;
          margin: 20px 0;
          font-size: 1rem;
          text-align: center;
          background-color: #fff;
          border-radius: 8px;
          box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }

        .st-reports-table th,
        .st-reports-table td {
          padding: 15px;
          border-bottom: 1px solid #ddd;
        }

        .st-reports-table th {
          background-color: #f8f8f8;
          font-weight: bold;
        }

        .st-reports-table tr:nth-child(even) {
          background-color: #f9f9f9;
        }

        .st-btn.st-style1.st-color2 {
          background-color: #17a2b8;
          color: #fff;
          display: inline-flex;
          align-items: center;
        }

        .st-btn.st-style1.st-color2:hover {
          background-color: #138f99;
          color: #fff;
        }

        .st-btn.st-size-small {
          padding: 8px 12px;
          font-size: 0.875rem;
          margin-top: 5px;
        }
      `}</style>
    </section>
  );
};

export default ReportList;
