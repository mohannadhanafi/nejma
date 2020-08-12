import React from "react";
import BookingWrapper from "../Wrapper";
import NextUnit from "./NextUnit";
import SuccessHeroImg from "../../../../assets/confetti-2.svg";
import EventIcon from "../../../../assets/event.svg";
import MailIcon from "../../../../assets/mail-2.svg";
import YoutubeIcon from "../../../../assets/youtube.svg";
import HandIcon from "../../../../assets/hand.svg";
import "./index.scss";
import { Form as FormComponent } from "components";
import { Form } from "antd";
import { useLocation, useHistory } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { selectUser } from "store/selectors";
import { useSelector } from "react-redux";

const { Button } = FormComponent;

export default function BookingSuccess({ requestInfo }) {
  const { state: talent } = useLocation();
  const user = useSelector(selectUser);
  const { push } = useHistory();
  const { t, i18n } = useTranslation();
  return (
    <div className="container">
      <div className="success-wrapper">
        <img className="success-hero-img" src={SuccessHeroImg} />
        <div className="success-hero-title">{t("booking.bookSuccessful")}</div>

        {talent?.charity ? (
          <div className="thank-message">
            <span>
              {i18n.language === "ar" ? talent?.nameAr : talent?.nameEng}{" "}
              {t("booking.personalThank")}
            </span>
            <span className="dark-ref-words pointer">
              {talent.charity.charityName}
            </span>
            <h5 className="dark-ref-words">{t("booking.whatNext")}</h5>
          </div>
        ) : null}

        <div
          className={`what-next-wrapper   ${
            i18n.language === "ar" && "what-next-wrapper-ar"
          }`}
        >
          <NextUnit img={MailIcon}>
            <span>{t("booking.checkEmail")}</span>
            <span className="dark-ref-words">
              {user.email || "mohanad@gmail.com"}
            </span>
          </NextUnit>
          <NextUnit img={EventIcon}>
            <span className="dark-ref-words">
              {i18n.language === "ar" ? talent?.nameAr : talent?.nameEng}
            </span>
            <span>
              {t("booking.has")}
              {talent?.responseTime}
              {t("booking.completeDays")}
            </span>
          </NextUnit>
          <NextUnit img={YoutubeIcon}>
            <span>{t("booking.requestComplete")}</span>
          </NextUnit>
          <NextUnit img={HandIcon}>
            <span>
              {t("booking.if")}{" "}
              {i18n.language === "ar" ? talent?.nameAr : talent?.nameEng}{" "}
              {t("booking.if1")}
            </span>
            <span className="dark-ref-words">
              $
              {requestInfo.finalPrice
                ? requestInfo.finalPrice
                : talent.initPrice + talent.initPrice * talent.companyRatio}
            </span>
            <span>{t("booking.if2")}</span>
          </NextUnit>
        </div>
        <Form.Item>
          <Button onClick={() => push("/")} className="-btn">
            {t("booking.backHome")}
          </Button>
        </Form.Item>
      </div>
    </div>
  );
}
