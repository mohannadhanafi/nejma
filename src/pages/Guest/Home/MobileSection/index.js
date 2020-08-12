import React from "react";
import { Row, Col } from "antd";
import { useTranslation } from "react-i18next";
import appStore from "assets/appStore.png";
import googlePlay from "assets/googlePlay.png";
import videoNotificationPreview from "assets/videoNotificationPreview.png";
import profilePreview from "assets/profilePreview.png";
import phoneAppPreview from "assets/phoneAppPreview.png";
import "./index.scss";

export default function MobileSection(props) {
  const { t, i18n } = useTranslation();
  return (
    <section className="download-section">
      <div className="download-app container">
        <div
          className={`download-left ${
            i18n.language === "ar" ? "download-left__ar" : ""
          }`}
        >
          <h1 className="download-title">
            {t("home.download")}
            <br className="desktop-break" />
            {t("home.app-here")}
          </h1>
          <p className="download-description">{t("home.download-app-para")}</p>
          <div className="download-buttons">
            <img
              src={appStore}
              alt="app-store"
              className={`${i18n.language === "ar" ? "" : "button-image"}`}
              width="180"
            />
            <img
              src={googlePlay}
              alt="google-play"
              style={{ height: "60px" }}
              className={`${i18n.language === "ar" ? "button-image" : ""}`}
              width="180"
            />
          </div>
        </div>
        <div className="download-mid">
          <img
            src={videoNotificationPreview}
            alt=""
            className={`notify-image ${
              i18n.language === "ar" ? "notify-image-ar" : ""
            }`}
          />
          <img
            src={profilePreview}
            alt=""
            className={`profile-preview-image ${
              i18n.language === "ar" ? "profile-preview-image-ar" : ""
            }`}
          />
        </div>
        <div className="download-right">
          <img src={phoneAppPreview} alt="" />
        </div>
      </div>
    </section>
  );
}
