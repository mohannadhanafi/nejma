import React from "react";
import { Row, Col } from "antd";
import { useTranslation } from "react-i18next";
import EmdeddedVideo from "./../../../../components/EmbeddedVideo/index";
import videoSrc from "../../../../assets/celeb3.png";
import Video from "components/Video";
import "./index.scss";
export default function Shotouts({
  shoutouts: { requests: shoutouts, picUrl },
}) {
  const { t } = useTranslation();
  return (
    <div className="talent-general-shotouts ">
      <h2 className="videos-title">
        {t("talent-profile-customer-perspective.public-shoutouts")}
      </h2>
      <div className="videos--public--container">
        {shoutouts ? (
          shoutouts.length === 0 ? (
            <h1 style={{ fontSize: 16, textAlign: "center" }}>
              {t("talent-profile-customer-perspective.no-public-shoutouts")}
            </h1>
          ) : (
            shoutouts.map((shoutout, index) => {
              const { videoUrl } = shoutout;
              return (
                <div key={index} className={"embedded-video-container"}>
                  <EmdeddedVideo
                    picUrl={picUrl}
                    videoUrl={videoUrl}
                    talentPage
                    className={"embedded-video-talent-profile"}
                    seen
                  />
                </div>
              );
            })
          )
        ) : null}
      </div>
    </div>
  );
}
