import { GET_CATEGORIES } from "../../_constants";

export default function (state = [], action) {
  const { type, payload } = action;
  switch (type) {
    case GET_CATEGORIES:
      return [...payload];
    default:
      return state;
  }
}
