import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Panel, PanelGroup } from 'react-bootstrap';
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

    let panels;

    if (this.state.reports.length) {
      panels = this.state.reports.map((report,index) =>
        <Panel eventKey={index.toString()}>
          <Panel.Heading>
            <Panel.Title toggle>{ report.emails && report.emails[0] }</Panel.Title>
          </Panel.Heading>
          <Panel.Body collapsible>
            <ReportDetailed key={ index } report={ report } saveButton={ false }></ReportDetailed>
          </Panel.Body>
        </Panel>
      );
    }
    

    return (
      <div>
        <h3>Reports</h3>
        <PanelGroup accordion id="accordion-example">
          { panels }
        </PanelGroup>
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