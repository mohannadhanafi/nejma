import React, { useEffect, useState } from "react";
import celeb1 from "../../assets/celeb3.png";
import { useTranslation } from "react-i18next";
import "./index.scss";
import VideoPlayer from "components/VideoPlayer";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../../store/selectors";
import { API_CALL } from "../../store/constants";
import { notification } from "antd";

export default function Video(props) {
  const { i18n, t } = useTranslation();
  const user = useSelector(selectUser);

  const dispatch = useDispatch();
  const [showVideo, setShowVideo] = useState();
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
    requestId,
    reviewed,
    seen,
    setSeen,
    setReviewed,
  } = props;
  const openVideo = () => {
    if (seen) {
      const onSuccess = () => {
        setSeen(requestId);
        setShowVideo(true);
      };

      const onFailure = (error) =>
        notification.error({ message: error.response?.data?.msg || "Error" });

      dispatch({
        type: API_CALL,
        payload: {
          onFailure,
          onSuccess,
          url: "/request/setasseen",
          method: "POST",
          data: { id: requestId },
        },
      });
    } else setShowVideo(true);
  };

  const closeVideo = () => setShowVideo(false);
  return (
    <div
      className={`video-thumbnail-wrapper ${
        talentPage ? "talent--page--video" : ""
      }`}
    >
      {showVideo && (
        <VideoPlayer
          src={videoUrl}
          handleClose={closeVideo}
          requestId={requestId}
          preview={!user.id}
          reviewed={reviewed}
          seen={seen}
          setReviewed={setReviewed}
        />
      )}

      <div
        className="video--content"
        style={{
          backgroundImage: `url(${picUrl})`,
          cursor: status === "Ready" && "pointer",
        }}
        onClick={status === "Ready" || talentPage ? openVideo : null}
      >
        <div className="video--content__overlay">
          <img
            className="video--icon"
            src={require("assets/icons/circular.svg")}
            style={{
              display: status === "Ready" || talentPage ? "flex" : "none",
              width: 60,
            }}
          />
        </div>
      </div>
      {!talentPage && (
        <div
          className={`celebrity-details ${
            status ? status : ""
          } `}
          style={{ alignItems: status === 'Ready' ? 'flex-start' : 'center' }}
        >
          {(status && status !== "Ready") ? (
            <>
              <h2 className="celebrity-name">
                {status === "Accepted"
                  ? t("videoPage.Accepted")
                  : status === "Rejected"
                  ? t("videoPage.rejected")
                  : status === "Submitted"
                  ? t("videoPage.submitted")
                  // : !seen
                  // ? t("videoPage.new-video")
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
