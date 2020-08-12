import React from "react";
import WalletIcon from "assets/wallet.png";
import "./index.scss";
import Transaction from "../Transaction";
import { Form } from "components";
import { useTranslation } from "react-i18next";

const { Button } = Form;

export default function WalletSummary({ currentBalance }) {
  const { t } = useTranslation();

  return (
    <div className="wallet-summary-wrapper">
      <img src={WalletIcon} className="wallet-img-wrapper" />
      <div className="wallet-balance">
        <h3>${currentBalance}</h3>
        <div className="current-balance-text">
          {t("set-payment.current-balance")}
        </div>
      </div>
      <div className="transactions-history">
        <Transaction />
      </div>

      <Button className="set-payment-btn">
        {t("set-payment.request-payment")}
      </Button>
    </div>
  );
}
