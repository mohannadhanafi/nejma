import React from "react";
import { Col } from "antd";
import "./index.scss";

export default function CloseButton(props) {
  return (
    <div className="close-btn">
      <Col span={5} offset={16}>
        <img
          onClick={props.closeMenu}
          src={require("assets/close-menu-btn.png")}
          alt="close menu"
          width="25px"
        />
      </Col>
    </div>
  );
}
