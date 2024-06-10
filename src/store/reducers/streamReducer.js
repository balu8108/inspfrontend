import { copyObject } from "../../utils";
import {
  SET_RTP_CAPABILITIES,
  SET_MENTOR_CONSUMER_SCREEN_SHARE,
  SET_AUDIO_CONSUMERS,
  SET_RAISE_HAND,
  SET_QUESTION,
  SET_MENTOR_SCREEN_SHARE_PAUSE_OR_RESUME,
  SET_IS_MEET_ENDED,
  SET_AUDIO_CONSUMER_PAUSE_OR_RESUME,
  SET_IS_KICKED_OUT,
  SET_SELF_DETAILS,
  SET_POLL_TIMER_INCREASE,
} from "../constants";
const initialState = {
  isMeetEnd: false,
  isKickedOut: false,
  selfDetails: null,
  rtpCapabilities: null,
  mentorScreenShareConsumer: null,
  audioConsumers: [],
  raiseHands: [],
  question: null,
  pollTimerIncrease: null,
};

const streamReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_SELF_DETAILS:
      return {
        ...state,
        selfDetails: action.payload,
      };
    case SET_RTP_CAPABILITIES:
      return {
        ...state,
        rtpCapabilities: action.payload,
      };
    case SET_MENTOR_CONSUMER_SCREEN_SHARE:
      return {
        ...state,
        mentorScreenShareConsumer: action.payload,
      };
    case SET_AUDIO_CONSUMERS:
      return {
        ...state,
        audioConsumers: [...state.audioConsumers, action.payload],
      };
    case SET_POLL_TIMER_INCREASE:
      return {
        ...state,
        pollTimerIncrease: action.payload,
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
    case SET_QUESTION:
      return {
        ...state,
        question: action.payload,
      };
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
    case SET_AUDIO_CONSUMER_PAUSE_OR_RESUME:
      if (state.audioConsumers?.length > 0) {
        const { value, producerId } = action.payload;
        const audioConsumerIdx = state.audioConsumers.findIndex(
          (obj) => obj.producerId === producerId
        );
        if (audioConsumerIdx !== -1) {
          const originalConsumer = state.audioConsumers[audioConsumerIdx];
          const copiedConsumer = copyObject(originalConsumer);
          if (value === true) {
            copiedConsumer.pause();
          } else {
            copiedConsumer.resume();
          }
          const modifiedConsummers = [
            ...state.audioConsumers.slice(0, audioConsumerIdx),
            copiedConsumer,
            ...state.audioConsumers.splice(audioConsumerIdx + 1),
          ];

          return {
            ...state,
            audioConsumers: modifiedConsummers,
          };
        }

        return state;
      }
      return state;
    case SET_IS_MEET_ENDED:
      return {
        ...state,
        isMeetEnd: action.payload,
      };
    case SET_IS_KICKED_OUT:
      return {
        ...state,
        isKickedOut: action.payload,
      };

    default:
      return state;
  }
};

export default streamReducer;
