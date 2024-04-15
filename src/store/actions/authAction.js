import { SET_SECRET_TOKEN, SET_USER_PROFILE } from "../constants";

export const setSecretToken = (value) => async (dispatch) => {
  dispatch({ type: SET_SECRET_TOKEN, payload: value });
};

export const setUserProfile = (value) => async (dispatch) => {
  dispatch({ type: SET_USER_PROFILE, payload: value });
};
