import React, { useState } from "react";
import { Form, notification, Row } from "antd";
import { useTranslation } from "react-i18next";
import { Form as FormComponents } from "components";
import "./index.scss";
import { useDispatch } from "react-redux";
import { API_CALL } from "../../../store/constants";

const { Input, Button } = FormComponents;

export default function InviteFriends() {
  const [form] = Form.useForm();
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState();
  const dispatch = useDispatch();
  
  const handleChangeEmail = ({ target: { value } }) => {
    setEmail(value)
  }

  const handleInviteFriends = () => {
    const onSuccess = (data) =>
      notification.success({ message: t("invite-friends.successMsg"), duration: 2 });

    const onFailure = (error) =>
      notification.error({ message: t("invite-friends.failureMsg") });

    dispatch({
      type: API_CALL,
      payload: {
        url: `/customer/invitefriend/${email}`,
        method: "GET",
        onSuccess,
        onFailure,
      },
    });
  };

  return (
    <div className="container container-without-padding">
      <main className="invite-friends-wrapper">
        <section className="invite-friends-section">
          <div className="invite-friends-card-section-wrapper">
            <div className="content--container1">
              <h1>{t("invite-friends.title")}</h1>
              <Form
                className="invite-friends-form"
                id="invite-friends-form"
                form={form}
              >
                <Form.Item
                  name="email"
                  rules={[
                    {
                      type: "email",
                      required: true,
                      message: t("invite-friends.emailValidation"),
                    },
                  ]}
                >
                  <Input
                    label={t("invite-friends.emailLabel") + ":"}
                    placeholder={t("invite-friends.emailPlaceholder")}
                    onChange={handleChangeEmail}
                  />
                </Form.Item>
                <Button
                  onClick={handleInviteFriends}
                  className={"main-btn"}
                  isloading={isLoading ? "true" : null}
                >
                  {t("invite-friends.submit")}
                </Button>
              </Form>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
