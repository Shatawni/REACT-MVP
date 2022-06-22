import React from "react";

class UpdateButton extends React.Component {
  render() {
    const handleUpdateSingleStep = () => {
      let id = this.props.singleStep.id;
      this.props.updateSingleStep(id);
    };

    return (
      <div className="allButtons">
        <button className="update" onClick={handleUpdateSingleStep}>
          Update
        </button>
      </div>
    );
  }
}

export default UpdateButton;
