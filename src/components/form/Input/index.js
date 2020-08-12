import React from "react";
import { useTranslation } from "react-i18next";
import { InputNumber, Input as InputAnt } from "antd";
import "./index.scss";

export default function Input(props) {
  const { t, i18n } = useTranslation();
  const { label, onChange, value, type, showForgetPassword, ...rest } = props;
  return (
    <div className="form-input">
      {label && (
        <>
          <label
            className="form-label"
            style={{
              textAlign: i18n.language === "en" ? "left" : "right",
              display: "block",
            }}
            htmlFor="name"
          >
            {label}
          </label>
        </>
      )}
      {type === "number" ? (
        <InputNumber
          value={value}
          name={props.name}
          className="form-field"
          min="0"
          type={"number"}
          onChange={onChange}
          {...rest}
        />
      ) : type === "password" ? (
        <InputAnt.Password
          value={value}
          type={type || "text"}
          name={props.name}
          onChange={onChange}
          {...rest}
          className={`form-field ${rest.className}`}
        />
      ) : (
        <InputAnt
          value={value}
          className="form-field"
          type={type || "text"}
          name={props.name}
          onChange={onChange}
          {...rest}
        />
      )}
      {type === "password" && showForgetPassword && (
        <span
          onClick={props.handleForgetPassword}
          className={`input-filed-forget-password ${
            i18n.language === "ar" ? "left-forget-password" : ""
          }`}
        >
          {t("login.forgetPassword")}
        </span>
      )}
    </div>
  );
}
