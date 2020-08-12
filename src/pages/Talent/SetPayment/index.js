import React, { useEffect, useState } from "react";
import "./index.scss";
import WalletSummary from "./WalletSummary";
import BankDetails from "./BankDetails";
import NoBankInfo from "./NoBankInfo";
import WalletPreview from "./WalletPreview/index";
import SideWrapper from "./SideWrapper";
import { useDispatch, useSelector } from "react-redux";
import { API_CALL } from "../../../store/constants";
import { useTranslation } from "react-i18next";
import { selectUser } from "../../../store/selectors";

export default function SetPayment() {
  const [renderId, setRenderId] = useState(0);
  const [paymentInfo, setPaymentInfo] = useState({});
  const [currentBalance, setCurrentBalance] = useState(0.0);
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const previewClass =
    renderId === 3 || renderId === 2 ? "preview-no-padding" : "";

  const moveToAddAccountInfo = () => setRenderId(1);
  const moveToNoBankDetails = () => setRenderId(2);
  const moveToPreviewDetails = () => setRenderId(3);

  // GET Payment Details
  useEffect(() => {
    const onSuccess = ({ data }) => {
      if (!data.bd_account_no) return setRenderId(2);
      setPaymentInfo(data);
      setRenderId(3);
    };
    const onFailure = (error) => {};
    dispatch({
      type: API_CALL,
      payload: {
        url: "/talent/bankdetails",
        method: "GET",
        onSuccess,
        onFailure,
      },
    });
  }, []);

  // Get Current Balance;
  useEffect(() => {
    const onSuccess = ({ data }) => {
      setCurrentBalance(data.NetAmount);
    };
    const onFailure = (error) => {
      console.log(error);
    };
    dispatch({
      type: API_CALL,
      payload: {
        url: "/talent/netamount/" + user.id,
        method: "GET",
        onSuccess,
        onFailure,
      },
    });
  }, []);

  return (
    <div className="container">
      <div className="set-payment-wrapper">
        <div className="set-payment-left">
          <div className="payment-header-title">
            <h3>{t("set-payment.my-wallet")}</h3>
          </div>

          <div className="set-payment-content-wrapper">
            <WalletSummary currentBalance={currentBalance} />
          </div>
        </div>

        <SideWrapper className={previewClass}>
          {renderId === 1 && (
            <BankDetails
              paymentInfo={paymentInfo}
              moveToPreviewDetails={moveToPreviewDetails}
              moveToNoBankDetails={moveToNoBankDetails}
              setPaymentInfo={setPaymentInfo}
            />
          )}
          {renderId === 2 && (
            <NoBankInfo setPaymentInfo={moveToAddAccountInfo} />
          )}
          {renderId === 3 && (
            <WalletPreview
              paymentInfo={paymentInfo}
              setPaymentInfo={moveToAddAccountInfo}
            />
          )}
        </SideWrapper>
      </div>
    </div>
  );
}
