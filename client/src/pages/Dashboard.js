import React, { Component } from "react";
import API from "../utils/API";
import Cookies from "js-cookie";
import "../index.css";
import { Background } from "../components/Basics";
import Navigation from "../components/Navigation";
import { Box, ProfileBox, NGOBox, EmployeeBox } from "../components/Box";
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

  //Handle Modal Close
  handleClose = () => {
    this.setState({
      show: false,
      total: 0,
      ngoContri: 0
    });
    this.clearOrder();
  };

  //Clear current order on Modal Close
  clearOrder = () => {
    this.setState(state => {
      const coffee = state.coffee.map(item => {
        if (item.qty) {
          return (item.qty = 0);
        } else {
          return item.qty;
        }
      });
      return coffee;
    });
  };

  //Handle Modal Show
  handleShow = event => {
    const id = event.target.id;
    const employee = this.state.employee.filter(item => item._id === id)[0];

    const ngo = employee.ngo.map(
      emp => this.state.ngo.filter(org => org._id === emp)[0]
    );

    this.setState({
      show: true,
      modal: {
        employee: employee,
        ngo: ngo
      }
    });
  };

  //Add item to the Order
  handleOrderAdd = event => {
    event.preventDefault();
    const target = event.target;

    this.setState(state => {
      const coffee = state.coffee.map(item => {
        if (item.name === target.name) {
          this.updateTotal(item.price, target.value);
          return item.qty++;
        } else {
          return item.isChecked;
        }
      });
      return coffee;
    });
  };

  //Update Total and Ngo Contribution
  updateTotal = (price, action) => {
    var total = 0;
    var ngoContri = 0;
    if (action === "add") {
      total = this.state.total + price;
      ngoContri = this.state.ngoContri + price * 0.25;
    } else {
      total = this.state.total - price;
      ngoContri = this.state.ngoContri - price * 0.25;
    }

    this.setState({
      total: total,
      ngoContri: ngoContri
    });
  };

  //Remove item from Order
  handleOrderRemove = event => {
    event.preventDefault();
    const target = event.target;

    this.setState(state => {
      const coffee = state.coffee.map(item => {
        if (item.name === target.name) {
          this.updateTotal(item.price);
          return item.qty--;
        } else {
          return item.isChecked;
        }
      });
      return coffee;
    });
  };

  //On Order
  handleSubmitOrder = (currentEmp, currentNgo) => {
    if (this.state.total) {
      const dbEmployee = {
        total: this.state.total + currentEmp.total,
        contribution: this.state.ngoContri + currentEmp.contribution
      };
      const dbNGO = [];

      currentNgo.map((item, i) => {
        var newNGO = {
          id: item._id,
          total: item.total + this.state.ngoContri / currentNgo.length
        };
        dbNGO.push(newNGO);
      });

      this.updateEmployee(dbEmployee, currentEmp._id);

      this.updateNgo(dbNGO);

      this.handleClose();
    }
  };

  updateEmployee = (dbEmployee, id) => {
    API.updateEmployee(dbEmployee, id)
      .then(res => this.getUser(this.state.id))
      .catch(err => console.log(err));
  };

  updateNgo = dbNGO => {
    dbNGO.map((item, i) => {
      console.log("item.total", item.total);
      API.updateNGO(item.total, item.id)
        .then(res => this.getUser(this.state.id))
        .catch(err => console.log(err));
    });
  };

  handleEmployeeDelete = id => {
    API.deleteEmployee(id)
      .then(res => this.getUser(this.state.id))
      .catch(err => console.log(err));

    this.handleClose();
  };

  handleNGODelete = id => {
    API.deleteNGO(id)
      .then(res => this.getUser(this.state.id))
      .catch(err => console.log(err));
  };

  render() {
    return (
      <Background page="dashboard">
        <Navigation props={this.props} />
        <div className="dashboard-content">
          <Title title="Dashboard" />
          <div className="d-flex flex-row justify-content-around">
            <div className="d-flex flex-column justify-content-between">
              <Box location="profile">
                <ProfileBox
                  userName={this.state.userName}
                  userPicture={this.state.userPicture}
                  userEmail={this.state.userEmail}
                  employee={this.state.employee}
                  ngo={this.state.ngo}
                />
              </Box>
              <Box location="ngo">
                <NGOBox
                  ngo={this.state.ngo}
                  handleNGODelete={this.handleNGODelete}
                />
              </Box>
            </div>
            <Box location="employee">
              <EmployeeBox
                employee={this.state.employee}
                handleShow={this.handleShow}
              />
            </Box>
          </div>
        </div>
        <Order
          show={this.state.show}
          coffee={this.state.coffee}
          total={this.state.total}
          ngoContri={this.state.ngoContri}
          modal={this.state.modal}
          handleClose={this.handleClose}
          handleOrderAdd={this.handleOrderAdd}
          handleOrderRemove={this.handleOrderRemove}
          handleSubmitOrder={this.handleSubmitOrder}
          handleEmployeeDelete={this.handleEmployeeDelete}
        />
      </Background>
    );
  }
}

export default Dashboard;
