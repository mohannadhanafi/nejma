import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import "./index.scss";
import { Form, notification } from "antd";
import { useTranslation } from "react-i18next";
import { Form as _Form } from "components";
import { SET_USER } from "_constants";
import { Auth } from "aws-amplify";
import { useDispatch, useSelector } from "react-redux";
import { API_CALL } from "store/constants";
import { selectUser } from "store/selectors";

const { Input, Button } = _Form;

export default function AWSVerifyEmail(props) {
  window.scrollTo(0, 0);
  const [error, setError] = useState();
  const [isLoading, setIsLoading] = useState();
  const user = useSelector(selectUser);
  const history = useHistory();
  const dispatch = useDispatch();
  const { t } = useTranslation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleConfirm = ({ code }) => {
    setIsLoading(true);
    const onSuccess = (response) => {
      setIsLoading(false);
      let newUser = {};
      if (response.data.code === "NotAuthorizedException") {
        const { token, ...userData } = response.data.newUser;
        newUser = { ...userData };
        localStorage.setItem("token", token);
        notification.info({ message: "the account is already verified" });
      } else {
        newUser = { ...response.data };
        localStorage.setItem("token", response.data.token);
      }
      if (user.role === "talent") {
        history.push({
          pathname: "/talent/verify-message",
          state: { waitApprove: true },
        });
        // window.location.reload();
        return {
          type: SET_USER,
          payload: { ...newUser, email_verified: true },
        };
      }
      history.push("/profile/edit");
      window.location.reload();
      // return { type: SET_USER, payload: { ...newUser, email_verified: true } };
    };

    const onFailure = (error) => {
      setIsLoading(false);
      notification.error({ message: error.response?.data?.msg || "Error" });
    };

    dispatch({
      type: API_CALL,
      payload: {
        method: "post",
        data: { code },
        onSuccess,
        onFailure,
        url: "/auth/verify-user",
      },
    });
  };

  const resendVerificationCode = async () => {
    await Auth.resendSignUp(user.email);
  };

  return (
    <main className="verify-wrapper ">
      <section className="verify-section">
        <div className="verify-email-card-section-wrapper">
          <div className="content--container">
            <h1>{t("verify-email.title")}</h1>
            <Form
              className="verify-form"
              id="verify-form"
              onFinish={handleConfirm}
            >
              <Form.Item
                name="code"
                rules={[
                  {
                    required: true,
                    message: t("verify-email.codeValidation"),
                  },
                ]}
              >
                <Input placeholder={t("verify-email.codePlaceholder")} />
              </Form.Item>

              {error && (
                <span
                  style={{
                    textAlign: "center",
                    color: "red",
                  }}
                >
                  {error}
                </span>
              )}

              <Button
                className="main-btn form-submit-btn verify-btn"
                type="submit"
                style={{ marginTop: 90 }}
                isloading={isLoading ? true : false}
              >
                {t("verify-email.submit")}
              </Button>
              <span
                className="verify-email-footer-link"
                onClick={resendVerificationCode}
              >
                {t("verify-email.re-send")}
              </span>
            </Form>
          </div>
        </div>
      </section>
    </main>
  );
}
