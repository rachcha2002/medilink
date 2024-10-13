import React, { useState, useEffect } from 'react';
import SectionHeading from '../SectionHeading/SectionHeading';
import { useAuthContext } from "../../Context/AuthContext";

const Appointment4 = () => {
  const auth = useAuthContext();
  const patientname = auth.user?.name || '';
  const patientemail = auth.user?.email || '';
  const patientid = auth.user?.patientID || '';

  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    mobile: '',
    appointmentDate: '',
    appointmentTime: '',
    hospitalType: '',
    hospitalId: '',
    hospitalName: '',
    payment: '',
    scanType: '',
    scanName: '',
  });

  const [hospitalList, setHospitalList] = useState([]);
  const [scanNameOptions, setScanNameOptions] = useState([]);
  const[scans, setScans] = useState([]);
  const[tests, setTests] = useState([]);
  // Handler for input field changes
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));

    // Update scan name options based on scan type selected
    if (name === 'scanType') {
      if (value === 'scan') {
        setScanNameOptions(scans);
      } else if (value === 'test') {
        setScanNameOptions(tests);
      } else {
        setScanNameOptions([]); // Reset options if no valid scan type is selected
      }
      setFormData((prevFormData) => ({ ...prevFormData, scanName: '' })); // Reset scanName
    }
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    const dataToSubmit = {
      ...formData,
      userid: patientid,
      type: "testscan",
      username: patientname,
      email: patientemail,
      status: 'pending',
    };
    console.log(dataToSubmit);

    const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/appointment/makeappointment`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dataToSubmit),
    }).then((res) => res.json());

    if (res.success) {
      setFormData({
        mobile: '',
        appointmentDate: '',
        appointmentTime: '',
        hospitalType: '',
        hospitalId: '',
        hospitalName: '',
        payment: '',
        scanType: '',
        scanName: '',
      });
      setScanNameOptions([]); // Reset scan name options
    }
    setLoading(false);
    window.location.reload();
  };

  const fetchHospitalsByType = async (type) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/appointment/gethospitalsbytype/${type}`);
      const data = await response.json();
      if (data) {
        setHospitalList(data);
        console.log(data);
      } else {
        console.error("No hospitals found or invalid response format", data);
      }
    } catch (error) {
      console.error("Error fetching hospitals:", error);
    }
  };

  const handleHospitalTypeChange = (event) => {
    const { value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      hospitalType: value,
    }));

    if (value) {
      fetchHospitalsByType(value);
    } else {
      setHospitalList([]);
    }
  };

  const handleHospitalChange = (event) => {
    const { value } = event.target;
    const selectedHospital = hospitalList.find(hospital => hospital.hospitalName === value);
    setFormData(prevFormData => ({
      ...prevFormData,
      hospitalName: value,
      hospitalId: selectedHospital ? selectedHospital._id : ''
    }));
    if (selectedHospital) {
      fetchHospitalScansAndTests(selectedHospital._id);
    }
  };

  const fetchHospitalScansAndTests = async (hospitalId) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/hospital/gethospital/${hospitalId}`);
      const data = await response.json();
      if (data) {
          setScans(data.tests);
          setTests(data.scans);
          console.log(data.tests, "Scans ",data.scans);
      } else {
        console.error("No scans or tests found for the selected hospital", data);
      }
    } catch (error) {
      console.error("Error fetching scans and tests:", error);
    }
  };

  return (
    <section id="appointment" className="st-shape-wrap st-gray-bg">
      <div className="st-shape4">
        <img src="/shape/section_shape.png" alt="/shape/section_shape.png" />
      </div>
      <div className="st-shape6">
        <img src="/shape/contact-shape3.svg" alt="/shape/contact-shape3.svg" />
      </div>

      <SectionHeading title="Appointment for Tests & Scans" />
      <div className="container">
        <div className="row">
          <div className="col-lg-10 offset-lg-1">
            <form
              method="POST"
              className="st-appointment-form"
              id="appointment-form"
              onSubmit={onSubmit}
            >
              <div className="row">
                <div className="col-lg-6">
                  <div className="st-form-field st-style1">
                    <label>Phone Number</label>
                    <input
                      type="tel"
                      id="mobile"
                      name="mobile"
                      placeholder="07X XXX XXXX"
                      onChange={handleInputChange}
                      value={formData.mobile}
                      required
                      pattern="[0-9]{10}"
                      title="Phone number must be 10 digits"
                      maxLength="10"
                      disabled={formData.mobile.length === 10}
                    />
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="st-form-field st-style1">
                    <label>Booking Date</label>
                    <input
                      name="appointmentDate"
                      type="date"
                      id="appointmentDate"
                      onChange={handleInputChange}
                      value={formData.appointmentDate}
                      required
                    />
                    <div className="form-field-icon">
                    </div>
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="st-form-field st-style1">
                    <label>Booking Time</label>
                    <input
                      name="appointmentTime"
                      type="time"
                      id="appointmentTime"
                      onChange={handleInputChange}
                      value={formData.appointmentTime}
                      required
                    />
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="st-form-field st-style1">
                    <label>Hospital Type</label>
                    <select
                      name="hospitalType"
                      id="hospitalType"
                      onChange={handleHospitalTypeChange}
                      value={formData.hospitalType}
                      required
                    >
                      <option value="">Select Hospital Type</option>
                      <option value="government">Government</option>
                      <option value="private">Non-Government</option>
                    </select>
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="st-form-field st-style1">
                    <label>Hospital Name</label>
                    <select
                      name="hospitalName"
                      id="hospitalName"
                      onChange={handleHospitalChange}
                      value={formData.hospitalName}
                      required
                    >
                      <option value="">Select Hospital</option>
                      {hospitalList.length > 0 ? (
                        hospitalList.map((hospital) => (
                          <option key={hospital._id} value={hospital.hospitalName}>
                            {hospital.hospitalName}
                          </option>
                        ))
                      ) : (
                        <option value="" disabled>
                          No hospitals available
                        </option>
                      )}
                    </select>
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="st-form-field st-style1">
                    <label>Scan Type</label>
                    <select
                      name="scanType"
                      id="scanType"
                      onChange={handleInputChange}
                      value={formData.scanType}
                      required
                    >
                      <option value="">Select Scan Type</option>
                      <option value="scan">Scan</option>
                      <option value="test">Test</option>
                    </select>
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="st-form-field st-style1">
                    <label>Scan/Test Name</label>
                    <select
                      name="scanName"
                      id="scanName"
                      onChange={handleInputChange}
                      value={formData.scanName}
                      required
                      disabled={scanNameOptions.length === 0}
                    >
                      <option value="">Select {formData.scanType === 'scan' ? 'Scan' : 'Test'} Name</option>
                      {scanNameOptions.map(option => (
                        <option key={option._id} value={option.test_heading || option.scan_heading}>
                          {option.test_heading || option.scan_heading}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="col-lg-12">
                  <button
                    className="st-btn st-style1 st-color1 st-size-medium"
                    type="submit"
                    id="appointment-submit"
                    name="submit"
                  >
                    {loading ? "Sending..." : "Appointment"}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Appointment4;