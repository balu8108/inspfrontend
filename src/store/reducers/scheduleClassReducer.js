import {
  ADD_CLASS_SCHEDULE,
  GET_ALL_LIVE_CLASSES_SCHEDULE,
  IS_SCHEDULE_CLASS_LOADING,
} from "../constants";
import { capitalize, categoriseClass, extractDateInYYYMMDD } from "../../utils";

// scheduled Classes is to put events in calendar as classes
// scheduled classes Data is to put scheduled classes data in left side of the screen view
const initialState = {
  scheduleClassLoading: false,
  scheduledClasses: [],
  scheduledClassesData: { Ongoing: [], Today: [], Week: [], Completed: [] },
};

const scheduleClassReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_CLASS_SCHEDULE:
      const obj = action.payload?.data;
      const createEventForCalendar = {
        title: capitalize(obj?.LiveClassRoomDetail?.topicName),
        start: `${extractDateInYYYMMDD(obj.scheduledDate)}T${
          obj.scheduledStartTime
        }`,
        end: `${extractDateInYYYMMDD(obj.scheduledDate)}T${
          obj.scheduledEndTime
        }`,
      };
      const categorisedClass = categoriseClass(obj);

      if (categorisedClass && categorisedClass !== "Upcoming") {
        return {
          ...state,
          scheduledClasses: [...state.scheduledClasses, createEventForCalendar],
          scheduledClassesData: {
            ...state.scheduledClassesData,
            [categorisedClass]: [
              ...state.scheduledClassesData[categorisedClass],
              obj,
            ],
          },
        };
      } else {
        return {
          ...state,
          scheduledClasses: [...state.scheduledClasses, createEventForCalendar],
        };
      }

    case GET_ALL_LIVE_CLASSES_SCHEDULE:
      let classesData = {
        calendarEvents: [],
        scheduledClasses: { Ongoing: [], Today: [], Week: [], Completed: [] },
      };

      action.payload.data.forEach((obj) => {
        const calendarEventObj = {
          title: capitalize(obj?.LiveClassRoomDetail?.topicName),
          start: `${extractDateInYYYMMDD(obj.scheduledDate)}T${
            obj.scheduledStartTime
          }`,
          end: `${extractDateInYYYMMDD(obj.scheduledDate)}T${
            obj.scheduledEndTime
          }`,
        };
        const categorisedClass = categoriseClass(obj);
        if (categorisedClass === "Ongoing") {
          classesData = {
            ...classesData,
            scheduledClasses: {
              ...classesData.scheduledClasses,
              Ongoing: [...classesData.scheduledClasses.Ongoing, obj],
            },
          };
        } else if (categorisedClass === "Today") {
          classesData = {
            ...classesData,
            scheduledClasses: {
              ...classesData.scheduledClasses,
              Today: [...classesData.scheduledClasses.Today, obj],
            },
          };
        } else if (categorisedClass === "Week") {
          classesData = {
            ...classesData,
            scheduledClasses: {
              ...classesData.scheduledClasses,
              Week: [...classesData.scheduledClasses.Week, obj],
            },
          };
        } else if (categorisedClass === "Completed") {
          classesData = {
            ...classesData,
            scheduledClasses: {
              ...classesData.scheduledClasses,
              Completed: [...classesData.scheduledClasses.Completed, obj],
            },
          };
        }

        classesData = {
          ...classesData,
          calendarEvents: [...classesData.calendarEvents, calendarEventObj],
        };
      });

      return {
        ...state,
        scheduledClasses: classesData.calendarEvents,
        scheduledClassesData: classesData.scheduledClasses,
      };

    case IS_SCHEDULE_CLASS_LOADING:
      return {
        ...state,
        scheduleClassLoading: action.payload,
      };

    default:
      return state;
  }
};

export default scheduleClassReducer;
