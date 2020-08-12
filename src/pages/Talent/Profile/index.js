import React, { useState, useEffect } from "react";
import "./index.scss";
import KalidImg from "../../../assets/image12@2x.png";
import Shotouts from "pages/Guest/TalentProfile/Shoutouts";
import ProfileVideos from "./Shoutouts";
import RequestsSection from "./Requests";
import EditImg from "assets/icons/pen.svg";
import { Form as FormComponent } from "components";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { selectUser } from "store/selectors";

import { useDispatch } from "react-redux";
import { API_CALL } from "store/constants";
import { notification } from "antd";
import Loading from "components/Loading";
import { Link } from "react-router-dom";

const { Switch } = FormComponent;

export default function Profile() {
  const { t, i18n } = useTranslation();
  const user = useSelector(selectUser);
  const handleselectedSwitch = ({ id }) => setselectedSwitch(id);
  const dispatch = useDispatch();
  const [selectedSwitch, setselectedSwitch] = useState(1);
  const [requests, setRequests] = useState([]);
  const [shoutouts, setShoutouts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleRejectRequest = (requestId) =>
    setRequests(requests.filter((request) => request.id !== requestId));

  // get requests
  useEffect(() => {
    setIsLoading(true);
    const onSuccess = ({ data }) => {
      setIsLoading(false);
      setRequests(data);
    };
    const onFailure = (error) => {
      setIsLoading(false);
      console.log(error.msg || "error");
      // notification.error({ message: error.msg || 'Error' });
    };

    dispatch({
      type: API_CALL,
      payload: {
        onSuccess,
        onFailure,
        url: "/talent/profile/newrequests",
        method: "GET",
      },
    });
  }, []);

  // get shoutouts
  useEffect(() => {
    setIsLoading(true);
    const onSuccess = ({ data }) => {
      setIsLoading(false);

      setShoutouts(data);
    };
    const onFailure = (error) => {
      setIsLoading(false);
      console.log(error.msg || "error");
      // notification.error({ message: error.msg || 'Error' });
    };

    dispatch({
      type: API_CALL,
      payload: {
        onSuccess,
        onFailure,
        url: "/talent/profile/shoutouts",
        method: "GET",
      },
    });
  }, []);

  if (isLoading) return <Loading />;
  return (
    <div className="talent-profile-w container">
      <div className="body-wrapper">
        <Link to="/profile/edit">
          <div
            className="edit-btn"
            className={`${i18n.language === "ar" ? "edit-btn ar" : "edit-btn"}`}
          >
            <img src={EditImg} />
            <h5>{t("edit")}</h5>
          </div>
        </Link>
        <div className="banner"></div>
        <div
          className={`${
            i18n.language === "ar"
              ? "content-wrapper content-wrapper-ar"
              : "content-wrapper"
          }`}
        >
          <div className={`img-wrapper`}>
            {user.pic_url ? (
              <img
                src={user.pic_url}
                className={`${
                  i18n.language === "ar" ? "talent-img ar" : "talent-img"
                }`}
              />
            ) : null}
            <div className="talent-description">
              <h3>
                {" "}
                {i18n.language === "ar"
                  ? user?.name_ar || "خالد العامري"
                  : user?.name_eng || "Khalid Al Ameri"}
              </h3>
              <h4></h4>
              <h4>
                {i18n.language === "ar"
                  ? user?.name_ar || "مؤثر"
                  : user?.name_eng || "Influencer"}
              </h4>
            </div>
            <div className="switch--container switch--container--talent">
              <Switch
                selected={selectedSwitch}
                onChange={handleselectedSwitch}
                noForm
                className="profile--switch"
                options={[
                  {
                    id: 1,
                    value: t("NewRequest"),
                  },
                  {
                    id: 2,
                    value: t("Shoutouts"),
                  },
                ]}
              />
            </div>
          </div>
          <div className="down-content-wrapper">
            {selectedSwitch === 2 && <ProfileVideos shoutouts={shoutouts} />}
            {selectedSwitch === 1 && (
              <RequestsSection
                requests={requests}
                handleRejectRequest={handleRejectRequest}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
