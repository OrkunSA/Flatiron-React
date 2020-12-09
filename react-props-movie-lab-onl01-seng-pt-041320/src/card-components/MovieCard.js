import defaultPoster from "../assets/poster-imgs/default.png";
import cmi from "../assets/poster-imgs/choux-and-maru-go-to-istanbul.png";
import cmp1 from "../assets/poster-imgs/choux-and-maru-p1.png";
import cb from "../assets/poster-imgs/chromeboi.png";
import efv from "../assets/poster-imgs/escape-from-vim.png";
import goldeneye from "../assets/poster-imgs/goldeneye.jpg";
import hbmc from "../assets/poster-imgs/handsome-boy-modeling-club.png";
import msts from "../assets/poster-imgs/marus-spinoff-trapped-in-the-sheets.png";
import tkr from "../assets/poster-imgs/terrance-king-of-the-rats.png";
import ttm from "../assets/poster-imgs/the-trash-man.png";

import React, { Component } from "react";
import CardFront from "./CardFront.js";
import CardBack from "./CardBack.js";

const posterMap = {
  "choux-maru-istanbul": cmi,
  "choux-maru-part-1": cmp1,
  chromeboi: cb,
  "escape-from-vim": efv,
  goldeneye: goldeneye,
  "handsome-boy": hbmc,
  "marus-spinoff": msts,
  "terrance-king": tkr,
  "the-trash-man": ttm,
  default: defaultPoster,
};

export default class MovieCard extends Component {
  render() {
    return (
      <div className="movie-card">
        <CardFront poster={posterMap[this.props.poster]} />
        <CardBack
          title={this.props.title}
          IMDBRating={this.props.IMDBRating}
          genres={this.props.genres}
        />
      </div>
    );
  }
}

MovieCard.defaultProps = {
  title: "Unknown",
  IMDBRating: null,
  genres: ["No Genre(s) Found"],
  poster: "default",
};
