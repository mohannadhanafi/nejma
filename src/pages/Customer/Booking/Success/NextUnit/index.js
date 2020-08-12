import React from "react";

export default function NextUnit(props) {
  return (
    <div className="waht-next-unit">
      <img src={props.img} />
      <div>{props.children}</div>
    </div>
  );
}
