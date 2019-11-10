import React, { Component } from "react";
import API from "../utils/API";
import Cookies from "js-cookie";
import { Background } from "../components/Background";
import { Logo } from "../components/Logo";
import { NavButton, Logout } from "../components/Button";

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

  handleLogOut = () => {
    Cookies.remove("token");
    this.setState({ id: "" });
    this.props.history.push("/");
  };

  render() {
    console.log("Cookie id: ", Cookies.get("token"));
    console.log("Props: ", this.props);
    console.log("Window: ", window);
    return (
      <div className="d-flex justify-content-between">
        <Background page="dashboard" />
        <div className="d-flex flex-column">
          <div>Welcome to Dashboard</div>
          <div>Name: {this.state.user.firstName}</div>
          <div>Email: {this.state.user.email}</div>
          <div>
            Picture: <img src={this.state.user.picture} alt="me" />
          </div>
          <button onClick={this.handleClick}>Log Out</button>
        </div>
      </div>
    );
  }
}

export default Dashboard;
