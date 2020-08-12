import React from "react";
import "./index.scss";
import EditImg from "assets/icons/pen.svg";
import InfoRow from "./InfoRow";
import { useTranslation } from "react-i18next";

export default function WalletPreview(props) {
  const { t } = useTranslation();
  const {
    bd_account_name,
    bd_account_no,
    bd_IBAN,
    bd_bank_name,
    bd_bank_address,
    bd_country,
    bd_aba_routing_no,
    bd_swift_code,
  } = props.paymentInfo;

  return (
    <div className="bank-preview-wrapper">
      <div className="bank-preview-header">
        <h3>{t("set-payment.bank-details")}</h3>
        <div className="edit-btn" onClick={props.setPaymentInfo}>
          <img src={EditImg} />
          <h5>{t("set-payment.edit")}</h5>
        </div>
      </div>
      <div className="account-info-wrapper">
        <div className="pink-side"></div>
        <div className="info-rows-wrapper">
          <InfoRow
            left={t("set-payment.account-name-label")}
            right={bd_account_name}
          />
          <InfoRow
            left={t("set-payment.account-number-label")}
            right={bd_account_no}
          />
          <InfoRow left={t("set-payment.account-iban-label")} right={bd_IBAN} />
          <InfoRow
            left={t("set-payment.bank-name-label")}
            right={bd_bank_name}
          />
          <InfoRow
            left={t("set-payment.bank-address-label")}
            right={bd_bank_address}
          />
          <InfoRow left={t("set-payment.country-label")} right={bd_country} />
          <InfoRow
            left={t("set-payment.aba-label")}
            right={bd_aba_routing_no}
          />
          <InfoRow left={t("set-payment.swift-label")} right={bd_swift_code} />
        </div>
      </div>
    </div>
  );
}
