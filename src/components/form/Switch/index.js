import React from "react";
import "./index.scss";
import { Row } from "antd";
export default function Switch(props) {
  const {
    onClick,
    onChange,
    options = [],
    className = "",
    selected = 0,
    percent,
    noForm,
    ...rest
  } = props;
  return (
    noForm ? (
      <div className="switch-options-container switch-options-container--profile--switch">
      <div className="switch--second--container switch--second--container--profile--switch">
        {options.map((option) => (
          <div
            key={option.id}
            className={`${className} switch ${
              selected === option.id && "selected"
            }`}
            type="submit"
            onClick={() => onChange(option)}
          >
            {option.value} {percent ? "%" : null}
          </div>
        ))}
      </div>
    </div>
    ) : (
    <div {...rest} className={`form-input ${className}`}>
      <label className="form-label">{props.label}</label>
      <div className="switch-options-container">
        <div className="switch--second--container">
          {options.map((option) => (
            <div
              key={option.id}
              className={`${className} switch ${
                selected === option.id && "selected"
              }`}
              type="submit"
              onClick={() => onChange(option)}
            >
              {option.value} {percent ? "%" : null}
            </div>
          ))}
        </div>
      </div>
    </div>
    )
  );
}
