import {
  OLD_CARS_REQUEST,
  OLD_CARS_SUCCESS,
  OLD_CARS_ERROR,
} from "./oldCars.types";
const initState = {
  data: [],
  totalPages:0,
  loading: false,
  error: false,
};
export const oldarsReducer = (state = initState, { type, payload }) => {
  switch (type) {
    case OLD_CARS_SUCCESS: {
      return {
        ...state,
        data: payload.cars,
        loading: false,
        error: false,
        totalPages:payload.totalPages,
      };
    }
    case OLD_CARS_REQUEST: {
      return {
        ...state,
        data: [],
        loading: true,
        totalPages:0,
        error: false,
      };
    }
    case OLD_CARS_ERROR: {
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
