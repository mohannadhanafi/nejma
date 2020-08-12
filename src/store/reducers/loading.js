import { SET_LOADING } from '../../_constants';

const initialState = true;

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case SET_LOADING:
      return payload;
    default:
      return state;
  }
}
