import React, { Component } from 'react';
import { FormGroup, ControlLabel, FormControl, Col, Button, Form, Modal } from 'react-bootstrap';
import { Link, Redirect } from 'react-router-dom';
import { setLoggedUser } from '../../actions/index.actions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

const loginStyle = { width: '100%', margin: 'auto', position: 'fixed', top: '20%'};
const modalStyle = { marginTop: '100px' };
const titleStyle = { paddingBottom: '20px' };

const containerStyle = { textAlign:'center', position: 'relative', margin: '0 auto 100px', maxWidth:'400px',
padding: '10px 35px 35px', boxShadow: '0 0 20px 0 rgba(0, 0, 0, 0.2), 0 5px 5px 0 rgba(0, 0, 0, 0.24)', zIndex: '1' };

class Login extends Component {

  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      redirect: false,
      show: false
    };

    this.handleInputChange = this.handleInputChange.bind(this);   
    this.logIn = this.logIn.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  handleInputChange(event) {
    let target = event.target;
    let value = target.value;
    let name = target.name;

    this.setState({
      [name]: value
    });
  }

  handleClose() {
    this.setState({ show: false });
  }

  logIn() {
    let { email, password } = this.state;
    let storedUsers = JSON.parse(localStorage.getItem("users"));
    let existUser = false;
    if (storedUsers) {
      storedUsers.forEach((user) => {
        if (user.email === email && user.password === password) {
          this.setState({ redirect: true });
          this.props.setLoggedUser(user.email);
          existUser = true;
          return;
        }
      });
      if (!existUser) {
        this.setState({ show: true });
      }
    } else {
      this.setState({ show: true });
    }
  }

  render() {

    if (this.state.redirect) {
      return <Redirect to="/reports" />;
    }

    const modal = (
      <Modal style={ modalStyle } show={this.state.show} onHide={this.handleClose} animation>
      <Modal.Header closeButton>
        <Modal.Title>Error!</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        You are not registered in the application!
      </Modal.Body>
      <Modal.Footer>
        <Button bsStyle="primary" onClick={this.handleClose}>Close</Button>
      </Modal.Footer>
      </Modal>
    )

    return (
      <div style={loginStyle}>
        <div style={containerStyle}>
          <div style={titleStyle}><h3>Front-End Engineer Test</h3></div>
          { modal }
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
                  onChange={this.handleInputChange}/>
              </Col>
            </FormGroup>
            <FormGroup>
              <ControlLabel>Don't have an account? <Link to={'/sign-up'}>Sign Up.</Link></ControlLabel>
            </FormGroup>
            <FormGroup>
                <Button bsStyle="primary" onClick={ this.logIn }>Login</Button>
            </FormGroup>
          </Form>
        </div>
      </div>
    )
  }

}

function mapStateToProps(state) {
  return {
    loggedUser: state.loggedUser,
    isUserLogged: state.isUserLogged
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ setLoggedUser:setLoggedUser }, dispatch);
}

export default connect(mapStateToProps,mapDispatchToProps)(Login);