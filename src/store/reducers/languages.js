import { GET_LANGUAGES } from "../../_constants";

export default function (state = [], action) {
  const { type, payload } = action;
  switch (type) {
    case GET_LANGUAGES:
      return [...payload];
    default:
      return state;
  }
}
