import React from "react";

class Pancake extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      timeCooked: 0,
      flippedAt: null
    };
  }

  // TODO: create a componentDidMount() which will start the interval to count how long the pancake has been cooking

  // TODO: create a componentWillUnmount() which will clear the interval

  updateCounter = () => {
    this.setState({
      timeCooked: this.state.timeCooked + 1
    });
  };

  startInterval = () => {
    this.interval = setInterval(this.updateCounter, 1000);
  };

  cleanUpInterval = () => {
    clearInterval(this.interval);
  };

  flip = () => {
    this.setState({
      flippedAt: this.state.timeCooked
    });
  };

  getPancakeStatus = () => {
    const { timeCooked, flippedAt } = this.state;

    // first side
    if (flippedAt === null && typeof flippedAt !== "number") {
      if (timeCooked < 2) return "raw";
      if (timeCooked === 2) return "cooked";
      return "burnt";
    }

    //second side
    if (flippedAt > 2 || timeCooked > 4) return "burnt";
    if (timeCooked === 4 && flippedAt === 2) return "cooked";
    return "raw";
  };

  takeItOff = () => {
    const { id } = this.props;
    let status = this.getPancakeStatus();
    this.props.takeItOff(id, status);
  };

  render() {
    const { timeCooked, flippedAt } = this.state;
    const firstSide = Boolean(this.state.flippedAt === null && typeof flippedAt !== "number");
    const status = this.getPancakeStatus();

    return (
      <div className={`Pancake --${status}`}>
        <div className="Pancake__content">
          <p>I am a pancake.</p>
          <p>
            Time cooked on {`${firstSide ? "first" : "second"}`} side:{" "}
            {`${firstSide ? timeCooked : timeCooked - flippedAt}`}
          </p>
          <div>
            {firstSide ? (
              <button onClick={this.flip}>Flip me!</button>
            ) : (
              <button onClick={this.takeItOff}>Take me off!</button>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default Pancake;