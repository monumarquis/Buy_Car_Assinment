import axios from "axios";
import {
  OLD_CARS_REQUEST,
  OLD_CARS_SUCCESS,
  OLD_CARS_ERROR,
} from "./oldCars.types";
export const getAllOldCars = (url) => async (dispatch) => {
  dispatch({
    type: OLD_CARS_REQUEST,
  });

  try {
    const { data } = await axios.get(url);
    console.log(data);
    return dispatch({
      type: OLD_CARS_SUCCESS,
      payload: data,
    });
  } catch ({
    response: {
      data: { message },
    },
  }) {
    console.log(message);
    return dispatch({
      type: OLD_CARS_ERROR,
      payload: message,
    });
  }
};
// export const getAllOemCarsSearch = (url) => async (dispatch) => {
//   dispatch({
//     type: OEM_CARS_REQUEST,
//   });

//   try {
//     const { data } = await axios.get(url);
//     console.log(data);
//     return dispatch({
//       type: OEM_CARS_SUCCESS,
//       payload: data,
//     });
//   } catch ({
//     response: {
//       data: { message },
//     },
//   }) {
//     console.log(message);
//     return dispatch({
//       type: OEM_CARS_ERROR,
//       payload: message,
//     });
//   }
// };
