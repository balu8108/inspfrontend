import {
  ADD_CLASS_SCHEDULE,
  GET_ALL_LIVE_CLASSES_SCHEDULE,
} from "../constants";
import { extractDateInYYYMMDD } from "../../utils";

// scheduled Classes is to put events in calendar as classes
// scheduled classes Data is to put scheduled classes data in left side of the screen view
const initialState = {
  scheduledClasses: [],
  scheduledClassesData: [],
};

const scheduleClassReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_CLASS_SCHEDULE:
      const obj = action.payload?.data;
      const createEventForCalendar = {
        title: obj.LiveClassRoomDetail.topicName,
        start: `${extractDateInYYYMMDD(obj.scheduledDate)}T${
          obj.scheduledStartTime
        }`,
        end: `${extractDateInYYYMMDD(obj.scheduledDate)}T${
          obj.scheduledEndTime
        }`,
      };

      return {
        ...state,
        scheduledClasses: [...state.scheduledClasses, createEventForCalendar],
        scheduledClassesData: [
          action.payload.data,
          ...state.scheduledClassesData,
        ],
      };
    case GET_ALL_LIVE_CLASSES_SCHEDULE:
      const restructureScheduledClassesData = action.payload.data.map((obj) => {
        return {
          title: obj.LiveClassRoomDetail.topicName,
          start: `${extractDateInYYYMMDD(obj.scheduledDate)}T${
            obj.scheduledStartTime
          }`,
          end: `${extractDateInYYYMMDD(obj.scheduledDate)}T${
            obj.scheduledEndTime
          }`,
        };
      });

      return {
        ...state,
        scheduledClasses: restructureScheduledClassesData,
        scheduledClassesData: action.payload.data,
      };

    default:
      return state;
  }
};

export default scheduleClassReducer;
