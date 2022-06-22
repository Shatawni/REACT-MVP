import React from "react";
import PopupForm from "./PopupForm";

class PostForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      step: "",
    };

    this.handleChange = (event) => {
      const target = event.target;
      const value = target.value;
      const name = target.name;
      this.setState({
        [name]: value,
      });
    };

    this.submitStep = () => {
      const newStep = {
        steps: `${this.state.step}`,
      };
      console.log(newStep);
      fetch("http://localhost:3007/api/crankdatsteps", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newStep),
      });
    };
  }

  render() {
    return (
      <div>
        <div className="singlestepdiv">
          {/* <main>
            <button className="update">Update</button>
          </main> */}
          <form className="form-container" onSubmit={this.submitStep}>
            <PopupForm />
            <label>
              What's the next Step?
              <input
                type="text"
                name="step"
                value={this.state.value}
                onChange={this.handleChange}
              />
            </label>
            <div>
              <button className="postSubmit" type="submit">
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default PostForm;
