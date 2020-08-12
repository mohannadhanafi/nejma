import React, { useEffect, useState } from "react";
import { Auth } from "aws-amplify";
import { useHistory, Link } from "react-router-dom";
import { Row, Form, notification } from "antd";
import { useTranslation } from "react-i18next";
import { Form as FormComponent } from "components";
import facebookIcon from "assets/icon-facebook.png";
import googleIcon from "assets/icon-google.png";
import { SET_USER } from "_constants";
import "./index.scss";
import { useDispatch } from "react-redux";
import { API_CALL } from "store/constants";

const { Button, Input, Divider } = FormComponent;

export default function Register() {
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(false);
  const [password, setPassword] = useState();
  const [form] = Form.useForm();
  const dispatch = useDispatch();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const onFinish = async () => {
    setIsLoading(true);
    const { repeatPassword, ...values } = form.getFieldsValue();

    const onSuccess = ({ data }) => {
      setIsLoading(false);
      localStorage.setItem("token", data.user.token);
      history.push({
        pathname: "/aws/verify-email",
        state: { ...values },
      });
      return {
        type: SET_USER,
        payload: {
          ...data.user,
          email_verified: false,
          role: "customer",
        },
      };
    };

    const onFailure = (error) => {
      setIsLoading(false);
      !error.response
        ? notification.error({ message: t("requests-errors.no-network") })
        : notification.error({ message: error.response.data.msg });
    };

    dispatch({
      type: API_CALL,
      payload: {
        method: "post",
        url: "/auth/register",
        data: { ...values, role: "customer", name: values.name },
        onSuccess,
        onFailure,
      },
    });
  };
  const { t, i18n } = useTranslation();

  const repeatPasswordValidator = (rule, value, callback) => {
    try {
      if (password !== value) throw new Error(t("validatePassword"));
      callback();
    } catch (e) {
      callback(e);
    }
  };

  return (
    <Row>
      <main className="register-wrapper">
        <h1 className="register-title">{t("register.header")}</h1>
        <section className="register-section">
          <div className="form-section-wrapper">
            <Form
              className="register-form"
              id="register-form"
              onFinish={onFinish}
              form={form}
            >
              <Form.Item
                name="name"
                rules={[
                  {
                    required: true,
                    message: t("nameRquired"),
                  },
                ]}
              >
                <Input
                  label={t("register.name") + ":"}
                  placeholder={t("register.namePlaceholder")}
                />
              </Form.Item>
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
                  label={t("register.email") + ":"}
                  placeholder={t("register.emailPlaceholder")}
                />
              </Form.Item>
              <Form.Item
                name="password"
                rules={[
                  {
                    message: t("passwordRequirements"),
                    pattern: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
                  },
                  {
                    required: true,
                    message: t("passwordRquired"),
                  },
                ]}
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
                    validator: repeatPasswordValidator,
                  },
                ]}
              >
                <Input
                  label={t("register.repeatPassword") + ":"}
                  type="password"
                  placeholder={t("register.repeatPasswordPlaceholder")}
                />
              </Form.Item>

              <Button
                className="main-btn form-submit-btn"
                type="submit"
                style={{ marginTop: 50 }}
                isloading={isLoading ? true : false}
              >
                {t("register.submit")}
              </Button>
              <Divider value={t("register.or")} />
              <Row justify="space-between">
                <Button className="social-media-btn social-media-btn-facebook">
                  <img
                    src={facebookIcon}
                    style={{ marginLeft: i18n.language === "ar" && 10 }}
                    alt="facebook"
                  />
                  {t("register.facebook")}
                </Button>
                <Button className="social-media-btn social-media-btn-google">
                  <img
                    src={googleIcon}
                    style={{ marginLeft: i18n.language === "ar" && 10 }}
                    alt="google"
                  />
                  {t("register.google")}
                </Button>
              </Row>
            </Form>{" "}
            <Row className="register-customer-footer-container">
              <Row className="register-customer-footer-content">
                <p>{t("register.footerPara")}</p>
                <Link to="/register/talent">
                  <Button className="footer-btn">
                    {t("register.enrollAsTalent")}
                  </Button>
                </Link>
              </Row>
              {/* <Row className='register-footer-gredient'></Row> */}
            </Row>
          </div>
        </section>
      </main>
    </Row>
  );
}
