import React, { useState, useEffect } from "react";
import { useForm, Controller, getValues } from "react-hook-form";
import { Button, Col, Form, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import ImageUpload from "../../ImageUpload/ImageUpload";
import { BsArrowLeft } from "react-icons/bs";
import { BiCheckCircle, BiHide, BiShow } from "react-icons/bi";
import "./Main.css";
import PageTitle from "../../Main/PageTitle";

function AddMLTStaff({ toggleLoading }) {
  const cusfrontendurl = `${process.env.React_App_Frontend_URL}/customer`;
  const stafffrontendurl = `${process.env.React_App_Frontend_URL}/staff/login`;
  const [errorMessage, setErrorMessage] = useState("");
  const [isConfirmPasswordValid, setIsConfirmPasswordValid] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [selectedSubject, setSelectedSubject] = useState("");

  const navigate = useNavigate();

  const {
    handleSubmit,
    control,
    setValue,
    formState: { errors },
    getValues,
    trigger,
  } = useForm();

  const onSubmit = async (data) => {
    if (data.password !== data.confirmPassword) {
      setErrorMessage("The passwords do not match");
      return;
    }

    try {
      toggleLoading(true);

      // Create FormData and append all fields
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("nic", data.nic);
      formData.append("contactNo", data.contact);
      formData.append("address", data.address);
      formData.append("subject", data.subject);
      formData.append("speciality", data.speciality);
      formData.append("email", data.email);
      formData.append("password", data.password);
      formData.append("hospital", "Medihelp");

      // Append the photo if it's selected
      if (data.photo) {
        formData.append("photo", data.photo); // No need for [0] if it's a single file
      }

      console.log("photo", data.photo);

      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/api/staffroutes/create-mltstaff`,
        {
          method: "POST",
          body: formData, // Send FormData object
        }
      );

      if (response.status === 201) {
        alert("MLT Staff Registered Successfully!");
        navigate("/staff/hr/mlt");
      } else {
        throw new Error("Failed to submit data");
      }
    } catch (error) {
      console.error("Error:", error.message);
    } finally {
      toggleLoading(false);
    }
  };

  const handleSubjectChange = (e) => {
    setSelectedSubject(e.target.value);
  };

  return (
    <main id="main" className="main">
      <PageTitle />
      <Form onSubmit={handleSubmit(onSubmit)}>
        <h3>
          <Button
            variant="dark"
            onClick={() => navigate("/staff/hr/mlt")}
            style={{ margin: "10px" }}
          >
            <BsArrowLeft /> Back
          </Button>
          Create MLT Staff Account
        </h3>

        <Row className="mb-3">
          {/* Name */}
          <Form.Group as={Col} controlId="formGridName">
            <Form.Label>Name</Form.Label>
            <Controller
              name="name"
              control={control}
              rules={{
                required: "Name is required",
                minLength: {
                  value: 3,
                  message: "Name must be at least 3 characters",
                },
              }}
              render={({ field }) => (
                <Form.Control placeholder="John Doe" {...field} />
              )}
            />
            <Form.Text className="text-danger">
              {errors.name?.message}
            </Form.Text>
          </Form.Group>

          {/* NIC */}
          <Form.Group as={Col} controlId="formGridNic">
            <Form.Label>NIC</Form.Label>
            <Controller
              name="nic"
              control={control}
              rules={{
                required: "NIC is required",
                pattern: {
                  value: /^(?:\d{9}[vV]|\d{12})$/,
                  message: "Invalid NIC format",
                },
              }}
              render={({ field }) => (
                <Form.Control
                  placeholder="791161645v"
                  {...field}
                  maxLength="12"
                />
              )}
            />
            <Form.Text className="text-danger">{errors.nic?.message}</Form.Text>
          </Form.Group>

          {/* Contact No. */}
          <Form.Group as={Col} controlId="formGridContact">
            <Form.Label>Contact No.</Form.Label>
            <Controller
              name="contact"
              control={control}
              rules={{
                required: "Contact No. is required",
                pattern: {
                  value: /^[0-9]{10}$/,
                  message: "Contact No. must be a 10-digit number",
                },
              }}
              render={({ field }) => (
                <Form.Control
                  placeholder="0715897598"
                  {...field}
                  maxLength="10"
                />
              )}
            />
            <Form.Text className="text-danger">
              {errors.contact?.message}
            </Form.Text>
          </Form.Group>
        </Row>

        {/* Address */}
        <Form.Group className="mb-3" controlId="formGridAddress">
          <Form.Label>Address</Form.Label>
          <Controller
            name="address"
            control={control}
            rules={{
              required: "Address is required",
              minLength: {
                value: 5,
                message: "Address must be at least 5 characters",
              },
            }}
            render={({ field }) => (
              <Form.Control placeholder="1234 Main St" {...field} />
            )}
          />
          <Form.Text className="text-danger">
            {errors.address?.message}
          </Form.Text>
        </Form.Group>

        {/* Subject */}
        <Row className="mb-3">
          <Form.Group as={Col} controlId="formGridSubject">
            <Form.Label>Subject</Form.Label>
            <Controller
              name="subject"
              control={control}
              rules={{ required: "Subject is required" }}
              render={({ field }) => (
                <Form.Select
                  {...field}
                  onChange={(e) => {
                    field.onChange(e);
                    handleSubjectChange(e);
                  }}
                >
                  <option value="">Choose Subject</option>
                  <option value="Radiology">Radiology</option>
                  <option value="Laboratory">Laboratory</option>
                </Form.Select>
              )}
            />
            <Form.Text className="text-danger">
              {errors.subject?.message}
            </Form.Text>
          </Form.Group>

          {/* Speciality (conditionally rendered for both Radiology and Laboratory) */}
          <Form.Group as={Col} controlId="formGridSpeciality">
            <Form.Label>Speciality</Form.Label>
            <Controller
              name="speciality"
              control={control}
              rules={{ required: "Speciality is required" }}
              render={({ field }) => (
                <Form.Control placeholder="Enter Speciality" {...field} />
              )}
            />
            <Form.Text className="text-danger">
              {errors.speciality?.message}
            </Form.Text>
          </Form.Group>
        </Row>

        {/* Photo Upload */}
        <Row className="mb-3">
          <Form.Group as={Col} controlId="formImage">
            <Form.Label>Add a photo *(.jpg, .jpeg, .png only)</Form.Label>
            <Controller
              name="photo"
              control={control}
              render={({ field }) => (
                <ImageUpload
                  id="photo"
                  onInput={(id, file, isValid) => field.onChange(file)}
                  errorText={errors.photo?.message}
                />
              )}
            />
          </Form.Group>
        </Row>

        {/* Email */}
        <Row className="mb-3">
          <Form.Group as={Col} controlId="formGridEmail">
            <Form.Label>Email</Form.Label>
            <Controller
              name="email"
              control={control}
              rules={{
                required: "Email is required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                  message: "Invalid email address",
                },
              }}
              render={({ field }) => (
                <Form.Control
                  placeholder="Enter email"
                  {...field}
                  onChange={(e) => field.onChange(e)}
                />
              )}
            />
            <Form.Text className="text-danger">
              {errors.email?.message}
            </Form.Text>
          </Form.Group>

          {/* Password */}
          <Form.Group as={Col} controlId="formGridPassword">
            <Form.Label>Password</Form.Label>
            <Controller
              name="password"
              control={control}
              rules={{ required: "Password is required" }}
              render={({ field }) => (
                <div style={{ position: "relative" }}>
                  <Form.Control
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    {...field}
                  />
                  {showPassword ? (
                    <BiHide
                      onClick={() => setShowPassword(false)}
                      className="text-primary"
                      style={{
                        position: "absolute",
                        right: "10px",
                        top: "30%",
                        cursor: "pointer",
                      }}
                    />
                  ) : (
                    <BiShow
                      onClick={() => setShowPassword(true)}
                      className="text-primary"
                      style={{
                        position: "absolute",
                        right: "10px",
                        top: "30%",
                        cursor: "pointer",
                      }}
                    />
                  )}
                </div>
              )}
            />
            <Form.Text className="text-danger">
              {errors.password?.message}
            </Form.Text>
          </Form.Group>

          {/* Confirm Password */}
          <Form.Group as={Col} controlId="formGridConfirmPassword">
            <Form.Label>Confirm Password</Form.Label>
            <Controller
              name="confirmPassword"
              control={control}
              rules={{
                required: "Confirm Password is required",
                validate: (value) =>
                  value === getValues("password") || "Passwords do not match",
              }}
              render={({ field }) => (
                <div style={{ position: "relative" }}>
                  <Form.Control
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirm Password"
                    {...field}
                  />
                  {showConfirmPassword ? (
                    <BiHide
                      onClick={() => setShowConfirmPassword(false)}
                      className="text-primary"
                      style={{
                        position: "absolute",
                        right: "10px",
                        top: "30%",
                        cursor: "pointer",
                      }}
                    />
                  ) : (
                    <BiShow
                      onClick={() => setShowConfirmPassword(true)}
                      className="text-primary"
                      style={{
                        position: "absolute",
                        right: "10px",
                        top: "30%",
                        cursor: "pointer",
                      }}
                    />
                  )}
                </div>
              )}
            />
            <Form.Text className="text-danger">
              {errors.confirmPassword?.message}
            </Form.Text>
          </Form.Group>
        </Row>

        <Button variant="dark" type="submit">
          Submit
        </Button>
      </Form>
    </main>
  );
}

export default AddMLTStaff;
