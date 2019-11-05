import React, { Component } from "react";
import { Background, Modal, Logo, SigninGoogle } from "../components/Basics";
import API from "../utils/API";
// import { Link } from "react-router-dom";

class Signin extends Component {
  state = {
    isSignedIn: false,
    url: ""
  }

  componentDidMount() {
    this.getLink();
  }

  getLink = () => {
    API.getURL()
      .then(res =>
        this.setState({url: res.data.url})
      )
      .catch(err => console.log(err));
  }

  render() {
    return (
      <Background page="signin">
        <Modal>
          <Logo />
          <SigninGoogle url={this.state.url}/>
        </Modal>
      </Background>
    );
  }
}

export default Signin;
