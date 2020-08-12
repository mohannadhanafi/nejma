import React, { useEffect, useState } from "react";
import "./index.scss";
import HeroSection from "./HeroSection";
import TalentSection from "./TalentSection";
import HowItWork from "./HowItWorkSection";
import MobileSection from "./MobileSection";
import { useDispatch } from "react-redux";
import { API_CALL } from "../../../store/constants";

export default function Home(props) {
  const [bestTalents, setBestTalents] = useState([]);
  const dispatch = useDispatch();
  useEffect(() => {
    window.scrollTo(0, 0);
    const onSuccess = ({ data }) => setBestTalents(data);
    const onFailure = console.log;
    dispatch({
      type: API_CALL,
      payload: {
        onSuccess,
        onFailure,
        url: "/talent/top4",
        method: "GET",
      },
    });
  }, []);
  return (
    <div className="home-page ">
      <HeroSection />
      <TalentSection talents={bestTalents} />
      <HowItWork />
      <MobileSection />
    </div>
  );
}
