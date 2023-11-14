import {
  IS_VIDEO_LOADING,
  SET_AUDIO_CONTROL,
  SET_VIDEO_CONTROL,
} from "../constants";

// From Room preview we provided both as true
const initialState = {
  isVideoLoading: false,
  isPreviewVideoOn: false,
  isPreviewAudioOn: false,
};

const streamControlsReducer = (state = initialState, action) => {
  switch (action.type) {
    case IS_VIDEO_LOADING:
      return {
        ...state,
        isVideoLoading: action.payload,
      };
    case SET_VIDEO_CONTROL:
      return {
        ...state,
        isPreviewVideoOn: action.payload,
      };
    case SET_AUDIO_CONTROL:
      return {
        ...state,
        isPreviewAudioOn: action.payload,
      };
    default:
      return state;
  }
};
export default streamControlsReducer;
