import React from "react";

const GifList = (props) => {
  console.log(props);
  return (
    <div>
      {props.gifs.map((gif) => (
        <img key={gif.url} src={gif.url} alt="gif" />
      ))}
    </div>
  );
};

export default GifList;
