import {
  getLiveClassDetailsApi,
  getUpcomingClassApi,
} from "../../api/scheduleliveclass";
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
  GET_LIVE_CLASS_DETAILS,
  GET_UPCOMING_CLASS_DETAILS,
  SET_FILE_UPLOAD_IN_ROOM,
  SET_MENTOR_VIDEO_SHARE_PAUSE_OR_RESUME,
  SET_MENTOR_SCREEN_SHARE_PAUSE_OR_RESUME,
  SET_MIRO_BOARD_DATA,
  SET_LEADERBOARD,
  SET_IS_MEET_ENDED,
  SET_AUDIO_CONSUMER_PAUSE_OR_RESUME,
} from "../constants";

export const setSocket = (socket) => {
  return {
    type: SET_SOCKET,
    payload: socket,
  };
};

export const setAllPeers = (peers) => async (dispatch) => {
  dispatch({ type: IS_PEER_LOADING, payload: true });
  dispatch({ type: SET_ALL_PEERS, payload: peers });
  dispatch({ type: IS_PEER_LOADING, payload: false });
};

export const setNewPeerJoined = (newPeer) => async (dispatch) => {
  dispatch({ type: IS_PEER_LOADING, payload: true });
  dispatch({ type: SET_NEW_PEER_JOINED, payload: newPeer });
  dispatch({ type: IS_PEER_LOADING, payload: false });
};

export const setRtpCapabilities = (rtpCapabilities) => async (dispatch) => {
  dispatch({ type: SET_RTP_CAPABILITIES, payload: rtpCapabilities });
};

export const setPeerLeaved = (peerLeaved) => async (dispatch) => {
  dispatch({ type: SET_PEER_LEAVED, payload: peerLeaved });
};

export const setConsumers = (newConsumer) => async (dispatch) => {
  dispatch({ type: SET_CONSUMERS, payload: newConsumer });
};

export const setMentorScreenShareConsumer =
  (newConsumer) => async (dispatch) => {
    console.log("mentor screen share", newConsumer);
    dispatch({ type: SET_MENTOR_CONSUMER_SCREEN_SHARE, payload: newConsumer });
  };

export const setMentorVideoShareConsumer =
  (newConsumer) => async (dispatch) => {
    dispatch({ type: SET_MENTOR_VIDEO_SHARE_CONSUMER, payload: newConsumer });
  };

export const setAudioConsumers = (newConsumer) => async (dispatch) => {
  dispatch({ type: SET_AUDIO_CONSUMERS, payload: newConsumer });
};

export const setChatMessage = (newChatMessage) => async (dispatch) => {
  dispatch({ type: SET_CHAT_MESSAGE, payload: newChatMessage });
};

export const setRaiseHand = (raiseHandData) => async (dispatch) => {
  dispatch({ type: SET_RAISE_HAND, payload: raiseHandData });
};

// for uploading files to the live class room
export const setUploadFiles = (files) => async (dispatch) => {
  dispatch({ type: SET_FILE_UPLOAD, payload: files });
};

// The main function of uploading files to the live class room
export const setUploadFilesInRoom = (data) => async (dispatch) => {
  dispatch({ type: SET_FILE_UPLOAD_IN_ROOM, payload: data });
};

export const setQuestion = (question) => async (dispatch) => {
  dispatch({ type: SET_QUESTION, payload: question });
};

export const setMiroBoardData = (data) => async (dispatch) => {
  dispatch({ type: SET_MIRO_BOARD_DATA, payload: data });
};

export const setMentorVideoSharePauseOrResume = (value) => async (dispatch) => {
  // if value is true then it is pause
  // if value is false then it is resume
  dispatch({ type: SET_MENTOR_VIDEO_SHARE_PAUSE_OR_RESUME, payload: value });
};
export const setMentorScreenSharePauseOrResume =
  (value) => async (dispatch) => {
    // if value is true then it is pause
    // if value is false then it is resume
    dispatch({ type: SET_MENTOR_SCREEN_SHARE_PAUSE_OR_RESUME, payload: value });
  };

export const setAudioConsumerPauseOrResume =
  (value, producerId) => async (dispatch) => {
    dispatch({
      type: SET_AUDIO_CONSUMER_PAUSE_OR_RESUME,
      payload: { value, producerId },
    });
  };
export const getLiveClassDetails = (roomId) => async (dispatch) => {
  try {
    const res = await getLiveClassDetailsApi(roomId);
    if (res.status === 200) {
      dispatch({ type: GET_LIVE_CLASS_DETAILS, payload: res.data });
    } else {
      console.log("error", res);
    }
  } catch (err) {
    console.log("err in description", err);
  }
};

export const getUpcomingClassDetails = (roomId) => async (dispatch) => {
  try {
    const res = await getUpcomingClassApi(roomId);
    if (res.status === 200) {
      dispatch({ type: GET_UPCOMING_CLASS_DETAILS, payload: res.data });
    } else {
      console.log("error", res);
    }
  } catch (err) {
    console.log("err in description", err);
  }
};

export const setLeaderBoard = (leaderBoard) => async (dispatch) => {
  dispatch({ type: SET_LEADERBOARD, payload: leaderBoard });
};

export const setIsMeetEnd = (value) => async (dispatch) => {
  dispatch({ type: SET_IS_MEET_ENDED, payload: value });
};
