import { combineReducers } from "redux";
import authReducer from "./authReducer";
import socketReducer from "./socketReducer";
import streamControlsReducer from "./streamControlsReducer";
import scheduleClassReducer from "./scheduleClassReducer";
import genericReducer from "./genericReducer";
import studentFeedbackReducer from "./studentFeedbackReducer";

const reducerObj = {
  auth: authReducer,
  socket: socketReducer,
  streamControls: streamControlsReducer,
  scheduleClass: scheduleClassReducer,
  generic: genericReducer,
  studentFeedback: studentFeedbackReducer,
  // add more reducers here
};

const rootReducer = combineReducers(reducerObj);

export default rootReducer;
