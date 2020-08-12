import React from "react";
import "./index.scss";

export default function Checkbox(props) {
  const {
    onClick,
    onChange,
    options = [],
    className = "",
    selected = [],
    ...rest
  } = props;

  return (
    <div {...rest} className={`form-input ${className}`}>
      {props.label && (
        <>
          <br />
          <label className="form-label">{props.label}</label>
        </>
      )}
      <div className="checkbox-options-container">
        {options.map((option) => (
          <div
            key={option.id}
            className={`form-submit-btn ${className} checkbox ${
              selected.includes(option.id) && "selected"
            }`}
            type="submit"
            onClick={() => onChange(option)}
          >
            {option.value || option.languageName}
          </div>
        ))}
      </div>
    </div>
  );
}
