import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import logo from "assets/nejmaLogo.png";
import { Input, notification } from "antd";
import { SearchOutlined, MenuOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";
import "./index.scss";
import SearchBar from "./SearchBar";
import { useDispatch } from "react-redux";
import { API_CALL } from "../../../store/constants";

export default function HeaderLeftSide(props) {
  const { t, i18n } = useTranslation();
  const [results, setResults] = useState([]);
  const [showSearchBar, setShowSearchBar] = useState(false);
  const dispatch = useDispatch();
  const { openSlider } = props;
  const history = useHistory();


  const moveToTalentProfile = (talent) => {
    history.push(
      `/talent/${talent.category.categoryName}/${talent.name}/${talent.id}`
    );
    setResults([]);
  }

  const handleSearchChange = (value) => {
    const inputValue = value.target.value;
    if (inputValue.trim() === "") {
      setResults([]);
      return;
    }
    const url = `/talent/search?name=${inputValue}`;

    const onSuccess = ({ data }) => {
      setResults(data);
    };
    const onFailure = (error) => {
      notification.error({
        message: i18n.language === "en" ? "internal error" : "خطأ داخلي",
      });
    };

    dispatch({
      type: API_CALL,
      payload: { method: "GET", onFailure, onSuccess, url },
    });
  };

  const handleShowSearchBar = () => {
    setShowSearchBar(!showSearchBar);
  }

  return (
    <div className="left-side">
      <div className="image">
        <Link to="/">
          <img
            src={logo}
            alt="logo"
            // style={{ width: 75, height: 75 }}
            className="header-logo"
          />
        </Link>
      </div>
      <div className="search-input-container">
        <Input
          className={`search-input ${
            i18n.language === "ar" ? "search-input-ar" : ""
          }`}
          style={{ height: 60 }}
          suffix={<SearchOutlined size="large" color="#EB2A74" />}
          placeholder={t("header.searchPlaceholder")}
          onKeyUp={handleSearchChange}
        />
        <span className={`search--mobile ${i18n.language === 'ar' ? 'search--mobile-ar' : ''}`} onClick={handleShowSearchBar}>
          <SearchOutlined size="large" color="#EB2A74" />
        </span>
        <SearchBar moveToTalentProfile={moveToTalentProfile} results={results} />
        <span className="slider-toggle">
          <MenuOutlined size="large" color="#EB2A74" onClick={openSlider} />
        </span>
      </div>
        <Input
          className={`search-input search-input--mobile ${
            i18n.language === "ar" ? "search-input-ar" : ""
          } ${showSearchBar ? 'search-input--mobile-show' : ''}`}
          style={{ height: 60 }}
          placeholder={t("header.searchPlaceholder")}
          onChange={handleSearchChange}
        />
        <SearchBar moveToTalentProfile={moveToTalentProfile} results={results} className="search-bar-result-mobile" />
    </div>
  );
}
