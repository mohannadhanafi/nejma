import React from "react";
import { useSelector } from "react-redux";
import { selectUser } from "store/selectors";
import { Talent } from "pages";
import { Redirect } from "react-router-dom";
import { notification } from "antd";
import { useTranslation } from "react-i18next";
import SetPayment from "../pages/Talent/SetPayment";

const {
  Profile,
  EmailMessage,
  CompleteRegistration,
  AcceptRequest,
  EditProfile,
} = Talent;

export default function TalentRoute(props) {
  const { t } = useTranslation();

  const user = useSelector(selectUser);
  const routes = [
    { exact: true, path: "/talent/verify-message", component: EmailMessage },
    {
      exact: true,
      path: "/register/talent/approved/:token",
      component: CompleteRegistration,
    },
    {
      path: "/profile/edit",
      component: () => {
        if (user.approved && user.email_verified) return <EditProfile />;
        if (!user.email_verified)
          notification.info({ message: t("router-issues.not-verified"), duration: 2 });
        else if (!user.approved)
          notification.info({ message: t("router-issues.not-approved"), duration: 2 });
        return <Redirect to={"/"} />;
      },
      exact: true,
    },
    { exact: true, path: "/profile", component: Profile },
    { exact: true, path: "/accept-request/:id", component: AcceptRequest },
    { exact: true, path: "/set-payment", component: SetPayment },
  ];
  return user.role === "talent" ? routes : [];
}
