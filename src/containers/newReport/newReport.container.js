import React, { Component } from 'react';
import { FormGroup, ControlLabel, FormControl, Button, Form, Modal } from 'react-bootstrap';
import axios from 'axios';
import ReportDetailed from '../../containers/reportDetailed/reportDetailed.component';
import ReactLoading from 'react-loading';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom'

const modalStyle = { marginTop: '100px' };

class NewReport extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      report: null,
      loading: false,
      show: false,
      redirect: true
    };

    this.handleInputChange = this.handleInputChange.bind(this);   
    this.search = this.search.bind(this);
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

  search() {
    this.setState({ loading:true });
    const email = this.state.email;
    axios.get(`http://localhost:5000/api/v1/get-report/${email}`)
    .then(response => {
      let data = response.data;
      this.setState({ report:data, loading: false });
    })
    .catch(error => {
      this.setState({ loading: false, show: true });
    });
  }
  
  render() {

    const { isUserLogged } = this.props;

    if (!isUserLogged) {
      return <Redirect to="/login" />;
    }

    const modal = (
      <Modal style={ modalStyle } show={this.state.show} onHide={this.handleClose} animation>
      <Modal.Header closeButton>
        <Modal.Title>Error!</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        You dont have internet access!
      </Modal.Body>
      <Modal.Footer>
        <Button bsStyle="primary" onClick={this.handleClose}>Close</Button>
      </Modal.Footer>
      </Modal>
    )

    const loadingSpinig = this.state.loading ? (
      <center>
        <ReactLoading type={'spin'} color={'blue'} height={200} width={100} />
      </center>
    ) : null;

    return (
      <div>
        { modal }
        <Form inline>
        <h2 style={{ marginBottom:'30px' }}>Add A New Report</h2>
        <h5>Enter an email address to searh information of the user!</h5>
          <FormGroup controlId="formInlineEmail">
            <ControlLabel>Email to Search: </ControlLabel>{' '}
            <FormControl 
              placeholder="jane.doe@example.com" 
              name="email"
              value={ this.state.email }
              onChange={this.handleInputChange} 
            />
          </FormGroup>{' '}
          <Button bsStyle="primary" onClick={ this.search }>Search Report</Button>
        </Form>
        <div className="container" style={{ maxWidth:'460', textAlign:'center', marginTop:'30px' }}>
          { loadingSpinig }
          <ReportDetailed report={ this.state.report } saveButton={ true }></ReportDetailed>
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

export default connect(mapStateToProps)(NewReport);