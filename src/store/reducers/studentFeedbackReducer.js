import {
    SET_STUDENT_FEEDBACK_OPEN,
    SET_STUDENT_FEEDBACK_CLOSE
} from "../constants";

const initialState = {
    isStudentFeedbackModalOpen: false,
};

const studentFeedbackReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_STUDENT_FEEDBACK_OPEN:
            return {
                ...state,
                isStudentFeedbackModalOpen: action.payload,
            };
        case SET_STUDENT_FEEDBACK_CLOSE:
            return {
                ...state,
                isStudentFeedbackModalOpen: action.payload,
            };
        default:
            return state;
    }
};
export default studentFeedbackReducer;
