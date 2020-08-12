import axios from "axios";
import { SET_TAGS } from "../../_constants";
import { API_CALL } from "../constants";

export const setTagsAPI = (language) => {
  return {
    type: API_CALL,
    payload: {
      url: "/tag/all",
      method: "get",
      onSuccess: ({ data }) => {
        if (data.length) {
          let tagFields = [];
          data.map((item) => {
            return tagFields.push({
              id: item.id,
              value: item.tagName,
              label: item.tagName,
            });
          });
          return { type: SET_TAGS, payload: tagFields };
        } else {
          return { type: SET_TAGS, payload: [] };
        }
      },
    },
  };
};
