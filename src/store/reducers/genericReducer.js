import {
  GET_ALL_SUBJECTS,
  SET_DOC_ID,
  SET_IS_DOC_MODAL_OPEN,
} from "../constants";

const initialState = {
  subjects: [],
  isDocModalOpen: false,
  docId: null,
};

const genericReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_SUBJECTS:
      return {
        ...state,
        subjects: action.payload,
      };
    case SET_IS_DOC_MODAL_OPEN:
      return {
        ...state,
        isDocModalOpen: action.payload,
      };
    case SET_DOC_ID:
      return {
        ...state,
        docId: action.payload,
      };
    default:
      return state;
  }
};
export default genericReducer;
