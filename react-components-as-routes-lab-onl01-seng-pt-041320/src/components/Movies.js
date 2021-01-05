import React from "react";
import { movies } from "../data";

const Movies = () => {
  return (
    <div>
      <h1>Movies Page</h1>
      {movies.map((movie, index) => (
        <div key={index}>
          <h3>Movies: {movie.title}</h3>
          <p>Time: {movie.time}</p>
          <p>
            Genres:
            {movie.genres.map((genre, index) => (
              <li key={index}>{genre}</li>
            ))}
          </p>
        </div>
      ))}
    </div>
  );
};

export default Movies;
