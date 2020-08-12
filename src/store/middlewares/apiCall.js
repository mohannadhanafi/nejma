import { API_CALL } from '../constants';
import axios from 'axios';
import { MAIN_ENDPOINT } from '../../_constants';

export default (store) => (next) => (action) => {
  if (!action) return;
  const { type } = action;
  if (type !== API_CALL) return next(action);
  const {
    onSuccess,
    onFailure = console.log,
    method,
    url,
    data = {},
    headers = {},
    params = {},
  } = action.payload;
  const token = localStorage.getItem('token');
  const language = localStorage.getItem('language');
  axios
    .request({
      method,
      baseURL: MAIN_ENDPOINT,
      url,
      data,
      params,
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'JWT ' + token,
        language,
        ...headers,
      },
    })
    .then((response) => store.dispatch(onSuccess(response)))
    .catch((error) => store.dispatch(onFailure(error)));
};
