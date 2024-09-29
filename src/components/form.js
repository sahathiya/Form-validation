import React, { useState, useEffect } from 'react';
import { Form, Button, Container, Row, Col, Alert } from 'react-bootstrap';

function FormMake() {
  const initialValue = { username: '', email: '', password: '' };
  const [formValues, setFormValues] = useState(initialValue);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);

  const handleValues = (event) => {
    const { name, value } = event.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setFormErrors(validate(formValues));
    setIsSubmit(true);
  };

  useEffect(() => {
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      console.log('Form Submitted Successfully:', formValues);
      alert('Form Submitted Successfully');
    }
  }, [formErrors, isSubmit, formValues]);

  const validate = (values) => {
    const errors = {};
    const regex = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;

    if (!values.username) {
      errors.username = 'Username is required';
    }

    if (!values.email) {
      errors.email = 'Email is required';
    } else if (!regex.test(values.email)) {
      errors.email = 'This is not a valid email format';
    }

    if (!values.password) {
      errors.password = 'Password is required';
    } else if (values.password.length < 4) {
      errors.password = 'Password must be at least 4 characters';
    } else if (values.password.length > 10) {
      errors.password = 'Password cannot exceed more than 10 characters';
    }

    return errors;
  };

  return (
    <Container className='mt-5' style={{ backgroundColor: '#f8f9fa', borderRadius: '8px', padding: '20px' }}>
      <Row className='justify-content-md-center'>
        <Col md={6}>
          <h1 className='text-center mb-4' style={{ color: '#343a40' }}>Login Form</h1>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId='formUsername'>
              <Form.Label>Username</Form.Label>
              <Form.Control
                type='text'
                name='username'
                placeholder='Enter username'
                value={formValues.username}
                onChange={handleValues}
                isInvalid={!!formErrors.username}
              />
              {formErrors.username && (
                <Form.Control.Feedback type='invalid'>
                  {formErrors.username}
                </Form.Control.Feedback>
              )}
            </Form.Group>

            <Form.Group controlId='formEmail' className='mt-3'>
              <Form.Label>Email</Form.Label>
              <Form.Control
                type='email'
                name='email'
                placeholder='Enter email'
                value={formValues.email}
                onChange={handleValues}
                isInvalid={!!formErrors.email}
              />
              {formErrors.email && (
                <Form.Control.Feedback type='invalid'>
                  {formErrors.email}
                </Form.Control.Feedback>
              )}
            </Form.Group>

            <Form.Group controlId='formPassword' className='mt-3'>
              <Form.Label>Password</Form.Label>
              <Form.Control
                type='password'
                name='password'
                placeholder='Enter password'
                value={formValues.password}
                onChange={handleValues}
                isInvalid={!!formErrors.password}
              />
              {formErrors.password && (
                <Form.Control.Feedback type='invalid'>
                  {formErrors.password}
                </Form.Control.Feedback>
              )}
            </Form.Group>

            <Button variant='primary' type='submit' className='mt-4 w-100'>
              Submit
            </Button>
          </Form>

          {isSubmit && Object.keys(formErrors).length === 0 && (
            <Alert variant='success' className='mt-4'>
              Form Submitted Successfully!
            </Alert>
          )}
        </Col>
      </Row>
    </Container>
  );
}

export { FormMake };
