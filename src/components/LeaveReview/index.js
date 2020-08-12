import React, { useRef, useState } from "react";
import { Row, Col, Form, Rate, notification } from "antd";

import { useTranslation } from "react-i18next";
import Button from "../form/Button";
import TextArea from "../form/TextArea";
import { useDispatch } from "react-redux";
import { API_CALL } from "store/constants";
import "./index.scss";

export default function LeaveReview(props) {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const { t } = useTranslation();

  const handleReviewVideo = (values) => {
    setIsLoading(true);

    const onSuccess = () => {
      setIsLoading(false);
      props.setReviewed(props.requestId);
    };

    const onFailure = (error) => {
      setIsLoading(false);
      notification.error({ message: error.data?.msg || "ERROR" });
    };

    dispatch({
      type: API_CALL,
      payload: {
        url: "/request/updatereview",
        method: "POST",
        data: { ...values, requestId: props.requestId },
        onSuccess,
        onFailure,
      },
    });
  };

  return (
    <Row className="leave-review-container">
      <Row className="leave-review">
        <Row className="review-card">
          <Col offset={22}>
            <img
              src={require("../../assets/video-player/delete-black.svg")}
              className="close-icon"
              width="25"
              onClick={props.handleClose}
            />
          </Col>

          <Col>
            <img
              src={require("../../assets/video-player/feedback.svg")}
              className="feedback-icon"
              width="100px"
            />
          </Col>
          <Col>
            <h2 className="feedback-title">
              {t("video-player.feedback-title")}
            </h2>
          </Col>
          <Form
            name="video-feedback"
            className="feedback-form"
            onFinish={handleReviewVideo}
          >
            <Col>
              <Form.Item
                name="rating"
                rules={[
                  {
                    required: true,
                    message: t("video-player.rate-required"),
                  },
                ]}
              >
                <Rate style={{ fontSize: 40 }} />
              </Form.Item>
            </Col>
            <Col className="feedback-content">
              <Form.Item name="review">
                <TextArea label={t("video-player.feedback-label")} />
              </Form.Item>
            </Col>
            <Col className="submit-feedback-container">
              <Button className="main-btn feedback-submit-btn">
                {t("video-player.feedback-submit")}
              </Button>
            </Col>
          </Form>
        </Row>
      </Row>
    </Row>
  );
}
