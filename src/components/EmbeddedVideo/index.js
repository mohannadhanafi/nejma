import React, { useState, useRef } from "react";
import celeb1 from "../../assets/celeb3.png";
import { useTranslation } from "react-i18next";
import "./index.scss";
import VideoPlayer from "components/VideoPlayer";
import ShareIcon from "assets/video-player/share.svg";
import DownloadIcon from "assets/video-player/down-arrow.svg";
import { getVideoHeight } from "../../utils/getVideoHeight";

export default function EmdeddedVideo(props) {
  const { i18n, t } = useTranslation();
  const [showVideo, setShowVideo] = useState();
  const [isPlaying, setIsPlaying] = useState(false);
  const [finished, setFinished] = useState(false);
  const [clicks, setClicks] = useState(0);
  const [videoHeight, setVideoHeight] = useState("100%");
  const [showContainer, setShowContainer] = useState(false);
  // const { requestStatus, talent, videoUrl } = shoutout;
  // const { nameAr, nameEng: nameEn, category, picUrl } = talent;
  // const { categoryName, categoryNameAr } = category;
  // const { status, id } = requestStatus;

  const videoElement = useRef(null);
  const containerRef = useRef(null);

  const {
    status,
    nameAr,
    nameEn,
    picUrl,
    categoryName,
    categoryNameAr,
    talentPage,
    videoUrl,
    rejectReason,
  } = props;
  const handleImgClick = () => {
    setShowVideo(true);
  };

  const handleVideoClick = () => {
    setClicks(clicks + 1);
  };

  const playvideo = () => {
    const video = videoElement.current;
    video.play();
    setIsPlaying(true);
  };

  const pauseVideo = () => {
    const video = videoElement.current;
    video.pause();
    setIsPlaying(false);
  };

  const closeVideo = () => setShowVideo(false);

  React.useEffect(() => {
    if (showVideo && isPlaying) pauseVideo();
    if (showVideo && !isPlaying) playvideo();
  }, [clicks]);

  React.useEffect(() => {
    if (!!videoElement.current) {
      const video = videoElement.current;
      const container = containerRef.current;

      video.onloadedmetadata = () => {
        const video = videoElement.current;
        const container = containerRef.current;
        const videoWidth = video.videoWidth;
        const videoHeight = video.videoHeight;
        const containerWidth = container.offsetWidth;
        const containerHeight = container.offsetHeight;

        const newHeight = getVideoHeight(
          videoWidth,
          videoHeight,
          containerWidth,
          containerHeight
        );
        setVideoHeight(Math.ceil(newHeight).toString() + "px");
      };
      container.onresize = () => {
        console.log("resize");
      };

      video.src = props.videoUrl;
      video.onended = () => setFinished(true);

      if (showVideo) {
        playvideo();
        // setIsPlaying(true);
      }
    }
  }, [videoElement.current, showVideo]);

  React.useEffect(() => {
    if (finished) {
      videoElement.current.currentTime = 0;
      pauseVideo();
      setShowVideo(false);
    }
  }, [finished]);
  React.useEffect(() => {
    console.log(videoElement.current);
  }, [showVideo]);

  return (
    <div
      className={
        `video-thumbnail-wrapper ${talentPage ? "talent--page--video" : ""} ` +
        props.className
      }
      ref={containerRef}
    >
      {(isPlaying || showVideo) && (
        <div className="util-btn-wrapper">
          <div className="util-btn">
            <img src={ShareIcon} />
          </div>
          <div className="util-btn">
            <img src={DownloadIcon} />
          </div>
        </div>
      )}
      {showVideo && false && (
        <VideoPlayer src={videoUrl} handleClose={closeVideo} />
      )}

      {showVideo && (
        <video
          ref={videoElement}
          style={{ height: videoHeight, borderRadius: "30px" }}
          onClick={handleVideoClick}
        >
          <source type="video/mp4" />
        </video>
      )}

      {!showVideo && (
        <div
          className="video--content"
          style={{
            backgroundImage: `url(${picUrl})`,
            cursor:
              (status === "Ready" || status === "Accepted" || talentPage) &&
              "pointer",
          }}
          onClick={
            status === "Ready" || status === "Accepted" || talentPage
              ? handleImgClick
              : null
          }
        >
          <div className="video--content__overlay">
            <img
              className="video--icon"
              src={require("assets/icons/circular.svg")}
              style={{
                display:
                  status === "Ready" || status === "Accepted" || talentPage
                    ? "flex"
                    : "none",
                width: 60,
              }}
            />
          </div>
        </div>
      )}
      {!talentPage && (
        <div className={`celebrity-details ${status ? status : ""}`}>
          {status && status !== "Ready" ? (
            <>
              <h2 className="celebrity-name">
                {status === "Accepted"
                  ? t("videoPage.Accepted")
                  : status === "Rejected"
                  ? t("videoPage.rejected")
                  : status === "Submitted"
                  ? t("videoPage.submitted")
                  : null}
              </h2>
              <p className="celebrity-occupation">
                {status === "Rejected" && rejectReason
                  ? i18n.language === "ar"
                    ? rejectReason.reasonAr
                    : rejectReason.reason
                  : null}
              </p>
            </>
          ) : (
            <>
              <h2 className="celebrity-name">
                {i18n.language === "ar" ? nameAr : nameEn}
              </h2>
              <p className="celebrity-occupation">
                {i18n.language === "ar" ? categoryNameAr : categoryName}
              </p>
            </>
          )}
        </div>
      )}
    </div>
  );
}
