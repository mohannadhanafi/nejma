import { SET_TAGS } from "../../_constants";

export default function (state = [], action) {
  const { type, payload } = action;
  switch (type) {
    case SET_TAGS:
      return [...payload];
    default:
      return state;
  }
}
