import React from "react";

class Keypad extends React.Component {
  handleKeyUp = () => {
    console.log("Entering password...");
  };

  render() {
    return <input onKeyUp={this.handleKeyUp} type="password" />;
  }
}

export default Keypad;
