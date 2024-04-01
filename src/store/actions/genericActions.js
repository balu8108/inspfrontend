import {
  GET_ALL_SUBJECTS,
  SET_IS_DOC_MODAL_OPEN,
  SET_DOC_KEY,
  SET_FEEDBACK_TOPIC_ID,
  SET_IS_FEEDBACK_MODAL_OPEN,
  SET_DOC,
} from "../constants";

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
