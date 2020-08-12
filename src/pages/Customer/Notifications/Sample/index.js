import React from "react";
import moment from 'moment';
import "./index.scss";
import defaultNotification from '../../../../assets/icons/defaultnotification.svg'
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function NotificationUnit({ data }) {
  const { i18n } = useTranslation()
  const { data: notificationData, type } = data;
  const finalData = JSON.parse(notificationData);
  return (
    <Link to={`${type === 2 ? '#' : type === 3 ? '/talents/all' : '/profile'}`} className="notifi-card-wrapper">
      {type === 3 || type === 6 ? (
      <div
        className={`avatar ${i18n.language === 'ar' ? 'avatar-ar' : ''}`}
        style={{ backgroundImage: `url(${finalData.image})` }}
      />
      ) : <img src={defaultNotification} className={`avatar ${i18n.language === 'ar' ? 'avatar-ar' : ''}`} style={{ padding: 10 }}></img>}
      <div className="notifi-data">
        <div className={`left-side left-side-notifi ${i18n.language === 'ar' ? 'left-side-notifi-ar' : ''}`}>
          <div className="top-data">
            <h4>{finalData.name
            ? finalData.name
            : type === 4
            ? 'We are sorry'
            : `${finalData.code} ${finalData.ratio * 100}% off`
          }</h4>
            <div>{moment(finalData.createdAt).fromNow()}</div>
          </div>
          <h5>{type === 3
          ? 'Just joined Nejma!'
          : type === 2
          ? `Only ${moment(finalData.expiryDate).fromNow()} ${finalData.ratio * 100}% off on your next video shoutout.`
          : type === 4 ? `${finalData.name} couldn't deliver a Video at this time`
          : type === 5 ? `${finalData.name} accepted your request`
          : type === 6 ? `${finalData.name} requested a video from you`
          : null
         }</h5>
        </div>
      </div>
    </Link>
  );
}
