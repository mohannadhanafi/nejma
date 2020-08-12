import React from "react";
import "./index.scss";
export default function Radio(props) {
  const {
    onClick,
    onChange,
    options = [],
    className = "",
    selected = 0,
    ...rest
  } = props;

  return (
    <div {...rest} className={`form-input ${className}`}>
      <label className="form-label">{props.label}</label>
      <div className="radio-btn-options-container">
        {options.map((option) => (
          <div
            key={option.id}
            className={`form-submit-btn ${className} radio-btn ${
              selected === option.id && "selected"
            }`}
            type="submit"
            onClick={() => onChange(option)}
          >
            {option.value}
          </div>
        ))}
      </div>
    </div>
  );
}
