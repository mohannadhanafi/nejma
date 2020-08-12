import SliderItem from "../SliderItem";
import React from "react";
import { useSelector } from "react-redux";
import { selectUser } from "store/selectors";
import { BellOutlined, SettingOutlined, UserOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";

export default function SliderItems(props) {
  const user = useSelector(selectUser);
  const { closeMenu } = props;
  const { t } = useTranslation();

  return (
    <div className="navigation-container">
      {user.id && (
        <>
          <SliderItem
            to={"/profile"}
            title={t("header.view-profile")}
            Icon={UserOutlined}
            onClick={closeMenu}
          />
          <SliderItem
            to={"/notifications"}
            title={t("header.notifications")}
            Icon={BellOutlined}
            onClick={closeMenu}
          />
          <SliderItem
            to={"/profile/edit"}
            title={t("header.settings")}
            Icon={SettingOutlined}
            onClick={closeMenu}
          />
          {!user.email_verified && (
            <SliderItem
              to={"/aws/verify-email"}
              title={t("header.verify-email")}
              Icon={SettingOutlined}
              onClick={closeMenu}
            />
          )}
        </>
      )}
    </div>
  );
}
