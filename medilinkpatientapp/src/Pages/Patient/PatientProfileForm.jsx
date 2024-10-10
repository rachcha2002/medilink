import React, { useState } from "react";
import SectionHeading from "../../Components/SectionHeading/SectionHeading";
import Spacing from "../../Components/Spacing/Spacing";

const PatientProfileForm = () => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    dateOfBirth: "",
    gender: "",
    idNumber: "",
    address: "",
    emergencyContact: "",
    medicalHistory: "",
    currentDiagnoses: "",
    currentMedications: "",
    allergies: "",
    password: "", // New password field
    confirmPassword: "", // New confirm password field
    photo: null, // For storing the patient photo
    photoPreview: null, // For storing the preview URL of the photo
  });

  const [errorMessage, setErrorMessage] = useState(""); // State for error message

  // Handler for input field changes
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  // Handler for file input change (for photo upload)
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      // Update the photo in state
      setFormData((prevFormData) => ({
        ...prevFormData,
        photo: file,
      }));

      // Generate a preview URL using FileReader
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prevFormData) => ({
          ...prevFormData,
          photoPreview: reader.result, // Store the preview URL
        }));
      };
      reader.readAsDataURL(file); // Read the file as a Data URL for preview
    }
  };

  const onSubmit = async (event) => {
    event.preventDefault();

    // Check if password and confirm password match
    if (formData.password !== formData.confirmPassword) {
      setErrorMessage("Passwords do not match.");
      return;
    }

    setLoading(true);
    setErrorMessage(""); // Clear any previous error messages

    const formDataObject = new FormData();
    Object.keys(formData).forEach((key) => {
      formDataObject.append(key, formData[key]);
    });

    // Send data (you can adjust the URL and method as necessary)
    const res = await fetch(
      `${process.env.REACT_APP_BACKEND_URL}/api/patients/create`,
      {
        method: "POST",
        body: formDataObject,
      }
    );

    if (res.ok) {
      setFormData({
        name: "",
        email: "",
        phone: "",
        dateOfBirth: "",
        gender: "",
        idNumber: "",
        address: "",
        emergencyContact: "",
        medicalHistory: "",
        currentDiagnoses: "",
        currentMedications: "",
        allergies: "",
        password: "", // Clear password after submission
        confirmPassword: "", // Clear confirm password after submission
        photo: null,
        photoPreview: null, // Clear the preview after submission
      });
      setLoading(false);
    }
  };

  return (
    <>
      <section id="patient-profile" className="st-shape-wrap st-gray-bg mb-6">
        <div className="st-shape4">
          <img src="/shape/section_shape.png" alt="shape" />
        </div>
        <div className="st-height-b120 st-height-lg-b80" />
        <SectionHeading
          title="Create Patient Profile"
          subTitle="Fill in the details to create a new patient profile."
        />
        <div className="container">
          <div className="row">
            <div className="col-lg-10 offset-lg-1">
              <form
                className="st-appointment-form"
                id="patient-profile-form"
                onSubmit={onSubmit}
                encType="multipart/form-data"
              >
                <div id="st-alert1" />
                <div className="row">
                  {/* Existing form fields */}
                  <div className="col-lg-6">
                    <div className="st-form-field st-style1">
                      <label>Full Name</label>
                      <input
                        type="text"
                        name="name"
                        placeholder="John Doe"
                        onChange={handleInputChange}
                        value={formData.name}
                        required
                      />
                    </div>
                  </div>

                  <div className="col-lg-6">
                    <div className="st-form-field st-style1">
                      <label>Email Address</label>
                      <input
                        type="email"
                        name="email"
                        placeholder="example@gmail.com"
                        onChange={handleInputChange}
                        value={formData.email}
                        required
                      />
                    </div>
                  </div>

                  <div className="col-lg-6">
                    <div className="st-form-field st-style1">
                      <label>Phone Number</label>
                      <input
                        type="text"
                        name="phone"
                        placeholder="+00 141 23 234"
                        onChange={handleInputChange}
                        value={formData.phone}
                        required
                      />
                    </div>
                  </div>

                  <div className="col-lg-6">
                    <div className="st-form-field st-style1">
                      <label>Date of Birth</label>
                      <input
                        type="date"
                        name="dateOfBirth"
                        onChange={handleInputChange}
                        value={formData.dateOfBirth}
                        required
                      />
                    </div>
                  </div>

                  <div className="col-lg-6">
                    <div className="st-form-field st-style1">
                      <label>Gender</label>
                      <select
                        name="gender"
                        onChange={handleInputChange}
                        value={formData.gender}
                        required
                      >
                        <option>Select Gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                  </div>

                  <div className="col-lg-6">
                    <div className="st-form-field st-style1">
                      <label>National ID or Passport Number</label>
                      <input
                        type="text"
                        name="idNumber"
                        placeholder="ID/Passport Number"
                        onChange={handleInputChange}
                        value={formData.idNumber}
                        required
                      />
                    </div>
                  </div>

                  <div className="col-lg-6">
                    <div className="st-form-field st-style1">
                      <label>Address</label>
                      <input
                        type="text"
                        name="address"
                        placeholder="123 Street, City"
                        onChange={handleInputChange}
                        value={formData.address}
                        required
                      />
                    </div>
                  </div>

                  <div className="col-lg-6">
                    <div className="st-form-field st-style1">
                      <label>Emergency Contact</label>
                      <input
                        type="text"
                        name="emergencyContact"
                        placeholder="Emergency Contact Name and Number"
                        onChange={handleInputChange}
                        value={formData.emergencyContact}
                        required
                      />
                    </div>
                  </div>

                  <div className="col-lg-12">
                    <div className="st-form-field st-style1">
                      <label>Medical History</label>
                      <textarea
                        name="medicalHistory"
                        placeholder="List past medical conditions, surgeries, etc."
                        onChange={handleInputChange}
                        value={formData.medicalHistory}
                        required
                      />
                    </div>
                  </div>

                  <div className="col-lg-6">
                    <div className="st-form-field st-style1">
                      <label>Current Diagnoses</label>
                      <input
                        type="text"
                        name="currentDiagnoses"
                        placeholder="Current Diagnoses"
                        onChange={handleInputChange}
                        value={formData.currentDiagnoses}
                        required
                      />
                    </div>
                  </div>

                  <div className="col-lg-6">
                    <div className="st-form-field st-style1">
                      <label>Current Medications</label>
                      <input
                        type="text"
                        name="currentMedications"
                        placeholder="List current medications"
                        onChange={handleInputChange}
                        value={formData.currentMedications}
                        required
                      />
                    </div>
                  </div>

                  <div className="col-lg-6">
                    <div className="st-form-field st-style1">
                      <label>Allergies</label>
                      <input
                        type="text"
                        name="allergies"
                        placeholder="Allergies (if any)"
                        onChange={handleInputChange}
                        value={formData.allergies}
                        required
                      />
                    </div>
                  </div>

                  {/* Add Password field */}
                  <div className="col-lg-6">
                    <div className="st-form-field st-style1">
                      <label>Password</label>
                      <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        onChange={handleInputChange}
                        value={formData.password}
                        required
                      />
                    </div>
                  </div>

                  {/* Add Confirm Password field */}
                  <div className="col-lg-6">
                    <div className="st-form-field st-style1">
                      <label>Confirm Password</label>
                      <input
                        type="password"
                        name="confirmPassword"
                        placeholder="Confirm Password"
                        onChange={handleInputChange}
                        value={formData.confirmPassword}
                        required
                      />
                    </div>
                  </div>

                  {/* Error message display */}
                  {errorMessage && (
                    <div className="col-lg-12">
                      <p style={{ color: "red" }}>{errorMessage}</p>
                    </div>
                  )}

                  <div className="col-lg-6">
                    <div className="st-form-field st-style1">
                      <label>Upload Photo</label>
                      <input
                        type="file"
                        name="photo"
                        accept="image/*"
                        onChange={handleFileChange}
                        required
                      />
                    </div>
                  </div>

                  {/* Image preview */}
                  {formData.photoPreview && (
                    <div className="col-lg-12 mb-4">
                      <label>Photo Preview:</label>
                      <div className="photo-preview">
                        <img
                          src={formData.photoPreview}
                          alt="Photo Preview"
                          style={{
                            width: "150px",
                            height: "150px",
                            objectFit: "cover",
                          }}
                        />
                      </div>
                    </div>
                  )}

                  {/* Submit Button */}
                  <div className="col-lg-12 mb-8">
                    <button
                      className="st-btn st-style1 st-color1 st-size-medium"
                      type="submit"
                    >
                      {loading ? "Submitting..." : "Create Profile"}
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
      <Spacing lg={200} md={80} />
    </>
  );
};

export default PatientProfileForm;
