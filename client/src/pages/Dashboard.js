import React, { Component } from "react";
import queryString from "query-string";
import API from "../utils/API";
import Cookies from 'js-cookie';

class Dashboard extends Component {
  state = {
    token: {},
    userdata: Cookies.get('userData')
  };

  componentDidMount() {
    const parsed = queryString.parse(this.props.location.search);
    // console.log(parsed);
    this.getToken(parsed.code);
  }

  getToken = code => {
    API.getToken(code)
      .then(res => 
        // console.log("token",res.data.token)
        this.setState({ token: res.data.user })
        )
      .catch(err => console.log(err));
  };

  render() {
    console.log(this.state.userdata);
    return (
      <div>
        <div>Welcome to Dashboard</div>
        <div>Name: {this.state.userdata}</div>
        <div>Email: {this.state.userdata.email}</div>
        <div>Picture: <img src={this.state.token.picture}/></div>
      </div>
    );
  }
}

export default Dashboard;
