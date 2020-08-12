import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Row, Form, notification } from "antd";
import { useTranslation } from "react-i18next";
import { Form as FormComponent } from "components";
import { API_CALL } from "store/constants";
import { selectCategories, selectUser } from "store/selectors";
import "./index.scss";
import { useHistory } from "react-router-dom";
import { SET_USER } from "_constants";

const { Input, UploadPhoto, Checkbox, Button } = FormComponent;

export default function CustomerProfile() {
  const [selecetedCategory, setSelectedCategory] = useState([]);

  const [formData, setFormData] = useState(new FormData());
  const [isLoading, setIsLoading] = useState(false);
  const history = useHistory();
  const dispatch = useDispatch();

  const { name, categories: initialCats } = useSelector(selectUser);

  const categories = useSelector(selectCategories);

  const handleChangeCategory = (option) => {
    let newCategory;

    if (selecetedCategory.includes(option.id))
      newCategory = selecetedCategory.filter(
        (_option) => _option !== option.id
      );
    else newCategory = [...selecetedCategory, option.id];
    setSelectedCategory(newCategory);
  };

  const onFinish = async (values) => {
    setIsLoading(true);
    const newCategories = selecetedCategory.map((x) => parseInt(x));
    const newValues = { ...values, categories: newCategories };
    formData.delete("name");
    formData.delete("categories");

    formData.append("name", newValues.name);
    formData.append("categories", JSON.stringify(newValues.categories));

    const onSuccess = (response) => {
      setIsLoading(false);
      notification.success({ message: response.data.msg, duration: 2 });
      try {
        dispatch({
          type: SET_USER,
          payload: {
            name: response.data.customer.name,
            pic_url: response.data.customer.pic_url,
            categories: response.data.customer.categories.map(
              (category) => category.id
            ),
          },
        });
      } catch (error) {
        console.log(error);
      }
      history.push("/profile");
    };

    const onFailure = (error) => {
      setIsLoading(false);
      if (error.response) {
        notification.error({
          message: error.response.data[0] || error.response.data.msg,
        });
      }
    };

    dispatch({
      type: API_CALL,
      payload: {
        method: "post",
        data: formData,
        onSuccess,
        onFailure,
        url: "/customer/profileedit",
        headers: {
          "Content-Type": "multipart/form-data",
        },
      },
    });
  };

  useEffect(() => {
    if (initialCats) setSelectedCategory(initialCats);
  }, []);

  const onUploadImageChange = async (event, blob) => {
    if (!blob) return;
    const file = new File([blob], "profile-image.jpg", {
      type: "image/jpg",
      lastModified: Date.now(),
    });
    const _formData = new FormData();
    _formData.append("photo", file);
    setFormData(_formData);
  };

  const { t, i18n } = useTranslation();
  return (
    <Row>
      <main className="customer-profile-wrapper">
        <h1 className="customer-profile-title">
          {t("customer.headerProfile")}
        </h1>
        <section className="customer-profile-section">
          <div className="form-section-wrapper">
            <Form
              className="customer-profile-form"
              id="register-form"
              onFinish={onFinish}
            >
              <UploadPhoto
                ratio={1 / 1}
                className="upload-photo"
                className1="upload-photo-customer"
                onChange={onUploadImageChange}
              />
              <Form.Item name="name" initialValue={name}>
                <Input
                  label={t("edit-customer-profile.name")}
                  placeholder={t("edit-customer-profile.namePlaceholder")}
                />
              </Form.Item>
              <Form.Item name="categories">
                <Checkbox
                  label={t("edit-customer-profile.interesting-in")}
                  options={categories}
                  selected={selecetedCategory}
                  onChange={handleChangeCategory}
                />
              </Form.Item>

              <Button
                className="main-btn form-submit-btn"
                type="submit"
                style={{ marginTop: 56 }}
                isloading={isLoading ? true : false}
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
