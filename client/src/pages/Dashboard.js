import React, { Component } from "react";
import API from "../utils/API";
import Cookies from "js-cookie";
import "../index.css";
import { Background } from "../components/Basics";
import Navigation from "../components/Navigation";
import { Box } from "../components/Box";
import { Title } from "../components/Title";
import { Order } from "../components/Modal";

class Dashboard extends Component {
  state = {
    id: Cookies.get("token"),
    userName: "",
    userEmail: "",
    userPicture: "",
    ngo: [],
    employee: [],
    show: false,
    modal: {
      employee: {},
      ngo: []
    },
    coffee: [
      {
        name: "Latte",
        price: 4,
        qty: 0
      },
      {
        name: "Cappuccino",
        price: 4,
        qty: 0
      },
      {
        name: "Mocha",
        price: 4.5,
        qty: 0
      },
      {
        name: "Espresso",
        price: 3,
        qty: 0
      }
    ],
    total: 0,
    ngoContri: 0
  };

  componentDidMount() {
    this.getUser(this.state.id);
  }

  //Get User info
  getUser = id => {
    if (id) {
      API.getUser(id)
        .then(res => {
          this.setState({
            userName: res.data.firstName,
            userEmail: res.data.email,
            userPicture: res.data.picture,
            ngo: res.data.ngo,
            employee: res.data.employee
          });
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
    console.log("User: ", this.state.user);

    return (
      <Background page="dashboard">
        <Navigation props={this.props} />
        <div className="dashboard-content d-flex flex-column justify-content-between">
          <Title title="Dashboard" />
          <div className="d-flex flex-row justify-content-around">
            <div className="d-flex flex-column justify-content-between">
              <Box location="profile">
                <div className="d-flex h-100 flex-column align-items-center justify-content-around">
                  <img src={this.state.userPicture} alt={this.state.userName} />
                  <h4>@{this.state.userName}</h4>
                  <h6>{this.state.userEmail}</h6>
                  <h6>Total Employees: {this.state.employee.length}</h6>
                  <h6>Total NGOs: {this.state.ngo.length}</h6>
                </div>
              </Box>
              <Box location="ngo">
                <div className="d-flex flex-column align-items-center">
                  <h2>NGO</h2>
                  {this.state.ngo.map((item, i) => (
                    <div
                      className="d-flex flex-column align-items-center"
                      key={i}
                    >
                      <h5>{item.name}</h5>
                      <p>{item.purpose}</p>
                    </div>
                  ))}
                </div>
              </Box>
            </div>
            <Box location="employee">
              <div className="d-flex flex-column align-items-center">
                <h2>Employee</h2>
                {this.state.employee.map((item, i) => (
                  <button
                    className="w-100 d-flex flex-row justify-content-between align-items-center pr-5 pl-5 btn btn-dark mb-2"
                    key={i}
                  >
                    <h5 className="m-2">{item.name}</h5>
                    <p className="m-2">Total Count: {item.count}</p>
                  </button>
                ))}
              </div>
            </Box>
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
