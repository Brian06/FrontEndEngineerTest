import React, { Component } from 'react';
import { Tab, Tabs, ListGroup, ListGroupItem, Jumbotron, Button, Modal } from 'react-bootstrap';
import { connect } from 'react-redux';

class reportDetailed extends Component {
  constructor(props) {
    super(props);
    this.state = {
      key: 1,
      error: false,
      show: false
    };

    this.handleSelect = this.handleSelect.bind(this);
    this.setKey = this.setKey.bind(this);
    this.saveReport = this.saveReport.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  handleSelect(key) {
    //alert(`selected ${key}`);
    this.setState({ key });
  }

  componentDidMount() {
    this.setKey();
  }

  setKey() {
    let key = this.props.report && !this.props.report.names ? 2 : 1;
    this.setState({ key: key});
  }

  saveReport() {
    let { loggedUser, report } = this.props;
    let reportToSave = { user: loggedUser, report: report };
    let storedReports = JSON.parse(localStorage.getItem("reports"));
    let existReport = false;
    if (storedReports) {
      storedReports.forEach(StoredReport => {
        if (StoredReport.user === loggedUser) {
          if (StoredReport.report.emails[0] === report.emails[0]) {
            existReport = true;
          }
        }
      });
      if (existReport) {
        console.log('repetido')
        this.setState({ show:true, error:true });
      } else {
        storedReports.push(reportToSave);
        localStorage.setItem("reports", JSON.stringify(storedReports));
        this.setState({ show:true });
      }
    } else {
      storedReports = [];
      storedReports.push(reportToSave);
      localStorage.setItem("reports", JSON.stringify(storedReports));
      this.setState({ show:true });
    }
  }

  handleClose() {
    this.setState({ show: false, error: false });
  }
  
  render() {

    const { report } = this.props;

    if (!report) {
      return null;
    }

    let names = [];
    let emails = [];
    let jobs = [];
    let socials = [];
    if (report.names) {
      names = report.names.map((name) =>
        <ListGroupItem key={name}>{ name }</ListGroupItem>
      );
    }
    
    if (report.emails) {
      emails = report.emails.map((email) =>
        <ListGroupItem key={email}>{ email }</ListGroupItem>
      );
    }

    if (report.jobs) {
      jobs = report.jobs.map((job) =>
        job.title ? (
          <ListGroupItem key={job.title}>
            <span style={{ fontWeight: 'bold' }}>
              { job.company }
            </span><br/> 
            as { job.title }
          </ListGroupItem>
        ) : (
          <ListGroupItem key={job.title}>
            <span style={{ fontWeight: 'bold' }}>
              { job.company }
            </span>
          </ListGroupItem>
        )
      );
    }

    if (report.socials) {
      socials = report.socials.map((social,index) =>
        social.type ? (
          <ListGroupItem key={index}>
            <a href={ social.url }>{ social.type }</a> 
          </ListGroupItem>
        ) : null
      );
    }

    const saveButton = this.props.saveButton ? (
      <Button onClick={ this.saveReport }>Save this Report</Button>
    ) : null;

    let modalHeader = this.state.error ? 'Error!' : 'Success';
    let modalBody = this.state.error ? 'There is already a report saved for this email' : 'Great!, Report saved successfully!';
    const modal = (
      <Modal className="modal modal-center" show={this.state.show} onHide={this.handleClose} animation>
      <Modal.Header closeButton>
        <Modal.Title>{ modalHeader }</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        { modalBody }
      </Modal.Body>
      <Modal.Footer>
        <Button bsStyle="primary" onClick={this.handleClose}>Close</Button>
      </Modal.Footer>
      </Modal>
    )

    return (
      <Jumbotron style={{ paddingTop: '0px' }}>
        { modal }
        <Tabs
          activeKey={this.state.key}
          onSelect={this.handleSelect}
          id="controlled-tab-example"
          style={{ display:'inline-block' }}
        >
          <Tab eventKey={1} title="Names" disabled={ !names.length }>
            <ListGroup style={{textAlign:'center'}}>
              { names }
            </ListGroup>
          </Tab>
          <Tab eventKey={2} title="Emails">
            <ListGroup style={{textAlign:'center'}}>
              { emails }
            </ListGroup>
          </Tab>
          <Tab eventKey={3} title="Jobs" disabled={ !jobs.length }>
            <ListGroup style={{textAlign:'center'}}>
              { jobs }
            </ListGroup>
          </Tab>
          <Tab eventKey={4} title="Socials" disabled={ !socials.length }>
            <ListGroup style={{textAlign:'center'}}>
              {socials}
            </ListGroup>
          </Tab>
        </Tabs>
        <div>
          { saveButton }
        </div>
      </Jumbotron>
    )
  }

}

function mapStateToProps(state) {
  return {
    loggedUser: state.loggedUser,
    isUserLogged: state.isUserLogged
  };
}

export default connect(mapStateToProps)(reportDetailed);