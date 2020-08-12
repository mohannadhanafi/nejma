import React from "react";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";
import { Form as FormComponents } from "components";
import { Row } from "antd";
import "./index.scss";

const { Button } = FormComponents;

export default function FirstSection() {
  const { t, i18n } = useTranslation();
  const history = useHistory();

  const moveToAllTalent = () => history.push("/talents/all");

  return (
    <div className="container">
      <Row className="first-section container">
        <Row
          className={`right-side ${
            i18n.language === "en" ? "right-side-en" : "right-side-ar"
          }`}
        >
          <Row className="para-container">
            <span className="para">{t("home.first-para")}</span>
            <Button
              className="main-btn hero-section-btn"
              onClick={moveToAllTalent}
            >
              {" "}
              {t("home.first-btn")}
            </Button>
          </Row>
        </Row>
      </Row>
    </div>
  );
}
