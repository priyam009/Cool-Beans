import React, { Component } from "react";
import API from "../utils/API";
import Cookies from "js-cookie";
import { Link } from "react-router-dom";
import "../index.css";
import { Background, Navbar } from "../components/Basics";
import { Logo } from "../components/Logo";
import { NavButton, Logout } from "../components/Button";

class History extends Component {
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
      <Background page="dashboard">
        <Navigation props={this.props} />
        <Title title="History"/>
      </Background>
    );
  }
}

export default History;
