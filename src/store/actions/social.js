import axios from "axios";
import { GET_SOCIAL_MEDIA, API, MAIN_ENDPOINT } from "../../_constants";
import { API_CALL } from "../constants";

export const getSocialMedia = (language) => {
  const onSuccess = ({ data }) => {
    if (data.length) {
      let socialFields = [];
      data.map((item) =>
        socialFields.push({
          id: item.id,
          value: item.socialName,
          label: item.socialName,
        })
      );
      return { type: GET_SOCIAL_MEDIA, payload: socialFields };
    } else {
      return { type: GET_SOCIAL_MEDIA, payload: [] };
    }
  };
  return {
    type: API_CALL,
    payload: {
      method: "get",
      url: "/social/all",
      onSuccess,
      onFailure: console.log,
    },
  };
};
