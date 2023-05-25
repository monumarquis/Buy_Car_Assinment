import { LOGIN_ERROR, LOGIN_REQUEST, LOGIN_SUCCESS, LOGOUT } from "./user.types";

let token = localStorage.getItem("token")
const initState = {
  isAuth: !!token,
  token,
  userId: localStorage.getItem("userId"),
  loading: false,
  error: false
};
export const userReducer = (
  state = initState,
  { type, payload }
) => {
  switch (type) {
    case LOGIN_SUCCESS: {
      localStorage.setItem("token", payload.token)
      localStorage.setItem("userId", payload.id)

      return {
        ...state,
        isAuth: true,
        token: payload.token,
        userId: payload.id,
        loading: false,
        error: false
      };
    }
    case LOGIN_REQUEST: {

      return {
        ...state,
        isAuth: false,
        token: "",
        userId: "",
        loading: true,
        error: false
      };
    }
    case LOGIN_ERROR: {

      return {
        ...state,
        isAuth: false,
        token: "",
        userId: "",
        loading: false,
        error: true,
        errorMessage: payload
      };
    }
    case LOGOUT: {
      localStorage.removeItem("token")
      localStorage.removeItem("userId")
      return {
        ...state,
        isAuth: false,
        token: "",
        userId: "",
        loading: false,
        error: false
      };
    }

    default: {
      return state;
    }
  }
};