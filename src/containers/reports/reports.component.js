import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Panel, PanelGroup } from 'react-bootstrap';
import { Redirect } from 'react-router-dom'
import ReportDetailed from '../reportDetailed/reportDetailed.component';

class Reports extends Component {

  constructor(props) {
    super(props);
    this.state = {
      reports: []
    };

    this.getReports = this.getReports.bind(this);
  }

  getReports() {
    let storedReports = JSON.parse(localStorage.getItem("reports"));
    let myReports = [];
    if (storedReports) {
      storedReports.forEach(storeReport => {
        if (storeReport.user === this.props.loggedUser) {
          myReports.push(storeReport.report)
        }
      });
      this.setState({ reports:myReports });
    }
  }

  componentDidMount() {
    this.getReports();
  }

  render() {

    let { isUserLogged } = this.props;
    let panels;

    if (!isUserLogged) {
      return <Redirect to="/login" />;
    }

    if (this.state.reports.length) {
      panels = this.state.reports.map((report,index) =>
        <Panel key={ index } eventKey={index.toString()}>
          <Panel.Heading>
            <Panel.Title toggle>{ report.emails && report.emails[0] }</Panel.Title>
          </Panel.Heading>
          <Panel.Body collapsible>
            <ReportDetailed report={ report } saveButton={ false }></ReportDetailed>
          </Panel.Body>
        </Panel>
      );
    }

    const reports = this.state.reports.length ? (
      <PanelGroup accordion id="accordion-example">
        { panels }
      </PanelGroup>
    ) : (
      <h4>Please Add A Report</h4>
    )
    
    return (
      <div>
        <h2 style={{ marginBottom:'30px' }}>Reports</h2>
        <div className="container" style={{ maxWidth:'460', textAlign:'center', marginTop:'30px' }}>
          { reports }
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

export default connect(mapStateToProps)(Reports);