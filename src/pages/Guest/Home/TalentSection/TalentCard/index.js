import React from "react";
import { Row } from "antd";
import "./index.scss";
import { useTranslation } from "react-i18next";
import { Link, useHistory } from "react-router-dom";

export default function TalentCard(props) {
  const { nameAr, nameEn, categoryAr, categoryEn, price, picUrl, id, classCarousel } = props;
  const { i18n } = useTranslation(); 

  return (
    <Link className={classCarousel} to={`/talent/${categoryEn}/${nameEn}/${id}`}>
      <Row className={`talent-card ${props.className}`}>
        <span className="talent-cost">$ {price}</span>
        <img src={picUrl} />
        <div
          className={`talent-meta ${
            i18n.language === "en" && "talent-meta-en"
          }`}
        >
          <p className="talent-name">
            {i18n.language === "en" ? nameEn : nameAr}
          </p>
          <p className="talent-category">
            {i18n.language === "en" ? categoryEn : categoryAr}
          </p>
        </div>
      </Row>
    </Link>
  );
}
