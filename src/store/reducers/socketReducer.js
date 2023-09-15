import { copyObject } from "../../utils";
import {
  SET_SOCKET,
  SET_ALL_PEERS,
  SET_NEW_PEER_JOINED,
  IS_PEER_LOADING,
  SET_RTP_CAPABILITIES,
  SET_PEER_LEAVED,
  SET_CONSUMERS,
  SET_MENTOR_CONSUMER_SCREEN_SHARE,
  SET_MENTOR_VIDEO_SHARE_CONSUMER,
  SET_AUDIO_CONSUMERS,
  SET_CHAT_MESSAGE,
  SET_RAISE_HAND,
  SET_FILE_UPLOAD,
  SET_QUESTION,
  SET_MENTOR_VIDEO_SHARE_PAUSE_OR_RESUME,
  GET_LIVE_CLASS_DETAILS,
  GET_UPCOMING_CLASS_DETAILS,
  SET_FILE_UPLOAD_IN_ROOM,
  SET_MENTOR_SCREEN_SHARE_PAUSE_OR_RESUME,
  SET_MIRO_BOARD_DATA,
  SET_LEADERBOARD,
  SET_IS_MEET_ENDED,
} from "../constants";
const initialState = {
  isPeerLoading: true,
  isMeetEnd: false,
  socket: null,
  peers: [],
  rtpCapabilities: null,
  consumers: [],
  mentorScreenShareConsumer: null,
  mentorVideoShareConsumer: null,
  audioConsumers: [],
  chatMessages: [],
  raiseHands: [],
  uploadedFiles: [],
  leaderBoard: [],
  miroBoard: { boardId: null, mode: "view" },
  question: null,
  roomPreviewData: null,
  upcomingClassData: null,
};

const socketReducer = (state = initialState, action) => {
  switch (action.type) {
    case IS_PEER_LOADING:
      return {
        ...state,
        isPeerLoading: action.payload,
      };
    case SET_SOCKET:
      return {
        ...state,
        socket: action.payload,
      };
    case SET_ALL_PEERS:
      return {
        ...state,
        peers: action.payload,
      };
    case SET_NEW_PEER_JOINED:
      return {
        ...state,
        peers: [...state.peers, action.payload],
      };
    case SET_RTP_CAPABILITIES:
      return {
        ...state,
        rtpCapabilities: action.payload,
      };
    case SET_PEER_LEAVED:
      return {
        ...state,
        peers: state.peers.filter((peer) => peer.id !== action.payload.id),
      };
    case SET_CONSUMERS:
      return {
        ...state,
        consumers: [...state.consumers, action.payload],
      };
    case SET_MENTOR_CONSUMER_SCREEN_SHARE:
      return {
        ...state,
        mentorScreenShareConsumer: action.payload,
      };
    case SET_MENTOR_VIDEO_SHARE_CONSUMER:
      return {
        ...state,
        mentorVideoShareConsumer: action.payload,
      };
    case SET_AUDIO_CONSUMERS:
      return {
        ...state,
        audioConsumers: [...state.audioConsumers, action.payload],
      };
    case SET_CHAT_MESSAGE:
      return {
        ...state,
        chatMessages: [...state.chatMessages, action.payload],
      };
    case SET_RAISE_HAND:
      const { isHandRaised, peerDetails } = action.payload;
      if (isHandRaised) {
        return {
          ...state,
          raiseHands: [...state.raiseHands, peerDetails],
        };
      } else {
        return {
          ...state,
          raiseHands: state.raiseHands.filter(
            (peer) => peer.id !== peerDetails.id
          ),
        };
      }
    case SET_FILE_UPLOAD:
      return {
        ...state,
        uploadedFiles: [...state.uploadedFiles, ...action.payload],
      };
    case SET_FILE_UPLOAD_IN_ROOM:
      const { roomType, roomId, files } = action.payload;
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
    case SET_QUESTION:
      return {
        ...state,
        question: action.payload,
      };
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
    case SET_MENTOR_SCREEN_SHARE_PAUSE_OR_RESUME:
      if (state.mentorScreenShareConsumer) {
        const originalConsumer = state.mentorScreenShareConsumer;
        const copiedConsumer = copyObject(originalConsumer);
        if (action.payload === true) {
          copiedConsumer.pause();
        } else {
          copiedConsumer.resume();
        }
        return {
          ...state,
          mentorScreenShareConsumer: copiedConsumer,
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
    case SET_MIRO_BOARD_DATA:
      return {
        ...state,
        miroBoard: {
          ...state.miroBoard,
          boardId: action.payload.boardId,
          mode: action.payload.mode,
        },
      };
    case SET_LEADERBOARD:
      return {
        ...state,
        leaderBoard: action.payload,
      };
    case SET_IS_MEET_ENDED:
      return {
        ...state,
        isMeetEnd: action.payload,
      };
    default:
      return state;
  }
};

export default socketReducer;
