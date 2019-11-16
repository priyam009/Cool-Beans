import React, { Component } from "react";
import API from "../utils/API";
import Cookies from "js-cookie";
import { Background } from "../components/Basics";
import Navigation from "../components/Navigation";
import { Title } from "../components/Title";
import { Box } from "../components/Box";
import { Form, EmployeeForm, NGOForm } from "../components/Form";
import "../index.css";

class Add extends Component {
  state = {
    user: {},
    id: Cookies.get("token"),
    active: "employee",
    employeeName: "",
    employeeTitle: "",
    employeeNGO: [],
    ngoName: "",
    ngoPurpose: "",
    dbNGO: [],
    update: ""
  };

  componentDidMount() {
    this.getUser(this.state.id);
  }

  componentDidUpdate() {
    if (this.state.update) {
      setTimeout(
        () =>
          this.setState({
            update: ""
          }),
        2000
      );
    }
  }

  getUser = id => {
    if (id) {
      API.getUser(id)
        .then(res => {
          // console.log(res.data);
          this.setState({ user: res.data });
          this.getAllNGO();
        })
        .catch(err => console.log(err));
    } else {
      this.props.history.push("/");
    }
  };

  //Check Add NGO or Add Employee form is selected
  handleActiveState = active => {
    this.setState({
      active: active !== "ngo" ? "employee" : "ngo"
    });
  };

  //Check for change in input field
  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  //When new NGO is added
  handleNGOSubmit = (event, ngo) => {
    event.preventDefault();

    //Reset state
    this.setState({
      ngoName: "",
      ngoPurpose: ""
    });

    //Set dbNGO with name and purpose
    const dbNGO = {
      name: ngo.name,
      purpose: ngo.purpose
    };
    //Create new NGO
    this.createNGO(dbNGO);
  };

  //Create new NGO
  createNGO = dbNGO => {
    API.createNGO(dbNGO, this.state.id)
      .then(res => {
        this.setState({
          update: "New NGO Added!!"
        });
        this.getAllNGO();
      })
      .catch(err => console.log(err));
  };

  //Get all NGOs- to display on Add Employee form
  getAllNGO = () => {
    API.getAllNGO()
      .then(res => {
        // console.log(res.data)
        var ngo = [];
        for (var i = 0; i < res.data.length; i++) {
          var value = {
            id: res.data[i]._id,
            name: res.data[i].name,
            isChecked: false
          };
          ngo.push(value);
        }
        this.setState({
          dbNGO: ngo
        });
      })
      .catch(err => console.log(err));
  };

  //Check if checkbox is ticked under Add Employee
  handleNGOSelect = event => {
    event.preventDefault();
    const target = event.target;

    this.setState(state => {
      const dbNGO = state.dbNGO.map(item => {
        if (item.name === target.value) {
          this.setList(item.id, !item.isChecked);
          return (item.isChecked = !item.isChecked);
        } else {
          return item.isChecked;
        }
      });
      return dbNGO;
    });
  };

  setList = (id, isChecked) => {
    if (isChecked) {
      this.setState(state => {
        const employeeNGO = state.employeeNGO.push(id);
        return employeeNGO;
      });
    } else {
      this.setState(state => {
        for (var i = 0; i < state.employeeNGO.length; i++) {
          if (state.employeeNGO[i] === id) {
            state.employeeNGO.splice(i, 1);
          }
        }
      });
    }
  };

  //When new Employee is added
  handleEmployeeSubmit = event => {
    event.preventDefault();
    const dbEmployee = {
      name: this.state.employeeName,
      title: this.state.employeeTitle,
      ngo: this.state.employeeNGO
    };
    this.setState({
      employeeName: "",
      employeeTitle: "",
      employeeNGO: []
    });
    this.getAllNGO();
    //Create new Employee
    this.createEmployee(dbEmployee);
  };

  createEmployee = dbEmployee => {
    API.createEmployee(dbEmployee, this.state.id)
      .then(res =>
        this.setState({
          update: "New Employee Added!!"
        })
      )
      .catch(err => console.log(err));
  };

  render() {
    return (
      <Background page="dashboard">
        <Navigation props={this.props} />
        <div className="add-content">
          <Title title="Add New" />
          <div className="add-content-wrapper">
            <div className="add-content-button">
              <div
                className={
                  this.state.active === "employee"
                    ? "active-gradient"
                    : "inactive-gradient"
                }
                onClick={() => this.handleActiveState("employee")}
              >
                ADD EMPLOYEE
              </div>
              <div
                className={
                  this.state.active === "ngo"
                    ? "active-gradient"
                    : "inactive-gradient"
                }
                onClick={() => this.handleActiveState("ngo")}
              >
                ADD NGO
              </div>
            </div>
            <Box location="add">
              <Form>
                {this.state.active === "ngo" ? (
                  <NGOForm
                    name={this.state.ngoName}
                    purpose={this.state.ngoPurpose}
                    update={this.state.update}
                    handleInputChange={this.handleInputChange}
                    handleNGOSubmit={this.handleNGOSubmit}
                  />
                ) : (
                  <EmployeeForm
                    name={this.state.employeeName}
                    title={this.state.employeeTitle}
                    supports={this.state.dbNGO}
                    update={this.state.update}
                    handleInputChange={this.handleInputChange}
                    handleEmployeeSubmit={this.handleEmployeeSubmit}
                    handleNGOSelect={this.handleNGOSelect}
                  />
                )}
              </Form>
            </Box>
          </div>
        </div>
      </Background>
    );
  }
}

export default Add;
