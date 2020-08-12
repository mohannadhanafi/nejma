import React, { useEffect } from "react";
import { Form as FormComponent } from "components";
import "./index.scss";
import { Form, notification } from "antd";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { API_CALL } from "../../../../store/constants";

const { Input, Button } = FormComponent;

export default function BankDetails(props) {
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const dispatch = useDispatch();

  const handleSetPayment = (values) => {
    const onSuccess = ({ data }) => {
      notification.success({ message: data?.msg || "updated Successfully", duration: 2 });
      props.setPaymentInfo(values);
      props.moveToPreviewDetails();
    };

    const onFailure = (error) =>
      notification.error({ message: error.response?.data?.msg || "Error" });

    dispatch({
      type: API_CALL,
      payload: {
        url: "/talent/updatebankdetails",
        method: "POST",
        data: values,
        onSuccess,
        onFailure,
      },
    });
  };

  const handleCancel = () => {
    if (props.paymentInfo?.bd_account_no) props.moveToPreviewDetails();
    else props.moveToNoBankDetails();
  };
  return (
    <div className="bank-details-wrapper">
      <div className="bank-details-header">
        <h3>{t("set-payment.bank-details")}</h3>
      </div>
      <div className="form-wrapper">
        <Form name={"set-payment"} form={form} onFinish={handleSetPayment}>
          <Form.Item
            name={"bd_account_name"}
            rules={[
              {
                required: true,
                message: t("set-payment.account-name-validation"),
              },
            ]}
          >
            <Input
              label={t("set-payment.account-name-label")}
              placeholder={t("set-payment.account-name-placeholder")}
            />
          </Form.Item>
          <Form.Item
            name={"bd_account_no"}
            rules={[
              {
                required: true,
                message: t("set-payment.account-number-validation"),
              },
            ]}
          >
            <Input
              label={t("set-payment.account-number-label")}
              placeholder={t("set-payment.account-number-placeholder")}
            />
          </Form.Item>
          <Form.Item
            name={"bd_IBAN"}
            rules={[
              {
                required: true,
                message: t("set-payment.account-iban-validation"),
              },
            ]}
          >
            <Input
              label={t("set-payment.account-iban-label")}
              placeholder={t("set-payment.account-iban-placeholder")}
            />
          </Form.Item>
          <Form.Item
            name={"bd_bank_name"}
            rules={[
              {
                required: true,
                message: t("set-payment.bank-name-validation"),
              },
            ]}
          >
            <Input
              label={t("set-payment.bank-name-label")}
              placeholder={t("set-payment.bank-name-placeholder")}
            />
          </Form.Item>
          <Form.Item
            name={"bd_bank_address"}
            rules={[
              {
                required: true,
                message: t("set-payment.bank-address-validation"),
              },
            ]}
          >
            <Input
              label={t("set-payment.bank-address-label")}
              placeholder={t("set-payment.bank-address-placeholder")}
            />
          </Form.Item>
          <Form.Item
            name={"bd_country"}
            rules={[
              {
                required: true,
                message: t("set-payment.country-validation"),
              },
            ]}
          >
            <Input
              label={t("set-payment.country-label")}
              placeholder={t("set-payment.country-placeholder")}
            />
          </Form.Item>
          <Form.Item
            name={"bd_aba_routing_no"}
            rules={[
              {
                required: true,
                message: t("set-payment.aba-validation"),
              },
            ]}
          >
            <Input
              label={t("set-payment.aba-label")}
              placeholder={t("set-payment.aba-placeholder")}
            />
          </Form.Item>
          <Form.Item
            name={"bd_swift_code"}
            rules={[
              {
                required: true,
                message: t("set-payment.swift-validation"),
              },
            ]}
          >
            <Input
              label={t("set-payment.swift-label")}
              placeholder={t("set-payment.swift-placeholder")}
            />
          </Form.Item>

          <Button className="set-payment-save-btn">
            {t("set-payment.save")}
          </Button>

          <div className="cancel-btn" onClick={handleCancel}>
            {t("set-payment.cancel")}
          </div>
        </Form>
      </div>
    </div>
  );
}
