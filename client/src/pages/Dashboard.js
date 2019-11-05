import React, { Component } from "react";
import queryString from "query-string";
import API from "../utils/API";

class Dashboard extends Component {
  state = {
    code: ""
  };

  componentDidMount() {
    const parsed = queryString.parse(this.props.location.search);

    this.getToken(parsed.code);
  }

  getToken = (code) => {
    API.getToken(code)
      .then(res => console.log(res))
      .catch(err => console.log(err));
  };

  render() {
    console.log(this.state.code);
    return <div>Welcome to the React dashboard</div>;
  }
}

export default Dashboard;
