import React, { Component } from "react";
import "./Timeline.css";
import twitterLogo from "../twitter.svg";

import api from '../services/Api';

export default class Timeline extends Component {
  state = {
    newTweet: ""
  };

  handleNewTweet =  async (event) => {
      if (event.keyCode != 13) return;

      const content = this.state.newTweet;
      const author = window.localStorage.getItem("userName");

      await api.post('tweets', {
          author,
          content
      });

      this.setState({ newTweet: "" })
  }

  render() {
    return (
      <div className="timeline-wrapper">
        <img height="24" src={twitterLogo} alt="Twitter Logo" />
        <form>
          <textarea
            value={this.state.newTweet}
            onChange={event => this.setState({ newTweet: event.target.value })}
            onKeyDown={this.handleNewTweet}
            placeholder="What is hapenning?"
          />
        </form>


      </div>
    );
  }
}
