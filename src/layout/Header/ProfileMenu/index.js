import { Row } from "antd";
import { Link } from "react-router-dom";
import _Button from "components/form/Button";
import logout from "utils/logout";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { selectUser } from "store/selectors";
import LockIcon from "assets/icons/lock.svg";
import ShieldIcon from "assets/icons/shield.svg";
import ContractIcon from "assets/icons/contract.svg";
import CreditCardIcon from "assets/icons/credit-card.svg";
import LogoutIcon from "assets/icons/logout.svg";
import MenuItem from "./MenuItem";

import "./index.scss";

export default function ProfileMenu(props) {
  const { t, i18n } = useTranslation();
  const user = useSelector(selectUser);
  const { visible } = props;

  return (
    <Row
      className={`profile-settings-menu ${visible && "show--menu"} ${
        i18n.language === "ar" && "profile-settings-menu-ar"
      }`}
    >
      {user.role === "talent" && (
        <MenuItem
          title={t("header.myWallet")}
          to={"/set-payment"}
          icon={CreditCardIcon}
        />
      )}
      {user.email_verified && (
        <MenuItem
          title={t("header.change-password")}
          to={"/change-password"}
          icon={LockIcon}
        />
      )}

      <MenuItem title={t("header.invite-friends")} to={"/invite-friends"} icon={ShieldIcon} />

      <MenuItem title={t("header.privacy")} to={"/privacy-policy"} icon={ShieldIcon} />
      <MenuItem title={t("header.terms")} to={"/terms-and-conditions"} icon={ContractIcon} />
      {!user.email_verified && (
        <MenuItem title={t("header.verify-email")} to={"/aws/verify-email"} />
      )}

      <Row span={24} className="menu-item-header">
        <_Button className="logout-btn" onClick={logout}>
          <img src={LogoutIcon} /> <span>{t("header.logout")}</span>
        </_Button>
      </Row>
    </Row>
  );
}
