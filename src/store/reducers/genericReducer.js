import {
  GET_ALL_SUBJECTS,
  GET_ALL_TOPICS,
  SET_DOC,
  SET_DOC_ID,
  SET_DOC_KEY,
  SET_FEEDBACK_TOPIC_ID,
  SET_IS_DOC_MODAL_OPEN,
  SET_IS_FEEDBACK_MODAL_OPEN,
  SET_CALENDER_DATE,
  SET_CALENDER_TIME,
  SET_CLASS_CHANGES,
} from "../constants";

const initialState = {
  subjects: [],
  topics: [],
  isDocModalOpen: false,
  docId: null,
  docType: null,
  docKey: null,
  isFeedbackModalOpen: false,
  feedbackTopicId: null,
  calenderPickedDate: "",
  calenderPickedTime: "",
  isClassScheduleChange: false,
};

const genericReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_SUBJECTS:
      return {
        ...state,
        subjects: action.payload,
      };
    case GET_ALL_TOPICS:
      return {
        ...state,
        topics: action.payload,
      };
    case SET_IS_DOC_MODAL_OPEN:
      return {
        ...state,
        isDocModalOpen: action.payload,
      };
    case SET_DOC: {
      return {
        ...state,
        docId: action.payload.docId,
        docType: action.payload.docType,
      };
    }
    case SET_DOC_ID:
      return {
        ...state,
        docId: action.payload,
      };
    case SET_DOC_KEY:
      return {
        ...state,
        docKey: action.payload,
      };
    case SET_FEEDBACK_TOPIC_ID:
      return {
        ...state,
        feedbackTopicId: action.payload,
      };
    case SET_IS_FEEDBACK_MODAL_OPEN:
      return {
        ...state,
        isFeedbackModalOpen: action.payload,
      };
    case SET_CALENDER_DATE:
      return {
        ...state,
        calenderPickedDate: action.payload,
      };
    case SET_CALENDER_TIME:
      return {
        ...state,
        calenderPickedTime: action.payload,
      };
    case SET_CLASS_CHANGES:
      return {
        ...state,
        isClassScheduleChange: !state.isClassScheduleChange,
      };
    default:
      return state;
  }
};
export default genericReducer;
