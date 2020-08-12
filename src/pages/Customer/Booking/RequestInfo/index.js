import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import BookingWrapper from "../Wrapper";
import { Form, notification } from "antd";
import { Form as FormComponents } from "components";
import { useTranslation } from "react-i18next";
import RadioButton from "./RadioButton";
import "./index.scss";
import { API_CALL } from "store/constants";
import Loading from "components/Loading";
import { useParams, useLocation } from "react-router-dom";

const { Button, Input, Switch, Checkbox, TextArea } = FormComponents;

export default function BookingPage({
  goNext,
  onFinish,
  handleClick,
  checked,
  selecetedlanguage,
  handleChangelanguage,
  onChangePromoId,
}) {
  const { state: talent } = useLocation();
  const { t, i18n } = useTranslation();
  const [isLoading, setisLoading] = useState(true);
  const [languages, setLanguages] = useState([]);
  const [promoError, setPromoError] = useState();
  const dispatch = useDispatch();
  const [selectedSwitch, setselectedSwitch] = useState(1);
  const handleselectedSwitch = (option) => setselectedSwitch(option.id);
  const { id } = useParams();

  useEffect(() => {
    window.scrollTo(0, 0);
    setisLoading(true);

    const onSuccess = (response) => {
      const { data } = response;
      setLanguages(data);
      setisLoading(false);
    };

    const onFailure = (error) => {
      setisLoading(false);
      notification.error({ message: error.msg || "Error" });
    };

    dispatch({
      type: API_CALL,
      payload: {
        onSuccess,
        onFailure,
        url: `/talent/langs/${id}`,
        method: "GET",
      },
    });

    return () => {};
  }, []);

  if (isLoading) return <Loading />;

  const handleArabic = (className) => {
    let newClassName = className;
    if (i18n.language === "ar") newClassName = `${className} ar`;
    return newClassName;
  };

  const handlePromoCodeValidation = (rule, value) => {
    return new Promise((resolve, reject) => {
      if (value.trim() === "") return resolve();
      const onSuccess = ({ data }) => {
        if (!data.valid) {
          reject(new Error(t("booking.promo-code-validation")));
        } else {
          const { finalPrice } = data;
          onChangePromoId({ id: Number(data.id), finalPrice });
          resolve();
        }
      };
      const onFailure = (error) => {
        reject(new Error(t("booking.promo-code-validation")));
      };
      dispatch({
        type: API_CALL,
        payload: {
          onSuccess,
          onFailure,
          url: `promocode/check/${value}/with/talent/${id}`,
          method: "GET",
        },
      });
    });
  };

  return (
    <BookingWrapper className="down--padding" title={t("booking.toptitle")}>
      <Form onFinish={onFinish}>
        <div className="pink-sided-section">
          <div className={handleArabic("pink-co")}></div>
          <div className="booking-unit-wrapper">
            <div>
              <div>
                <label className="form-label">{t("booking.videoFor")}</label>
                <Form.Item name="forMe">
                  <Switch
                    selected={selectedSwitch}
                    onChange={handleselectedSwitch}
                    noForm
                    className="profile--switch"
                    options={[
                      { id: 1, value: t("booking.someone") },
                      { id: 2, value: t("booking.myself") },
                    ]}
                  />
                </Form.Item>
              </div>

              <Form.Item
                name="myname"
                rules={[
                  {
                    required: true,
                    message:
                      i18n.language === "ar"
                        ? "اسمك مطلوب"
                        : "Your name is required",
                  },
                ]}
              >
                <Input
                  label={t("booking.myname")}
                  placeholder={t("booking.mynamePlaceholder")}
                />
              </Form.Item>

              {selectedSwitch === 1 ? (
                <Form.Item
                  name="theirname"
                  rules={[
                    {
                      required: true,
                      message:
                        i18n.language === "ar"
                          ? "الاسم مطلوب"
                          : "Their name is required",
                    },
                  ]}
                >
                  <Input
                    label={t("booking.theirName")}
                    placeholder={t("booking.theirnamePlaceholder")}
                  />
                </Form.Item>
              ) : null}
            </div>
            <div>
              <Form.Item
                rules={[
                  {
                    required: true,

                    message:
                      i18n.language === "ar"
                        ? "التعليمات مطلوبة"
                        : "Then instructions field is required",
                  },
                ]}
                name="instructions"
              >
                <TextArea
                  label={t("booking.instructions")}
                  placeholder={t("booking.instructionsPlaceholder")}
                  style={{ paddingBottom: "6rem" }}
                />
              </Form.Item>
              {/* <div className='booking-notes'>
                {talent.nameEng} speaks only Arabic in their videos, please write
                your instructions in Arabic
              </div> */}
              <Form.Item name="isprivate">
                <RadioButton
                  handleClick={handleClick}
                  label={t("booking.makePrivate")}
                  checked={checked}
                />
              </Form.Item>
            </div>
          </div>
        </div>

        <div className="pink-sided-section">
          <div className={handleArabic("pink-co")}></div>
          <div className="booking-unit-wrapper">
            <Form.Item
              rules={[
                {
                  required: true,
                  message:
                    i18n.language === "ar"
                      ? "اللغة مطلوبة"
                      : "The language is required",
                },
              ]}
              name="languageId"
            >
              <Checkbox
                label={`${t("booking.Qlanguage1")}${" "}${
                  i18n.language === "ar"
                    ? talent?.nameAr || "خالد العامري"
                    : talent?.nameEng || "Khalid Al Ameri"
                }${" "}${t("booking.Qlanguage2")}`}
                options={languages}
                selected={selecetedlanguage}
                onChange={handleChangelanguage}
              />
            </Form.Item>
          </div>
        </div>
        <div className="pink-sided-section">
          <div className={handleArabic("pink-co")}></div>
          <div className="booking-unit-wrapper">
            <Form.Item
              initialValue={""}
              name="promocodeId"
              rules={[
                { validator: handlePromoCodeValidation },
                { required: false },
              ]}
            >
              <Input
                label={t("booking.promoCodeLabel")}
                placeholder={t("booking.promoCodePlaceholder")}
              />
            </Form.Item>
          </div>
        </div>
        <div className="booking-btn-wrapper">
          <Form.Item>
            <Button className="book-btn main-btn">{t("booking.next")}</Button>
          </Form.Item>
        </div>
      </Form>
    </BookingWrapper>
  );
}
