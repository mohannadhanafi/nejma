import React, { useState } from "react";
import { useSelector } from "react-redux";
import "./index.scss";
import NotificationUnit from "./Sample";
import NotificationsCard from "./Card";
import { Loading } from "components";
import { useTranslation } from "react-i18next";

export default function Notifications() {
  const mainNotifications = useSelector((state) => state.notifications);
  const { t } = useTranslation();
  if (!mainNotifications) return <Loading />;
  return (
    <div className="container">
      <div
        className="notifications-wrapper"
        style={{
          minHeight:
            mainNotifications.notifications &&
            !mainNotifications.notifications.length &&
            "unset",
        }}
      >
        <div className="header">
          <h3>{t("notification.title")}</h3>
        </div>
        <div className="notifi-units-wrapper">
          {mainNotifications.notifications &&
          mainNotifications.notifications.length ? (
            mainNotifications.notifications &&
            mainNotifications.notifications.map((item) =>
              item.type === 1 ? (
                <NotificationsCard data={item} />
              ) : (
                <NotificationUnit data={item} />
              )
            )
          ) : (
            <h1>{t("notification.no-notifications")}</h1>
          )}
        </div>
      </div>
    </div>
  );
}
