import { ADD_CLASS_SCHEDULE } from "../constants";

export const setAddClassSchedule =
  (scheduleClassFormData) => async (dispatch) => {
    const restructureScheduleClassData = {
      title: scheduleClassFormData.topic,
      start: `${scheduleClassFormData.date}T${scheduleClassFormData.startTime}`,
      end: `${scheduleClassFormData.date}T${scheduleClassFormData.endTime}`,
    };
    dispatch({
      type: ADD_CLASS_SCHEDULE,
      payload: { restructureScheduleClassData, scheduleClassFormData },
    });
  };
