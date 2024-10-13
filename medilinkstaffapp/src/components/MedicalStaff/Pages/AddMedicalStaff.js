import React, { useState, useEffect } from "react";
import { useForm, Controller, getValues } from "react-hook-form";
import { Button, Col, Form, Row } from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate } from "react-router-dom";
import ImageUpload from "../../ImageUpload/ImageUpload";
import { BsArrowLeft } from "react-icons/bs";
import { BiCheckCircle, BiHide, BiShow } from "react-icons/bi";
import "../../Main/Main.css";
import PageTitle from "../../Common/PageTitle";
import { useAuthContext } from "../../../context/AuthContext";

function AddMedicalStaff({ toggleLoading }) {
  const { user } = useAuthContext();
  const [isUserLoading, setIsUserLoading] = useState(true); // Loading state for user
  const [hospital, setHospital] = useState(""); // Hospital value from user
  const [errorMessage, setErrorMessage] = useState("");
  const [isConfirmPasswordValid, setIsConfirmPasswordValid] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [selectedPosition, setSelectedPosition] = useState("");
  const [workingHours, setWorkingHours] = useState([""]); // Array to handle working hours

  const navigate = useNavigate();

  // Fetch user hospital from context once user is loaded
  useEffect(() => {
    if (user && user.hospitalName) {
      setHospital(user.hospitalName);
      setIsUserLoading(false); // Mark as loaded
    }
  }, [user]);

  // Handle adding a new working hours field
  const handleAddWorkingHour = () => {
    setWorkingHours([...workingHours, ""]);
  };

  // Handle removing a working hour field
  const handleRemoveWorkingHour = (index) => {
    const newWorkingHours = [...workingHours];
    newWorkingHours.splice(index, 1);
    setWorkingHours(newWorkingHours);
  };

  // Handle changes in the working hour field
  const handleWorkingHourChange = (index, value) => {
    const newWorkingHours = [...workingHours];
    newWorkingHours[index] = value;
    setWorkingHours(newWorkingHours);
  };

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
      const formData = new FormData();
      Object.keys(data).forEach((key) => {
        formData.append(key, data[key]);
      });
      formData.append("workingHours", workingHours); // Append working hours array
      formData.append("hospital", hospital); // Append hospital name

      console.log("Form Data:", formData);

      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/api/staffroutes/create-medicalstaff`,
        {
          method: "POST",
          body: formData,
        }
      );
      if (response.status === 201) {
        const result = await response.json();
        alert("Employee Registered Successfully!");
        navigate("/hospitaladmin/medicalstaff");
      } else if (response.status === 400) {
        alert("Employee Registration Failed!", response.data.message);
      } else {
        throw new Error("Failed to submit data");
      }
    } catch (error) {
      console.error("Error:", error.message);
    } finally {
      toggleLoading(false);
    }
  };

  const handlePositionChange = (e) => {
    setSelectedPosition(e.target.value);
    setWorkingHours([""]); // Reset working hours when changing position
  };

  return (
    <main id="main" className="main">
      <PageTitle
        title="Create Medicl Staff"
        url="/hospitaladmin/addmedicalstaff"
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
          Create Medical Staff Account
        </h3>
        <hr />

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

        {/* Position */}
        <Row className="mb-3">
          <Form.Group as={Col} controlId="formGridPosition">
            <Form.Label>Position</Form.Label>
            <Controller
              name="position"
              control={control}
              rules={{ required: "Position is required" }}
              render={({ field }) => (
                <Form.Select
                  {...field}
                  onChange={(e) => {
                    field.onChange(e);
                    handlePositionChange(e);
                  }}
                >
                  <option value="">Choose Position</option>
                  <option value="Doctor">Doctor</option>
                  <option value="Nurse">Nurse</option>
                </Form.Select>
              )}
            />
            <Form.Text className="text-danger">
              {errors.position?.message}
            </Form.Text>
          </Form.Group>

          {/* Speciality (conditionally rendered if "Doctor" is selected) */}
          {selectedPosition === "Doctor" && (
            <Form.Group as={Col} controlId="formGridSpeciality">
              <Form.Label>Speciality</Form.Label>
              <Controller
                name="speciality"
                control={control}
                rules={{ required: "Speciality is required for doctors" }}
                render={({ field }) => (
                  <Form.Control placeholder="Enter Speciality" {...field} />
                )}
              />
              <Form.Text className="text-danger">
                {errors.speciality?.message}
              </Form.Text>
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
                      placeholder="Working Hour"
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

export default AddMedicalStaff;
