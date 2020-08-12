import React, { useEffect } from "react";
import { Guest, Auth, Customer } from "pages";
import { selectUser } from "store/selectors";
import { useSelector, useDispatch } from "react-redux";
import { Redirect, Route } from "react-router-dom";
import InviteFriends from "../pages/Customer/InviteFriends";
import { getNotifications } from "../store/actions/notifications";
import { useTranslation } from "react-i18next";

const {
  Home,
  AllTalents,
  CategoryPage,
  TalentProfile,
  TalentReviews,
  TermsAndConditions: { TermsAr, TermsEn },
  PrivacyPolicy: { PolicyAr, PolicyEn },
} = Guest;
const { VerifyEmail, ChangePassword } = Auth;
const { Notifications } = Customer;
export default function CommonRoutes(props) {
  const dispatch = useDispatch();
  const { i18n } = useTranslation();
  useEffect(() => {
    dispatch(getNotifications());
  }, []);

  const user = useSelector(selectUser);
  return [
    { exact: true, path: "/", component: Home },
    {
      exact: true,
      path: "/terms-and-conditions",
      component: i18n.language === "en" ? TermsEn : TermsAr,
    },
    {
      exact: true,
      path: "/privacy-policy",
      component: i18n.language === "en" ? PolicyEn : PolicyAr,
    },
    { exact: true, path: "/talents/all", component: AllTalents },
    { exact: true, path: "/category/talents/:id", component: CategoryPage },
    { exact: true, path: "/reviews/:name/:id", component: TalentReviews },
    { exact: true, path: "/invite-friends", component: InviteFriends },
    {
      path: "/talent/:category/:name/:id",
      component: TalentProfile,
      exact: true,
    },
    { exact: true, path: "/notifications", component: Notifications },
    {
      exact: true,
      path: "/change-password",
      component: (props) =>
        user.id && user.email_verified ? (
          <ChangePassword {...props} />
        ) : (
          <Redirect to="/" />
        ),
    },
    {
      exact: true,
      path: "/aws/verify-email",
      render: ({ location, ...props }) =>
        user.id && user.email_verified ? (
          <Redirect to="/" />
        ) : (
          <VerifyEmail {...props} />
        ),
    },
  ];
}
