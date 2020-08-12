import { GET_NOTIFICATIONS, SET_NOTIFICATIONS_READ, ADD_NEW_NOTIFICATION } from "../../_constants";

export default function (state = [], action) {
    const { type, payload } = action;
    switch (type) {
      case GET_NOTIFICATIONS:
        return {
          ...state,
          notifications: payload.notifications,
          count: payload.count,
        };
      case SET_NOTIFICATIONS_READ:
        return {
          ...state,
          count: 0,
        }
      case ADD_NEW_NOTIFICATION:
        if (state.notifications) {
          return {
            ...state,
            notifications: [payload, ...state.notifications],
            count: state.count + 1,
          }
        } else {
          return { ...state }
        }
      default:
        return state;
    }
  }
  