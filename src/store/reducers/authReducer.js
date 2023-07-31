import { SET_USER, IS_LOADING, IS_ERROR } from "../constants";

const initialState = {
  user: null,
  token: null,
  isLoading: false,
  isError: null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case IS_LOADING:
      return {
        ...state,
        isLoading: action.payload,
      };
    case IS_ERROR:
      return {
        ...state,
        isError: action.payload,
      };
    case SET_USER:
      return {
        ...state,
        user: action.payload,
      };
    default:
      return state;
  }
};

export default authReducer;
