import React from "react";
import StepItem from "./StepItem";

class Steps extends React.Component {
  render() {
    return this.props.steps.map((elem) => {
      return (
        <div>
          <StepItem
            elem={elem}
            key={elem.id}
            setSingleStep={this.props.setSingleStep}
          />
        </div>
      );
    });
  }
}

export default Steps;
