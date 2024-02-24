import {
    SET_STUDENT_FEEDBACK_OPEN,
    SET_STUDENT_FEEDBACK_CLOSE
} from "../constants";

export const setStudentFeedbackOpen = (isFeedbackModalOpen) => async (dispatch) => {
    dispatch({ type: SET_STUDENT_FEEDBACK_OPEN, payload: isFeedbackModalOpen });
}

export const setStudentFeedbackClose = (isFeedbackModalOpen) => async (dispatch) => {
    dispatch({ type: SET_STUDENT_FEEDBACK_CLOSE, payload: isFeedbackModalOpen });
}