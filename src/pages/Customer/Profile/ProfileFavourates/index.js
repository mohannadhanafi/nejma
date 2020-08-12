import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";

import TalentCard from "components/TalentCard";
import { API_CALL } from "store/constants";

import "./index.scss";
import Loading from "components/Loading";

const ProfileFavourates = () => {
  const [isLoading, setisLoading] = useState(true);
  const [favourates, setFavourates] = useState([
    {
      id: 1,
      initPrice: "150",
      picUrl: "test",
      nameEng: "Mohannad",
      nameAr: "مهند",
      category: {
        categoryName: "Influencers",
        categoryNameAr: "مؤثرين",
      },
    },
    {
      id: 1,
      initPrice: "150",
      picUrl: "test",
      nameEng: "Mohannad",
      nameAr: "مهند",
      category: {
        categoryName: "Influencers",
        categoryNameAr: "مؤثرين",
      },
    },
    {
      id: 1,
      initPrice: "150",
      picUrl: "test",
      nameEng: "Mohannad",
      nameAr: "مهند",
      category: {
        categoryName: "Influencers",
        categoryNameAr: "مؤثرين",
      },
    },
    {
      id: 1,
      initPrice: "150",
      picUrl: "test",
      nameEng: "Mohannad",
      nameAr: "مهند",
      category: {
        categoryName: "Influencers",
        categoryNameAr: "مؤثرين",
      },
    },
    {
      id: 1,
      initPrice: "150",
      picUrl: "test",
      nameEng: "Mohannad",
      nameAr: "مهند",
      category: {
        categoryName: "Influencers",
        categoryNameAr: "مؤثرين",
      },
    },
    {
      id: 1,
      initPrice: "150",
      picUrl: "test",
      nameEng: "Mohannad",
      nameAr: "مهند",
      category: {
        categoryName: "Influencers",
        categoryNameAr: "مؤثرين",
      },
    },
    {
      id: 1,
      initPrice: "150",
      picUrl: "test",
      nameEng: "Mohannad",
      nameAr: "مهند",
      category: {
        categoryName: "Influencers",
        categoryNameAr: "مؤثرين",
      },
    },
  ]);

  // const onSuccess = ({ data }) => {
  //   // setFavourates(data);
  //   setisLoading(false);
  // };

  // const onFailure = (error) => {
  //   // notification.error({ message: error || error.msg });
  // };

  // const dispatch = useDispatch();
  // useEffect(() => {
  //   dispatch({
  //     type: API_CALL,
  //     payload: {
  //       method: "get",
  //       onSuccess,
  //       onFailure,
  //       url: "/customer/likes",
  //     },
  //   });
  // }, []);

  // if (isLoading) return <Loading />;

  return (
    <div className="container profile--favourates">
      {favourates.map((item) => (
        <TalentCard
          id={item.id}
          image={item.picUrl}
          nameEn={item.nameEng}
          nameAr={item.nameAr || item.nameEng}
          categoryEn={
            item.category ? item.category.categoryName : item.categoryName
          }
          categoryAr={
            item.category ? item.category.categoryNameAr : item.categoryNameAr
          }
          price={item.initPrice}
          className="favourates--customer"
        />
      ))}
    </div>
  );
};

export default ProfileFavourates;
