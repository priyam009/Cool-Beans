import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import Signin from "./pages/Signin";
import NoMatch from "./pages/NoMatch";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Signin} />
        <Route component={NoMatch} />
      </Switch>
    </Router>
  );
}

export default App;
