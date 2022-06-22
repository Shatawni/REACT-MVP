import React from "react";

class StepItem extends React.Component {
  render() {
    const handleSetSingleStep = (e) => {
      this.props.setSingleStep(e);
    };

    return (
      <div>
        <h1
          className="stepItem"
          id={this.props.elem.id}
          onClick={handleSetSingleStep}
        >
          {this.props.elem.steps}
        </h1>
      </div>
    );
  }
}

export default StepItem;
