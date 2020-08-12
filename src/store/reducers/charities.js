import { GET_CHARITIES } from "../../_constants";

export default function (state = [], action) {
  const { type, payload } = action;
  switch (type) {
    case GET_CHARITIES:
      return [...payload];
    default:
      return state;
  }
}
