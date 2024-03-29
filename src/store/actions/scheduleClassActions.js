import {
  createLiveClassApi,
  getAllLiveClassesApi,
  addClassAssignmentApi,
} from "../../api/scheduleliveclass";
import {
  ADD_CLASS_SCHEDULE,
  GET_ALL_LIVE_CLASSES_SCHEDULE,
  IS_SCHEDULE_CLASS_LOADING,
} from "../constants";

export const getAllLiveClassesSchedule = () => async (dispatch) => {
  try {
    dispatch({ type: IS_SCHEDULE_CLASS_LOADING, payload: true });
    const res = await getAllLiveClassesApi();
    if (res.status === 200) {
      dispatch({ type: GET_ALL_LIVE_CLASSES_SCHEDULE, payload: res.data });
    }
    dispatch({ type: IS_SCHEDULE_CLASS_LOADING, payload: false });
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
