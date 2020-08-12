import React from "react";
import "./index.scss";
import BankIcon from "assets/architecture-and-city.svg";
import { Form } from "components";
import { useTranslation } from "react-i18next";
const { Button } = Form;

export default function NoBankInfo(props) {
  const { setPaymentInfo } = props;
  const { t } = useTranslation();

  return (
    <div className="no-bank-info">
      <div className="no-bank-header">
        <h3>{t("set-payment.bank-details")}</h3>
      </div>
      <div className="middle-icon-wrapper">
        <img src={BankIcon} className="bank-icon" />
        <h4>{t("set-payment.no-bank-details")}</h4>
      </div>
      <Button className="add-details-btn" onClick={setPaymentInfo}>
        {t("set-payment.add-bank-details")}
      </Button>
    </div>
  );
}
