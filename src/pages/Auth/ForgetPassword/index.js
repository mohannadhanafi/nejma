import React, { useEffect, useState } from "react";
import { useLocation, useHistory } from "react-router-dom";
import "./index.scss";
import { Form, notification } from "antd";
import { useTranslation } from "react-i18next";
import { Form as _Form } from "components";
import { Auth } from "aws-amplify";

import Modal from "antd/lib/modal/Modal";
import { useForm } from "antd/lib/form/util";

const { Input, Button } = _Form;

const selectUser = (state) => state.user;

export default function ForgetPassword(props) {
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [password, setPassword] = useState();
  const { t, i18n } = useTranslation();
  const [form] = useForm();
  const history = useHistory();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleVerify = async (values) => {
    const validationErrors = form
      .getFieldsError()
      .reduce((sum, field) => sum + field.errors.length, 0);

    if (validationErrors !== 0) return;
    setIsLoading(true);
    const { email, password, code } = form.getFieldsValue();
    try {
      const data = await Auth.forgotPasswordSubmit(email, code, password);
      setIsLoading(false);
      history.push("/login");
    } catch (error) {
      setIsLoading(false);
      if (error.code === "UserNotFoundException") {
        notification.error({
          message:
            i18n.language === "en"
              ? "Please Check your email"
              : "الرجاء التحقق من الإيميل",
        });
      }
      if (error.code === "ExpiredCodeException") {
        notification.error({
          message:
            i18n.language === "en"
              ? "your code is exipred"
              : "الكود منتهي الصلاحية",
        });
      }
      if (error.code === "LimitExceededException") {
        notification.error({
          message:
            i18n.language === "en"
              ? "Attempt limit exceeded"
              : "تجاوزت الحد الأقصى لمحاولات ",
        });
      }
      if (error.code === "CodeMismatchException") {
        notification.error({
          message:
            i18n.language === "en"
              ? "Please check verification code"
              : "الرجاء التحقق من  كود التحقق",
        });
      }
    }
  };

  const resendVerificationCode = () => setShowModal(true);

  const handleModalOk = async (values) => {
    setIsLoading(true);
    try {
      await Auth.forgotPassword(values.email);
      notification.info({
        message:
          i18n.language === "en"
            ? "check your email for reset password code"
            : "الرجاء التحقق من الإيميل للحصول على كود إسترجاع كلمة المرور",
      });
      setShowModal(false);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
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
      }

      notification.error({ message: "internal error" });
    }
  };

  return (
    <main className="forget-password-wrapper">
      <Modal
        title={t("forget-password.title")}
        visible={showModal}
        onOk={handleModalOk}
        onCancel={() => setShowModal(false)}
        okButtonProps={{ className: "form-submit-btn main-btn" }}
        footer={false}
        style={{ fontFamily: i18n.language === "en" ? "Montserrat" : "Cairo" }}
      >
        <Form onFinish={handleModalOk} name="send-info">
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
          <Button className="main-btn" isloading={isLoading ? true : false}>
            {" "}
            {t("forget-password.submit")}
          </Button>
        </Form>
      </Modal>
      <section className="forget-password-section">
        <div className="forget-password-card-section-wrapper">
          <div className="content--container">
            <h1>{t("forget-password.title")}</h1>
            <Form
              name="verify-email"
              className="forget-password-form"
              id="forget-password-form"
              onFinish={handleVerify}
              form={form}
            >
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

              <Form.Item
                name="code"
                rules={[
                  {
                    required: true,
                    message: t("forget-password.codeValidation"),
                  },
                ]}
              >
                <Input
                  placeholder={t("forget-password.codePlaceholder")}
                  label={t("forget-password.code")}
                />
              </Form.Item>

              <Form.Item
                name="password"
                rules={[{ required: true, message: t("passwordRquired") }]}
              >
                <Input
                  label={t("register.password") + ":"}
                  type="password"
                  placeholder={t("register.passwordPlaceholder")}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Form.Item>
              <Form.Item
                name="repeatedPassword"
                rules={[
                  {
                    required: true,
                    message: t("repeatPasswordRquired"),
                  },
                  {
                    validator: (rule, value, callback) => {
                      try {
                        if (password !== value) {
                          throw new Error(t("validatePassword"));
                        }
                      } catch (error) {
                        callback(error);
                      }
                    },
                  },
                ]}
              >
                <Input
                  label={t("register.repeatPassword") + ":"}
                  type="password"
                  placeholder={t("register.repeatPasswordPlaceholder")}
                />
              </Form.Item>

              <Form.Item htmlFor="submit">
                <Button
                  isloading={isLoading ? true : false}
                  className="main-btn form-submit-btn forget-password-btn"
                  style={{ marginTop: 90 }}
                  onClick={handleVerify}
                >
                  {t("forget-password.submit")}
                </Button>
              </Form.Item>
              <span
                style={{
                  textAlign: "center",
                  color: "#29444d",
                  marginTop: "20px",
                  display: "inline-block",
                  cursor: "pointer",
                }}
                onClick={resendVerificationCode}
              >
                {t("forget-password.re-send")}
              </span>
            </Form>
          </div>
        </div>
      </section>
    </main>
  );
}
