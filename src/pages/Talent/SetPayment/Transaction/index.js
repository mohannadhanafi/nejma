import React from "react";
import "./index.scss";
import { useTranslation } from "react-i18next";

export default function Transaction(props) {
  const { t } = useTranslation();
  return (
    <div className="single-transaction">
      <div className="transaction-description">
        {t("set-payment.last-with-draw")}
      </div>
      <div className="transaction-amonut">$900</div>
      <div className="transaction-date">03/17/2020</div>
    </div>
  );
}
