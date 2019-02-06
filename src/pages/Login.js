import React, { Component } from "react";

import "./Login.css";
import twitterLogo from "../twitter.svg";

import { Redirect } from "react-router-dom";

export default class Login extends Component {
  state = {
    userName: ""
  };

  handleSubmit = e => {
    e.preventDefault();

    const { userName } = this.state;

    if (!userName.length) return;

    localStorage.setItem("userName", userName);

    this.props.history.push("/timeline");
  };

  render() {
    return (
      <div className="login-wrapper">
        <img src={twitterLogo} alt="Twitter Logo" />
        <form>
          <input
            placeholder="Nome de usuário"
            value={this.state.userName}
            onChange={event => this.setState({ userName: event.target.value })}
          />
          <button type="submit" onClick={this.handleSubmit}>Entrar</button>
        </form>
      </div>
    );
  }
}
