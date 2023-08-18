import { combineReducers } from "redux";
import authReducer from "./authReducer";
import socketReducer from "./socketReducer";
import streamControlsReducer from "./streamControlsReducer";
import scheduleClassReducer from "./scheduleClassReducer";
const reducerObj = {
  auth: authReducer,
  socket: socketReducer,
  streamControls: streamControlsReducer,
  scheduleClass: scheduleClassReducer,
  // add more reducers here
};

const rootReducer = combineReducers(reducerObj);

export default rootReducer;
