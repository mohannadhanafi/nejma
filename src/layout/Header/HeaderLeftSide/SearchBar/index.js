import React from "react";
import { Row, Col } from "antd";
import "./index.scss";
import { useTranslation } from "react-i18next";

export default function SearchBar(props) {
  const { t, i18n } = useTranslation();
  return (
    <Row
      className={`search-bar-result ${props.className ? props.className : ''} ${props.className && props.results.length ? 'search-bar-result-mobile-show' : ''}`}
      style={{ display: props.results.length !== 0 ? "flex" : "none" }}
    >
      {props.results.map((talent) => {
        return (
          <Col
            span={24}
            key={talent.id}
            className={"search-bar-result-item"}
            onClick={() => props.moveToTalentProfile(talent)}
          >
            <p className={"talent-name"}>
              {talent.name}
            </p>
            <p className={"category-name"}>
              {talent.category.categoryName}
            </p>
          </Col>
        );
      })}
    </Row>
  );
}
