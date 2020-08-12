import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Row } from "antd";
import TalentCard from "../../../../components/TalentCard";

import "./index.scss";

const Category = ({ talents }) => {
  const { t, i18n } = useTranslation();
  return talents.length
    ? talents.map((element) => (
        <div className="talents--category">
          <div className="talents--category--heading">
            <h1>
              {i18n.language === "en"
                ? element.categoryName
                : element.categoryNameAr}
            </h1>
            <div className="talents--category--heading__link">
              <Link
                to={`/category/talents/${
                  element.categoryName === "Tailored For You"
                    ? "tailored"
                    : element.id
                }`}
              >
                {t("allTalents.seeAll")}
              </Link>
            </div>
          </div>
          <Row className="talents--cards no-wrap">
            {element.talents.map((talent) => (
              <TalentCard
                id={talent.id}
                image={talent.picUrl}
                nameEn={talent.nameEng}
                nameAr={talent.nameAr || talent.nameEng}
                categoryEn={
                  talent.category
                    ? talent.category.categoryName
                    : talent.categoryName
                }
                categoryAr={
                  talent.category
                    ? talent.category.categoryNameAr
                    : talent.categoryNameAr
                }
                price={
                  talent.initPrice + talent.initPrice * talent.companyRatio
                }
                talent
              />
            ))}
          </Row>
        </div>
      ))
    : null;
};

export default Category;
