import {
  GET_ALL_SUBJECTS,
  SET_IS_DOC_MODAL_OPEN,
  SET_DOC_KEY,
  SET_FEEDBACK_TOPIC_ID,
  SET_IS_FEEDBACK_MODAL_OPEN,
  SET_DOC,
  SET_CALENDER_DATE,
  SET_CALENDER_TIME,
  SET_CLASS_CHANGES,
} from "../constants";
import { addTimeTableApi, getTimeTableApi } from "../../api/genericapis";

export const getAllSubjects = (value) => async (dispatch) => {
  dispatch({ type: GET_ALL_SUBJECTS, payload: value });
};
export const setIsDocModalOpen =
  (doc_id, doc_key, type, value) => async (dispatch) => {
    dispatch({ type: SET_DOC, payload: { docId: doc_id, docType: type } });
    dispatch({ type: SET_DOC_KEY, payload: doc_key });
    dispatch({ type: SET_IS_DOC_MODAL_OPEN, payload: value });
  };

export const setFeedbackModalOpen =
  (isFeedbackModalOpen, feedbackTopicId) => async (dispatch) => {
    dispatch({ type: SET_FEEDBACK_TOPIC_ID, payload: feedbackTopicId });
    dispatch({
      type: SET_IS_FEEDBACK_MODAL_OPEN,
      payload: isFeedbackModalOpen,
    });
  };

export const setCalenderDate = (value) => async (dispatch) => {
  dispatch({ type: SET_CALENDER_DATE, payload: value });
};
export const setCalenderTime = (value) => async (dispatch) => {
  dispatch({ type: SET_CALENDER_TIME, payload: value });
};
export const setClassChanges = () => async (dispatch) => {
  dispatch({ type: SET_CLASS_CHANGES });
};

export const AddTimeTable = (formData) => async () => {
  try {
    const { data, status } = await addTimeTableApi(formData);
    return { data, status };
  } catch (err) {
    console.log(err);
    return err;
  }
};

export const getTimeTable = () => async () => {
  try {
    const { data, status } = await getTimeTableApi();
    return { data, status };
  } catch (err) {
    console.log(err);
    return err;
  }
};
