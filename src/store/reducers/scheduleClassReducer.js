import { ADD_CLASS_SCHEDULE } from "../constants";

// scheduled Classes is to put events in calendar as classes
// scheduled classes Data is to put scheduled classes data in left side of the screen view
const initialState = {
  scheduledClasses: [],
  scheduledClassesData: [],
};

const scheduleClassReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_CLASS_SCHEDULE:
      return {
        ...state,
        scheduledClasses: [
          ...state.scheduledClasses,
          action.payload.restructureScheduleClassData,
        ],
        scheduledClassesData: [
          action.payload.scheduleClassFormData,
          ...state.scheduledClassesData,
        ],
      };

    default:
      return state;
  }
};

export default scheduleClassReducer;
