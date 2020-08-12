import { Button } from "antd";
import { Link } from "react-router-dom";
import React from "react";
import { useSelector } from "react-redux";
import { selectUser } from "store/selectors";
import { useTranslation } from "react-i18next";
import logout from "utils/logout";

export default function SliderFooter(props) {
  const user = useSelector(selectUser);
  const { t } = useTranslation();
  const { closeMenu } = props;

  if (user.id)
    return (
      <div className="logout-btn-conatiner">
        <Button className="logout-btn" onClick={logout}>
          <img
            src={require("assets/icons/logout.svg")}
            className="logout-icon"
            style={{ margin: "0 5px" }}
          />{" "}
          {t("header.logout")}
        </Button>
      </div>
    );

  return (
    <div className="menu-btns-container">
      <Link to={"/login"}>
        <Button className="login-btn" onClick={closeMenu}>
          {t("header.login")}
        </Button>
      </Link>
      <Link to={"/register/customer"}>
        <Button className="signup-btn" onClick={closeMenu}>
          {t("header.sign-up")}
        </Button>
      </Link>
    </div>
  );
}
