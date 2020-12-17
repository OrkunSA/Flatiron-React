import React from "react";
class ClickityClick extends React.Component {
  constructor() {
    super();
    this.state = {
      hansBeenClicked: false,
      currentTheme: "blue",
    };
  }

  handleClick = () => {
    this.setState(
      {
        hansBeenClicked: true,
      },
      () => console.log(this.state.hansBeenClicked)
    );
  };

  render() {
    return (
      <div>
        <p>I have {this.state.hansBeenClicked ? null : "not"} been clicked!</p>
        <button onClick={this.handleClick}>Click me!</button>
      </div>
    );
  }
}

export default ClickityClick;
