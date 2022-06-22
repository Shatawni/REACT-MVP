import "./App.css";
import React, { Component } from "react";
import song from "./static/crankdat.mp3";
import Steps from "./component/Steps";
import Loading from "./component/Loading";
import SingleStep from "./component/SingleStep";
import PostForm from "./component/PostForm";
import UpdateForm from "./component/UpdateForm";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      step: "",
      steps: null,
      id: null,
      singleStep: null,
      loading: true,
      loadingMessage: "Let me show you how to Crank dat Soulja Booooooyy...",
      audio: new Audio(song),
      isPlaying: false,
    };
    this.playPause = () => {
      let isPlaying = this.state.isPlaying;

      if (isPlaying) {
        this.state.audio.pause();
      } else {
        this.state.audio.play();
      }

      this.setState({ isPlaying: !isPlaying });
    };
  }

  componentDidMount() {
    fetch("http://localhost:3007/api/crankdatsteps/")
      .then((response) => response.json())
      .then((data) => this.setState({ steps: data, loading: false }));
  }

  render() {
    const setSingleStep = async (e) => {
      await fetch(`http://localhost:3007/api/crankdatsteps/${e.target.id}`)
        .then((res) => res.json())
        .then((data) => this.setState({ singleStep: data }));
    };

    const deleteSingleStep = async (id) => {
      await fetch(`http://localhost:3007/api/crankdatsteps/${id}`, {
        method: "DELETE",
      }).then((result) => {
        result.json().then((res) => {
          console.warn(res);
        });
      });
      window.location.reload();
    };

    const updateSingleStep = async (id) => {
      const newStep = {
        steps: this.state.step,
      };
      console.log(newStep);
      await fetch(`http://localhost:3007/api/crankdatsteps/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newStep),
      });
      // .then((res) => res.json())
      // .then((data) => this.setState({ newStep: data }));
    };

    const clearSingleStep = () => {
      this.setState({ singleStep: null });
    };

    if (this.state.loading) {
      return <Loading loadingMessage={this.state.loadingMessage} />;
    }

    return !this.state.singleStep ? (
      <div className="App">
        <h1 className="SB">CrankDat SouljaBoy</h1>
        <h2 className="reminder">Soulja Boy did it FIRST!</h2>
        <p className="audio">
          {this.state.isPlaying
            ? "GET UP AND CRANK DAT SOULJA BOY!"
            : "I HAVE SECOND-HAND EMBARRASSMENT😭"}
        </p>
        <button className="playPause" onClick={this.playPause}>
          Play | Pause
        </button>
        <div className="stepList">
          <Steps steps={this.state.steps} setSingleStep={setSingleStep} />
        </div>
        <PostForm />
      </div>
    ) : (
      <SingleStep
        singleStep={this.state.singleStep}
        clearSingleStep={clearSingleStep}
        updateSingleStep={updateSingleStep}
        deleteSingleStep={deleteSingleStep}
      />
    );
  }
}

export default App;
