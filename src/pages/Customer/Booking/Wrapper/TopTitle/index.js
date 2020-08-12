import React from "react";
import "./index.scss";
import { useTranslation } from "react-i18next";

export default function TopTitle(props) {
  const { talent } = props;
  const { t, i18n } = useTranslation();
  return (
    <div className="top-title-wrapper">
      <div className="top-title">{props.title}</div>
      <div className="booking-avatar">
        <img src={talent?.picUrl} style={{ borderRadius: "50%" }} />
      </div>
      <div className="top-title-name">
        {i18n.language === "en" ? talent?.nameEng : talent?.nameAr}
      </div>
      <div className="top-title-description">
        {talent?.category && i18n.language === "en"
          ? talent?.category?.categoryName
          : talent?.category?.categoryNameAr}
      </div>
    </div>
  );
}
