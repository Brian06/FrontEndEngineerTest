import React, { Component } from 'react';
import { FormGroup, ControlLabel, FormControl, Col, Button, Form } from 'react-bootstrap';
import { Link, Redirect } from 'react-router-dom';

const loginStyle = { width: '100%', margin: 'auto', position: 'fixed', top: '20%'};

const containerStyle = { textAlign:'center', position: 'relative', margin: '0 auto 100px', maxWidth:'400px',
padding: '10px 35px 35px', boxShadow: '0 0 20px 0 rgba(0, 0, 0, 0.2), 0 5px 5px 0 rgba(0, 0, 0, 0.24)', zIndex: '1' };

const titleStyle = { paddingBottom: '20px' }

class Login extends Component {

  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      redirect: false
    };

    this.handleInputChange = this.handleInputChange.bind(this);   
    this.logIn = this.logIn.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  logIn() {
    const { email, password } = this.state;
    let storedUsers = JSON.parse(localStorage.getItem("users"));
    if (storedUsers) {
      storedUsers.forEach((user) => {
        if (user.email === email && user.password === password) {
          this.setState({ redirect: true });
          return;
        }
      });
      console.log('login failed!'); //TODO add validations or a modal
    } else {
      console.log('login failed!'); //TODO add validations or a modal
    }
  }

  render() {

    if (this.state.redirect) {
      return <Redirect to="/reports" />;
    }

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
                <Button onClick={ this.logIn }>Login</Button>
            </FormGroup>
          </Form>
        </div>
      </div>
    )
  }

}

export default Login;