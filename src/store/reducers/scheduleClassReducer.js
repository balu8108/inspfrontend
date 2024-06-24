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
      let tempCalenderClasses = state.scheduledClasses;
      tempscheduledClassesData[obj?.category].push(obj);
      const calenderData = {
        id: obj?.id,
        title: obj?.LiveClassRoomDetail?.chapterName,
        classType: obj?.classType,
        classLevel: obj?.classLevel,
        start: `${obj?.scheduledDate.split("T")[0]}T${
          obj?.scheduledStartTime
        }:00`,
        end: `${obj?.scheduledDate.split("T")[0]}T${obj?.scheduledEndTime}:00`,
      };
      tempCalenderClasses.push(calenderData);
      return {
        ...state,
        scheduledClasses: tempCalenderClasses,
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
