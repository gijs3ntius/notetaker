import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import TextEditor from './TextEditor';

class App extends Component {
  render() {
    return (
      <div className="App">
        <TextEditor />
      </div>
    );
  }
}

export default App;
