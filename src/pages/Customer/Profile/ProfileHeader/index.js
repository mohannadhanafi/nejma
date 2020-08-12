import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { selectUser } from "store/selectors";
import Button from "components/form/Button";
import "./index.scss";

const ProfileHeader = () => {
  const { t, i18n } = useTranslation();
  const user = useSelector(selectUser);

  return (
    <div className="container">
      <div
        className={`profile-header ${
          i18n.language === "ar" ? "profile-header-ar" : ""
        }`}
      >
        <div
          className={`profile-header__details ${
            i18n.language === "ar" ? "profile-header__details-ar" : ""
          }`}
        >
          <div className="content-container">
            <img
              className={`profile-header__details__profileimg ${
                i18n.language === "ar" ? "margin-left-64" : ""
              }`}
              src={user.pic_url || require("assets/celeb3.png")}
            />
            <div className="profile-header__details__name">
              <h5>{user.name}</h5>
              <h6>@{user.name || "Mohanned"}</h6>
            </div>
          </div>
        </div>
        <Link className="profile-header__edit" to="/profile/edit">
          <Button className="profile-header__edit__button">
            <img
              src={require("assets/icons/pen.svg")}
              className={i18n.language === "ar" ? "margin-left" : ""}
            />
            <span>{t("edit")}</span>
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default ProfileHeader;
