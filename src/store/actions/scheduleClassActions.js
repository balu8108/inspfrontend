import {
  createLiveClassApi,
  getAllLiveClassesApi,
  getAllLiveCalenderClassesApi,
  addClassAssignmentApi,
} from "../../api/scheduleliveclass";
import {
  ADD_CLASS_SCHEDULE,
  GET_ALL_LIVE_CLASSES_SCHEDULE,
  ADD_CALENDER_CLASS_DATA,
} from "../constants";

export const getAllLiveClassesSchedule = () => async (dispatch) => {
  try {
    const res = await getAllLiveClassesApi();
    if (res.status === 200) {
      dispatch({ type: GET_ALL_LIVE_CLASSES_SCHEDULE, payload: res.data });
    }
  } catch (err) {
    console.log(err);
  }
};

export const getAllLiveCalanderClasses = () => async (dispatch) => {
  try {
    const res = await getAllLiveCalenderClassesApi();
    if (res.status === 200) {
      dispatch({ type: ADD_CALENDER_CLASS_DATA, payload: res.data });
    }
  } catch (err) {
    console.log(err);
  }
};

export const setAddClassSchedule =
  (scheduleClassFormData) => async (dispatch) => {
    try {
      const { data, status } = await createLiveClassApi(scheduleClassFormData);
      dispatch({
        type: ADD_CLASS_SCHEDULE,
        payload: data,
      });
      return { data, status };
    } catch (err) {
      return err;
    }
  };

export const setClassSchedule = (scheduleClassFormData) => async (dispatch) => {
  try {
    const { data, status } = await createLiveClassApi(scheduleClassFormData);
    return { data, status };
  } catch (err) {
    console.log(err);
    return err;
  }
};

export const AddClassAssignment =
  (type, classId, classFormData) => async (dispatch) => {
    try {
      const { data, status } = await addClassAssignmentApi(
        type,
        classId,
        classFormData
      );
      return { data, status };
    } catch (err) {
      console.log(err);
      return err;
    }
  };
