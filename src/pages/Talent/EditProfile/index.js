import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Row, Form, notification } from "antd";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Form as FormComponent } from "components";
import { countries } from "utils/getCountries";
import { API_CALL } from "store/constants";
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

export default function CompleteRegistration() {
  const [formData, setFormData] = useState(new FormData());
  const [form] = Form.useForm();
  const [isLoading, setIsLoading] = useState(false);
  const [handlerError, setHandlerError] = useState(false);
  const dispatch = useDispatch();
  const { token } = useParams();
  const { t } = useTranslation();
  const [selectedCategory, setSelectedCategory] = useState(0);
  const [socialValues, setSocialsValues] = useState();
  const [selectedPercentage, setSelectedPercentage] = useState(1);
  const [price, setPrice] = useState();
  const [charitySwitch, setCharitySwitch] = useState(1);
  const [charity, setCharity] = useState();
  const tags = useSelector(selectTags);
  const categories = useSelector(selectCategories);
  const charities = useSelector(selectCharities);
  const languages = useSelector(selectLanguages);
  const social = useSelector(selectSocial);
  const [talent, setTalent] = useState({});

  useEffect(() => {
    const onSuccess = ({ data }) => {
      const socials = {};
      setTalent({
        ...data,
      });
      if (data.charityId) setCharitySwitch(2);
      setSelectedCategory(data.category.id);

      data.socials.map(
        (social) =>
          (socials["socials:" + social.id] = social.talentSocial.socialHandler)
      );

      const finalData = {
        bio: data.bioEng,
        initPrice: data.initPrice,
        videoURL: data.videoUrl,
        tags: data.tags.map((tag) => tag.tagName),
        category: data.category.id,
        charityRatio: data.charityRatio,
        charity: Number(data.charityId),
        name: data.nameEng,
        country: data.country,
        handler: data.handler,
        responseTime: data.responseTime,
        languages: data.languages.map((language) => language.id),
        ...socials,
      };

      form.setFieldsValue(finalData);
      form.setFieldsValue({ charity: data.charityId.toString() });

      setCharity(data.charityId.toString());
      setSelectedPercentage(
        data.charityRatio === 25 ? 1 : data.charityRatio === 50 ? 2 : 3
      );
    };

    const onFailure = (error) => {
      console.log(error);
    };

    dispatch({
      type: API_CALL,
      payload: {
        method: "GET",
        url: "/talent/editprofile",
        onSuccess,
        onFailure,
      },
    });
  }, []);

  const handleChangeCharity = (value) => setCharity(value);

  const handleChangeSwitch = (option) => setCharitySwitch(option.id);

  const handleChangePercentage = (option) => setSelectedPercentage(option.id);

  const handleChangePrice = (value) =>
    setPrice(Number(value) + value * (30 / 100));

  const handleChangeCategory = (option) => setSelectedCategory(option.id);

  const onFinish = async (values) => {
    setIsLoading(true);
    const onSuccess = (response) => {
      setIsLoading(false);
      dispatch({ type: SET_USER, payload: { ...response.data.talent } });
      // window.location.href = "/profile";
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
        newValues.socials.push({
          id: key.substring(8),
          value: values[key] || "",
        });
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
    formData.append("nameEng", finalValues.name);
    formData.append("nameAr", finalValues.name);
    formData.append("role", finalValues.role);
    formData.append("handler", finalValues.handler);
    formData.append("responseTime", finalValues.responseTime);
    formData.append("socials", JSON.stringify(finalValues.socials));
    formData.append("category", selectedCategory);
    formData.append("languages", JSON.stringify(finalValues.languages));
    formData.append("tags", JSON.stringify(finalValues.tags));
    formData.append("country", finalValues.country);
    formData.append("initPrice", finalValues.initPrice);
    formData.append("approvalToken", token);
    console.log(formData);
    console.log(formData.getAll("photo"));
    console.log(formData.get("photo"));
    if (newValues.charity) {
      formData.append(
        "charityRatio",
        JSON.stringify(
          Number(
            selectedPercentage === 1 ? 25 : selectedPercentage === 2 ? 50 : 100
          )
        )
      );
      formData.append("charity", finalValues.charity);
    }

    dispatch({
      type: API_CALL,
      payload: {
        method: "POST",
        onSuccess,
        onFailure,
        url: "/talent/editprofile",
        data: formData,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      },
    });
  };

  const onUploadImageChange = (event, blob) => {
    console.log(blob);
    console.log(event);
    if (!blob) return;
    const file = new File([blob], "profile-image.jpg", {
      lastModified: new Date(),
      type: "image/jpeg",
    });
    console.log(file);
    formData.delete("photo");
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

  const handlerValidator = (event, value) => {
    return new Promise((resolve, reject) => {
      if (value === "") return;
      const onSuccess = (response) => {
        resolve();
      };

      const onFailure = (error) => {
        reject(new Error(t("talent.invalid-handler")));
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
    });
  };
  return (
    <Row>
      <main className="talent-approve-wrapper">
        <h1 className="talent-approve-title">{t("talent.header1")}</h1>
        <section className="talent-section">
          <div className="form-section-wrapper" style={{ width: "100%" }}>
            <UploadPhoto
              onChange={onUploadImageChange}
              talent
              ratio={3 / 4}
              className="upload-photo"
            />
            <Form
              className="talent-form-approve"
              id="talent-form"
              form={form}
              onFinish={onFinish}
            >
              <Form.Item
                name="name"
                rules={[
                  {
                    required: true,
                    message: t("talent.nameValidation"),
                  },
                ]}
              >
                <Input
                  label={t("talent.name")}
                  placeholder={t("talent.namePlaceholder")}
                />
              </Form.Item>
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
                  selected={selectedCategory}
                  onChange={handleChangeCategory}
                  options={categories}
                />
              </Form.Item>
              <Form.Item
                name="handler"
                rules={[
                  {
                    validator: handlerValidator,
                  },
                ]}
              >
                <Input
                  label={t("talent.handler")}
                  placeholder={t("talent.handlerPlaceholder")}
                />
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
              <Form.Item name="tags">
                <Select
                  label={t("talent.tags")}
                  placeholder={t("talent.tags")}
                  options={tags}
                  allowClear
                  tags
                  onChange={(val) => console.log(val)}
                />
              </Form.Item>
              <Form.Item name="videoURL">
                <UploadVideo
                  talent
                  value={talent.videoUrl}
                  onChange={onUploadVideoChange}
                />
              </Form.Item>
              {social.map((item) => (
                <Form.Item key={item.id} name={`socials:${item.id}`}>
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
                      options={charities}
                      allowClear
                      onChange={handleChangeCharity}
                    />
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
                        selected={selectedPercentage}
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
                {t("edit-customer-profile.submit")}
              </Button>
            </Form>
          </div>
        </section>
      </main>
    </Row>
  );
}
