import React, { useState, useEffect } from "react";

import { useTranslation } from "react-i18next";
import { useParams, useHistory } from "react-router-dom";

import TalentDetails from "./TalentDetails";
import GeneralInfo from "./GeneralInfo";
import About from "./About";
import Shoutouts from "./Shoutouts";
// import CharityLogo from "../../../assets/Dubai.jpg";
import CharityLogo from "../../../assets/Asset1.svg";
import "./index.scss";
import { Loading, Form } from "components";
import { useDispatch, useSelector } from "react-redux";
import { API_CALL } from "store/constants";
import { selectUser } from "store/selectors";
const { Button } = Form;

export default function TalentProfile() {
  const { t, i18n } = useTranslation();
  const { id } = useParams();
  const [talentDetails, setTalentDetails] = useState({});
  const { push } = useHistory();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const user = useSelector(selectUser);

  useEffect(() => {
    const onSuccess = (response) => {
      setIsLoading(false);
      setTalentDetails(response.data);
    };
    const onFailure = (err) => {
      setIsLoading(false);
    };

    dispatch({
      type: API_CALL,
      payload: {
        method: "GET",
        url: "talent/overview/" + id,
        onSuccess,
        onFailure,
      },
    });
    return () => {};
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const moveToBooking = () => {
    if (!user.id) return push("/login");
    push({
      pathname: `/booking/${talentDetails.nameEng}/${talentDetails.id}`,
      state: { ...talentDetails, step: 0 },
    });
  };

  const handleArabic = (className) => {
    let formatted = className;
    if (i18n.language === "ar") formatted = `${className} ar`;
    return formatted;
  };

  if (isLoading) return <Loading />;

  return (
    <main className="container">
      <div className="talent-profile-wrapper">
        <TalentDetails
          talent={talentDetails}
          moveToBooking={moveToBooking}
          user={user}
          talentDetails={talentDetails}
        />

        <div className="talent-details-down-wrapper">
          <GeneralInfo talent={talentDetails} />
          {/* <About talent={talentDetails} /> */}
          <Shoutouts shoutouts={talentDetails} talent={talentDetails} />
          <Button className="book-btn-mobile" onClick={moveToBooking}>
            {t("talent-profile-customer-perspective.book") +
              (talentDetails.initPrice +
                talentDetails.initPrice * talentDetails.companyRatio) +
              "$"}
          </Button>
        </div>
      </div>
    </main>
  );
}
