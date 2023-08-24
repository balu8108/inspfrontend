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
} from "../constants";
const initialState = {
  isPeerLoading: true,
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
  question: null,
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
    case SET_QUESTION:
      return {
        ...state,
        question: action.payload,
      };
    default:
      return state;
  }
};

export default socketReducer;
