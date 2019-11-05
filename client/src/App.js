import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import Signin from "./pages/Signin";
import Dashboard from "./pages/Dashboard";
import NoMatch from "./pages/NoMatch";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Signin} />
        <Route exact path="/dashboard" component={Dashboard} />
        <Route component={NoMatch} />
      </Switch>
    </Router>
  );
}

export default App;
