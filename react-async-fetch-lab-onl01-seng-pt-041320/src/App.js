import React from "react";

class App extends React.Component {
  state = {
    peopleInSpace: [],
  };

  render() {
    return (
      <div>
        {this.state.peopleInSpace.map((person) => (
          <li>{person.name}</li>
        ))}
      </div>
    );
  }

  componentDidMount() {
    fetch("http://api.open-notify.org/astros.json")
      .then((response) => response.json())
      .then((data) => {
        this.setState({
          peopleInSpace: data.people,
        });
      });
  }
}

export default App;
