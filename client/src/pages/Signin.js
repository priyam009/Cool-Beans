import React, { Component } from "react";
import { Background, Modal, Logo, SigninGoogle } from "../components/Basics";

class Signin extends Component {
  render() {
    return (
      <Background page="signin">
        <Modal>
          <Logo />
          <SigninGoogle />
        </Modal>
      </Background>
    );
  }
}

export default Signin;
