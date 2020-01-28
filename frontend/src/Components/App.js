import React, { Component } from "react";
import { HashRouter as Router } from "react-router-dom";
import Header from "./Header";
import Routes from "./Routes";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <Router>
          <Routes />
        </Router>
      </div>
    );
  }
}

export default App;