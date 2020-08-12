import React from "react";
import "./index.scss";

export default function Card(props) {
  return (
    <div className={`${props.className || "image-card"}`}>{props.children}</div>
  );
}
