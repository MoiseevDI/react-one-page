import logo from './ddlogo.svg';
import './App.css';
import React from "react"

class App extends React.Component {
  render() {

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1>
            Test react app for PDRIS 3     
          </h1>
          <div>
            This is clean react app without back for testing pipeline
          </div>
        </header>
      </div>
    )
  }
}

export default App;
