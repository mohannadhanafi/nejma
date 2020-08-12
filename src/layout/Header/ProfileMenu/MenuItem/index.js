import { Row } from "antd";
import React from "react";
import { Link } from "react-router-dom";
import "./index.scss";

export default function MenuItem(props) {
  const { icon, title, to } = props;
  return (
    <Row span={24} className="menu-item-header">
      <Link to={to} className="settings-link-item">
        {icon && <img src={icon} />}
        <span>{title}</span>
      </Link>
    </Row>
  );
}
