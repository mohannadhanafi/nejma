import { Link } from "react-router-dom";
import ProfileMenu from "../ProfileMenu";
import NotificationsMenu from "../NotificationsMenu";
import LanguageSwitch from "../LanguageSwitch";
import React from "react";
import { useSelector } from "react-redux";
import { selectUser } from "store/selectors";
import { UserOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";
import notificationIcon from "assets/icons/notifications-grey.svg";
import settingsGreyIcon from "assets/icons/settings-grey.svg";
import settingsIcon from "assets/icons/settings.svg";
import "./index.scss";
import i18next from "i18next";

export default function HeaderRightSide(props) {
  const {
    isMenuVisible,
    toggleProfileMenu,
    profileMenuRef,
    notificationMenuRef,
    toggleNotifications,
    showNotifications,
    isNotificaionsVisible,
  } = props;
  const user = useSelector(selectUser);
  const { t, i18n } = useTranslation();

  const { count } = useSelector((state) => state.notifications);

  return (
    <div
      className="right-side"
      style={{ display: "flex", alignItems: "center" }}
    >
      {user.id ? (
        <div className="profile-settings">
          <Link to="/profile" className={`profile-details ${i18n.language === 'ar' ? 'profile-details-ar' : ''}`}>
            <div className={"profile-container"}>
              {user.pic_url ? (
                <img
                  src={user.pic_url}
                  alt="close menu"
                  className={"customer-image"}
                />
              ) : (
                <UserOutlined
                  size={"large"}
                  className={"customer-fake-image"}
                />
              )}
              <span className={"customer-greeting"}>
                {user.name || user.name_eng}
              </span>
            </div>
          </Link>
          <ProfileMenu visible={isMenuVisible} />
          <div className="notification--wrapper" onClick={toggleNotifications}>
            <img
              src={notificationIcon}
              className={"notification-icon"}
              ref={notificationMenuRef}
            />
            {count ? <span>{count}</span> : null}
          </div>
          <NotificationsMenu
            visible={isNotificaionsVisible}
            ref={notificationMenuRef}
          />
          <img
            onClick={toggleProfileMenu}
            ref={profileMenuRef}
            src={isMenuVisible ? settingsIcon : settingsGreyIcon}
            className={"menu-icon"}
          />
        </div>
      ) : (
        <div className="header-btn">
          <>
            <Link to={"/login"}>
              <span className="language-selector"> {t("header.login")}</span>
            </Link>
            <span style={{ margin: 5 }}> /</span>
            <Link to={"/register/customer"}>
              <span className="language-selector">{t("header.sign-up")}</span>
            </Link>
          </>
        </div>
      )}
      <div className={`language ${i18n.language === 'ar' ? 'language-ar' : ''}`}> 
        <LanguageSwitch />
      </div>
    </div>
  );
}
