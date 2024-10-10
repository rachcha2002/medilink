import React, { useState, useContext } from 'react';
import { Container, Row, Col, Form, Button, Alert } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { AuthContext } from '../../Context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const auth = useContext(AuthContext); 
  const navigate = useNavigate();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false); // State to track successful login
  const [loading, setLoading] = useState(false); // Loading state

  const bgImageStyle = {
    backgroundImage: `url(${require('../../assets/images/common/bg.jpg')})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    width: '100%',
    minHeight: '100vh',
  };

  const contentStyle = {
    background: '#f6f7fc',
    padding: '7rem 2rem',
  };

  const formControlStyle = {
    border: 'none',
    boxShadow: '0 1px 2px rgba(0, 0, 0, 0.1)',
    borderRadius: '4px',
    height: '54px',
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);  // Set loading true when submitting
    setError('');      // Clear previous errors

    const data = {
      email: email,
      password: password,
    };

    try {
      const response = await fetch('http://localhost:5000/api/patients/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      if (response.ok) {
        setSuccess(true);   // Set success state to true
        auth.login(result.user, result.token);
        
        // Optionally, delay the redirect to display the confirmation message
        setTimeout(() => {
          navigate('/home');  // Redirect to homepage after a delay
        }, 2000);  // Redirect after 2 seconds
      } else {
        setError(result.message || 'Login failed. Please check your credentials.'); // Handle error
        setSuccess(false);
      }
    } catch (error) {
      setError('An error occurred. Please try again later.');
    } finally {
      setLoading(false);  // Set loading false once the request completes
    }
  };

  return (
    <div className="d-flex flex-column flex-lg-row" style={{ height: '100vh' }}>
      {/* Background Image - visible only on larger screens */}
      <div
        className="bg order-1 order-lg-2 d-none d-lg-block col-lg-4"
        style={bgImageStyle}
      ></div>

      {/* Form Contents */}
      <div
        className="contents order-2 order-lg-1 d-flex align-items-center justify-content-center col-lg-8"
        style={contentStyle}
      >
        <Container>
          <Row className="align-items-center justify-content-center">
            <Col xs={12} md={8} lg={9}>
              <h3 className="text-center text-lg-left">
                Login to <strong>Colorlib</strong>
              </h3>
              <p className="mb-4 text-center text-lg-left">
                Lorem ipsum dolor sit amet elit. Sapiente sit aut eos consectetur
                adipisicing.
              </p>

              {/* Success Message */}
              {success && (
                <Alert variant="success" className="text-center">
                  Login successful! Redirecting to homepage...
                </Alert>
              )}

              {/* Error Message */}
              {error && (
                <Alert variant="danger" className="text-center">
                  {error}
                </Alert>
              )}

              <Form onSubmit={handleSubmit}>
                {/* Email */}
                <Form.Group controlId="email" className="first mb-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="your-email@gmail.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    style={formControlStyle}
                    required
                    disabled={loading} // Disable input while loading
                  />
                </Form.Group>

                {/* Password */}
                <Form.Group controlId="password" className="last mb-3">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Your Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    style={formControlStyle}
                    required
                    disabled={loading} // Disable input while loading
                  />
                </Form.Group>

                {/* Remember me and Forgot Password */}
                <div className="d-flex mb-5 align-items-center justify-content-between">
                  <label className="control control--checkbox mb-0">
                    <span className="caption" style={{ color: '#888' }}>
                      Remember me
                    </span>
                    <input type="checkbox" defaultChecked />
                    <div
                      className="control__indicator"
                      style={{
                        position: 'absolute',
                        top: '2px',
                        left: '0',
                        height: '20px',
                        width: '20px',
                        background: '#e6e6e6',
                        borderRadius: '4px',
                      }}
                    ></div>
                  </label>
                  <span className="ml-auto">
                    <a href="#" className="forgot-pass" style={{ fontSize: '14px' }}>
                      Forgot Password
                    </a>
                  </span>
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  className="btn btn-block btn-primary"
                  style={{ height: '54px', width: '100%' }}
                  disabled={loading} // Disable button while loading
                >
                  {loading ? 'Logging in...' : 'Log In'}
                </Button>
              </Form>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
};

export default Login;
