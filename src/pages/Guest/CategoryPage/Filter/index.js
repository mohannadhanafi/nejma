import React, { useState, useEffect } from "react";
import { Slider, Row, Col, Rate, Form } from "antd";
import { Form as FormComponent } from "components";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { disableBodyScroll, enableBodyScroll } from "body-scroll-lock";
import { selectCategories, selectLanguages, selectTags } from "store/selectors";
import "./index.scss";
import { useParams } from "react-router-dom";

const { Select, Button, Checkbox } = FormComponent;

export default function FilterModal(props) {
  const [rate, setRate] = useState(0);
  const [form] = Form.useForm();
  const { i18n, t } = useTranslation();
  const { id } = useParams();
  const [selecetedCategories, setSelectedCategories] = useState([]);
  const categories = useSelector(selectCategories);
  const languages = useSelector(selectLanguages);
  const tags = useSelector(selectTags);

  const handleChangeCategory = (option) => {
    let newCategory;

    if (selecetedCategories.includes(option.id))
      newCategory = selecetedCategories.filter(
        (_option) => _option !== option.id
      );
    else newCategory = [...selecetedCategories, option.id];
    setSelectedCategories(newCategory);
  };

  const onFinish = (values) => {
    values.priceRange = values.priceRange ? values.priceRange : [10, 1000];
    values.responseTime = values.responseTime ? values.responseTime : [1, 7];
    props.onOk({
      categories: selecetedCategories,
      minPrice: values.priceRange[0],
      maxPrice: values.priceRange[1],
      minResponseTime: values.responseTime[0],
      maxResponseTime: values.responseTime[1],
      hasCharity:
        values.charity === "Yes" || values.charity === "نعم"
          ? true
          : values.charity === "No" || values.charity === "لا"
          ? false
          : null,
      tags: values.tags && values.tags.map((tag) => Number(tag)),
      languages: values.language,
      rating: values.rating,
      categoryId: id,
    });
  };
  useEffect(() => {
    if (props.visible) disableBodyScroll(document.body);
    else enableBodyScroll(document.body);
    return () => {
      enableBodyScroll(document.body);
    };
  }, [props]);

  const handleCloseModal = (event) => {
    const container = document.getElementsByClassName(
      "filter-modal-container"
    )[0];
    if (container.isEqualNode(event.target)) props.onClose();
  };
  return (
    <div
      className="filter-modal-container"
      style={{ display: props.visible ? "flex" : "none " }}
      onClick={handleCloseModal}
    >
      <Row className="filter-modal">
        <Row className="filter-modal-title">
          <Col span={20}>
            <p className="title"> {t("filter-modal.title")}</p>
          </Col>
          <Col span={1} offset={3}>
            <img
              src={require("assets/icons/close.svg")}
              onClick={props.onClose}
              style={{ cursor: "pointer" }}
              width="20"
            />
          </Col>
        </Row>
        <Form form={form} name="filter" onFinish={onFinish}>
          <Row style={{ margin: "20px 0" }}>
            <Col lg={11} xs={24}>
              <p className="label">{t("filter-modal.price")}</p>
              <Form.Item name="priceRange">
                <Slider range min={10} max={1000} />
              </Form.Item>
            </Col>

            <Col
              lg={{ span: 11, offset: 2 }}
              xs={{ span: 24, offset: 0 }}
              offset={2}
              className="responseTimeCol"
            >
              <p className="label">{t("filter-modal.responseTime")}</p>
              <Form.Item name="responseTime">
                <Slider range min={1} max={7} />
              </Form.Item>
            </Col>
          </Row>

          <Row>
            <Col lg={11} xs={24} className="ratingCol">
              <p className="label">{t("filter-modal.rating")}</p>
              <Form.Item name="rating">
                <Rate
                  style={{ color: "#fa6914", fontSize: "30px" }}
                  className="rate--stars"
                />
              </Form.Item>
            </Col>
            <Col
              lg={{ span: 11, offset: 2 }}
              xs={{ span: 24, offset: 0 }}
              offset={2}
            >
              <Form.Item name="charity">
                <Select
                  placeholder={t("filter-modal.supportCharity")}
                  options={
                    i18n.language === "en" ? ["Yes", "No"] : ["نعم", "لا"]
                  }
                  allowClear
                ></Select>
              </Form.Item>
            </Col>
          </Row>

          <Row>
            <Col lg={11} xs={24} className="languagesCol">
              <Form.Item name="language">
                <Select
                  placeholder={t("filter-modal.languagePlaceholder")}
                  options={languages && languages.length ? languages : []}
                  allowClear
                  multiple
                ></Select>
              </Form.Item>
            </Col>

            <Col
              lg={{ span: 11, offset: 2 }}
              xs={{ span: 24, offset: 0 }}
              offset={2}
            >
              <Form.Item name="tags">
                <Select
                  placeholder={t("talent.tags")}
                  options={tags}
                  allowClear
                  tags
                />
              </Form.Item>
            </Col>
          </Row>

          <Row>
            <Col span={10} offset={7}>
              <Button className="main-btn">{t("filter-modal.submit")}</Button>
            </Col>
          </Row>
          <br />
          <Row>
            <Col
              span={10}
              offset={7}
              style={{ display: "flex", justifyContent: "center" }}
            >
              <span
                style={{ borderBottom: "2px solid #000", cursor: "pointer" }}
                onClick={props.onClose}
              >
                {t("filter-modal.close")}
              </span>
            </Col>
          </Row>
        </Form>
      </Row>
    </div>
  );
}
