import React, { useState, useEffect } from "react";
import { Row } from "antd";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import TalentCard from "./TalentCard";
import { Form } from "components";

import "./index.scss";
import { useDispatch } from "react-redux";
import { API_CALL } from "store/constants";
const { Button } = Form;
export default function TalentSection(props) {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { talents } = props;
  const [current, setCurrent] = useState(1);

  return (
    <Row
      justify="space-between"
      className="talent-section container flex-start-items "
    >
      <div className="talents-section-typography">
        <p>{t("home.browse-celebrities")}</p>
        <p
          style={{
            lineHeight: "24px",
            fontSize: "16px",
            color: "#8f9094",
            fontWeight: 600,
            margin: "29px auto 54px",
            marginBottom: "0",
            maxWidth: "378px",
          }}
        >
          {t("home.browse-celebrities-para")}
        </p>

        <Link to="/talents/all">
          <Button className="main-btn show-all-btn">
            {t("home.show-all")}
          </Button>
        </Link>
      </div>
      <div className="talents-container">
        {talents.map((talent) => (
          <TalentCard
            nameEn={talent.nameEng}
            nameAr={talent.nameAr}
            picUrl={talent.picUrl}
            categoryEn={talent.category.categoryName}
            categoryAr={talent.category.categoryNameAr}
            price={talent.initPrice}
            id={talent.id}
            key={talent.id}
          />
        ))}
      </div>
      <Row className="talents-carousel">
        {talents.map((talent, index) => (
          <TalentCard 
            nameEn={talent.nameEng}
            nameAr={talent.nameAr}
            categoryEn={talent.category.categoryName}
            categoryAr={talent.category.categoryNameAr}
            price={talent.initPrice}
            picUrl={talent.picUrl}
            id={talent.id}
            key={talent.id}
            classCarousel={`${current === index ? "selected" : 'not-selected'} `}
          />
        ))}

        <Row className="carousel-navigator">
          <span
            onClick={() => setCurrent(0)}
            className={`${current === 0 && "selected"} `}
          ></span>
          <span
            onClick={() => setCurrent(1)}
            className={`${current === 1 && "selected"} `}
          ></span>
          <span
            onClick={() => setCurrent(2)}
            className={`${current === 2 && "selected"} `}
          ></span>
                    <span
            onClick={() => setCurrent(3)}
            className={`${current === 3 && "selected"} `}
          ></span>
        </Row>
        <Link to="/talents/all">
          <Button style={{ width: "100%" }} className="main-btn down-btn">
            {t("home.show-all")}
          </Button>
        </Link>
      </Row>
    </Row>
  );
}
