import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import Axios from "axios";
import { Row, Form, notification } from "antd";
import { useHistory, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Form as FormComponent } from "components";
import { countries } from "utils/getCountries";
import { API_CALL } from "store/constants";
import { MAIN_ENDPOINT } from "../../../_constants";
import {
  selectTags,
  selectCharities,
  selectSocial,
  selectLanguages,
  selectCategories,
} from "store/selectors";
import "./index.scss";

import { SET_USER } from "_constants";

const {
  Button,
  Input,
  UploadPhoto,
  Select,
  TextArea,
  Radio,
  UploadVideo,
  Switch,
} = FormComponent;
const { Option } = Select;

export default function CompleteRegistration() {
  const [formData] = useState(new FormData());
  const [form] = Form.useForm();
  const [isLoading, setIsLoading] = useState(false);
  const [handlerError, setHandlerError] = useState(false);
  const dispatch = useDispatch();
  const { token } = useParams();
  const { t } = useTranslation();
  const [selecetedCategory, setSelectedCategory] = useState(0);
  const [selecetedPercentage, setSelectedPercentage] = useState(1);
  const [price, setprice] = useState();
  const [charitySwitch, setCharitySwitch] = useState(1);
  const [charity, setCharity] = useState();
  const tags = useSelector(selectTags);
  const categories = useSelector(selectCategories);
  const charities = useSelector(selectCharities);
  const languages = useSelector(selectLanguages);
  const social = useSelector(selectSocial);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleChangeCharity = (value) => {
    setCharity(value);
  };

  const handleChangeSwitch = (option) => {
    setCharitySwitch(option.id);
  };

  const handleChangePercentage = (option) => {
    setSelectedPercentage(option.id);
  };

  const handleChangePrice = (value) => {
    setprice(Number(value) + value * (30 / 100));
  };

  const handleChangeCategory = (option) => {
    setSelectedCategory(option.id);
  };

  const { push } = useHistory();

  const onFinish = async (values) => {
    setIsLoading(true);
    const onSuccess = (response) => {
      setIsLoading(false);
      dispatch({ type: SET_USER, payload: { ...response.data.talent } });
      push({
        pathname: "/talent/verify-message",
        state: { waitComplete: true },
      });
    };

    const onFailure = (error) => {
      setIsLoading(false);
      if (error.response) {
        notification.error({
          message: error.response.data[0] || error.response.data.message,
        });
      }
    };

    const newValues = values;
    newValues.socials = [];
    newValues.category = values.category.id;
    Object.keys(values).map((key) => {
      if (key.indexOf("socials:") > -1) {
        newValues.socials.push(
          JSON.stringify({ id: key.substring(8), value: values[key] })
        );
        delete newValues[key];
      }
    });

    const finalValues = {
      ...values,
      videoURL:
        "https://via.placeholder.com/300.png/09f/fff%20C/O%20https://placeholder.com/",
      role: "talent",
      charityRatio: values.charityRatio ? values.charityRatio.value : undefined,
    };

    formData.delete("data");
    formData.delete("approvalToken");
    formData.delete("bio");
    formData.delete("role");
    formData.delete("charityRatio");
    formData.delete("socials");
    formData.delete("category");
    formData.delete("languages");
    formData.delete("tags");
    formData.delete("country");
    formData.delete("initPrice");
    formData.delete("charity");

    formData.append("bio", finalValues.bio);
    formData.append("role", finalValues.role);
    formData.append("socials", JSON.stringify(finalValues.socials));
    formData.append("category", finalValues.category);
    formData.append("languages", JSON.stringify(finalValues.languages));
    formData.append("tags", JSON.stringify(finalValues.tags));
    formData.append("country", finalValues.country);
    formData.append("initPrice", finalValues.initPrice);
    formData.append("responseTime", finalValues.responseTime);
    formData.append("handler", finalValues.handler);
    formData.append("approvalToken", token);

    if (newValues.charity) {
      formData.append("charityRatio", finalValues.charityRatio);
      formData.append("charity", finalValues.charity);
    }

    dispatch({
      type: API_CALL,
      payload: {
        method: "post",
        onSuccess,
        onFailure,
        url: "/talent/profileCompletionForm",
        data: formData,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      },
    });
  };

  const onUploadImageChange = (event, blob) => {
    if (!blob) return;
    formData.delete("photo");

    const file = new File([blob], "profile-image.jpg", {
      type: "image/jpg",
      lastModified: Date.now(),
    });

    formData.append("photo", file);
  };

  const onUploadVideoChange = (event, inputField) => {
    if (!inputField) return;
    formData.delete("video");
    formData.append("video", inputField.files[0]);
  };

  const socialMediaValidator = async () => {
    const values = form.getFieldsValue();
    const socials = [];

    Object.keys(values).map((key) => {
      if (key.indexOf("socials:") > -1 && values[key])
        socials.push(values[key]);
    });
    if (socials.length === 0) throw new Error(t("socialMediaValidation"));
  };

  const videoValidation = async () => {
    if (!formData.get("video")) throw new Error(t("videoValidation"));
  };

  const handlerValidator = async ({ target: { value } }) => {
    if (value === "") setHandlerError(null);
    const onSuccess = (response) => {
      setHandlerError(null);
    };

    const onFailure = (error) => {
      setHandlerError(t("validateHandler"));
    };
    if (value !== "") {
      dispatch({
        type: API_CALL,
        payload: {
          onSuccess,
          onFailure,
          url: `/talent/checkhandler/${value}`,
          method: "GET",
        },
      });
    }
  };
  return (
    <Row>
      <main className="talent-approve-wrapper">
        <h1 className="talent-approve-title">{t("talent.header1")}</h1>
        <section className="talent-section">
          <div className="form-section-wrapper" style={{ width: "100%" }}>
            <Form
              className="talent-form-approve"
              id="talent-form"
              form={form}
              onFinish={onFinish}
            >
              <UploadPhoto
                ratio={3 / 4}
                onChange={onUploadImageChange}
                talent
                className="upload-photo"
              />
              <Form.Item
                name="handler"
                rules={[
                  {
                    required: true,
                    message: t("handlerRequired"),
                  },
                ]}
              >
                <Input
                  label={t("talent.handler")}
                  placeholder={t("talent.handlerPlaceholder")}
                  onChange={handlerValidator}
                />
              </Form.Item>
              {handlerError ? (
                <div className="ant-form-item-explain">
                  <div style={{ color: "red", marginTop: "-15px" }}>
                    {handlerError}
                  </div>
                </div>
              ) : null}
              <Form.Item
                name="bio"
                rules={[{ required: true, message: t("bioValidation") }]}
              >
                <TextArea
                  label={t("talent.bio")}
                  placeholder={t("talent.bioPlaceholder")}
                />
              </Form.Item>
              <Form.Item
                name="category"
                rules={[{ required: true, message: t("categoryRequired") }]}
              >
                <Radio
                  className="talent-radio-btn"
                  label={t("talent.categories")}
                  selected={selecetedCategory}
                  onChange={handleChangeCategory}
                  options={categories}
                />
              </Form.Item>
              <Form.Item
                name="tags"
                rules={[{ required: true, message: t("tagsValidation") }]}
              >
                <Select
                  label={t("talent.tags")}
                  placeholder={t("talent.tags")}
                  options={tags}
                  allowClear
                  tags
                />
              </Form.Item>
              <Form.Item
                name="videoURL"
                rules={[{ validator: videoValidation }]}
              >
                <UploadVideo talent onChange={onUploadVideoChange} />
              </Form.Item>
              {social.map((item) => (
                <Form.Item
                  key={item.id}
                  name={`socials:${item.id}`}
                  // rules={[{ validator: socialMediaValidator }]}
                >
                  <Input label={item.label} placeholder={item.label} />
                </Form.Item>
              ))}
              <Form.Item
                name="languages"
                rules={[{ required: true, message: t("languageValidation") }]}
              >
                <Select
                  label={t("talent.languages")}
                  placeholder={t("talent.languagesPlaceholder")}
                  options={languages && languages.length ? languages : []}
                  allowClear
                  multiple
                ></Select>
              </Form.Item>
              <Form.Item
                name="country"
                rules={[{ required: true, message: t("countryRequired") }]}
              >
                <Select
                  label={t("talent.country")}
                  placeholder={t("talent.countryPlaceholder")}
                  options={countries}
                  allowClear
                ></Select>
              </Form.Item>
              <Form.Item
                name="initPrice"
                rules={[
                  {
                    required: true,
                    message: t("priceRequired"),
                  },
                ]}
              >
                <Input
                  label={t("talent.initprice")}
                  placeholder={t("talent.initpricePlaceholder")}
                  onChange={handleChangePrice}
                  type="number"
                />
                {/* {price ? (

                  <span style={{ fontSize: 16, paddingLeft: "30px" }}>
                    {t("fullPrice")} <b>{price}</b>
                  </span>
                ) : null} */}
              </Form.Item>
              <Form.Item
                name="responseTime"
                rules={[{ required: true, message: t("responseRequired") }]}
              >
                <Select
                  label={t("talent.responseTime")}
                  placeholder={t("talent.responseTimePlaceholder")}
                  options={[
                    {
                      id: 1,
                      label: "less than one day",
                      value: "less than one day",
                    },
                    {
                      id: 2,
                      label: "Up to 2 days",
                      value: "Up to 2 days",
                    },
                    {
                      id: 3,
                      label: "Up to 3 days",
                      value: "Up to 3 days",
                    },
                    {
                      id: 4,
                      label: "Up to 4 days",
                      value: "Up to 4 days",
                    },
                    {
                      id: 5,
                      label: "Up to 5 days",
                      value: "Up to 5 days",
                    },
                    {
                      id: 6,
                      label: "Up to 6 days",
                      value: "Up to 6 days",
                    },
                    {
                      id: 7,
                      label: "Up to 7 days",
                      value: "Up to 7 days",
                    },
                  ]}
                  allowClear
                />
              </Form.Item>
              <Switch
                label={t("charitySwitch")}
                selected={charitySwitch}
                onChange={handleChangeSwitch}
                style={{ marginBottom: 24 }}
                options={[
                  {
                    id: 1,
                    value: t("No"),
                  },
                  {
                    id: 2,
                    value: t("Yes"),
                  },
                ]}
              />
              {charitySwitch === 2 ? (
                <>
                  <Form.Item name="charity">
                    <Select
                      label={t("talent.charity")}
                      placeholder={t("talent.charityPlaceholder")}
                      options={charities && charities.length ? charities : []}
                      allowClear
                      onChange={handleChangeCharity}
                    ></Select>
                  </Form.Item>
                  {charity ? (
                    <Form.Item
                      name="charityRatio"
                      rules={[
                        {
                          required: true,
                          message: t("ratioRequired"),
                        },
                      ]}
                    >
                      <Switch
                        label={t("talent.percentageToCharity")}
                        placeholder={t("talent.percentageToCharityPlaceholder")}
                        selected={selecetedPercentage}
                        onChange={handleChangePercentage}
                        percent
                        options={[
                          {
                            id: 1,
                            value: 25,
                          },
                          {
                            id: 2,
                            value: 50,
                          },
                          {
                            id: 3,
                            value: 100,
                          },
                        ]}
                      />
                    </Form.Item>
                  ) : null}
                </>
              ) : null}
              <Button
                isloading={isLoading ? true : undefined}
                className="main-btn form-submit-btn"
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
