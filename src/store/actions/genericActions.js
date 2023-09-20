import { SET_DOC_ID, SET_IS_DOC_MODAL_OPEN, SET_DOC_KEY } from "../constants";

export const getAllSubjects = () => async (dispatch) => {};
export const setIsDocModalOpen =
  (doc_id, doc_key, value) => async (dispatch) => {
    dispatch({ type: SET_DOC_ID, payload: doc_id });
    dispatch({ type: SET_DOC_KEY, payload: doc_key });
    dispatch({ type: SET_IS_DOC_MODAL_OPEN, payload: value });
  };
