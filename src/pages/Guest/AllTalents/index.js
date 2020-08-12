import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import Category from "./Category";
import { API_CALL } from "store/constants";
import Loading from "components/Loading";

import "./index.scss";
import FilterModal from "../CategoryPage/Filter";
import talent from "../../../router/talent";

const AllTalents = () => {
  const { t } = useTranslation();
  const [talents, setTalents] = useState([]);
  const [isLoading, setisLoading] = useState(true);

  const dispatch = useDispatch();

  const onSuccess = ({ data }) => {
    setTalents(data);
    setisLoading(false);
  };

  const onFailure = (error) => {
    setisLoading(false);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch({
      type: API_CALL,
      payload: {
        method: "get",
        onSuccess,
        onFailure,
        url: "/talent/page2/7",
      },
    });
  }, []);
  console.log(talents);
  if (isLoading) return <Loading />;

  return (
    <div className="all-talents page container">
      {talents ? (
        <Category talents={talents} />
      ) : (
        <div className="no-talents">
          <h1>{t("allTalents.noTalent")}</h1>
        </div>
      )}
    </div>
  );
};

export default AllTalents;
