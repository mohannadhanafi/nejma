import React, { useState, useEffect } from "react";
import { StripeProvider, Elements } from "react-stripe-elements";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import RequestInfo from "./RequestInfo";
import Confirm from "./Confirm";
import Success from "./Success";
import CreditCard from "./CreaditCard";
import { API_CALL } from "store/constants";
import { notification } from "antd";

export default function Booking(props) {
  const dispatch = useDispatch();
  const { id } = useParams();
  const [step, setStep] = useState(0);

  const [checked, setChecked] = useState(false);
  const [requestInfo, setRequestInfo] = useState();
  const goNext = () => setStep(step >= 3 ? 3 : step + 1);
  const goBack = () => setStep(step <= 0 ? 0 : step - 1);
  const [selecetedlanguage, setSelectedlanguage] = useState([]);
  const [objectLanguage, setObjectLanguage] = useState([]);
  const [promo, setPromoID] = useState();

  const onChangePromoId = (data) => {
    setPromoID(data);
  };

  const handleChangelanguage = (option) => {
    let newlanguage;
    if (selecetedlanguage.includes(option.id))
      newlanguage = selecetedlanguage.filter(
        (_option) => _option !== option.id
      );
    else newlanguage = [option];
    setSelectedlanguage([newlanguage[0].id]);
    setObjectLanguage(newlanguage);
  };

  const handleClick = () => setChecked(!checked);
  const onFinish = (values) => {
    const newValues = {
      ...values,
      forMe: !values.forMe || values.forMe.id === 1 ? false : true,
      isprivate: checked,
      languageId: objectLanguage,
      finalPrice: promo && promo.finalPrice ? promo.finalPrice : null,
    };
    setRequestInfo(newValues);
    goNext();
  };

  const getToken = (values) => {
    setRequestInfo({ ...requestInfo, stripeToken: values });
  };

  const makeRequest = (isFinish) => {
    const newValues = {
      ...requestInfo,
      languageId: Number(objectLanguage[0].id),
      talentId: id,
      promocode: requestInfo.promocodeId,
    };
    delete newValues.promocodeId;
    if (newValues.promocode === "") delete newValues.promocode;
    const onSuccess = (response) => {
      const { data } = response;
      // redirect to next page
      isFinish();
      goNext();
    };

    const onFailure = (error) => {
      notification.error({ message: error.msg || "Error" });
    };

    dispatch({
      type: API_CALL,
      payload: {
        onSuccess,
        onFailure,
        url: `/request`,
        method: "POST",
        data: newValues,
      },
    });
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (step === 0)
    return (
      <RequestInfo
        handleClick={handleClick}
        checked={checked}
        onFinish={onFinish}
        goNext={goNext}
        selecetedlanguage={selecetedlanguage}
        handleChangelanguage={handleChangelanguage}
        onChangePromoId={onChangePromoId}
      />
    );
  if (step === 1)
    return (
      <StripeProvider apiKey="pk_test_1iBltipH9a0Yh8PHc5W5wG9E00T5tN8xq5">
        <Elements>
          <CreditCard
            requestInfo={requestInfo}
            goNext={goNext}
            getToken={getToken}
          />
        </Elements>
      </StripeProvider>
    );

  if (step === 2)
    return (
      <Confirm
        makeRequest={makeRequest}
        requestInfo={requestInfo}
        goNext={goNext}
      />
    );
  if (step === 3) return <Success requestInfo={requestInfo} />;
}
