import axios from "axios";
import { GET_LANGUAGES, API, MAIN_ENDPOINT } from "../../_constants";
import { API_CALL } from "../constants";

export const getLanguages = (language) => {
  const onSuccess = ({ data }) => {
    if (data.length) {
      let languageFields = [];
      data.map((item) =>
        languageFields.push({
          id: item.id,
          value: language === "en" ? item.languageName : item.languageName,
          label: language === "en" ? item.languageName : item.languageName,
        })
      );
      return { type: GET_LANGUAGES, payload: languageFields };
    } else {
      return { type: GET_LANGUAGES, payload: [] };
    }
  };
  return {
    type: API_CALL,
    payload: {
      url: "/language/all",
      method: "get",
      onSuccess,
    },
  };
};
