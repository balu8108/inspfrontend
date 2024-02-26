import {
  SET_ALL_PEERS,
  SET_NEW_PEER_JOINED,
  IS_PEER_LOADING,
  SET_PEER_LEAVED,
  SET_UPDATE_PEER_DETAILS,
} from "../constants";
const initialState = {
  isPeerLoading: true,
  peers: [], 
};

const memberReducer = (state = initialState, action) => {
  switch (action.type) {
    case IS_PEER_LOADING:
      return {
        ...state,
        isPeerLoading: action.payload,
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
    case SET_PEER_LEAVED:
      return {
        ...state,
        peers: state.peers.filter((peer) => peer.id !== action.payload.id),
      };
    case SET_UPDATE_PEER_DETAILS:
      const updatePeerDetails = action.payload;
      const updatedPeerList = state?.peers?.map((peer) =>
        peer.id === updatePeerDetails.id ? updatePeerDetails : peer
      );
      return {
        ...state,
        peers: updatedPeerList,
      };

    default:
      return state;
  }
};

export default memberReducer;
