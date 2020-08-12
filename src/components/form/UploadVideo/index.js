import React, { useRef, useEffect, useState } from "react";
import cameraIcon from "assets/camera.svg";
import { useTranslation } from "react-i18next";
import "./index.scss";
import { useSelector } from "react-redux";
import { selectUser } from "store/selectors";
import VideoPlayer from "../../VideoPlayer";

export default function UploadPhoto(props) {
  const videoFile = useRef();
  const { t } = useTranslation();
  const [src, setSrc] = useState();
  const [showVideoPlayer, setShowVideoPlayer] = useState(false);
  const user = useSelector(selectUser);

  const onClick = () => {
    videoFile.current.click();
  };

  useEffect(() => {
    videoFile.current.addEventListener("change", (event) => {
      const video = videoFile.current;
      if (!video.files.length) return;

      setSrc(URL.createObjectURL(video.files[0]));
      props.onChange(null, video);
    });
  }, []);

  useEffect(() => {
    if (!src && props.value) setSrc(props.value);
  }, [props.value]);

  const closeVideoPlayer = () => setShowVideoPlayer(false);
  const openVideoPlayer = () => setShowVideoPlayer(true);

  return (
    <div
      {...props}
      className={`nejma-upload-photo-container ${props.className}`}
    >
      <label className="form-label">{t("video")}</label>
      <br />
      <div
        className="nejma-uplod-video-container"
        onClick={src ? () => "" : onClick}
      >
        <div className="nejma-upload-video">
          {src && (
            <div className={"uploaded-container"}>
              <img
                src={require("assets/video-player/play.svg")}
                onClick={openVideoPlayer}
              />
              <img src={cameraIcon} onClick={onClick} width={"50px"} />
              {showVideoPlayer && (
                <VideoPlayer
                  src={src}
                  preview={true}
                  handleClose={closeVideoPlayer}
                />
              )}
            </div>
          )}
          {!src && <img src={cameraIcon} alt="upload photo" alt="icon" />}
          <input
            type="file"
            name="myfile"
            style={{ display: "none" }}
            ref={videoFile}
            accept="video/mp4,video/x-m4v,video/*"
          />
          {!src && t("uploadVideo")}
        </div>
        <div className="video-label">
          <p>{t("uploadVideoP")}</p>
        </div>
      </div>
    </div>
  );
}
