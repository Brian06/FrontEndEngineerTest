import React, { Component } from 'react';
import { FormGroup, ControlLabel, FormControl, Col, Button, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const loginStyle = { width: '100%', margin: 'auto', position: 'fixed', top: '20%'};

const containerStyle = { textAlign:'center', position: 'relative', margin: '0 auto 100px', maxWidth:'400px',
padding: '10px 35px 35px', boxShadow: '0 0 20px 0 rgba(0, 0, 0, 0.2), 0 5px 5px 0 rgba(0, 0, 0, 0.24)', zIndex: '1' };

const titleStyle = { paddingBottom: '20px' }

class Login extends Component {

  render() {
    return (
      <div style={loginStyle}>
        <div style={containerStyle}>
          <div style={titleStyle}><h3>Front-End Engineer Test</h3></div>
          <Form horizontal>
            <FormGroup controlId="formHorizontalEmail">
              <Col componentClass={ControlLabel} sm={3}>
                Email:
              </Col>
              <Col sm={9}>
                <FormControl type="email" placeholder="Email" />
              </Col>
            </FormGroup>
            <FormGroup controlId="formHorizontalPassword">
              <Col componentClass={ControlLabel} sm={3}>
                Password:
              </Col>
              <Col sm={9}>
                <FormControl type="password" placeholder="Password" />
              </Col>
            </FormGroup>
            <FormGroup>
              <ControlLabel>Don't have an account? <Link to={'/sign-up'}>Sign Up.</Link></ControlLabel>
            </FormGroup>
            <FormGroup>
                <Button type="submit">Login</Button>
            </FormGroup>
          </Form>
        </div>
      </div>
    )
  }

}

export default Login;