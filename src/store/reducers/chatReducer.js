import {
  SET_CHAT_MESSAGE,
  SET_LEADERBOARD,
  SET_QUESTION_MSG,
  SET_SEND_POLL_RESPONSE,
  RESET_CHAT_MESSAGES,
  RESET_QUESTION_MESSAGES,
} from "../constants";
const initialState = {
  chatMessages: [], 
  leaderBoard: [], 
  questionMessages: [], 
  pollData: null,
};

const chatReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_CHAT_MESSAGE:
      return {
        ...state,
        chatMessages: [...state.chatMessages.slice(-50), action.payload],
      };
    case SET_QUESTION_MSG:
      return {
        ...state,
        questionMessages: [
          ...state.questionMessages.slice(-50),
          action.payload,
        ],
      };
    case SET_LEADERBOARD:
      return {
        ...state,
        leaderBoard: action.payload,
      };
    case SET_SEND_POLL_RESPONSE:
      return {
        ...state,
        pollData: action.payload,
      };
    case RESET_CHAT_MESSAGES:
      return {
        ...state,
        chatMessages: [],
      };
    case RESET_QUESTION_MESSAGES:
      return {
        ...state,
        questionMessages: [],
      };
    default:
      return state;
  }
};

export default chatReducer;
