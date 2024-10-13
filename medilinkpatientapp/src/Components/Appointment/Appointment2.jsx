import React, { useState, useEffect } from 'react';
import SectionHeading from '../SectionHeading/SectionHeading';
import { useAuthContext } from "../../Context/AuthContext"; 

const Appointment2 = () => {

  const auth= useAuthContext();
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
    doctorName: '',
    speciality: '',
  });

  const [hospitalList, setHospitalList] = useState([]);
  const [doctorList, setDoctorList] = useState([]);
  const [specialityList, setSpecialityList] = useState([]);

  // Handler for input field changes
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    const dataToSubmit = {
      ...formData,
      userid: patientid,
      type: 'Channeling',
      username: patientname,
      email: patientemail,
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
        hospitalId: '',
        hospitalName: '',
        payment: '',
        doctorName: '',
        speciality: '',
      });
    }
    setLoading(false);
   window.location.reload();
  };

  const fetchHospitalsByType = async (type) => {
    try {
      const response = await fetch(`http://localhost:5000/api/appointment/gethospitalsbytype/${type}`);
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

  const fetchDoctorsByHospital = async (hospitalName) => {
    const hospital = hospitalName;
    console.log(hospital);
    try {
      const response = await fetch(`http://localhost:5000/api/appointment/getdoctorbyhospital/${hospital}`);
      const data = await response.json();
      if (data) {
        setDoctorList(data);
        const specialities = Array.from(new Set(data.map(doc => doc.speciality))); // Get unique specialities from doctors
        setSpecialityList(specialities); // Update the specialities list
        console.log(data);
      } else {
        console.error("No doctors found or invalid response format", data);
      }
    } catch (error) {
      console.error("Error fetching doctors:", error);
    }
  };

  const fetchDoctorsBySpeciality = async (hospitalName, speciality) => {
    try {
      const response = await fetch(`http://localhost:5000/api/appointment/getdoctorbyspeciality/${hospitalName}/${speciality}`);
      const data = await response.json();
      if (data) {
        setDoctorList(data);
        console.log(data);
      } else {
        console.error("No doctors found or invalid response format", data);
      }
    } catch (error) {
      console.error("Error fetching doctors:", error);
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
    fetchDoctorsByHospital(value);
  };

  const handleSpecialityChange = (event) => {
    const { value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      speciality: value,
    }));
    fetchDoctorsBySpeciality(formData.hospitalName, value);
  };

  const handleDoctorChange = (event) => {
    const { value } = event.target;
    const selectedDoctor = doctorList.find(doctor => doctor.name === value);
    if (selectedDoctor) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        doctorName: value,
        speciality: selectedDoctor.speciality
      }));
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
      <SectionHeading title="Appointment for Channeling" />
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
                    <label>Speciality</label>
                    <select
                      name="speciality"
                      id="speciality"
                      onChange={handleSpecialityChange}
                      value={formData.speciality}
                      required
                    >
                      <option value="">Select Speciality</option>
                      {specialityList.length > 0 ? (
                        specialityList.map((speciality, index) => (
                          <option key={index} value={speciality}>
                            {speciality}
                          </option>
                        ))
                      ) : (
                        <option value="" disabled>
                          No specialities available
                        </option>
                      )}
                    </select>
                  </div>
                </div>

                <div className="col-lg-6">
                  <div className="st-form-field st-style1">
                    <label>Doctor</label>
                    <select
                      name="doctorName"
                      id="doctorName"
                      onChange={handleDoctorChange}
                      value={formData.doctorName}
                      required
                    >
                      <option value="">Select Doctor</option>
                      {doctorList.length > 0 ? (
                        doctorList.map((doctor) => (
                          <option key={doctor._id} value={doctor.name}>
                            {doctor.name}
                          </option>
                        ))
                      ) : (
                        <option value="" disabled>
                          No doctors available
                        </option>
                      )}
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

export default Appointment2;
