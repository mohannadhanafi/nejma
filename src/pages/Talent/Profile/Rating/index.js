import React from "react";
import "./index.scss";

export default function RatingInfo(props) {
  return (
    <div className="rating-wrapper">
      <div className="left-side">
        <div className="rate-value">5.0</div>
        <div className="reviews-value">47 reviews</div>
      </div>
      <div className="rate-value">
        <img src={require("assets/Path@2x.png")} alt="pic" />
      </div>
    </div>
  );
}
