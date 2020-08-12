import { GET_NOTIFICATIONS, SET_NOTIFICATIONS_READ, ADD_NEW_NOTIFICATION } from "../../_constants";
import { API_CALL } from "../constants";

export const getNotifications = () => {
  return {
    type: API_CALL,
    payload: {
      url: "/notification/all",
      method: "get",
      onSuccess: ({ data: { notifications, unSeenCount } }) => {
        // if (notifications.length) {
          return { type: GET_NOTIFICATIONS, payload: { notifications, count: unSeenCount } };
        // } else {
        //   return { type: GET_NOTIFICATIONS, payload: { notifications, count: unSeenCount } };
        // }
      },
    },
  };
};

export const setAllAsRead = () => {
  return {
    type: API_CALL,
    payload: {
      url: "/notification/setallasseen",
      method: "post",
      onSuccess: () => {
        return { type: SET_NOTIFICATIONS_READ, payload: { count: 0 } };
      },
    },
  };
};

export const addNotification = (data) => {
  const finalData = {
    type: data.type,
    data: data.data
  }
  return {
    type: ADD_NEW_NOTIFICATION,
    payload: finalData
  }
}