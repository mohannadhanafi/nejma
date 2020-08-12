import React, { useState } from "react";

import Video from "components/Video";
import "./index.scss";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

const ProfileVideos = (props) => {
  const { t } = useTranslation();
  const { setReviewed, setSeen } = props;
  const isEmpty = !!props.shoutouts.length
    ? "profile--videos-shout"
    : "no--videoes";
  return (
    <div className={`  ${isEmpty}`}>
      {props.shoutouts.length > 0 ? (
        props.shoutouts.map((shoutout, index) => {
          const {
            requestStatus,
            talent,
            videoUrl,
            reviewed,
            seen,
            id: requestId,
          } = shoutout;
          const { nameAr, nameEng: nameEn, category, picUrl } = talent;
          const { categoryName, categoryNameAr } = category;
          const { status } = requestStatus;
          return (
            <Video
              key={index}
              status={status}
              nameAr={nameAr}
              nameEn={nameEn}
              picUrl={picUrl}
              videoUrl={videoUrl}
              requestId={requestId}
              categoryName={categoryName}
              categoryNameAr={categoryNameAr}
              rejectReason={shoutout.rejectReason}
              reviewed={reviewed}
              seen={seen}
              setSeen={setSeen}
              setReviewed={setReviewed}
            />
          );
        })
      ) : (
        <div className="no-video-container">
          <div>
            <img src={require("assets/icons/no-videos.svg")} />
          </div>
          <p>{t("customer.there-is-no-videos")}</p>
          <Link to={{ pathname: "/talents/all" }}>
            <span>{t("home.browse-celebrities")}</span>
          </Link>
        </div>
      )}
    </div>
  );
};

export default ProfileVideos;
