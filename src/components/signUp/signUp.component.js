import React, { Component } from 'react';
import { FormGroup, ControlLabel, FormControl, Col, Button, Form, Modal } from 'react-bootstrap';
import { Link, Redirect } from 'react-router-dom';

const loginStyle = { width: '100%', margin: 'auto', position: 'fixed', top: '20%'};
const modalStyle = { marginTop: '100px' };
const containerStyle = { textAlign:'center', position: 'relative', margin: '0 auto 100px', maxWidth:'400px',
padding: '10px 35px 35px', boxShadow: '0 0 20px 0 rgba(0, 0, 0, 0.2), 0 5px 5px 0 rgba(0, 0, 0, 0.24)', zIndex: '1' };

const titleStyle = { paddingBottom: '20px' }

class SignUp extends Component {

  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      redirect: false,
      show: false
    };

    this.handleInputChange = this.handleInputChange.bind(this);   
    this.signUp = this.signUp.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  handleClose() {
    this.setState({ show: false });
  }

  signUp() {
    let credentials = { email: this.state.email, password: this.state.password };
    let storedUsers = JSON.parse(localStorage.getItem("users"));
    let existUser = false; 
    if (storedUsers) {
      storedUsers.forEach(storedUser => {
        if (storedUser.email === this.state.email) {
          existUser = true;
        }
      });
      if (existUser) {
        this.setState({ show:true })
      } else {
        storedUsers.push(credentials);
        localStorage.setItem("users", JSON.stringify(storedUsers));
        this.setState({ redirect: true});
      }
    } else {
      storedUsers = [];
      storedUsers.push(credentials);
      localStorage.setItem("users", JSON.stringify(storedUsers));
      this.setState({ redirect: true});
    }
    
  }

  render() {

    if (this.state.redirect) {
      return <Redirect to="/login" />;
    }

    const modal = (
      <Modal style={ modalStyle } show={this.state.show} onHide={this.handleClose} animation>
      <Modal.Header closeButton>
        <Modal.Title>Error!</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        There is already a user with this email!
      </Modal.Body>
      <Modal.Footer>
        <Button bsStyle="primary" onClick={this.handleClose}>Close</Button>
      </Modal.Footer>
      </Modal>
    )

    return (
      <div style={loginStyle}>
      { modal }
        <div style={containerStyle}>
          <div style={titleStyle}><h3>Sign Up its free</h3></div>
          <Form horizontal>
            <FormGroup controlId="formHorizontalEmail">
              <Col componentClass={ControlLabel} sm={3}>
                Email:
              </Col>
              <Col sm={9}>
                <FormControl 
                  type="text" 
                  placeholder="Email" 
                  name="email"
                  value={ this.state.email }
                  onChange={this.handleInputChange} 
                />
              </Col>
            </FormGroup>
            <FormGroup controlId="formHorizontalPassword">
              <Col componentClass={ControlLabel} sm={3}>
                Password:
              </Col>
              <Col sm={9}>
                <FormControl 
                  type="password" 
                  placeholder="Password" 
                  name="password"
                  value={ this.state.password }
                  onChange={this.handleInputChange} 
                />
              </Col>
            </FormGroup>
            <FormGroup>
              <ControlLabel>Already have an account? <Link to={'/login'}>Log In.</Link></ControlLabel>
            </FormGroup>
            <FormGroup>
                <Button bsStyle="primary" onClick={ this.signUp }>Sign Up</Button>
            </FormGroup>
          </Form>
        </div>
      </div>
    )
  }

}

export default SignUp;