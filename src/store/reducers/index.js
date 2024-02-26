import { combineReducers } from "redux";
import authReducer from "./authReducer";
import socketReducer from "./socketReducer";
import streamControlsReducer from "./streamControlsReducer";
import scheduleClassReducer from "./scheduleClassReducer";
import genericReducer from "./genericReducer";
import studentFeedbackReducer from "./studentFeedbackReducer";
import streamReducer from "./streamReducer";
import chatReducer from "./chatReducer";
import memberReducer from "./memberReducer";

const reducerObj = {
  auth: authReducer,
  socket: socketReducer,
  stream: streamReducer,  // created by harshit
  chat: chatReducer,    // created by harshit
  member: memberReducer, // created by harshit
  streamControls: streamControlsReducer,
  scheduleClass: scheduleClassReducer,
  generic: genericReducer,
  studentFeedback: studentFeedbackReducer,
  // add more reducers here
};

const rootReducer = combineReducers(reducerObj);

export default rootReducer;
