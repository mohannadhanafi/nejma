import { GET_SOCIAL_MEDIA } from "../../_constants";

export default function (state = [], action) {
  const { type, payload } = action;
  switch (type) {
    case GET_SOCIAL_MEDIA:
      return [...payload];
    default:
      return state;
  }
}
