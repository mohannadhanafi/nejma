import { Auth } from 'aws-amplify';
import axios from 'axios';
import { SET_USER, SET_LOADING } from '../_constants';
import { API_CALL } from '../store/constants';

export function bootstrap(dispatch) {
  const onSuccess = ({ data }) => {
    dispatch({ type: SET_USER, payload: { ...data } });
    dispatch({ type: SET_LOADING, payload: false });
  };

  const onFailure = (error) => {
    return { type: SET_LOADING, payload: false };
  };
  dispatch({
    type: API_CALL,
    payload: {
      method: 'post',
      url: '/auth/check-user',
      onSuccess,
      onFailure,
    },
  });
  return () => '';
  //for useEffect (RULE useEffect callback has to return cleanup function)
}
