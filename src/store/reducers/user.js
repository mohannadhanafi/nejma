import { SET_USER, LOGOUT } from '../../_constants';

const initialState = {};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case SET_USER:
      return {
        ...state,
        ...payload,
      };
    case LOGOUT:
      return {};
    default:
      return state;
  }
}
