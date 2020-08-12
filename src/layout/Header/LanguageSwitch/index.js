import { Row } from "antd";
import React from "react";
import { useTranslation } from "react-i18next";
import changeLanguage from "utils/changeLanguage";
import "./index.scss";
export default function LanguageSwitch(props) {
  const { i18n, t } = useTranslation();

  // Change Language
  const changeToAr = () => changeLanguage("ar", i18n);
  const changeToEn = () => changeLanguage("en", i18n);

  return (
    <Row className={"language-switch"}>
      <span
        className={i18n.language === "ar" ? "selected" : " "}
        onClick={changeToAr}
      >
        AR
      </span>
      <span className={"separator"}> | </span>
      <span
        className={i18n.language === "en" ? "selected" : ""}
        onClick={changeToEn}
      >
        EN
      </span>
    </Row>
  );
}
