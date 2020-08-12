import React, { useState, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { Row, notification } from "antd";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

import { API_CALL } from "store/constants";
import Button from "components/form/Button";
import TalentCard from "components/TalentCard";
import Pagination from "components/Pagination";
import SearchSection from "components/InviteTalent";
import SortIcon from "assets/icons/sort.svg";
import FilterIcon from "assets/icons/filter.svg";
import Loading from "components/Loading";

import FilterModal from "./Filter";

import "./index.scss";
import categories from "../../../store/reducers/categories";

const CategoryPage = () => {
  const { id } = useParams();
  const sortRef = useRef();
  const [isLoading, setisLoading] = useState(true);
  const [category, setData] = useState();
  const [originalCategories, setOriginalCategories] = useState();
  const { t, i18n } = useTranslation();
  const [sortMethod, setSortMethod] = useState(-1);
  const [showSortDropdown, setShowSortDropdown] = useState(false);
  const dispatch = useDispatch();
  const [showFilter, setShowFilter] = useState(false);

  const onSuccess = ({ data }) => {
    setData(data);
    setOriginalCategories(data);
    setisLoading(false);
    window.scrollTo(0, 0);
  };

  const onFailure = (error) => {
    notification.error({ message: error || error.msg });
  };

  useEffect(() => {
    dispatch({
      type: API_CALL,
      payload: {
        method: "get",
        onSuccess,
        onFailure,
        url: `/talent/${
          id === "tailored" ? "tailored" : "allofcategory"
        }?pageno=1${id !== "tailored" ? `&categoryId=${id}` : ""}&limit=28`,
      },
    });
  }, []);

  const onChangePagination = (pageNumber) => {
    dispatch({
      type: API_CALL,
      payload: {
        method: "get",
        onSuccess,
        onFailure,
        url: `/talent/${
          id === "tailored" ? "tailored" : "allofcategory"
        }?pageno=${pageNumber}${
          id !== "tailored" ? `&categoryId=${id}` : ""
        }&limit=28`,
      },
    });
  };

  const closeFilterModal = () => setShowFilter(false);

  const openFilterModal = () => setShowFilter(true);
  const toggleSortDropDown = (e) => {
    e.stopPropagation();
    setShowSortDropdown(!showSortDropdown);
  };
  const handleFilterModal = (values) => {
    const onSuccessFilter = (response) => {
      const { data } = response;
      if (data.msg) {
        setData("No Results");
      } else {
        console.log(data);
        setData(data);
      }
    };
    const onFailure = (error) => {
      console.log(error);
    };
    dispatch({
      type: API_CALL,
      payload: {
        url: `${
          values.categoryId !== "tailored"
            ? "/talent/allofcategory"
            : "/talent/tailored"
        }`,
        method: "GET",
        params:
          values.categoryId !== "tailored"
            ? { ...values, categoryId: Number(values.categoryId) }
            : { ...values, categoryId: "tailored" },
        onSuccess: onSuccessFilter,
        onFailure,
      },
    });
    closeFilterModal();
  };
  const sortA2Z = () => {
    if (sortMethod === 0) {
      setData({ ...originalCategories });
      return setSortMethod(-1);
    }
    setData({
      ...originalCategories,
      talents: [...originalCategories.talents].sort(function (a, b) {
        if (a.nameEng < b.nameEng) {
          return -1;
        }
        if (a.nameEng > b.nameEng) {
          return 1;
        }
        return 0;
      }),
    });
    setShowSortDropdown(false);
    setSortMethod(0);
  };
  const sortZ2A = () => {
    if (sortMethod === 1) {
      setData({ ...originalCategories });
      return setSortMethod(-1);
    }
    setData({
      ...originalCategories,
      talents: [...originalCategories.talents].sort(function (a, b) {
        if (a.nameEng > b.nameEng) {
          return -1;
        }
        if (a.nameEng < b.nameEng) {
          return 1;
        }
        return 0;
      }),
    });
    setShowSortDropdown(false);
    setSortMethod(1);
  };
  const sortLow2High = () => {
    if (sortMethod === 2) {
      setData({ ...originalCategories });
      return setSortMethod(-1);
    }
    setData({
      ...originalCategories,
      talents: [...originalCategories.talents].sort(function (a, b) {
        if (a.initPrice < b.initPrice) {
          return -1;
        }
        if (a.initPrice > b.initPrice) {
          return 1;
        }
        return 0;
      }),
    });

    setShowSortDropdown(false);
    setSortMethod(2);
  };
  const sortHigh2Low = () => {
    if (sortMethod === 3) {
      setData({ ...originalCategories });
      return setSortMethod(-1);
    }
    setData({
      ...originalCategories,
      talents: [...originalCategories.talents].sort(function (a, b) {
        if (a.initPrice > b.initPrice) {
          return -1;
        }
        if (a.initPrice < b.initPrice) {
          return 1;
        }
        return 0;
      }),
    });

    setShowSortDropdown(false);
    setSortMethod(3);
  };
  if (isLoading) return <Loading />;

  return (
    <>
      <FilterModal
        visible={showFilter}
        onOk={handleFilterModal}
        onClose={closeFilterModal}
      />
      <div
        className="category--page container"
        onClick={() => setShowSortDropdown(false)}
      >
        <div className="category--page--talents">
          <div className="category--page--talents__heading">
            <h1>
              {i18n.language === "en"
                ? category.categoryName
                : category.categoryNameAr}
            </h1>
            <div
              className={`talents--category--heading__buttons ${
                i18n.language === "ar" ? "margin--left" : null
              }`}
            >
              <Button className="filter--button" onClick={openFilterModal}>
                <img src={FilterIcon} />
                <span>{t("category.filter")}</span>
              </Button>
              <Row style={{ position: "relative" }} ref={sortRef}>
                <Button className="filter--button" onClick={toggleSortDropDown}>
                  <img src={SortIcon} />
                  <span>{t("category.sort")}</span>
                </Button>
                {showSortDropdown && (
                  <Row className={"sort-list"}>
                    <p onClick={sortA2Z}>
                      From A - Z{" "}
                      {sortMethod === 0 && (
                        <img
                          src={require("assets/true-icon.png")}
                          width={"23px"}
                          height={"18px"}
                        />
                      )}
                    </p>
                    <p onClick={sortZ2A}>
                      From Z - A{" "}
                      {sortMethod === 1 && (
                        <img
                          src={require("assets/true-icon.png")}
                          width={"23px"}
                          height={"18px"}
                        />
                      )}
                    </p>
                    <p onClick={sortLow2High}>
                      Lowest to highest price{" "}
                      {sortMethod === 2 && (
                        <img
                          src={require("assets/true-icon.png")}
                          width={"23px"}
                          height={"18px"}
                        />
                      )}
                    </p>
                    <p onClick={sortHigh2Low}>
                      Highest to lowest price{" "}
                      {sortMethod === 3 && (
                        <img
                          src={require("assets/true-icon.png")}
                          width={"23px"}
                          height={"18px"}
                        />
                      )}
                    </p>
                  </Row>
                )}
              </Row>
            </div>
          </div>
          <Row className="talents--cards grid">
            {category.talents ? (
              category.talents.map((talent) => (
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
                  className="category--page--talent__card"
                />
              ))
            ) : category === "No Results" ? (
              <h1>{t("allTalents.noResult")}</h1>
            ) : (
              <h1>{t("allTalents.noTalent")}</h1>
            )}
          </Row>
          {category.count > 28 ? (
            <Pagination
              total={category.count}
              pageSize={28}
              onChange={onChangePagination}
            />
          ) : null}
        </div>
      </div>
      <SearchSection />
    </>
  );
};

export default CategoryPage;
