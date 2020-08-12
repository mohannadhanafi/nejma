import React from "react";
import "./index.scss";
import { Row } from "antd";
import { Link } from "react-router-dom";
export default function SliderItem(props) {
  const Icon = props.Icon;
  return (
    <Row className={"slider-item-container"} onClick={props.onClick}>
      <Link to={props.to}>
        <span className={"slider-item"} style={{}}>
          <Icon style={{ fontSize: "35px", margin: "0 10px" }} />
          {props.title}
        </span>
      </Link>
    </Row>
  );
}
