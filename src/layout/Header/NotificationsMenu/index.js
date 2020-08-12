import { Row } from "antd";
import { Link } from "react-router-dom";
import _Button from "components/form/Button";
import logout from "utils/logout";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { selectUser } from "store/selectors";

import "./index.scss";
import NotificationUnit from "./../../../pages/Customer/Notifications/Sample/index";
import NotificationsCard from "./../../../pages/Customer/Notifications/Card/index";
import { Loading } from "components";

export default function ProfileMenu(props) {
  const { t, i18n } = useTranslation();
  const user = useSelector(selectUser);
  const { visible } = props;
  const mainNotifications = useSelector((state) => state.notifications);

  if (!mainNotifications) return <Loading />;

  return (
    <div
      className={`notification-settings-menu ${visible && "show--menu"} ${
        i18n.language === "ar" && "notification-settings-menu-ar"
      }`}
    >
      {mainNotifications.notifications &&
      mainNotifications.notifications.length ? (
        mainNotifications.notifications &&
        mainNotifications.notifications.map((item) =>
          item.type === 1 ? (
            <NotificationsCard popup data={item} />
          ) : (
            <NotificationUnit data={item} />
          )
        )
      ) : (
        <h1 className={"no-notifications"}>
          {t("notification.no-notifications")}
        </h1>
      )}
      <Link to="/notifications" className="see-all">
        {t("notification.see-all")}
      </Link>
    </div>
  );
}
