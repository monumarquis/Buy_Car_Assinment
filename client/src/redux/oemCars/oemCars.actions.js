import axios from "axios";
import {
  OEM_CARS_REQUEST,
  OEM_CARS_SUCCESS,
  OEM_CARS_ERROR,
} from "./oemCars.types";
export const getAllOemCars = (url) => async (dispatch) => {
  dispatch({
    type: OEM_CARS_REQUEST,
  });

  try {
    const { data } = await axios.get(url);
    console.log(data);
    return dispatch({
      type: OEM_CARS_SUCCESS,
      payload: data,
    });
  } catch ({
    response: {
      data: { message },
    },
  }) {
    console.log(message);
    return dispatch({
      type: OEM_CARS_ERROR,
      payload: message,
    });
  }
};
export const getAllOemCarsSearch = (url) => async (dispatch) => {
  dispatch({
    type: OEM_CARS_REQUEST,
  });

  try {
    const { data } = await axios.get(url);
    console.log(data);
    return dispatch({
      type: OEM_CARS_SUCCESS,
      payload: data,
    });
  } catch ({
    response: {
      data: { message },
    },
  }) {
    console.log(message);
    return dispatch({
      type: OEM_CARS_ERROR,
      payload: message,
    });
  }
};
