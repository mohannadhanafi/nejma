import React from "react";
import "./index.scss";
import TopTitle from "./TopTitle";
import { useLocation } from "react-router-dom";

export default function BookingWrapper(props) {
  const { className = "" } = props;
  const { state: talent } = useLocation();
  console.log(props);
  return (
    <div className="booking-wrapper">
      <div className="booking-container">
        <TopTitle
          title={props?.title}
          description={props.description}
          name={props.name}
          talent={talent}
        />
        <div className="pink-background"></div>
        <div className="container">
          <div className={`form-feild form-section-wrapper-book ${className}`}>
            {props.children}
          </div>
        </div>
      </div>
    </div>
  );
}
