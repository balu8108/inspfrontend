import { copyObject } from "../../utils";
import {
  SET_SOCKET,
  SET_CONSUMERS,
  SET_MENTOR_VIDEO_SHARE_CONSUMER,
  SET_FILE_UPLOAD,
  SET_MENTOR_VIDEO_SHARE_PAUSE_OR_RESUME,
  GET_LIVE_CLASS_DETAILS,
  GET_UPCOMING_CLASS_DETAILS,
  SET_FILE_UPLOAD_IN_ROOM,
} from "../constants";
const initialState = {
  socket: null,
  consumers: [],
  mentorVideoShareConsumer: null,
  uploadedFiles: [],
  roomPreviewData: null,
  upcomingClassData: null,
};

const socketReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_SOCKET:
      return {
        ...state,
        socket: action.payload,
      };
    case SET_CONSUMERS:
      return {
        ...state,
        consumers: [...state.consumers, action.payload],
      };
    case SET_MENTOR_VIDEO_SHARE_CONSUMER:
      return {
        ...state,
        mentorVideoShareConsumer: action.payload,
      };
    case SET_FILE_UPLOAD:
      return {
        ...state,
        uploadedFiles: [...state.uploadedFiles, ...action.payload],
      };
    case SET_FILE_UPLOAD_IN_ROOM:
      const { roomType, files } = action.payload;
      if (roomType === "active" && state.roomPreviewData) {
        return {
          ...state,
          roomPreviewData: {
            ...state.roomPreviewData,
            LiveClassRoomFiles: [
              ...files,
              ...state.roomPreviewData.LiveClassRoomFiles,
            ],
          },
        };
      } else if (roomType === "upcoming" && state.upcomingClassData) {
        return {
          ...state,
          upcomingClassData: {
            ...state.upcomingClassData,
            LiveClassRoomFiles: [
              ...files,
              ...state.upcomingClassData.LiveClassRoomFiles,
            ],
          },
        };
      }
      return state;
    case SET_MENTOR_VIDEO_SHARE_PAUSE_OR_RESUME:
      if (state.mentorVideoShareConsumer) {
        const originalConsumer = state.mentorVideoShareConsumer;
        const copiedConsumer = copyObject(originalConsumer);
        if (action.payload === true) {
          copiedConsumer.pause();
        } else {
          copiedConsumer.resume();
        }
        return {
          ...state,
          mentorVideoShareConsumer: copiedConsumer,
        };
      }
      return state;
    case GET_LIVE_CLASS_DETAILS:
      return {
        ...state,
        roomPreviewData: action.payload.data,
      };
    case GET_UPCOMING_CLASS_DETAILS:
      return {
        ...state,
        upcomingClassData: action.payload.data,
      };

    default:
      return state;
  }
};

export default socketReducer;
