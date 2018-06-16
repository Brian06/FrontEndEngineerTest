import React, { Component } from 'react';
import { connect } from 'react-redux';

class Reports extends Component {

  render() {
    return (
      <div>
        <h3>Reports</h3>
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

export default connect(mapStateToProps)(Reports);