import React, { useEffect, useState } from "react";
import BookingWrapper from "../Wrapper";
import { Form as FormComponents } from "components";
import { Form } from "antd";
import "./index.scss";
import { useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";

const { Button } = FormComponents;

export default function ConfirmBooking({ makeRequest, goNext, requestInfo }) {
  const [isLoading, setIsLoading] = useState(false);
  const { t, i18n } = useTranslation();
  const { state: talent } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const onFinish = () => {
    setIsLoading(true);
    const whenRequestFinish = () => {
      setIsLoading(false);
      goNext();
    };
    makeRequest(whenRequestFinish);
  };
  return (
    <BookingWrapper title={t("booking.confirm-title")}>
      <div className="confirm-wrapper">
        <div className="confirm-row">
          <div className="confirm-left-side">
            <div className="pink-left-side"></div>
            <div
              className={`left-side-data ${
                i18n.language === "ar" && "left-side-data-ar"
              } `}
            >
              <h5>{t("booking.videoFor")}</h5>
              <h5>{t("booking.myname")}</h5>
              {requestInfo?.theirname ? (
                <h5>{t("booking.theirName")}</h5>
              ) : null}
              <h5>{t("booking.instructions")}</h5>
            </div>
          </div>
          <div className="confirm-right-side">
            <h5>
              {requestInfo?.forMe
                ? i18n.language === "ar"
                  ? "لي"
                  : "For Me"
                : i18n.language === "ar"
                ? "شخص آخر"
                : "Someone else"}
            </h5>
            <h5>{requestInfo?.myname}</h5>
            {requestInfo?.theirname ? <h5>{requestInfo?.theirname}</h5> : null}
            <h5>{requestInfo?.instructions}</h5>
          </div>
        </div>
        <div className="confirm-row">
          <div className="confirm-left-side">
            <div className="pink-left-side confirm-down-side"></div>
            <div
              className={`left-side-data ${
                i18n.language === "ar" && "left-side-data-ar"
              } `}
            >
              <h5>{t("booking.thisVideo")}</h5>
              <h5>{t("talent.languages")}</h5>
              <h5>{t("fullPrice")}</h5>
            </div>
          </div>
          <div className="confirm-right-side">
            <h5>
              {requestInfo?.isprivate
                ? i18n.language === "ar"
                  ? "خاص"
                  : "private"
                : i18n.language === "ar"
                ? "عام"
                : "public"}
            </h5>
            <h5>{requestInfo?.languageId[0]?.languageName}</h5>
            <h5>
              $
              {requestInfo.finalPrice
                ? requestInfo.finalPrice
                : talent.initPrice + talent.initPrice * talent.companyRatio}
            </h5>
          </div>
        </div>
      </div>
      <div className="confirm-btn-wrapper">
        <Button
          className="confirm-book-btn"
          isloading={isLoading ? true : false}
          onClick={onFinish}
        >
          {t("booking.confirm")}
        </Button>
      </div>
    </BookingWrapper>
  );
}
