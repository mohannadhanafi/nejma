import { GET_CATEGORIES } from "../../_constants";
import { API_CALL } from "../constants";

export const getCategories = (language) => {
  return {
    type: API_CALL,
    payload: {
      url: "/category/all",
      method: "get",
      onSuccess: (response) => onSuccess({ ...response, language }),
      onFailure: console.log,
    },
  };
};

function onSuccess({ data, language }) {
  if (data.length) {
    let categoryFields = [];
    data.map((item) =>
      categoryFields.push({
        id: item.id,
        label: item.categoryName,
        value: item.categoryName,
      })
    );

    return { type: GET_CATEGORIES, payload: categoryFields };
  } else {
    return { type: GET_CATEGORIES, payload: [] };
  }
}

function onFailure() {}
