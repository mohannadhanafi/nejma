import React, { useState, useCallback } from "react";
import Cropper from "react-easy-crop";
import { Row, Col, Slider } from "antd";
import getCroppedImg from "./cropImage";
import Button from "../form/Button";
import "./index.scss";
import { useTranslation } from "react-i18next";

export default function CropPhoto(props) {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [isLoading, setIsLoading] = useState(false);
  const [zoom, setZoom] = useState(100);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const { t } = useTranslation();

  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const showCroppedImage = async (event) => {
    setIsLoading(true);
    event.preventDefault();
    try {
      const croppedImage = await getCroppedImg(
        props.imageSrc,
        croppedAreaPixels,
        0,
        460
      );
      props.getCropped(croppedImage);
      setIsLoading(false);
    } catch (e) {
      setIsLoading(false);
    }
  };
  if (!props.visible) return null;
  return (
    <Row className="crop-photo-container">
      <Row className={`crop-photo-section ${props.className}`}>
        <Col offset={22}>
          <img
            style={{ cursor: "pointer" }}
            className="close-btn"
            src={require("assets/icons/close.svg")}
            onClick={props.onClose}
            width={"25px"}
          />
        </Col>
        <Col span={24} className={`recorder-container`}>
          <Cropper
            image={props.imageSrc}
            crop={crop}
            zoom={zoom / 100}
            aspect={props.ratio}
            onCropChange={setCrop}
            onCropComplete={onCropComplete}
            onZoomChange={setZoom}
          />
        </Col>
        <Col span={20} offset={2}>
          <Slider
            min={100}
            max={200}
            value={zoom}
            onChange={(value) => setZoom(value)}
          />
        </Col>
        <Col span={20} offset={2}>
          <Button
            isloading={isLoading ? true : false}
            className="main-btn"
            onClick={showCroppedImage}
          >
            {t("crop-photo.crop")}
          </Button>
        </Col>
      </Row>
    </Row>
  );
}
