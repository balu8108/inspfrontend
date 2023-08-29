import { combineReducers } from "redux";
import authReducer from "./authReducer";
import socketReducer from "./socketReducer";
import streamControlsReducer from "./streamControlsReducer";
import scheduleClassReducer from "./scheduleClassReducer";
import genericReducer from "./genericReducer";
const reducerObj = {
  auth: authReducer,
  socket: socketReducer,
  streamControls: streamControlsReducer,
  scheduleClass: scheduleClassReducer,
  generic: genericReducer,
  // add more reducers here
};

const rootReducer = combineReducers(reducerObj);

export default rootReducer;
