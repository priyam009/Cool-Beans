import React, { Component } from "react";
import { Background, Modal, Logo, SigninGoogle } from "../components/Basics";
import API from "../utils/API";
import queryString from "query-string";
import { Spinner } from "../components/Addons";

class Signin extends Component {
  state = {
    url: "", //To store URL for Google Sign-in redirect
    loading: false //To check if Signed-in to Google
  };

  componentDidMount() {
    //Get Google Sign-in Link to attach to Sign-in Button
    this.getLink();

    //Parse the code from Google using queryString package from page location
    const parsed = queryString.parse(this.props.location.search);

    //Get Token from the parsed code from Google if parsed code exists 
    if (parsed.code) {
      this.getToken(parsed.code);
    }
  }

  //API call to get URL link from Google to redirect to Google Sign-in Page
  getLink = () => {
    API.getURL()
      .then(res => this.setState({ url: res.data.url }))
      .catch(err => console.log(err));
  };

  //API call to get token from Google with JWT Signature, set loading state to true and redirect to Dashboard
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
