import logo from './ddlogo.svg';
import './App.css';
import React from "react"

class App extends React.Component {

  state = { isLoaded: false, models: [] };

  componentDidMount() {
    fetch("http://api/3060stats", {
      method: "GET",
      headers: {
          'Content-Type': 'application/json'
      }
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        } else {
          throw Error(res.statusText);
        }
      })
      .then(json => {
        this.setState({
          models: json,
          isLoaded: true
        });
      });
  }

  render() {

    const { isLoaded, models } = this.state;

    console.log(models)
    if (!isLoaded) {
      return (
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <h1>
              Test app with istio for ПППРП          
            </h1>
            <p>
              Getting stats for nvidia rtx 3060 from https://api.minerstat.com/:
            </p>
            <p>Loading...</p>
          </header>
        </div>
      );
    }

    console.log(models)
  
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1>
            Test app with istio for ПППРП          
          </h1>
          <div>
            Stats for nvidia rtx 3060 from https://api.minerstat.com/:
          </div>
          <div>{models.message.toString()}</div>
        </header>
      </div>
    )
  }
}

export default App;
