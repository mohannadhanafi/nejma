import React, { useEffect, useState } from "react";
import BookingWrapper from "../Wrapper";
import { Form } from "antd";
import {
  injectStripe,
  CardNumberElement,
  CardCVCElement,
  CardExpiryElement,
} from "react-stripe-elements";
import { Form as FormComponent } from "components";
import "./index.scss";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";

const { Input, Button } = FormComponent;

const CreditCardInfo = ({ goNext, getToken, stripe, requestInfo }) => {
  const { state: talent } = useLocation();
  const { t, i18n } = useTranslation();
  const [isLoading, setIsLoading] = useState(false);

  const [validationErrors, setValidationErrors] = useState({
    number: null,
    cvc: null,
    expireDate: null,
  });

  const isCreditCardValid = () => {
    const { cvc, number, expireDate } = validationErrors;
    return !(cvc || number || expireDate);
  };
  const onFinish = async () => {
    if (!isCreditCardValid) return;
    try {
      setIsLoading(true);
      const result = await stripe.createToken();
      const {
        token: { id },
      } = result;
      getToken(id);
      setIsLoading(false);
      goNext();
    } catch (errors) {
      setIsLoading(false);
    }
  };

  const inputStyle = {
    base: {
      fontWeight: 700,
      color: "#08091e",
      lineHeight: "20px",
      fontSize: "14px",
      letterSpacing: "0.025em",
      fontFamily: i18n.language === "en" ? "Montserrat" : "Cairo",
      "::placeholder": {
        color: "#BFBFBF",
        fontFamily: i18n.language === "en" ? "Montserrat" : "Cairo",
        fontSize: "14px",
      },
    },
  };

  const handleValidationCardNumer = (event) => {
    if (event.error)
      setValidationErrors({
        ...validationErrors,
        number: t("credit-card.invalid-number"),
      });
    else setValidationErrors({ ...validationErrors, number: null });
  };

  const handleValidationCVC = (event) => {
    if (event.error)
      setValidationErrors({
        ...validationErrors,
        cvc: t("credit-card.invalid-cvc"),
      });
    else setValidationErrors({ ...validationErrors, cvc: null });
  };

  const handleValidationExpireDate = (event) => {
    if (event.error)
      setValidationErrors({
        ...validationErrors,
        expireDate: t("credit-card.invalid-exprie"),
      });
    else setValidationErrors({ ...validationErrors, expireDate: null });
  };
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <BookingWrapper title={t("booking.toptitle")}>
      <Form onFinish={onFinish}>
        <div className="credit-card-wrapper">
          <div className="card-name">
            <Form.Item
              name="card-name"
              rules={[
                {
                  required: true,
                  message:
                    i18n.language === "ar"
                      ? "اسم صاحب البطاقة مطلوب"
                      : "credit card holder name required",
                },
              ]}
            >
              <Input
                label={t("booking.cardHolderName")}
                placeholder={t("booking.cardHolderNamePlaceholder")}
              />
            </Form.Item>
          </div>
          <div className="card-datailes">
            <div className="card-number">
              <Form.Item>
                <CardNumberElement
                  className="form-field stripe-credit-card-number stripe-input"
                  style={inputStyle}
                  onChange={handleValidationCardNumer}
                  placeholder={t("booking.creditNumberPlaceholder")}
                />
                {validationErrors.number && (
                  <span className="validation-errors">
                    {validationErrors.number}
                  </span>
                )}
              </Form.Item>
              <div className="card-group">
                <img
                  src={require("assets/Group 4@2x.png")}
                  className="card-group-img"
                />
              </div>
            </div>
            <div className="card-ssl-wrapper">
              <div className="card-date-wrapper">
                <div className="card-date">
                  <Form.Item name="card-expiry-date">
                    <CardExpiryElement
                      className="form-field  stripe-input"
                      style={inputStyle}
                      onChange={handleValidationExpireDate}
                    />
                    {validationErrors.expireDate && (
                      <span className="validation-errors">
                        {validationErrors.expireDate}
                      </span>
                    )}
                  </Form.Item>
                </div>
                <div className="card-date">
                  <Form.Item name="card-cvc">
                    <CardCVCElement
                      placeholder={t("booking.CVC")}
                      className="form-field  stripe-input"
                      style={inputStyle}
                      onChange={handleValidationCVC}
                    />
                    {validationErrors.cvc && (
                      <span className="validation-errors">
                        {validationErrors.cvc}
                      </span>
                    )}
                  </Form.Item>
                </div>
              </div>

              <div className="secured-ssl-section">
                <div className="ssl-img-wrapper">
                  <img
                    src={require("assets/lock@2x.png")}
                    className="ssl-img"
                  />
                  <h5>{t("booking.ssl")}</h5>
                </div>
              </div>
            </div>
          </div>
          <div className="credit-btn-wrapper">
            <Button className="book-btn" isloading={isLoading ? true : false}>
              {t("booking.bookFor")} $
              {requestInfo.finalPrice
                ? requestInfo.finalPrice
                : talent.initPrice + talent.initPrice * talent.companyRatio}
            </Button>
            <div className="credit-policy-info">
              <span className="credit-gray">
                {t("booking.booking-agreement")}
              </span>

              <span className="credit-dark-font">
                <a>{t("booking.agreement-terms")}</a>
              </span>

              <span>{i18n.language === "en" ? " and" : " و"}</span>
              <span className="credit-dark-font">
                <a>{t("booking.agreement-conditions")}</a>
              </span>
              <span className="credit-gray">{t("booking.of-nejma")}</span>
            </div>
          </div>
        </div>
      </Form>
    </BookingWrapper>
  );
};

export default injectStripe(CreditCardInfo);
