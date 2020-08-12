import React, { useState, useEffect } from "react";
import "./index.scss";
import KalidImg from "../../../assets/image12@2x.png";
import EditImg from "assets/icons/pen.svg";
import { Form as FormComponent } from "components";
import { useTranslation } from "react-i18next";
import ProfileVideos from "./ProfileVideos";
import ProfileFavorites from "./ProfileFavorites";
import Loading from "components/Loading";
import { useDispatch } from "react-redux";
import { API_CALL } from "store/constants";
import { notification } from "antd";
import { useSelector } from "react-redux";
import { selectUser } from "store/selectors";
import { Link } from "react-router-dom";

const { Switch } = FormComponent;

export default function Profile(props) {
  const handleselectedSwitch = ({ id }) => setselectedSwitch(id);
  const user = useSelector(selectUser);

  const [shoutouts, setShoutouts] = useState([]);
  const { t, i18n } = useTranslation();
  const [selectedSwitch, setselectedSwitch] = useState(1);
  const [favorites, setFavorites] = useState([]);
  const [isLoading, setisLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    setisLoading(true);

    const onSuccess = (response) => {
      setFavorites(response.data);
      setisLoading(false);
    };

    const onFailure = (error) => {
      setisLoading(false);
      console.log(error.msg || "Error");
      // notification.error({ message: error.msg || 'Error' });
    };

    dispatch({
      type: API_CALL,
      payload: {
        onSuccess,
        onFailure,
        url: "/customer/likes",
        method: "GET",
      },
    });

    return () => {};
  }, []);

  // Shoutouts
  useEffect(() => {
    setisLoading(true);
    const onSuccess = (response) => {
      setShoutouts(response.data);
    };
    const onFailure = (error) => {
      setisLoading(false);
      notification.error({ message: error.response?.data?.msg || "Error" });
    };

    dispatch({
      type: API_CALL,
      payload: {
        onSuccess,
        onFailure,
        url: "/customer/shoutouts",
        method: "GET",
      },
    });

    return () => {};
  }, []);
  useEffect(() => window.scrollTo(0, 0), []);
  const setShoutoutReviewed = (id) => {
    const newShoutouts = shoutouts.map((shoutout) => {
      if (shoutout.id === id) return { ...shoutout, reviewed: true };
      return shoutout;
    });
    setShoutouts(newShoutouts);
  };

  const setShoutoutSeen = (id) => {
    const newShoutouts = shoutouts.map((shoutout) => {
      if (shoutout.id === id) return { ...shoutout, seen: true };
      return shoutout;
    });
    setShoutouts(newShoutouts);
  };
  if (isLoading) return <Loading />;

  return (
    <div className="customer-profile-w container">
      <div className="body-wrapper">
        <div className="banner">
          <Link to="/profile/edit">
            <div
              className="edit-btn"
              className={`${
                i18n.language === "ar" ? "edit-btn ar" : "edit-btn"
              }`}
            >
              <img src={EditImg} />
              <h5>{t("edit")}</h5>
            </div>
          </Link>
        </div>
        <div className="header-content-wrapper">
          <div className="img-wrapper">
            {user.pic_url && (
              <img
                src={user.pic_url}
                className={`${i18n.language === "ar" ? "customer-img-ar" : ""}`}
              />
            )}
            <div className="talent-description">
              <h3>{user.name}</h3>
            </div>
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
                  value: t("Shoutouts"),
                },
                {
                  id: 2,
                  value: t("Favorites"),
                },
              ]}
            />
          </div>
        </div>
        <div className={"videos-content-wrapper"}>
          {selectedSwitch === 1 && (
            <ProfileVideos
              shoutouts={shoutouts}
              setSeen={setShoutoutSeen}
              setReviewed={setShoutoutReviewed}
            />
          )}
          {selectedSwitch === 2 && <ProfileFavorites favorites={favorites} />}
        </div>
      </div>
    </div>
  );
}
