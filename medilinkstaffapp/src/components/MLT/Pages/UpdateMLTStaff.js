import React, { useState, useEffect } from "react";
import { useForm, Controller, getValues } from "react-hook-form";
import { Button, Col, Form, Row } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import ImageUpload from "../../MedicalStaff/Pages/ImageUpload";
import { BsArrowLeft } from "react-icons/bs";
import { BiHide, BiShow } from "react-icons/bi";
import "./Main.css";
import PageTitle from "../../Main/PageTitle";

function UpdateMLTStaff({ toggleLoading }) {
  const { id } = useParams();
  const [errorMessage, setErrorMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [emailChanged, setEmailChanged] = useState(false); // Track email change
  const [selectedSubject, setSelectedSubject] = useState("");
  const navigate = useNavigate();

  const {
    handleSubmit,
    control,
    setValue,
    formState: { errors },
    getValues,
  } = useForm();

  useEffect(() => {
    const fetchStaffData = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_BACKEND_URL}/api/staffroutes/mltstaff/${id}`
        );
        if (response.ok) {
          const data = await response.json();
          setValue("name", data.name);
          setValue("nic", data.nic);
          setValue("contactNo", data.contactNo);
          setValue("address", data.address);
          setValue("subject", data.subject);
          setValue("speciality", data.speciality);
          setValue("email", data.email);
          setSelectedSubject(data.subject);
        } else {
          throw new Error("Failed to fetch data");
        }
      } catch (err) {
        console.error("Error fetching MLT staff details:", err);
      }
    };

    if (id) fetchStaffData();
  }, [id, setValue, toggleLoading]);

  const onSubmit = async (data) => {
    try {
      toggleLoading(true);

      // Create formData if a file (e.g., image) is being uploaded
      let requestData;
      let headers = {};

      if (data.photo) {
        requestData = new FormData();
        Object.keys(data).forEach((key) => {
          requestData.append(key, data[key]);
        });

        // Ensure the photo is included in FormData
        if (data.photo instanceof File) {
          requestData.append("photo", data.photo);
        }
      } else {
        requestData = {
          ...data,
        };
        headers["Content-Type"] = "application/json";
      }

      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/api/staffroutes/mltstaff/${id}`,
        {
          method: "PUT",
          headers: headers,
          body: data.photo ? requestData : JSON.stringify(requestData),
        }
      );

      if (response.status === 200) {
        alert("MLT Staff updated successfully!");
        navigate("/staff/hr/mlt");
      } else {
        const errorData = await response.json();
        alert("Update failed:", errorData.message);
      }
    } catch (error) {
      console.error("Error:", error.message);
    } finally {
      toggleLoading(false);
    }
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
          Update MLT Staff Account
        </h3>

        <Row className="mb-3">
          {/* Name (disabled) */}
          <Form.Group as={Col} controlId="formGridName">
            <Form.Label>Name</Form.Label>
            <Controller
              name="name"
              control={control}
              render={({ field }) => <Form.Control {...field} disabled />}
            />
          </Form.Group>

          {/* NIC (disabled) */}
          <Form.Group as={Col} controlId="formGridNic">
            <Form.Label>NIC</Form.Label>
            <Controller
              name="nic"
              control={control}
              render={({ field }) => <Form.Control {...field} disabled />}
            />
          </Form.Group>

          {/* Contact No */}
          <Form.Group as={Col} controlId="formGridContact">
            <Form.Label>Contact No.</Form.Label>
            <Controller
              name="contactNo"
              control={control}
              render={({ field }) => <Form.Control {...field} />}
            />
          </Form.Group>
        </Row>

        {/* Address */}
        <Form.Group className="mb-3" controlId="formGridAddress">
          <Form.Label>Address</Form.Label>
          <Controller
            name="address"
            control={control}
            render={({ field }) => <Form.Control {...field} />}
          />
        </Form.Group>

        {/* Subject */}
        <Row className="mb-3">
          <Form.Group as={Col} controlId="formGridSubject">
            <Form.Label>Subject</Form.Label>
            <Controller
              name="subject"
              control={control}
              render={({ field }) => (
                <Form.Select
                  {...field}
                  onChange={(e) => {
                    field.onChange(e);
                    setSelectedSubject(e.target.value);
                  }}
                  value={selectedSubject}
                >
                  <option value="Radiology">Radiology</option>
                  <option value="Laboratory">Laboratory</option>
                </Form.Select>
              )}
            />
          </Form.Group>

          {/* Speciality */}
          <Form.Group as={Col} controlId="formGridSpeciality">
            <Form.Label>Speciality</Form.Label>
            <Controller
              name="speciality"
              control={control}
              render={({ field }) => <Form.Control {...field} />}
            />
          </Form.Group>
        </Row>

        {/* Photo Upload */}
        <Row className="mb-3">
          <Form.Group as={Col} controlId="formImage">
            <Form.Label>Change photo *(.jpg, .jpeg, .png only)</Form.Label>
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
              render={({ field }) => (
                <Form.Control
                  {...field}
                  onChange={(e) => {
                    field.onChange(e);
                    setEmailChanged(true); // Track email change
                  }}
                />
              )}
            />
          </Form.Group>
        </Row>

        {/* Password (conditionally required if email is changed) */}
        <Row className="mb-3">
          <Form.Group as={Col} controlId="formGridPassword">
            <Form.Label>Password</Form.Label>
            <Controller
              name="password"
              control={control}
              rules={{
                required: emailChanged, // Require password only if email is changed
              }}
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
          Update
        </Button>
      </Form>
    </main>
  );
}

export default UpdateMLTStaff;
