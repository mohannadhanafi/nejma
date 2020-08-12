import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import SocialReactButton from "components/TalentProfile/ReactButton";
import RejectRequest from "../RejectRequest";
import "./index.scss";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { API_CALL } from "../../../../store/constants";
import { notification } from "antd";

export default function RequestCard({ request, ...props }) {
  const [showRejectRequest, setShowRejectRequest] = useState(false);
  const [readyToUpload, setReadyToUpload] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch();
  const history = useHistory();

  const openRejectModal = () => setShowRejectRequest(true);
  const closeRejectModal = () => setShowRejectRequest(false);

  const handleUploadVideo = () =>
    history.push({
      pathname: "/accept-request/" + request.id,
      state: {
        accepted: request.requestStatus.status !== "Submitted",
      },
    });

  const handleRejectRequest = (requestId) => {
    props.handleRejectRequest(requestId);
    setShowRejectRequest(false);
  };

  return (
    <div className="request-card">
      {showRejectRequest && (
        <RejectRequest
          visible={showRejectRequest}
          requestId={request?.id}
          handleRejectRequest={handleRejectRequest}
          onClose={closeRejectModal}
          isLoading={isLoading}
        />
      )}
      <div className="data-side">
        <div className="request-description">
          <div
            className={`avatar ${i18n.language === "ar" ? "avatar-ar" : ""}`}
            style={{
              background: request.customer
                ? `url(${request.customer.picUrl})`
                : "#08091e",
            }}
          />
          <div className="">
            <h4>{request?.customer?.name}</h4>
            <h5>{t("request.send")}</h5>
          </div>
        </div>
        {request.requestStatus.status === "Submitted" && !readyToUpload ? (
          <div className="btns-wrapper">
            <SocialReactButton
              onClick={openRejectModal}
              icon={require("assets/icons/letter-x.svg")}
              label={t("request.reject")}
            />
            <SocialReactButton
              onClick={handleUploadVideo}
              icon={require("assets/icons/tick.svg")}
              label={t("request.review")}
              isLoading={isLoading ? "true" : undefined}
            />
          </div>
        ) : (
          <div className="btns-wrapper">
            <SocialReactButton
              className={"upload-video-btn"}
              onClick={handleUploadVideo}
              icon={require("assets/icons/record.svg")}
              label={t("request.upload")}
            />
          </div>
        )}
      </div>

      <div className="middle-line"></div>

      <div className="time-side">
        <span className="days-number">{request.remainingTime || 1}</span>
        <span className="days"> {t("request.respond")}</span>
      </div>
    </div>
  );
}
