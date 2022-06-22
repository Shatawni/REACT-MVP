import React, { useState } from "react";
import UpdateButton from "./UpdateButton";

class UpdateForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      step: "",
    };

    this.handleUpdateChange = (event) => {
      const target = event.target;
      const value = target.value;
      const name = target.name;
      this.setState({
        [name]: value,
      });
    };

    this.updateSingleStep = (id) => {
      const newStep = {
        steps: this.state.step,
      };
      console.log(newStep);
      fetch(`http://localhost:3007/api/crankdatsteps/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newStep, id),
      });
      // .then((res) => res.json())
      // .then((data) => this.setState({ newStep: data }));
    };
  }

  render() {
    return (
      <div>
        <div className="singlestepdiv">
          {/* <main>
            <button className="update" onClick={this.updateSingleStep}>
              Update{" "}
            </button>
          </main> */}
          <form
            className="updateform-container"
            onSubmit={this.updateSingleStep}
          >
            <div>
              <button className="cancel-btn">X</button>
            </div>
            <label>
              FIX IT:
              <input
                type="text"
                name="step"
                value={this.state.value}
                onChange={this.handleUpdateChange}
              />
              <div>
                <UpdateButton />
              </div>
            </label>
          </form>
        </div>
      </div>
    );
  }
}

export default UpdateForm;
