import React from "react";
import "./style.css";
import Cookies from "js-cookie";
import { Link } from "react-router-dom";
import { Navbar } from "../Basics";
import { Logo } from "../Logo";
import { NavButton, Logout } from "../Button";

class Navigation extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      id: Cookies.get("token")
    };
  }

  handleLogOut = () => {
    Cookies.remove("token");
    this.setState({ id: "" });
    this.props.props.history.push("/");
  };
  
  render() {
    return (
      <Navbar>
        <Logo page="homepage" />
        <div className="nav-content">
          <Link to="/dashboard">
            <NavButton name="Dashboard" />
          </Link>
          <Link to="/addnew">
            <NavButton name="Add New" />
          </Link>
          <Link to="/history">
            <NavButton name="History" />
          </Link>
        </div>
        <Logout name="Log Out" handleLogOut={this.handleLogOut} />
      </Navbar>
    );
  }
}

export default Navigation;
