import React from "react";
import RequestCard from "../RequestCard";
import "./index.scss";
import { useTranslation } from "react-i18next";

export default function RequestsSection(props) {
  const { requests } = props;
  const { t } = useTranslation();

  return (
    <div className='requests-wrapper'>
      {requests.length > 0 ? (
        <div className='requests'>
          {requests.map((request, index) => (
            <RequestCard
              request={request}
              key={index}
              handleRejectRequest={props.handleRejectRequest}
            />
          ))}
        </div>
      ) : (
          <div className="no-requests">
            <p> {t("talent.no-requests")}</p>
          </div>
        )}
    </div>
  );
}
