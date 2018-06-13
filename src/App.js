import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Header from './components/header/header.component';
import { BrowserRouter as Router } from 'react-router-dom';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
        <Header></Header>
        </div>
      </Router>
    );
  }
}

export default App;
