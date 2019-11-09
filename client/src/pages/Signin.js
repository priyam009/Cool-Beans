import React, { Component } from "react";
import { Background, Modal, Logo, SigninGoogle } from "../components/Basics";
import API from "../utils/API";
import queryString from "query-string";
import { Spinner } from "../components/Addons";

class Signin extends Component {
  state = {
    url: "",
    loading: false
  };

  componentDidMount() {
    this.getLink();
    const parsed = queryString.parse(this.props.location.search);
    console.log("Parsed: ", parsed);
    if (parsed.code) {
      this.getToken(parsed.code);
    }
  }

  getLink = () => {
    API.getURL()
      .then(res => this.setState({ url: res.data.url }))
      .catch(err => console.log(err));
  };

  getToken = code => {
    API.getToken(code)
      .then(res => {
        this.setState({
          loading: true
        });
        setTimeout(() => this.props.history.push("/dashboard"), 2000);
      })
      .catch(err => console.log(err));
  };

  render() {
    console.log("Loading: ", this.state.loading);
    return (
      <Background page="signin">
        <Modal>
          <Logo />
          <SigninGoogle url={this.state.url} />
        </Modal>
        <Spinner loading={this.state.loading} />
      </Background>
    );
  }
}

export default Signin;
