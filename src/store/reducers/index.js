import { combineReducers } from "redux";
import authReducer from "./authReducer";

const reducerObj = {
  auth: authReducer,
  // add more reducers here
};

const rootReducer = combineReducers(reducerObj);

export default rootReducer;
