import React from "react";
import { Row, Col } from "antd";
import { useTranslation } from "react-i18next";

import "./index.scss";

export default function Info({ talent }) {
  const { t, i18n } = useTranslation();

  return (
    <Row className="container talent-general-about">
      <Col lg={10} xs={24} className="about--us">
        <h2>{t("about")}</h2>
        <p>{(i18n.language === "en" ? talent.bioEng : talent.bioAr) || ""}</p>
      </Col>
      <Col lg={10} xs={24} className="ant-col-lg-offset-4 languages--wrapper">
        <h2>{t("talent.languages")}</h2>
        <div
          className={`languages ${
            i18n.language === "ar" ? "languages-ar" : ""
          }`}
        >
          {talent.languages &&
            talent.languages.map((item) => (
              <span key={item.id} className="language--span">
                {item.languageName}
              </span>
            ))}
        </div>
      </Col>
    </Row>
  );
}
