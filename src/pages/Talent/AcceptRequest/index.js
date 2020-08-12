import React, { useState, useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Form as FormComponents, VideoPlayer, Loading } from "components";
import RecordVideo from "./RecordVideo";
import "./index.scss";
import { useLocation, useHistory, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { API_CALL } from "store/constants";
import { notification } from "antd";

const { Button } = FormComponents;

export default function AcceptRequest(props) {
  const { t } = useTranslation();
  const { state } = useLocation();
  const [videoSrc, setVideoSrc] = useState("");
  const [viewVideo, setViewVideo] = useState(false);
  const { id: requestId } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [requestDetails, setRequestDetails] = useState();
  const [accepted, setAccepted] = useState(false);
  const [videoBlob, setVideoBlob] = useState();
  const [showRecordVideo, setShowRecordVideo] = useState(false);
  const [isBlob, setIsBlob] = useState(false);
  const history = useHistory();
  const dispatch = useDispatch();
  const videoRef = useRef();

  const onClose = () => setShowRecordVideo(false);
  const openSelectFile = () => {
    videoRef.current.click();
  };

  useEffect(() => {
    const onSuccess = ({ data }) => {
      const { requestStatus } = data;
      setRequestDetails(data);
      setAccepted(requestStatus.status !== "Submitted");
      setIsLoading(false);
    };

    const onFailure = (error) => {
      setIsLoading(false);
    };

    dispatch({
      type: API_CALL,
      payload: {
        method: "GET",
        url: "/request/details/" + requestId,
        onSuccess,
        onFailure,
      },
    });
  }, []);

  useEffect(() => {
    videoRef.current.addEventListener("change", (files) => {
      setVideoSrc(URL.createObjectURL(videoRef.current.files[0]));
      setIsBlob(false);
    });
    return () => {};
  }, [videoRef]);

  useEffect(() => {
    window.scrollTo(0, 0);
  });
  const handleAcceptRequest = async () => {
    setIsLoading(true);
    const onSuccess = (response) => {
      setIsLoading(false);
      setAccepted(true);
      notification.success({
        message: response.data?.msg || "Request Accepted",
        duration: 2
      });
    };

    const onFailure = (error) => {
      notification.error({ message: error.response?.data?.message || "Error" });
    };

    dispatch({
      type: API_CALL,
      payload: {
        url: "/request/accept",
        method: "POST",
        data: { id: requestId },
        onSuccess,
        onFailure,
      },
    });
  };
  const uploadVideo = () => {
    setIsLoading(true);
    const formData = new FormData();
    formData.append("video", videoRef.current.files[0]);
    formData.append("requestId", requestId);

    const onSuccess = (response) => {
      setIsLoading(false);
      window.location.href = "/profile";
    };
    const onFailure = (error) => {
      console.log(error);
    };
    dispatch({
      type: API_CALL,
      payload: {
        url: "/request/uploadvideo",
        method: "POST",
        data: formData,
        onSuccess,
        onFailure,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      },
    });
  };

  const closeVideoPlayer = () => setViewVideo(false);
  const openVideoPlayer = () => setViewVideo(true);
  const acceptRequest = () => {
    setIsLoading(true);
    const formData = new FormData();
    formData.append("video", blobToFile(videoBlob, "requestVideo.mp4"));
    formData.append("requestId", requestId);

    const onSuccess = (response) => {
      setIsLoading(false);
      window.location.href = "/profile";
    };

    const onFailure = (error) => {
      console.log(error);
    };

    dispatch({
      type: API_CALL,
      payload: {
        url: "/request/uploadvideo",
        method: "POST",
        data: formData,
        onSuccess,
        onFailure,
        headers: {
          "content-type": "multipart/form-data",
        },
      },
    });
  };

  const convertBlobToURL = (blob) => {
    setIsBlob(true);
    setVideoBlob(blob);
    setVideoSrc(window.URL.createObjectURL(blob));
  };
  const blobToFile = (theBlob, fileName) => {
    //A Blob() is almost a File() - it's just missing the two properties below which we will add
    return new File([theBlob], fileName, {
      type: "video/mp4",
      lastModified: Date.now(),
    });
  };

  console.log('requestDetails ', requestDetails);

  return (
    <main className="accept-request-wrapper">
      {isLoading && <Loading />}
      {showRecordVideo && (
        <RecordVideo
          visible={showRecordVideo}
          onClose={onClose}
          onFinish={convertBlobToURL}
        />
      )}
      {viewVideo && (
        <VideoPlayer
          src={videoSrc}
          handleClose={closeVideoPlayer}
          preview={true}
        />
      )}
      <h1 className="accept-request-title">{t("accept-request.title")}</h1>
      <section className="accept-request-section">
        <div className="card-section-wrapper">
          <div className="card-content">
            <div>
              <span>
                <span className="big">{t("accept-request.hi")} </span>{" "}
                {t("accept-request.my-name-is")}{" "}
                <span className="big underline">
                  {" "}
                  {requestDetails && requestDetails.myname}.
                </span>
              </span>
              <br />
              <span>
                {t("accept-request.this-video-is-for")}{" "}
                <span className="underline big">
                  {requestDetails && requestDetails.forMe
                    ? requestDetails && requestDetails.myname
                    : requestDetails && requestDetails.theirname}
                </span>
              </span>
            </div>

            <br />
            <br />

            <div>
              <span>
                {t("accept-request.i-would-like")}{" "}
                <span className="big underline">
                  {requestDetails && requestDetails.subtitles.length ? requestDetails.subtitles[0].language.languageName : "English"}
                </span>
              </span>
            </div>
            <br />
            <span>
              {t("accept-request.to-be-primary-language-in-the-video")}
            </span>
            <br />
            <br />
            <br />
            <span>{t("accept-request.my-instructions")}</span>
            <br />
            <span>{requestDetails && requestDetails.instructions}</span>
            <br />
            <br />

            <div style={{ display: accepted ? "block" : "none" }}>
              <Button onClick={() => setShowRecordVideo(true)}>
                <img src={require("assets/icons/record.svg")} />{" "}
                {t("accept-request.record")}
              </Button>
              <input
                type="file"
                ref={videoRef}
                style={{ display: "none" }}
                accept="video/*"
              />
              <Button onClick={openSelectFile}>
                <img src={require("assets/icons/down-arrow.svg")} />{" "}
                {t("accept-request.upload")}
              </Button>
              {videoSrc && (
                <Button onClick={openVideoPlayer}>
                  {t("accept-request.play")}
                </Button>
              )}
              {videoSrc && (
                <Button
                  isloading={isLoading}
                  onClick={isBlob ? acceptRequest : uploadVideo}
                >
                  {t("accept-request.submit")}
                </Button>
              )}
            </div>
            {!accepted && (
              <Button
                onClick={handleAcceptRequest}
                isloading={isLoading ? 1 : 0}
              >
                {t("accept-request.accept")}
              </Button>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
