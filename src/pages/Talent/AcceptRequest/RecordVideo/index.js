import React, { useEffect, useRef, useState } from "react";
import "./index.scss";
import { Row, Col } from "antd";
import askPremissions from "./askPermissions";
import videoConfig from "./config";

export default function RecordVideo(props) {
  const videoRef = useRef();
  const recorderContainerRef = useRef();
  const [isRecording, setIsRecording] = useState(false);
  const [mediaRecorder, setMediaRecorder] = useState();
  const [counter, setCounter] = useState(0);
  let cleanupTimer = null;

  useEffect(() => {
    askPremissions();
    navigator.mediaDevices
      .getUserMedia(videoConfig)
      .then(function (mediaStreamObj) {
        let video = videoRef.current;
        video.muted = true;
        let chunks = [];

        if ("srcObject" in video) video.srcObject = mediaStreamObj;
        else video.src = window.URL.createObjectURL(mediaStreamObj);
        const _mediaRecorder = new MediaRecorder(mediaStreamObj);
        setMediaRecorder(_mediaRecorder);

        _mediaRecorder.ondataavailable = (e) => chunks.push(e.data);
        video.onloadedmetadata = () => video.play();

        _mediaRecorder.onstop = (ev) => {
          let blob = new Blob(chunks, { type: "video/mp4;" });
          chunks = [];

          closeMediaDevices(_mediaRecorder);
          console.log(blob);
          props.onFinish(blob);
          props.onClose();
        };
      })
      .catch(function (err) {
        console.log(err.name, err.message);
      });
  }, []);

  const closeMediaDevices = (mediaRecorder) =>
    mediaRecorder.stream.getTracks().forEach(function (track) {
      track.stop();
    });

  const startRecording = () => {
    setCounter(0);
    setIsRecording(true);
    cleanupTimer = setInterval(() => setCounter(counter + 1), 1000);

    mediaRecorder.start();
  };
  const stopRecording = () => {
    setIsRecording(false);
    clearInterval(cleanupTimer);
    mediaRecorder.stop();
  };

  const closeRecorder = (e) => {
    if (e.target === recorderContainerRef.current) {
      closeMediaDevices(mediaRecorder);
      props.onClose();
    }
  };

  return (
    <Row
      className="video-record-container"
      ref={recorderContainerRef}
      style={{ display: props.visible ? "flex" : "none" }}
      onClick={closeRecorder}
    >
      <Row className="video-record-section">
        <video ref={videoRef} className="video-recorder" />
        {isRecording ? (
          <Row className={"recording-controller"}>
            <span>{counter} s</span>
            <span className={"stop-btn-container"} onClick={stopRecording}>
              <span className={"stop-btn"}> </span>
            </span>
          </Row>
        ) : (
          <Row className={"paused-controller"}>
            <span onClick={startRecording} className={"record-btn"}></span>
          </Row>
        )}
      </Row>
    </Row>
  );
}
