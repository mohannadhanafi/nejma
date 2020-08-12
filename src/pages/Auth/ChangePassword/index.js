import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import "./index.scss";
import { Form, notification } from "antd";
import { useTranslation } from "react-i18next";
import { Form as _Form } from "components";
import { Auth } from "aws-amplify";
import { useSelector } from "react-redux";
import { selectUser } from "../../../store/selectors";

const { Input, Button } = _Form;

export default function ChangePassword(props) {
  const [password, setPassword] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [form] = Form.useForm();
  const history = useHistory();
  const { email: userEmail } = useSelector(selectUser);
  const { t, i18n } = useTranslation();

  const handleChangePassword = async () => {
    setIsLoading(true);
    try {
      const { password, oldPassword } = form.getFieldsValue();
      await Auth.signIn(userEmail, oldPassword);
      const user = await Auth.currentAuthenticatedUser();
      await Auth.changePassword(user, oldPassword, password);
      notification.success({ message: t("change-password.success"), duration: 2 });
      setIsLoading(false);

      history.push("/");
    } catch (error) {
      setIsLoading(false);
      if (error.code === "NotAuthorizedException") {
        notification.error({
          message: t("change-password.incorrect-password"),
        });
      } else if (error.code === "LimitExceededException") {
        notification.error({
          message: t("change-password.exceed-attempts"),
        });
      } else notification.error({ message: t("change-password.fail") });
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="container">
      <main className="change-password-wrapper">
        <section className="change-password-section">
          <div className="change-password-card-section-wrapper">
            <div className="content--container1">
              <h1>{t("change-password.title")}</h1>
              <Form
                className="change-password-form"
                id="change-password-form"
                form={form}
              >
                <Form.Item
                  name="oldPassword"
                  rules={[
                    {
                      required: true,
                      message: t("change-password.old-password-required"),
                    },
                  ]}
                >
                  <Input
                    placeholder={t("change-password.old-password-placeholder")}
                    label={t("change-password.old-password")}
                  />
                </Form.Item>
                <Form.Item
                  name="password"
                  rules={[
                    {
                      required: true,
                      message: t("change-password.password-validation"),
                      pattern: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
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
                      validator: (rule, value, callback) => {
                        try {
                          if (password !== value) {
                            throw new Error(
                              t("change-password.repeat-password")
                            );
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
                <Button
                  onClick={handleChangePassword}
                  className={"main-btn"}
                  isloading={isLoading ? true : false}
                >
                  {t("change-password.submit")}
                </Button>
              </Form>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
