import React, { useState, useEffect } from "react";
import { Row, Col, Form } from "antd";
import { Form as FormComponents } from "components";
import "./index.scss";

import { API_CALL } from "store/constants";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import { disableBodyScroll, enableBodyScroll } from "body-scroll-lock";

const { Select, Button } = FormComponents;

export default function RejectRequest(props) {
  const [form] = Form.useForm();
  const [reasons, setReasons] = useState([]);
  const dispatch = useDispatch();
  const { i18n, t } = useTranslation();

  useEffect(() => {
    const onSuccess = (response) => {
      setReasons(
        response.data.map((reason) => ({
          id: reason.id,
          value: i18n.language === "en" ? reason.reason : reason.reasonAr,
        }))
      );
    };

    const onFailure = (error) => {
      console.log(error);
    };

    dispatch({
      type: API_CALL,
      payload: {
        url: "/rejectreason/all",
        method: "GET",
        onSuccess,
        onFailure,
      },
    });
  }, []);
  useEffect(() => {
    disableBodyScroll(document.body);
    return () => enableBodyScroll(document.body);
  });

  const handleRejectRequest = () => {
    const values = form.getFieldsValue();
    const onSuccess = (response) => {
      props.handleRejectRequest(props.requestId);
    };

    const onFailure = (error) => {
      console.log(error);
    };
    dispatch({
      type: API_CALL,
      payload: {
        url: "/request/reject",
        method: "POST",
        onSuccess,
        onFailure,
        data: {
          rejectReasonId: values.rejectReasonId,
          requestId: props.requestId,
        },
      },
    });
  };

  return (
    <Row className="reject-request-container">
      <Row className="reject-request">
        <Col offset={22}>
          <img
            className="close-btn"
            src={require("assets/icons/close.svg")}
            onClick={props.onClose}
          />
        </Col>
        <Col span={24}>
          <h1 className="title">{t("reject-request.title")}</h1>
        </Col>
        <Col span={20} offset={2}>
          <Form name="reject-request" form={form} onFinish={props.onFinish}>
            <Form.Item
              name="rejectReasonId"
              rules={[
                {
                  required: true,
                  message: t("reject-request.reason-validation"),
                },
              ]}
            >
              <Select
                label={t("reject-request.reason-label")}
                placeholder={t("reject-request.reason-label")}
                options={reasons}
              />
            </Form.Item>
            <Button
              onClick={handleRejectRequest}
              className="main-btn reject-btn"
            >
              {t("reject-request.submit")}
            </Button>
          </Form>
        </Col>
      </Row>
    </Row>
  );
}
