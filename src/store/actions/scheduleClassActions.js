import {
  createLiveClassApi,
  getAllLiveClassesApi,
} from "../../api/scheduleliveclass";
import {
  ADD_CLASS_SCHEDULE,
  GET_ALL_LIVE_CLASSES_SCHEDULE,
} from "../constants";

export const getAllLiveClassesSchedule = () => async (dispatch) => {
  try {
    const { data } = await getAllLiveClassesApi();

    dispatch({ type: GET_ALL_LIVE_CLASSES_SCHEDULE, payload: data });
  } catch (err) {
    console.log(err);
  }
};

export const setAddClassSchedule =
  (scheduleClassFormData) => async (dispatch) => {
    try {
      const { data } = await createLiveClassApi(scheduleClassFormData);
      dispatch({
        type: ADD_CLASS_SCHEDULE,
        payload: data,
      });
    } catch (err) {
      console.log(err);
    }
  };
