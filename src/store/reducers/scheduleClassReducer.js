import {
  ADD_CLASS_SCHEDULE,
  ADD_CALENDER_CLASS_DATA,
  GET_ALL_LIVE_CLASSES_SCHEDULE,
} from "../constants";

const initialState = {
  scheduledClasses: [],
  scheduledClassesData: { Ongoing: [], Today: [], Week: [], Completed: [] },
};

const scheduleClassReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_CALENDER_CLASS_DATA:
      return {
        ...state,
        scheduledClasses: action.payload?.data,
      };

    case ADD_CLASS_SCHEDULE:
      const obj = action.payload?.data;
      let tempscheduledClassesData = state.scheduledClassesData;
      tempscheduledClassesData[obj?.category].push(obj);
      return {
        ...state,
        scheduledClassesData: tempscheduledClassesData,
      };

    case GET_ALL_LIVE_CLASSES_SCHEDULE:
      return {
        ...state,
        scheduledClassesData: action.payload.data,
      };

    default:
      return state;
  }
};

export default scheduleClassReducer;
