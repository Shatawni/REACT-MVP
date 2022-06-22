import React from "react";

class DeleteButton extends React.Component {
  render() {
    const handleDeleteSingleStep = () => {
      let id = this.props.singleStep.id;
      this.props.deleteSingleStep(id);
    };

    return (
      <div className="allButtons">
        <button className="delete" onClick={handleDeleteSingleStep}>
          Delete
        </button>
      </div>
    );
  }
}

export default DeleteButton;
