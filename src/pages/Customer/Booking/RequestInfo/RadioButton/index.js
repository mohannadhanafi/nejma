import React, { useState } from "react";
import NotCheckIcon from "assets/check-mark-button.svg";
import CheckIcon from "assets/Path.svg";
import "./index.scss";

export default function RadioButton({ label, checked, handleClick }) {
  const checkStyle = checked ? "radio-button radio-checked" : "radio-button";
  return (
    <div className="radio-btn-wrapper btn-margin-bottom">
      <div className={checkStyle} onClick={handleClick}>
        {checked && <img src={CheckIcon} />}
      </div>
      <h5>{label}</h5>
    </div>
  );
}
