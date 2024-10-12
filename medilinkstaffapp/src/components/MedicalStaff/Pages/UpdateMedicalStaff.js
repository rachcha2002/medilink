import React, { useState, useEffect } from "react";
import { useForm, Controller, getValues } from "react-hook-form";
import { Button, Col, Form, Row } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import ImageUpload from "./ImageUpload";
import { BsArrowLeft } from "react-icons/bs";
import { BiHide, BiShow } from "react-icons/bi";
import "../../Main/Main.css";
import PageTitle from "../../Common/PageTitle";

function UpdateMedicalStaff({ toggleLoading }) {
  const { id, position } = useParams();
  const [errorMessage, setErrorMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [selectedPosition, setSelectedPosition] = useState(position || "");
  const [workingHours, setWorkingHours] = useState([""]);
  const [emailChanged, setEmailChanged] = useState(false); // Track email change
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
          `${process.env.REACT_APP_BACKEND_URL}/api/staffroutes/${
            position === "Doctor" ? "doctors" : "nurses"
          }/${id}`
        );
        if (response.ok) {
          const data = await response.json();
          setValue("name", data.name);
          setValue("nic", data.nic);
          setValue("contact", data.contactNo);
          setValue("email", data.email);
          setValue("speciality", data.speciality || "");
          setValue("hospital", data.hospital);
          setWorkingHours(data.workingHours || [""]);
        } else {
          throw new Error("Failed to fetch data");
        }
      } catch (err) {
        console.error("Error fetching staff details:", err);
      }
    };

    if (id && position) fetchStaffData();
  }, [id, position, setValue, toggleLoading]);

  const handleAddWorkingHour = () => {
    setWorkingHours([...workingHours, ""]);
  };

  const handleRemoveWorkingHour = (index) => {
    const newWorkingHours = [...workingHours];
    newWorkingHours.splice(index, 1);
    setWorkingHours(newWorkingHours);
  };

  const handleWorkingHourChange = (index, value) => {
    const newWorkingHours = [...workingHours];
    newWorkingHours[index] = value;
    setWorkingHours(newWorkingHours);
  };

  const onSubmit = async (data) => {
    try {
      toggleLoading(true);

      // Create formData if a file (e.g., image) is being uploaded
      let requestData;
      let headers = {};

      if (data.photo) {
        // Use FormData when uploading an image
        requestData = new FormData();
        Object.keys(data).forEach((key) => {
          requestData.append(key, data[key]);
        });
        requestData.append("workingHours", workingHours); // Add working hours array

        // Ensure the photo is included in FormData
        if (data.photo instanceof File) {
          requestData.append("photo", data.photo);
        }
      } else {
        // Use JSON when no image is uploaded
        requestData = {
          ...data,
          workingHours: workingHours, // Add working hours array
        };
        headers["Content-Type"] = "application/json"; // Set JSON content type header
      }

      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/api/staffroutes/${
          selectedPosition === "Doctor" ? `doctors/${id}` : `nurses/${id}`
        }`,
        {
          method: "PUT",
          headers: headers, // Only set headers if using JSON
          body: data.photo ? requestData : JSON.stringify(requestData), // Use FormData if photo, else JSON
        }
      );

      if (response.status === 200) {
        alert(`${selectedPosition} updated successfully!`);
        navigate(-1);
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
      <PageTitle
        title="Update Medical Staff"
        url="/hospitaladmin/updatemediaclstaff"
      />
      <Form onSubmit={handleSubmit(onSubmit)}>
        <h3>
          <Button
            variant="dark"
            onClick={() => navigate("/hospitaladmin/medicalstaff")}
            style={{ margin: "10px" }}
          >
            <BsArrowLeft /> Back
          </Button>
          Update Medical Staff Account
        </h3>
        <hr />

        <Row className="mb-3">
          {/* Name (disabled) */}
          <Form.Group as={Col} controlId="formGridName">
            <Form.Label>Name</Form.Label>
            <Controller
              name="name"
              control={control}
              render={({ field }) => (
                <Form.Control {...field} disabled /> // Disable name field
              )}
            />
          </Form.Group>

          {/* NIC (disabled) */}
          <Form.Group as={Col} controlId="formGridNic">
            <Form.Label>NIC</Form.Label>
            <Controller
              name="nic"
              control={control}
              render={({ field }) => (
                <Form.Control {...field} disabled /> // Disable NIC field
              )}
            />
          </Form.Group>

          {/* Contact No */}
          <Form.Group as={Col} controlId="formGridContact">
            <Form.Label>Contact No.</Form.Label>
            <Controller
              name="contact"
              control={control}
              render={({ field }) => <Form.Control {...field} />}
            />
          </Form.Group>
        </Row>

        {/* Position (disabled) */}
        <Row className="mb-3">
          <Form.Group as={Col} controlId="formGridPosition">
            <Form.Label>Position</Form.Label>
            <Controller
              name="position"
              control={control}
              render={({ field }) => (
                <Form.Select {...field} disabled>
                  <option value="Doctor">Doctor</option>
                  <option value="Nurse">Nurse</option>
                </Form.Select>
              )}
            />
          </Form.Group>

          {/* Speciality (conditionally rendered if "Doctor" is selected) */}
          {selectedPosition === "Doctor" && (
            <Form.Group as={Col} controlId="formGridSpeciality">
              <Form.Label>Speciality</Form.Label>
              <Controller
                name="speciality"
                control={control}
                render={({ field }) => <Form.Control {...field} />}
              />
            </Form.Group>
          )}
        </Row>

        {/* Working Hours (conditionally rendered if "Doctor" is selected) */}
        {selectedPosition === "Doctor" && (
          <Row className="mb-3">
            <Col>
              <Form.Label>Working Hours</Form.Label>
              {workingHours.map((workingHour, index) => (
                <Row key={index} className="mb-2">
                  <Col>
                    <Form.Control
                      type="text"
                      value={workingHour}
                      onChange={(e) =>
                        handleWorkingHourChange(index, e.target.value)
                      }
                    />
                  </Col>
                  {index > 0 && (
                    <Col xs="auto">
                      <Button
                        variant="danger"
                        onClick={() => handleRemoveWorkingHour(index)}
                      >
                        Remove
                      </Button>
                    </Col>
                  )}
                </Row>
              ))}
              <Button variant="primary" onClick={handleAddWorkingHour}>
                Add Working Hour
              </Button>
            </Col>
          </Row>
        )}

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

export default UpdateMedicalStaff;
