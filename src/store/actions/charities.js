import { GET_CHARITIES } from "../../_constants";
import { API_CALL } from "../constants";

export const getCharities = (language) => {
  return {
    type: API_CALL,
    payload: {
      url: "/charity/all",
      method: "get",
      onSuccess: ({ data }) => {
        if (data.length) {
          let charityFields = [];
          data.map((item) => {
            return charityFields.push({
              id: item.id,
              label: item.charityName,
              value: item.charityName,
            });
          });
          return { type: GET_CHARITIES, payload: charityFields };
        } else {
          return { type: GET_CHARITIES, payload: [] };
        }
      },
    },
  };
};
