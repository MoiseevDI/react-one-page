import logo from './ddlogo.svg';
import './App.css';
import React from "react"
import Paper from 'material-ui/Paper';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Polarity from "./components/Polarity";

class App extends React.Component {

  state = { isLoaded: false, models: [] };

  componentDidMount() {
    fetch("http://api/newssa", {
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
    let comps = [];

    models.forEach(function(item, i, models) {
      comps.push(<Polarity sentence={item["sentence"]} polarity={item["polarity"]}/>)
    });
  
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1>
            Тестовое приложение istio + k8s для ПППРП
          </h1>
          <div>
            Анализ тональности заголовков последних новостей
          </div>
          <div className="centerize">
          <MuiThemeProvider>
              <Paper zDepth={1} className="content">
                  {comps.map(function(object, i){
                      return object;
                  })}
              </Paper>
          </MuiThemeProvider>
          </div>
        </header>
      </div>
    )
  }
}

export default App;
