import React, { useState } from 'react';
import SectionHeading from '../SectionHeading/SectionHeading';

const scanOptions = {
  scan: [
    { value: 'x-ray', label: 'X-Ray' },
    { value: 'ct-scan', label: 'CT Scan' },
    { value: 'mri', label: 'MRI' },
    { value: 'ultrasound', label: 'Ultrasound' },
    { value: 'pet-scan', label: 'PET Scan' },
    { value: 'bone-density', label: 'Bone Density Scan (DEXA)' },
    { value: 'mammography', label: 'Mammography' },
    { value: 'fluoroscopy', label: 'Fluoroscopy' },
    { value: 'echocardiogram', label: 'Echocardiogram' },
    { value: 'nuclear-medicine', label: 'Nuclear Medicine Scan' },
  ],
  test: [
    { value: 'blood-test', label: 'Blood Test' },
    { value: 'urinalysis', label: 'Urinalysis' },
    { value: 'biopsy', label: 'Biopsy' },
    { value: 'allergy-test', label: 'Allergy Test' },
    { value: 'thyroid-function', label: 'Thyroid Function Test' },
    { value: 'stool-test', label: 'Stool Test' },
    { value: 'electrocardiogram', label: 'Electrocardiogram (ECG)' },
    { value: 'pulmonary-function', label: 'Pulmonary Function Test (PFT)' },
    { value: 'pap-smear', label: 'Pap Smear' },
    { value: 'prostate-specific-antigen', label: 'Prostate-Specific Antigen (PSA) Test' },
    { value: 'genetic-testing', label: 'Genetic Testing' },
    { value: 'pregnancy-test', label: 'Pregnancy Test' },
  ],
};

const Appointment4 = () => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    mobile: '',
    appointmentDate: '',
    appointmentTime: '',
    hospitalType: '',
    hospitalName: '',
    payment: '',
    scanType: '',
    scanName: '',
  });

  const [scanNameOptions, setScanNameOptions] = useState([]);

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
        setScanNameOptions(scanOptions.scan);
      } else if (value === 'test') {
        setScanNameOptions(scanOptions.test);
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
      userid: 'u003',
      type:"testscan",
      username: 'Kamal',
      email: 'Kamal@gmail.com',
      hospitalId: 'H001',
      status: 'pending',
    };
    console.log(dataToSubmit);

    const res = await fetch("http://localhost:5000/api/appointment/makeappointment", {
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
                      onChange={handleInputChange}
                      value={formData.hospitalType}
                      required
                    >
                      <option value="">Select Hospital Type</option>
                      <option value="government">Government</option>
                      <option value="non-government">Non-Government</option>
                    </select>
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="st-form-field st-style1">
                    <label>Hospital Name</label>
                    <input
                      name="hospitalName"
                      type="text"
                      id="hospitalName"
                      onChange={handleInputChange}
                      value={formData.hospitalName}
                      required
                    />
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
                        <option key={option.value} value={option.value}>{option.label}</option>
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
