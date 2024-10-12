import React, { useState } from 'react';
import SectionHeading from '../SectionHeading/SectionHeading';

const Appointment3 = () => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    mobile: '',
    appointmentDate: '',
    appointmentTime: '',
    hospitalType: '',
    hospitalName: '',
    payment: '',
    doctorName: '',
    speciality: '',
  });

  // Handler for input field changes
  const handleInputChange = event => {
    const { name, value } = event.target;
    setFormData(prevFormData => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    const dataToSubmit = {
      ...formData,
      userid: 'u002',
      type: 'Clinic',
      username: 'Eranga',
      email: 'Eranga@gmail.com',
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
        doctorName: '',
        speciality: '',
      });
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
      <SectionHeading title="Appointment for Clinic" />
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
                    <label>Doctor</label>
                    <input
                      name="doctorName"
                      type="text"
                      id="doctorName"
                      onChange={handleInputChange}
                      value={formData.doctorName}
                      required
                    />
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="st-form-field st-style1">
                    <label>Speciality</label>
                    <input
                      name="speciality"
                      type="text"
                      id="speciality"
                      onChange={handleInputChange}
                      value={formData.speciality}
                      required
                    />
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

export default Appointment3;
