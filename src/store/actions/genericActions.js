import { SET_DOC_ID, SET_IS_DOC_MODAL_OPEN } from "../constants";

export const getAllSubjects = () => async (dispatch) => {};
export const setIsDocModalOpen = (doc_id, value) => async (dispatch) => {
  dispatch({ type: SET_DOC_ID, payload: doc_id });
  dispatch({ type: SET_IS_DOC_MODAL_OPEN, payload: value });
};
