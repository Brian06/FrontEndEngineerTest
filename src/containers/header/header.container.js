import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch, Link } from 'react-router-dom';
import { Nav, Navbar, NavItem } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { logout } from '../../actions/index.actions';
import Login from '../login/login.container';
import SignUp from '../../components/signUp/signUp.component';
import Reports from '../../components/reports/reports.component';
import NewReport from '../../components/newReport/newReport.component';

const navbarStyle = { textAlign: 'left', zIndex: '2' };

class Header extends Component {

  constructor(props) {
    super(props);
    this.state = {};

    this.logout = this.logout.bind(this);
  }

  logout(){
    this.props.logout();
  }

  render() {

    const { loggedUser, isUserLogged } = this.props;

    const loginOrLogout = isUserLogged ? (
        <NavItem eventKey={1} href="#" onClick={ this.logout }>
          { loggedUser } - Logout
        </NavItem>
    ) : (
      <NavItem eventKey={1} href="#" onClick={ this.logout }>
        Login
      </NavItem>
    );

    const reports = isUserLogged ? (
      <LinkContainer to="/reports">
        <NavItem eventKey={1} href="#">
          Reports
        </NavItem>
      </LinkContainer>
    ) : null;

    const newReport = isUserLogged ? (
      <LinkContainer to="/new-report">
        <NavItem eventKey={2} href="#">
          Add New Report
        </NavItem>
      </LinkContainer>
    ) : null;

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
              { reports }
              { newReport }
            </Nav>
            <Nav pullRight>
              <LinkContainer to="/login">
                { loginOrLogout }
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

function mapStateToProps(state) {
  return {
    loggedUser: state.loggedUser,
    isUserLogged: state.isUserLogged
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ logout:logout }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);