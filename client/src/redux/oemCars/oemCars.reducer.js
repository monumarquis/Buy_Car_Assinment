import {
  OEM_CARS_REQUEST,
  OEM_CARS_SUCCESS,
  OEM_CARS_ERROR,
} from "./oemCars.types";
const initState = {
  data: [],
  totalPages:0,
  loading: false,
  error: false,
};
export const oemCarsReducer = (state = initState, { type, payload }) => {
  switch (type) {
    case OEM_CARS_SUCCESS: {
      return {
        ...state,
        data: payload.cars,
        loading: false,
        error: false,
        totalPages:payload.totalPages,
      };
    }
    case OEM_CARS_REQUEST: {
      return {
        ...state,
        data: [],
        loading: true,
        totalPages:0,
        error: false,
      };
    }
    case OEM_CARS_ERROR: {
      return {
        ...state,
        data: [],
        loading: false,
        totalPages:0,
        error: true,
      };
    }
    default: {
      return state;
    }
  }
};
