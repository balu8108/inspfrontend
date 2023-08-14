import {
  IS_VIDEO_LOADING,
  SET_AUDIO_CONTROL,
  SET_VIDEO_CONTROL,
} from "../constants";

export const setVideoControl = (value) => async (dispatch) => {
  dispatch({ type: IS_VIDEO_LOADING, payload: true });
  dispatch({ type: SET_VIDEO_CONTROL, payload: value });
  dispatch({ type: IS_VIDEO_LOADING, payload: false });
};

export const setAudioControl = (value) => async (dispatch) => {
  dispatch({ type: SET_AUDIO_CONTROL, payload: value });
};
