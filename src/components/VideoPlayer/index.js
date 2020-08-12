import React, { useRef, useEffect, useState } from "react";
import { Row, Col, Slider, Form, Rate, notification } from "antd";
import { PauseOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";
import Button from "../form/Button";
import TextArea from "../form/TextArea";
import "./index.scss";
import { useDispatch } from "react-redux";
import { API_CALL } from "store/constants";
import { disableBodyScroll, enableBodyScroll } from "body-scroll-lock";

export default function VideoPlayer(props) {
  const videoElement = useRef();
  const [paused, setPaused] = useState(true);
  const [reviewed, setReviewed] = useState(false);
  const [finished, setFinished] = useState(false);
  const [feedbackSubmitted, setFeedbackSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [volume, setVolume] = useState(70);
  const [previousVolume, setPreviousVolume] = useState(0);
  const [currentVideoTime, setCurrentVideoTime] = useState(0);
  const dispatch = useDispatch();
  const { t } = useTranslation();

  useEffect(() => {
    const video = videoElement.current;
    video.onended = () => setFinished(true);
    video.ontimeupdate = () =>
      setCurrentVideoTime(Math.floor(video.currentTime));
  }, [videoElement.current]);

  const pauseVideo = (event) => {
    const eventSource = event.target;
    const videoContainer = document.getElementsByClassName(
      "played-controllers"
    )[0];
    if (!videoContainer.isEqualNode(eventSource)) return;
    videoElement.current.pause();
    setPaused(true);
  };

  const playVideo = (event) => {
    videoElement.current.play();
    setPaused(false);
  };

  const handleChangeCurrentVideoTime = (value) => {
    const video = videoElement.current;
    video.currentTime = value;
    video.play();
    setCurrentVideoTime(value);
  };

  const handleClickOnContainer = (event) => {
    if (event.target.classList.contains("video-player-container"))
      props.handleClose();
  };

  const replayVideo = () => {
    setFinished(false);
    handleChangeCurrentVideoTime(0);
  };

  const muteVideo = () => {
    const video = videoElement.current;
    video.volume = 0;
    setPreviousVolume(volume);
    setVolume(0);
  };

  const unMuteVideo = () => {
    const video = videoElement.current;
    video.volume = previousVolume / 100;
    setVolume(previousVolume);
  };
  const moveToReview = () => {
    setPaused(false);
    setReviewed(true);
  };
  const handleReviewVideo = (values) => {
    setIsLoading(true);

    const onSuccess = () => {
      setIsLoading(false);
      setReviewed(false);
      props.setReviewed(props.requestId);
      setFeedbackSubmitted(true);
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

  useEffect(() => {
    disableBodyScroll(document.body);
    return () => enableBodyScroll(document.body);
  });
  return (
    <Row className="video-player-container" onClick={handleClickOnContainer}>
      <Row className="video-player">
        <video className="video" ref={videoElement}>
          <source src={props.src} type="video/mp4" />
        </video>
        {paused ? (
          <Row className="paused-controllers">
            <Row className="upper-wrapper">
              {!props.preview && (
                <Col span={2} offset={2} className="share-icon-container">
                  <img
                    src={require("../../assets/video-player/share.svg")}
                    width={25}
                    className="share-icon"
                  />
                </Col>
              )}
              <Col span={2} offset={1} className="download-icon-container">
                <a href={props.src}>
                  <img
                    src={require("../../assets/video-player/down-arrow.svg")}
                    className="download-icon"
                    width={25}
                  />
                </a>
              </Col>
              <Col span={14} className="close-icon-container">
                <img
                  src={require("../../assets/video-player/delete.svg")}
                  className="close-icon"
                  width="25"
                  onClick={props.handleClose}
                />
              </Col>
            </Row>
            <Row className="middle-wrapper">
              {!props.preview && !props.reviewed && (
                <span className="leave-review" onClick={moveToReview}>
                  <img src={require("../../assets/video-player/star.png")} />{" "}
                  {t("video-player.leave-review")}
                </span>
              )}
            </Row>
            <Row className="lower-wrapper">
              <Col className="play-btn-container" onClick={playVideo}>
                <img
                  src={require("../../assets/video-player/play.svg")}
                  className="play-icon"
                />
              </Col>
            </Row>
          </Row>
        ) : finished ? (
          <Row className="finished-controllers">
            <Row className="upper-wrapper">
              <Col span={2} offset={2} className="share-icon-container">
                <img
                  src={require("../../assets/video-player/share.svg")}
                  width={25}
                  className="share-icon"
                />
              </Col>
              <Col span={2} offset={1} className="download-icon-container">
                {!props.preview && (
                  <a href={props.src}>
                    <img
                      src={require("../../assets/video-player/down-arrow.svg")}
                      className="download-icon"
                      width={25}
                    />
                  </a>
                )}
              </Col>
              <Col span={16} className="close-icon-container">
                <img
                  src={require("../../assets/video-player/delete.svg")}
                  className="close-icon"
                  width="25"
                  onClick={props.handleClose}
                />
              </Col>
            </Row>
            {!props.preview && !props.reviewed && (
              <Row className="middle-wrapper">
                <span className="leave-review">
                  <img src={require("../../assets/video-player/star.png")} />{" "}
                  {t("video-player.leave-review")}
                </span>
              </Row>
            )}
            <Row className="lower-wrapper">
              <Col className="play-btn-container" onClick={replayVideo}>
                <img
                  src={require("../../assets/video-player/re-play.svg")}
                  className="play-icon"
                />
              </Col>
            </Row>
          </Row>
        ) : reviewed ? (
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
                src={require("assets/video-player/feedback.svg")}
                className="feedback-icon"
                width="100"
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
        ) : feedbackSubmitted ? (
          <Row className="review-submitted" justify="center">
            <Col offset={22} span={2}>
              <img
                src={require("../../assets/video-player/delete.svg")}
                onClick={props.handleClose}
              />
            </Col>
            <Col>
              <Row justify="center">
                <Col>
                  <img
                    src={require("../../assets/video-player/like.svg")}
                    className={"review-done-img"}
                  />
                </Col>
                <Col>
                  <h2 className="reivew-submitted-title">
                    {t("video-player.your-feedback-submitted")}
                  </h2>
                </Col>
                <Col>
                  {" "}
                  <p className="review-submitted-para">
                    {t("video-player.your-feedback-submitted-para")}
                  </p>
                </Col>
              </Row>
            </Col>
          </Row>
        ) : (
          <Row className="played-controllers" onClick={pauseVideo}>
            <Col span={24} className="pause-btn-conatiner">
              <span
                className="pause-btn"
                onClick={() => {
                  videoElement.current.pause();
                  setPaused(true);
                }}
              >
                <PauseOutlined />{" "}
              </span>
            </Col>
            <Col span={20} className="video-track-slider">
              <Slider
                value={currentVideoTime}
                onChange={handleChangeCurrentVideoTime}
                min={0}
                max={
                  videoElement.current &&
                  Math.floor(videoElement.current.duration)
                }
              />
            </Col>
          </Row>
        )}
      </Row>
    </Row>
  );
}
