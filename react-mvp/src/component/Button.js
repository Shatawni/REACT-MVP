import React from "react";

class Button extends React.Component {
  render() {
    const handleClearSingleStep = () => {
      this.props.clearSingleStep();
    };

    return (
      <div className="allButtons">
        <div className="back" onClick={handleClearSingleStep}>
          Go Back
        </div>
      </div>
    );
  }
}

export default Button;
