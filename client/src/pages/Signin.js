import React, { Component } from "react";
import { Background, Modal, Logo, SigninGoogle } from "../components/Basics";
import API from "../utils/API";
import queryString from "query-string";
// import { Link } from "react-router-dom";

class Signin extends Component {

  state = {
    isSignedIn: false,
    url: ""
  }

  // componentWillMount() {
  // }
  
  componentDidMount() {
    this.getLink();
    const parsed = queryString.parse(this.props.location.search);
    // console.log(parsed);
    this.getToken(parsed.code);
  }

  getLink = () => {
    API.getURL()
      .then(res =>
        this.setState({url: res.data.url})
      )
      .catch(err => console.log(err));
  }

  getToken = code => {
    API.getToken(code)
      .then(res => {
        console.log(res.data);
        // this.setState({ user: res.data });
        setTimeout(
          () => this.props.history.push('/dashboard'),
          2000
        );
        
      })
      .catch(err => console.log(err));
  };


  render() {
    // console.log("url", this.state.url)
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
