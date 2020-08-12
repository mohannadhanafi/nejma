import React, { useEffect } from "react";
import { Rate, Row, Col } from "antd";
import { ClockCircleOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";
import rounded from "../../../../utils/roundNumber";

import "./index.scss";
import { useSelector } from "react-redux";
import { selectUser } from "store/selectors";
import { Link } from "react-router-dom";
import CharityLogo from "assets/Asset1.svg";

export default function GeneralInfo(props) {
  const { t, i18n } = useTranslation();
  const { talent } = props;

  return (
    <div
      className={`talent-general-info ${
        !props.talent?.charity && "cards-without-charity"
      }`}
    >
      <div className="talent-general--card rate--card">
        <div>
          <span className="rate--value">
            {talent.overallRating ? rounded(Number(talent.overallRating)) : 0}{" "}
          </span>
          <Rate
            style={{ color: "#fa6914" }}
            className={`rate--stars ${i18n.language === "ar" ? "card-mr" : ""}`}
            value={talent.overallRating ? Number(talent.overallRating) : 0}
          />
        </div>
        <div>
          <Link
            to={`/reviews/${talent.nameEng}/${talent.id}`}
            className="reviews--link"
          >
            {talent.approvedReviewsCount} {t("reviews")}
          </Link>
        </div>
      </div>

      <div className={`talent-general--card response--time--card `}>
        <ClockCircleOutlined
          className={`response--time--icon ${
            i18n.language === "ar" ? "card-ml" : ""
          }`}
        />
        <div>
          <p>
            {talent.responseTime ? talent.responseTime : 3} {t("day")} <br />{" "}
            <span>{t("responseTime")}</span>
          </p>
        </div>
      </div>

      {props.talent?.charity && (
        <div className="talent-general--card charity-logo">
          <img src={CharityLogo} alt="charity" />
        </div>
      )}
    </div>
  );
}
