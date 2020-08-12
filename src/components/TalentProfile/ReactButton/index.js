import React from "react";
import "./index.scss";
import { Spin } from "antd";

export default function SocialReactButton(props) {
  return (
    <div
      className={`react-button-wrapper hide ${props.className}`}
      onClick={props.onClick}
    >
      {props.isLoading ? (
        <Spin className="nejma-spin" />
      ) : (
        <>
          <div className="icon">
            <img src={props.icon} className="no-margin-img" />
          </div>
          <div className="label">{props?.label || ""}</div>
        </>
      )}
    </div>
  );
}
