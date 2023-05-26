import {
  legacy_createStore,
  combineReducers,
  applyMiddleware,
  compose,
} from "redux";
import thunk from "redux-thunk";
import { userReducer } from "./user/user.reducer";
import { oemCarsReducer } from "./oemCars/oemCars.reducer";
import { oldarsReducer } from "./oldCars/oldCars.reducer";

const rootReducer = combineReducers({
  auth: userReducer,
  oem_cars: oemCarsReducer,
  old_cars:oldarsReducer
});

const createCompose = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
export const store = legacy_createStore(
  rootReducer,
  createCompose(applyMiddleware(thunk))
);
