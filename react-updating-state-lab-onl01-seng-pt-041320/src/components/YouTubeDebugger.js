import React from "react";

class YoutubeDebugger extends React.Component {
  constructor() {
    super();

    this.state = {
      errors: [],
      user: null,
      settings: {
        bitrate: 8,
        video: {
          resolution: "1080p",
        },
      },
    };
  }

  handleBitrate = () => {
    this.setState({
      settings: {
        ...this.state.settings,
        bitrate: 12,
      },
    });
  };

  handleResolution = () => {
    this.setState({
      settings: {
        ...this.state.settings,
        video: {
          ...this.state.settings.video,
          resolution: "720p",
        },
      },
    });
  };

  render() {
    return (
      <div>
        <button className="bitrate" onClick={this.handleBitrate}>
          Change Bitrate
        </button>
        <button className="resolution" onClick={this.handleResolution}>
          Change Resolution
        </button>
      </div>
    );
  }
}

export default YoutubeDebugger;
