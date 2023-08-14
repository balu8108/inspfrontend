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
