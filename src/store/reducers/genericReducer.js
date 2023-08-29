import { GET_ALL_SUBJECTS } from "../constants";

const initialState = {
  subjects: [],
};

const genericReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_SUBJECTS:
      return {
        ...state,
        subjects: action.payload,
      };
    default:
      return state;
  }
};
export default genericReducer;
