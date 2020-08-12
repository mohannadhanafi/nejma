import React from "react";
import "./index.scss";

export default function Shoutout() {
  return (
    <div className="shoutout-img-wrapper">
      <img
        src={require("assets/image12@2x.png")}
        alt="person"
        className="shoutout-img"
      />
      <div className="center-circle"></div>
      <div className="black-bg"></div>
      <div className="shoutout-info">
        <h4>Khalid Al Amri</h4>
        <h5>Influencer</h5>
      </div>
    </div>
  );
}
