import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch, Link } from 'react-router-dom';
import { Nav, Navbar, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import Login from '../login/login.component';
import SignUp from '../signUp/signUp.component';
import Reports from '../reports/reports.component';
import NewReport from '../newReport/newReport.component';

const navbarStyle = { textAlign: 'left' };

class Header extends Component {

  render() {
    return (
      <Router>
        <div>
          <Navbar fluid inverse collapseOnSelect style={navbarStyle}>
          <Navbar.Header>
            <Navbar.Brand>
              Front-End-Test
            </Navbar.Brand>
            <Navbar.Toggle />
          </Navbar.Header>
          <Navbar.Collapse>
            <Nav>
              <LinkContainer to="/reports">
                <NavItem eventKey={1} href="#">
                  Reports
                </NavItem>
              </LinkContainer>
              <LinkContainer to="/new-report">
                <NavItem eventKey={2} href="#">
                  Add New Report
                </NavItem>
              </LinkContainer>
            </Nav>
            <Nav pullRight>
              <LinkContainer to="/login">
                <NavItem eventKey={1} href="#">
                  Login / Sign Up
                </NavItem>
              </LinkContainer>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
        <div>
          <Switch>
            <Route path="/login" component={Login}/>
            <Route path="/reports" component={Reports}/>
            <Route path="/new-report" component={NewReport}/>
            <Route path="/sign-up" component={SignUp}/>
            <Redirect from='*' to='/login'/>
          </Switch>
        </div>
      </div>
    </Router>
  )
  }

}

export default Header;