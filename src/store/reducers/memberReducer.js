import {
  SET_ALL_PEERS,
  SET_NEW_PEER_JOINED,
  IS_PEER_LOADING,
  SET_PEER_LEAVED,
  SET_UPDATE_PEER_DETAILS,
  SET_AUDIO_STREAM_ENABLED_OR_DISABLED
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
      const existingPeer = state.peers.find(peer => peer.id === action.payload.id);
      if (existingPeer) {
        // If the id already exists, do not add action.payload
        return state;
      } else {
        // If the id doesn't exist, add action.payload to peers array
        return {
          ...state,
          peers: [...state.peers, action.payload],
        };
      }
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
    case SET_AUDIO_STREAM_ENABLED_OR_DISABLED:
      const { value, peerId } = action.payload;
      const updatedPeers = state.peers
        .map((peer) =>
          peer.id === peerId ? { ...peer, isAudioEnabled: value } : peer
        )
        .sort((peerA, peerB) => {
          // If selfDetails.id matches peer.id, move it to the front
          if (peerA.id === state.selfDetails?.id) {
            return -1;
          } else if (peerB.id === state.selfDetails?.id) {
            return 1;
          }

          // Sort by isAudioEnabled in descending order for other peers
          return peerB.isAudioEnabled - peerA.isAudioEnabled;
        });
      return {
        ...state,
        peers: updatedPeers,
      };


    default:
      return state;
  }
};

export default memberReducer;
