import React from "react";
import "./index.scss";
import YoutubeIcon from "assets/youtube.svg";
import RighIcon from "assets/co.svg";
import { Link } from "react-router-dom";

export default function NotificationsCard({ data, popup }) {
  const { data: notificationData } = data;
  const finalData = JSON.parse(notificationData);
  const popUpClass = !!popup ? 'notifi-main-card-wrapper pop-up-notifi-card' : 'notifi-main-card-wrapper'
  return (
    <Link to="/profile" className={popUpClass}>
      <div className="left-side">
        <img src={YoutubeIcon} className="left-img" />
        <div className="card-info">
          <h4>Your video is ready!</h4>
          <div>
            <span className="dark-font bold">{finalData.name}</span>
            <span className="gray-font">has sent you the video!</span>
          </div>
        </div>
      </div>

      <img src={RighIcon} className="right-img" />
    </Link>
  );
}
