import { SET_USER_PROFILE, SET_SECRET_TOKEN } from "../constants";

const initialState = {
  userProfile: null,
  secretToken: null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER_PROFILE:
      return {
        ...state,
        userProfile: action.payload,
      };
    case SET_SECRET_TOKEN:
      return {
        ...state,
        secretToken: action.payload,
      };
    default:
      return state;
  }
};

export default authReducer;
