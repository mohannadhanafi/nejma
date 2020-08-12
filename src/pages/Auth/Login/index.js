import React, { useEffect, useState } from "react";
import { Row, Form, notification } from "antd";
import { Form as _Form } from "../../../components";
import { useTranslation } from "react-i18next";
import { Auth } from "aws-amplify";
import { Form as FormComponent } from "../../../components";
import facebookIcon from "../../../assets/icon-facebook.png";
import googleIcon from "../../../assets/icon-google.png";
import { SET_USER } from "../../../_constants";
import { API_CALL } from "../../../store/constants";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { FormProvider } from "antd/lib/form/context";
import Modal from "antd/lib/modal/Modal";
import "./index.scss";

const { Input, Button, Divider } = FormComponent;

export default function LoginPage(props) {
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch();
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => window.scrollTo(0, 0), []); // scroll for first render.

  const onFinish = ({ username: email, password }) => {
    setIsLoading(true);
    const onSuccess = ({ data }) => {
      setIsLoading(false);
      localStorage.setItem("token", data.token);

      Auth.signIn(email, password).catch(
        (error) =>
          error.code === "UserNotConfirmedException" &&
          notification.info({
            message: t("requests-errors.not-verified-user"),
          })
      );

      if (data.email_verified) history.push("/profile");
      else history.push("/aws/verify-email");

      return {
        type: SET_USER,
        payload: { ...data },
      };
    };
    const onFailure = (error) => {
      setIsLoading(false);
      notification.error({
        message: <span>{error.response.data.msg}</span>,
      });
    };

    dispatch({
      type: API_CALL,
      payload: {
        method: "post",
        url: "/auth/login",
        data: { email, password },
        onSuccess,
        onFailure,
      },
    });
  };

  const pushToSignUp = () => history.push("/register/customer");

  const handleModalOk = async (values) => {
    try {
      await Auth.forgotPassword(values.email);
      notification.info({
        message:
          i18n.language === "en"
            ? "check your email for reset password code"
            : "الرجاء التحقق من الإيميل للحصول على كود إسترجاع كلمة المرور",
      });
      history.push({ pathname: "/forget-password" });
    } catch (error) {
      if (error.code === "UserNotFoundException") {
        notification.error({
          message: (
            <span
              style={{
                fontFamily: i18n.language === "en" ? "Montserrat" : "Cairo",
              }}
            >
              {i18n.language === "ar"
                ? "لا يوجد حساب مرتبط بهذا الايميل"
                : "User  not found check your email"}
            </span>
          ),
        });
      } else if (error.code === "InvalidParameterException") {
        notification.error({
          message: (
            <span
              style={{
                fontFamily: i18n.language === "en" ? "Montserrat" : "Cairo",
              }}
            >
              {i18n.language === "ar"
                ? " هذا الحساب غير مفعل  "
                : "User is not verified"}
            </span>
          ),
        });
      } else notification.error({ message: "internal error" });
    }
  };
  const handleModalCancel = () => setShowModal(false);

  return (
    <FormProvider>
      <Modal
        title={t("forget-password.title")}
        visible={showModal}
        onOk={handleModalOk}
        onCancel={handleModalCancel}
        okButtonProps={{ className: "form-submit-btn main-btn" }}
        footer={false}
        style={{ fontFamily: i18n.language === "en" ? "Montserrat" : "Cairo" }}
      >
        <Form onFinish={handleModalOk}>
          <Form.Item
            name="email"
            rules={[
              {
                required: true,
                message: t("emailRquired"),
              },
              {
                type: "email",
                message: t("emailNotValid"),
              },
            ]}
          >
            <Input
              placeholder={t("forget-password.emailPlaceholder")}
              label={t("forget-password.email")}
            />
          </Form.Item>
          <Button className="main-btn"> {t("forget-password.submit")}</Button>
        </Form>
      </Modal>
      <Row>
        <main className="login-wrapper">
          <h1 className="login-title">{t("login.header")}</h1>
          <section className="login-section">
            <div className="form-section-wrapper">
              <Form className="login-form" id="login-form" onFinish={onFinish}>
                <Form.Item
                  name="username"
                  rules={[
                    {
                      required: true,
                      message: t("emailRquired"),
                    },
                    {
                      type: "email",
                      message: t("emailNotValid"),
                    },
                  ]}
                >
                  <Input
                    placeholder={t("login.emailPlaceholder")}
                    label={t("login.email") + ":"}
                  />
                </Form.Item>
                <Form.Item
                  name="password"
                  rules={[{ required: true, message: t("passwordRquired") }]}
                >
                  <Input
                    label={t("login.password") + ":"}
                    placeholder={t("login.passwordPlaceholder")}
                    type="password"
                    showForgetPassword={false}
                  />
                </Form.Item>
                <span
                  style={{ cursor: "pointer" }}
                  onClick={() => setShowModal(true)}
                >
                  {t("login.forgetPassword")}
                </span>

                <Button
                  isloading={isLoading}
                  className="main-btn form-submit-btn"
                  type="submit"
                  style={{ margin: "25px 0" }}
                >
                  {t("login.submit")}
                </Button>

                <Divider value={t("login.or")} />
                <Row justify="space-between">
                  <Button className="social-media-btn social-media-btn-facebook">
                    <img
                      src={facebookIcon}
                      style={{ marginLeft: i18n.language === "ar" && 10 }}
                    />
                    {t("login.facebook")}
                  </Button>
                  <Button className="social-media-btn social-media-btn-google">
                    <img
                      src={googleIcon}
                      style={{ marginLeft: i18n.language === "ar" && 10 }}
                    />
                    {t("login.google")}
                  </Button>
                </Row>
              </Form>
              <Row className="login-form-get-account">
                <h3 style={{ textAlign: "center" }} onClick={pushToSignUp}>
                  {t("login.signup")}
                  <span style={{ marginLeft: 0 }}>{t("login.here")}</span>
                </h3>
              </Row>
            </div>
          </section>
        </main>
      </Row>
    </FormProvider>
  );
}
