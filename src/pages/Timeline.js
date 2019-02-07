import React, { Component } from "react";
import "./Timeline.css";
import twitterLogo from "../twitter.svg";
import socket from "socket.io-client";

import api from "../services/Api";
import Tweet from "../components/Tweet";

export default class Timeline extends Component {
  state = {
    tweets: [],
    newTweet: ""
  };

  async componentDidMount() {
    this.subscribeToEvents();
    const response = await api.get("tweets");

    this.setState({ tweets: response.data });
  }

  subscribeToEvents = () => {
    const io = socket("http://localhost:3000");

    io.on("tweets", data => {
      this.setState({ tweets: [data, ...this.state.tweets] });
    });

    io.on("likes", data => {
      this.setState({
        tweets: this.state.tweets.map(tweet =>
          tweet._id === data._id ? data : tweet
        )
      });
    });
  };

  handleNewTweet = async event => {
    if (event.keyCode != 13) return;

    const content = this.state.newTweet;
    const author = window.localStorage.getItem("userName");

    await api.post("tweets", {
      author,
      content
    });

    this.setState({ newTweet: "" });
  };

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
        <ul className="tweet-list">
          {this.state.tweets.map((tweet, key) => (
            <Tweet key={tweet._id} tweet={tweet} />
          ))}
        </ul>
      </div>
    );
  }
}
