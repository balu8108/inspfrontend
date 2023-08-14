import { combineReducers } from "redux";
import authReducer from "./authReducer";
import socketReducer from "./socketReducer";
import streamControlsReducer from "./streamControlsReducer";
const reducerObj = {
  auth: authReducer,
  socket: socketReducer,
  streamControls: streamControlsReducer,
  // add more reducers here
};

const rootReducer = combineReducers(reducerObj);

export default rootReducer;
