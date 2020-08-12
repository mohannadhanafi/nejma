import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Row, Form, notification } from "antd";

import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Form as FormComponent } from "components";
import { SET_USER } from "_constants";
import { API_CALL } from "store/constants";
import PhoneInput from "components/form/PhoneInput";
import { isValidPhoneNumber } from "react-phone-number-input";
import { selectSocial } from "store/selectors";

import "./index.scss";

const { Button, Input, Select } = FormComponent;

export default function Talent() {
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState();
  const dispatch = useDispatch();
  const social = useSelector(selectSocial);
  const [socialMedia, setSocialMedia] = useState([]);

  const { push } = useHistory();

  const [form] = Form.useForm();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const onSelectChange = (value) => {
    form.setFieldsValue({
      socialId: value,
    });
  };

  useEffect(() => {
    setSocialMedia(social);
  }, [social]);

  const onFinish = async (values) => {
    setIsLoading(true);

    const newValues = {
      ...values,
      picURL:
        "https://via.placeholder.com/300.png/09f/fff%20C/O%20https://placeholder.com/",
      role: "talent",
    };
    const onSuccess = ({ data }) => {
      localStorage.setItem("token", data.user.token);
      push({
        pathname: "/aws/verify-email",
        state: { ...newValues },
      });
      setIsLoading(false);
      return {
        type: SET_USER,
        payload: {
          ...data.user,
          email_verified: false,
          role: "talent",
        },
      };
    };

    const onFailure = (error) => {
      setIsLoading(false);
      if (error.response) {
        if (error.code === "InvalidParameterException") {
          notification.error({
            message:
              "Please add a strong password that includes length greater than or equal to 6",
          });
        } else {
          console.log({ ...error });
          notification.error({
            message:
              error.response.data.message ||
              error.response.data[0] ||
              error.response.data.msg,
          });
        }
      }
    };

    dispatch({
      type: API_CALL,
      payload: {
        url: "/auth/register",
        data: newValues,
        method: "post",
        onSuccess,
        onFailure,
      },
    });
  };

  const mobileValidation = (rule, value) =>
    new Promise((resolve, reject) => {
      if (!isValidPhoneNumber(value)) reject(t("mobileValidation"));
      resolve();
    });

  return (
    <Row>
      <main className="talent-wrapper">
        <h1 className="talent-title">{t("talent.header")}</h1>
        <section className="talent-section">
          <div className="form-section-wrapper" style={{ width: "100%" }}>
            <Form
              className="talent-form"
              id="talent-form"
              form={form}
              onFinish={onFinish}
            >
              <h2 className="talent-title-form">{t("talent.titleForm")}</h2>
              <p className="talent-title-form-two">
                {t("talent.titleFormSecond")}
              </p>

              <span className="talent-span">{t("talent.personalInfo")}</span>
              <Form.Item
                name="name"
                rules={[{ required: true, message: t("nameRquired") }]}
              >
                <Input
                  label={t("talent.name") + ":"}
                  placeholder={t("talent.namePlaceholder")}
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
                    required: true,
                    message: t("passwordRquired"),
                    pattern: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
                  },
                ]}
              >
                <Input
                  label={t("register.password") + ":"}
                  type="password"
                  placeholder={t("register.passwordPlaceholder")}
                />
              </Form.Item>
              <Form.Item
                name="mobile"
                rules={[
                  {
                    validator: mobileValidation,
                  },
                ]}
              >
                <PhoneInput
                  label={t("register.mobile") + ":"}
                  placeholder={t("register.mobilePlaceholder")}
                />
              </Form.Item>
              <span className="talent-span">{t("talent.socialInfo")}</span>
              <Form.Item
                name="socialId"
                rules={[
                  {
                    required: true,
                    message: t("socialMediaRequired"),
                  },
                ]}
              >
                <Select
                  className="hassan"
                  label={t("register.socialPlaceholder")}
                  placeholder={t("register.socialPlaceholder")}
                  options={socialMedia}
                  allowClear
                  onChang={onSelectChange}
                />
              </Form.Item>
              <Form.Item
                name="socialHandler"
                rules={[
                  {
                    required: true,
                    message: t("socialMediaHandlerRequired"),
                  },
                ]}
              >
                <Input
                  label={t("register.socialhandler") + ":"}
                  placeholder={t("register.socialhandlerPlaceholder")}
                />
              </Form.Item>
              <Form.Item
                name="followersCount"
                rules={[
                  {
                    required: true,
                    message: t("numberOfFollowers"),
                  },
                ]}
              >
                <Input
                  label={t("register.followers") + ":"}
                  placeholder={t("register.followersPlaceholder")}
                  type="number"
                />
              </Form.Item>

              <Button
                className="main-btn form-submit-btn"
                isloading={isLoading}
                type="submit"
              >
                {t("customer.submit")}
              </Button>
            </Form>
          </div>
        </section>
      </main>
    </Row>
  );
}
