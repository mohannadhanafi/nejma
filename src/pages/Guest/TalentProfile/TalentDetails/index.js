import React, { useEffect, useRef, useState } from "react";
import { Row, Col, notification } from "antd";
import { useTranslation } from "react-i18next";
import { HeartTwoTone, ShareAltOutlined, HeartFilled } from "@ant-design/icons";
import { Form as FormComponents } from "components";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "store/selectors";
import { API_CALL } from "store/constants";
import MuteIcon from "assets/video-player/mute.svg";
import VolumeIcon from "assets/video-player/volume.svg";
import { useParams } from "react-router-dom";
import { CopyToClipboard } from "react-copy-to-clipboard";
import "./index.scss";
import {
  getVideoHeight,
  onResizeContainer,
} from "../../../../utils/getVideoHeight";

const { Button } = FormComponents;

export default function TalentDetails(props) {
  const { t, i18n } = useTranslation();
  const user = useSelector(selectUser);
  const videoRef = useRef();
  const containerRef = useRef();
  const [isFavorite, setIsFavorite] = useState(false);
  const [isMuted, setIsMuted] = useState(!false);
  const [isRuning, setIsRuning] = useState(true);
  const [videoHeight, setVideoHeight] = useState("100%");
  const { talent } = props;
  const { id } = useParams();
  const dispatch = useDispatch();
  const { talentDetails, moveToBooking } = props;

  const handleLikeTalent = () => {
    if (!user.id) return;
    const onSuccess = ({ data }) => {
      setIsFavorite(true);
    };

    const onFailure = console.log;
    dispatch({
      type: API_CALL,
      payload: {
        url: "/talent/givealike",
        method: "POST",
        data: { talentId: id },
        onSuccess,
        onFailure,
      },
    });
  };
  const handleUnLikeTalent = () => {
    const onSuccess = ({ data }) => {
      setIsFavorite(false);
    };

    const onFailure = console.log;
    dispatch({
      type: API_CALL,
      payload: {
        url: "/talent/unlike",
        method: "POST",
        data: { talentId: id },
        onSuccess,
        onFailure,
      },
    });
  };

  useEffect(() => {
    if (!user.id) return;
    const onSuccess = ({ data }) => setIsFavorite(data);
    const onFailure = console.log;

    dispatch({
      type: API_CALL,
      payload: {
        url: "/talent/checkifliked/" + id,
        method: "GET",
        onSuccess,
        onFailure,
      },
    });
  }, [talent]);

  useEffect(() => {
    if (!videoRef.current || !talent.videoUrl) return;
    const video = videoRef.current;
    const container = containerRef.current;
    const detectVideoHeight = () => {
      const container = containerRef.current;
      const videoWidth = video.videoWidth;
      const _videoHeight = video.videoHeight;
      const containerWidth = container.offsetWidth;
      const containerHeight = container.offsetHeight;
      console.log(videoWidth, videoHeight, containerWidth, containerHeight);
      const newHeight = getVideoHeight(
        videoWidth,
        _videoHeight,
        containerWidth,
        containerHeight
      );
      if (newHeight !== Number(videoHeight.split("px")[0]))
        setVideoHeight(Math.ceil(newHeight).toString() + "px");
    };
    // onResizeContainer(
    //   container
    //   // () => window.innerWidth <= 950 && detectVideoHeight()
    // );
    video.addEventListener("loadedmetadata", detectVideoHeight);
  }, [talent.videoUrl, videoRef.current]);

  const url = window.location.href;
  const toggleMute = () => setIsMuted(!isMuted);
  const handleArabic = (className) => {
    let formatted = className;
    if (i18n.language === "ar") formatted = `${className} ar`;
    return formatted;
  };

  const toggleRunningVideo = () => {
    if (isRuning) {
      videoRef.current.pause();
      setIsRuning(false);
    } else {
      videoRef.current.play();
      setIsRuning(true);
    }
  };

  return (
    <>
      <div className="profil-header-content">
        <div className={handleArabic("talent-img-container")}>
          <div className={handleArabic("edit-btn-wrapper") + " edit-mobile"}>
            <CopyToClipboard
              onCopy={() => {
                notification.success({
                  message:
                    i18n.language === "ar" ? "تم نسخ الرابط" : "Link copied",
                  duration: 0.8,
                });
              }}
              text={url}
            >
              <div className="edit-btn left-icon">
                <ShareAltOutlined className="icon share--icon" />
                <h5> {t("share")}</h5>
              </div>
            </CopyToClipboard>
            {user.role && (
              <div
                className="edit-btn"
                onClick={isFavorite ? handleUnLikeTalent : handleLikeTalent}
              >
                {!isFavorite ? (
                  <HeartTwoTone
                    className="icon like--icon"
                    twoToneColor={"#eb2f96"}
                  />
                ) : (
                  <HeartFilled
                    className="icon like--icon"
                    twoToneColor={"#eb2f96"}
                  />
                )}
                <h5>
                  {isFavorite
                    ? t("talent-profile-customer-perspective.unlike")
                    : t("talent-profile-customer-perspective.like")}
                </h5>
              </div>
            )}
          </div>
          {!talent.videoUrl && (
            <img src={talent.picUrl} className="talent-img-object" />
          )}

          {talent.videoUrl && (
            <>
              <span
                onClick={toggleMute}
                className={`volume-btn ${
                  i18n.language === "ar" && "volume-btn-ar"
                }`}
              >
                <img
                  src={isMuted ? MuteIcon : VolumeIcon}
                  className="volume-icon"
                />
              </span>
              <div
                ref={containerRef}
                className={"video-container"}
                style={{ width: "100%", height: "100%", borderRadius: "30px" }}
                onClick={toggleRunningVideo}
              >
                <video
                  autoPlay={true}
                  muted={isMuted}
                  loop={true}
                  style={{
                    height: videoHeight,
                    borderRadius: "30px",
                    boxShadow: "0px 0px 20px -1px",
                    backgroundColor: "#000",
                  }}
                  ref={videoRef}
                >
                  <source src={talentDetails.videoUrl} />
                </video>
              </div>
            </>
          )}
        </div>

        <div className="talent-description">
          <h3 className="talent-name">
            {i18n.language === "en" ? talent.nameEng : talent.nameAr}
          </h3>

          <h5>
            {i18n.language === "en"
              ? talent.category && talent.category.categoryName
              : talent.category && talent.category.categoryNameAr}
          </h5>

          <h6>TV Presenter, Reality Show, Musician, Actor, Influencer</h6>
          <p className="bio-summary">
            {i18n.language === "en" ? talent.bioEng : talent.bioAr}{" "}
          </p>

          <div className="languages-container">
            <span className="">
              {t("talent-profile-customer-perspective.languages")}
            </span>
            {talent.languages &&
              talent.languages.map((item) => (
                <span key={item.id}>{item.languageName}</span>
              ))}
          </div>

          <>
            {user.role !== "talent" && (
              <Button
                onClick={moveToBooking}
                className={"main-btn book-now-btn"}
              >
                {t("book")} ${" "}
                {talentDetails.initPrice +
                  talentDetails.initPrice * talentDetails.companyRatio}
              </Button>
            )}

            <div className={handleArabic("edit-btn-wrapper")}>
              <CopyToClipboard
                onCopy={() => {
                  notification.success({
                    message:
                      i18n.language === "ar" ? "تم نسخ الرابط" : "Link copied",
                    duration: 0.8,
                  });
                }}
                text={url}
              >
                <div className="edit-btn left-icon">
                  <ShareAltOutlined className="icon share--icon" />
                  <h5> {t("share")}</h5>
                </div>
              </CopyToClipboard>

              {user.role && (
                <div
                  className="edit-btn"
                  onClick={isFavorite ? handleUnLikeTalent : handleLikeTalent}
                >
                  {!isFavorite ? (
                    <HeartTwoTone
                      className="icon like--icon"
                      twoToneColor={"#eb2f96"}
                    />
                  ) : (
                    <HeartFilled
                      className="icon like--icon"
                      twoToneColor={"#eb2f96"}
                    />
                  )}
                  <h5>
                    {isFavorite
                      ? t("talent-profile-customer-perspective.unlike")
                      : t("talent-profile-customer-perspective.like")}
                  </h5>
                </div>
              )}
            </div>
          </>
        </div>
      </div>
      <div className="talent-name-mobile">
        <h3 className="talent-name">
          {i18n.language === "en" ? talent.nameEng : talent.nameAr}
        </h3>

        <h5>
          {i18n.language === "en"
            ? talent.category && talent.category.categoryName
            : talent.category && talent.category.categoryNameAr}
        </h5>
      </div>
    </>
  );
}

/*

{talent.videoUrl ? (
                <div className={"video-container"}>
                  <video autoPlay={true} muted={isMuted} loop={true}>
                    <source src={talent.videoUrl} />
                  </video>

                  <span onClick={toggleMute} className={"volume-btn"}>
                    <img src={isMuted ? MuteIcon : VolumeIcon} />
                  </span>
                </div>
              ) : (
                <div
                  className={`${
                    i18n.language === "ar" ? "talent-img-ar" : ""
                  } talent-img`}
                  style={{
                    backgroundImage: `url("${talent.picUrl}")`,
                  }}
                />
              )} */
