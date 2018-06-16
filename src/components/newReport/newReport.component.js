import React, { Component } from 'react';
import { FormGroup, ControlLabel, FormControl, Button, Form } from 'react-bootstrap';
import axios from 'axios';

class NewReport extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      redirect: false
    };

    this.handleInputChange = this.handleInputChange.bind(this);   
    this.search = this.search.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  search() {
    const email = this.state.email;
    axios.get(`http://localhost:5000/api/v1/get-report/${email}`)
    .then(response => {
      let data = response.data;
      console.log(data);
      //this.setState({ projects:data, loading: false });
    })
    .catch(error => {
      this.setState({ loading: false });
    });
  }
  
  render() {
    return (
      <div>
        <Form inline>
        <h2>Add A New Report</h2>
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
          <Button onClick={ this.search }>Search Report</Button>
        </Form>
      </div>
    )
  }

}

export default NewReport;