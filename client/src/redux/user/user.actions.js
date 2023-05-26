
import axios from "axios";
import {  LOGIN_ERROR, LOGIN_REQUEST, LOGIN_SUCCESS, LOGOUT } from "./user.types";
export const LogIn = (creds) => async (dispatch) => {
  dispatch({
    type: LOGIN_REQUEST
  });

  try {
    const { data } = await axios.post(`https://car-dealer-server-production.up.railway.app/users/login`, creds);
    console.log(data);
    return dispatch({
      type: LOGIN_SUCCESS,
      payload: data,
    });
  }
  catch ({ response: { data: { message } } }) {
    console.log(message);
    return dispatch({
      type: LOGIN_ERROR,
      payload: message,
    });

  }
};

export const LogOut = () => ({ type: LOGOUT })