import React, { useState } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { IMAGES } from '../../constants/images';
import { useAuthContext } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

function LoginForm() {
  const [formData, setFormData] = useState({
    userType: '',
    username: '',
    password: '',
  });

  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuthContext();
  const navigate = useNavigate(); 

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage('');
  
    try {
      const response = await fetch('http://localhost:5000/api/staffprofile/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        console.log('Login successful:', data);
  
        // Destructure the response to get usertype, user, and token
        const { usertype, user, token } = data;
  
        // Log the usertype, user, and token
        console.log('User Type:', usertype);
        console.log('User:', user);
        console.log('Token:', token);

        login(usertype, user, token);

        if(usertype === 'mlt'){
         navigate('/mltstaff');
        }

        else if(usertype === 'hospitaladmin'){
          navigate('/hospitaladmin');

        }
        else if(usertype === 'doctor'){
          navigate('/medicalstaff');
        }

        else{
          navigate('/medicalstaff');
        }


  
  
      } else {
        setErrorMessage(data.message || 'An error occurred during login.');
      }
    } catch (error) {
      console.error('Error during login:', error);
      setErrorMessage('Failed to connect to the server.');
    } finally {
      setIsLoading(false);
    }
  };
  

  return (
    <Container
      fluid
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundColor: '#f8f9fa',
      }}
    >
      <Row style={{ width: '100%' }}>
        <Col
          md={{ span: 6, offset: 3 }}
          lg={{ span: 4, offset: 4 }}
          style={{ display: 'flex', justifyContent: 'center' }}
        >
          <div
            style={{
              backgroundColor: '#fff',
              padding: '2rem',
              borderRadius: '10px',
              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
              width: '100%',
            }}
          >
            {/* MediLink Logo */}
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1rem' }}>
              <img
                src={IMAGES.logo} // Update with the actual path to your logo
                alt="MediLink Logo"
                style={{ width: '200px' }}
              />
            </div>

            {/* Heading */}
            <h3
              style={{
                fontSize: '1.5rem',
                fontWeight: 'bold',
                textAlign: 'center',
                marginBottom: '1.5rem',
              }}
            >
              Log In to MediLink
            </h3>

            {errorMessage && (
              <div
                style={{
                  color: 'red',
                  marginBottom: '1rem',
                  textAlign: 'center',
                }}
              >
                {errorMessage}
              </div>
            )}

            <Form onSubmit={handleSubmit}>
              {/* User Type Field */}
              <Form.Group className="mb-3" controlId="formUserType">
                <Form.Label>User Type</Form.Label>
                <Form.Control
                  as="select"
                  name="userType"
                  value={formData.userType}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select User Type</option>
                  <option value="mlt">MLT Staff</option>
                  <option value="hospitaladmin">Hospital Administrator</option>
                  <option value="doctor">Medical Staff - Doctor</option>
                  <option value="nurse">Medical Staff - Nurse</option>
                </Form.Control>
              </Form.Group>

              {/* Username Field */}
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="text"
                  name="username"
                  placeholder="Enter Email"
                  value={formData.username}
                  onChange={handleChange}
                  required
                  style={{ padding: '0.75rem' }}
                />
              </Form.Group>

              {/* Password Field */}
              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  style={{ padding: '0.75rem' }}
                />
              </Form.Group>

              {/* Remember Me & Forgot Password */}
              <Form.Group
                className="mb-3"
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <Form.Check type="checkbox" label="Remember Me" />
                <a
                  href="/forgot-password"
                  style={{ fontSize: '0.9rem', textDecoration: 'none' }}
                >
                  Forgot Password?
                </a>
              </Form.Group>

              {/* Submit Button */}
              <Button
                variant="dark"
                type="submit"
                style={{ width: '100%', padding: '0.75rem' }}
                disabled={isLoading}
              >
                {isLoading ? 'Logging in...' : 'Log In'}
              </Button>
            </Form>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default LoginForm;
