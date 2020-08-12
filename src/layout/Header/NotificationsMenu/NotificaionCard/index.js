import { Row } from "antd";
import React from "react";
import { Link } from "react-router-dom";
import "./index.scss";

export default function NotificaionCard(props) {
  const { icon, title, title2, to, publishTalent } = props;
  return (
    <Row span={24} className="menu-item">
      <Link to={to}>
        {icon && <img src={icon} />}
        <span>{title}</span>
        <span>{title2}</span>
      </Link>
    </Row>
  );
}
