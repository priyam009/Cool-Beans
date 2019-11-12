import React, { Component } from "react";
import API from "../utils/API";
import Cookies from "js-cookie";
import "../index.css";
import { Background } from "../components/Basics";
import Navigation from "../components/Navigation";
import { Box } from "../components/Box";
import { Title } from "../components/Title";

class Dashboard extends Component {
  state = {
    user: {},
    id: Cookies.get("token")
  };

  componentDidMount() {
    this.getUser(this.state.id);
  }

  getUser = id => {
    if (id) {
      API.getUser(id)
        .then(res => {
          console.log(res.data);
          this.setState({ user: res.data });
        })
        .catch(err => console.log(err));
    } else {
      this.props.history.push("/");
    }
  };

  render() {
    console.log("Cookie id: ", Cookies.get("token"));
    console.log("Props: ", this.props);
    console.log("Window: ", window);

    return (
      <Background page="dashboard">
        <Navigation props={this.props} />
        <div className="d-flex flex-column w-100 dashboard-content">
          <Title title="Dashboard" />
          <div className="d-flex flex-row justify-content-between">
            <div className="d-flex flex-column justify-content-between">
              <Box location="profile" />
              <Box location="ngo" />
            </div>
            <Box location="employee" />
          </div>
        </div>
      </Background>
    );
  }
}

export default Dashboard;

/* <div className="d-flex flex-column">
      <div>Welcome to Dashboard</div>
      <div>Name: {this.state.user.firstName}</div>
      <div>Email: {this.state.user.email}</div>
      <div>
        Picture: <img src={this.state.user.picture} alt="me" />
      </div>
      <button onClick={this.handleClick}>Log Out</button>
    </div> */
