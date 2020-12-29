import React from "react";

const Review = ({ headline, byline, link, summary_short }) => {
  return (
    <div key={headline} className="review">
      <header>
        <a href={link.url} className="review-link">
          {headline}
        </a>
        <br />
        <span className="author">{byline}</span>
      </header>
      <blockquote>{summary_short}</blockquote>
    </div>
  );
};

const MovieReviews = ({ reviews }) => (
  <div className="review-list">{reviews.map(Review)}</div>
);

MovieReviews.defaultProps = {
  reviews: [],
};

export default MovieReviews;
