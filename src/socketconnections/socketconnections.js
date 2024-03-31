import { BASE_URL } from "../constants/staticurls";
import io from "socket.io-client";
import { store } from "../store";
import {
  setAllPeers,
  setAudioConsumerPauseOrResume,
  setAudioConsumers,
  setAudioStreamEnabledOrDisabled,
  setChatMessage,
  setConsumers,
  setIsMeetEnd,
  setKickedOutFromClass,
  setLeaderBoard,
  setLeaderBoardAnswerPercentage,
  setMentorScreenShareConsumer,
  setMentorScreenSharePauseOrResume,
  setMentorVideoShareConsumer,
  setMentorVideoSharePauseOrResume,
  setMiroBoardData,
  setNewPeerJoined,
  setPeerLeaved,
  setQuestion,
  setQuestionMessage,
  setSelfDetails,
  setSendPollResponse,
  setTimerIncrease,
  setUpdatePeerDetails,
  setUploadFilesInRoom,
} from "../store/actions/socketActions";

import SOCKET_EVENTS from "../constants/socketeventconstants";
import { Device } from "mediasoup-client";
import { staticVariables, userType } from "../constants/staticvariables";
import { SET_RAISE_HAND } from "../store/constants";
import { checkUserType, getStorageData, isObjectValid } from "../utils";
import { setFeedbackModalOpen } from "../store/actions/genericActions";

// socket variables
// add comment
export let socket = null;
export let producerTransport = null;
export let consumerTransport = null;
export const device = new Device();
// require one transport per user for sending and receiving media streams and they can receive any data

// SOCKET METHOD/CALLBACK/RESPONSE HANDLERS:-

/** REPSONSE HANDLER STARTS HERE **/

const socketConnectionHandler = (roomId) => {
  store.dispatch(setIsMeetEnd(false));

  socket.emit(SOCKET_EVENTS.JOIN_ROOM_PREVIEW, { roomId: roomId }, (res) => {
    if (res.success === true) {
      // dispatch to set all peers
      store.dispatch(setAllPeers(res.peers));
    }
  });
};

const socketNewPeerJoinedHandler = (res) => {
  const { peer } = res;
  store.dispatch(setNewPeerJoined(peer));
};

const joinRoomResponseHandler = (res, resolve, reject) => {
  if (res.success) {
    store.dispatch(setLeaderBoard(res?.leaderBoardData));
    resolve(res);
  } else {
    reject(res);
  }
};

const roomUpdateResponseHandler = (res) => {
  // send all peers to redux
  // here we are getting all peers therefore we can directly set all peers without spreading
  store.dispatch(setAllPeers(res.peers));
};

const createSendTransportResponseHandler = (res, resolve, reject) => {
  const { params } = res;
  if (params.err) {
    reject(params.err);
    return;
  }
  producerTransport = device.createSendTransport(params);

  producerTransport.on(
    SOCKET_EVENTS.CONNECT,
    async ({ dtlsParameters }, callback, errback) => {
      try {
        await socket.emit(SOCKET_EVENTS.TRANSPORT_SEND_CONNECT, {
          dtlsParameters,
        });
        callback();
      } catch (err) {
        console.log("Error in connect send transport", err);
      }
    }
  );
  producerTransport.on(
    SOCKET_EVENTS.PRODUCE,
    async (parameters, callback, errback) => {
      // send back the producer id to the server

      try {
        await socket.emit(
          SOCKET_EVENTS.TRANSPORT_PRODUCE,
          {
            kind: parameters.kind,
            rtpParameters: parameters.rtpParameters,
            appData: parameters.appData,
          },
          ({ id, producerExist }) => {
            callback({ id });
          }
        );
      } catch (err) {
        console.log("Error in producing send transport", err);
      }
    }
  );

  resolve(true);
};

const consumeMediaFromProducer = async (
  consumerTransport,
  remoteProducerId,
  serverConsumerTransportId,
  appData
) => {
  await socket.emit(
    SOCKET_EVENTS.CONSUME,
    {
      rtpCapabilities: device.rtpCapabilities,
      remoteProducerId,
      serverConsumerTransportId,
      appData,
    },
    async ({ params }) => {
      if (params.err) {
        return;
      }

      const consumer = await consumerTransport.consume({
        id: params.id,
        producerId: params.producerId,
        kind: params.kind,
        rtpParameters: params.rtpParameters,
        appData: appData,
      });

      // in redux we are storing all consumers

      if (
        consumer.appData &&
        consumer.appData.streamType === staticVariables.audioShare
      ) {
        store.dispatch(setAudioConsumers(consumer));
      } else if (
        consumer.appData &&
        consumer.appData.streamType === staticVariables.screenShare &&
        consumer.appData.isTeacher
      ) {
        // dispatch consumer as teacher screen share
        store.dispatch(setMentorScreenShareConsumer(consumer));
      } else if (
        consumer.appData &&
        consumer.appData.streamType === staticVariables.videoShare &&
        consumer.appData.isTeacher
      ) {
        store.dispatch(setMentorVideoShareConsumer(consumer));
      } else {
        store.dispatch(setConsumers(consumer));
      }

      socket.emit(SOCKET_EVENTS.CONSUMER_RESUME, {
        serverConsumerId: params.serverConsumerId,
      });
    }
  );
};

// Previously function prototype

const createRecvTransport = async () => {
  return new Promise((resolve, reject) => {
    socket.emit(
      SOCKET_EVENTS.CREATE_WEB_RTC_TRANSPORT,
      { consumer: true },
      ({ params }) => {
        if (params.err) {
          reject(params.err);
          return;
        }
        try {
          consumerTransport = device.createRecvTransport(params);
        } catch (err) {
          return;
        }
        consumerTransport.on(
          SOCKET_EVENTS.CONNECT,
          async ({ dtlsParameters }, callback, errback) => {
            try {
              await socket.emit(SOCKET_EVENTS.TRANSPORT_RECV_CONNECT, {
                dtlsParameters,
                serverConsumerTransportId: params.id,
              });

              callback();
            } catch (err) {
              reject(err);
            }
          }
        );
        resolve();
      }
    );
  });
};

const getProducersResponseHandler = async (producersIds) => {
  // expecting an array of producer ids
  if (producersIds.length) {
    try {
      if (!consumerTransport) {
        // create Recv Transport before consuming media
        await createRecvTransport();
      }

      producersIds.forEach(async (producer) => {
        await consumeMediaFromProducer(
          consumerTransport,
          producer.producerId,
          consumerTransport.id,
          producer.appData
        );
      });
    } catch (err) {}
  }
};

const newProducerResponseHandler = async ({ producerId, appData }) => {
  try {
    if (!consumerTransport) {
      await createRecvTransport();
    }

    await consumeMediaFromProducer(
      consumerTransport,
      producerId,
      consumerTransport.id,
      appData
    );
  } catch (err) {}
};

const peerLeavedResponseHandler = (res) => {
  const { peerLeaved } = res;
  // dispatch peer leaved action to remove the peer from peers list of redux stores
  store.dispatch(setPeerLeaved(peerLeaved));
};

const someProducerClosedResponseHandler = (res) => {
  const { producerAppData } = res;
  // evaluate what type of consumer we need to stop

  if (
    producerAppData &&
    producerAppData.streamType === staticVariables.screenShare &&
    producerAppData.isTeacher
  ) {
    // close stream of teacher screen share
    store.dispatch(setMentorScreenShareConsumer(null));
  } else if (
    producerAppData &&
    producerAppData.streamType === staticVariables.videoShare &&
    producerAppData.isTeacher
  ) {
    // close stream of teacher screen share
    store.dispatch(setMentorVideoShareConsumer(null));
  }
};

const chatMsgResponseHandler = (res) => {
  store.dispatch(setChatMessage(res));
};

const raiseHandResponseHandler = (res) => {
  store.dispatch({ type: SET_RAISE_HAND, payload: res });
};

const uploadFileResponseHandler = (res) => {
  const { success, data } = res;
  if (success) {
    store.dispatch(setUploadFilesInRoom(data));
  }
};

const questionResponseHandler = (res) => {
  const { data } = res;
  store.dispatch(setQuestion(data));
};

export const producerPausedResponseHandler = (res) => {
  const { remoteProducerId, appData } = res;

  if (
    isObjectValid(appData) &&
    appData.streamType === staticVariables.videoShare &&
    appData.isTeacher
  ) {
    store.dispatch(setMentorVideoSharePauseOrResume(true));
  } else if (
    isObjectValid(appData) &&
    appData.streamType === staticVariables.screenShare &&
    appData.isTeacher
  ) {
    store.dispatch(setMentorScreenSharePauseOrResume(true));
  } else if (
    isObjectValid(appData) &&
    appData.streamType === staticVariables.audioShare
  ) {
    // pause audio consumer
    store.dispatch(setAudioConsumerPauseOrResume(true, remoteProducerId));
  }
};

const producerResumeResponseHandler = (res) => {
  const { remoteProducerId, appData } = res;

  if (
    isObjectValid(appData) &&
    appData.streamType === staticVariables.videoShare &&
    appData.isTeacher
  ) {
    store.dispatch(setMentorVideoSharePauseOrResume(false)); //pause = false which means resume set to true, refer reducer
  } else if (
    isObjectValid(appData) &&
    appData.streamType === staticVariables.screenShare &&
    appData.isTeacher
  ) {
    store.dispatch(setMentorScreenSharePauseOrResume(false));
  } else if (
    isObjectValid(appData) &&
    appData.streamType === staticVariables.audioShare
  ) {
    // pause audio consumer
    store.dispatch(setAudioConsumerPauseOrResume(false, remoteProducerId));
  }
};

const fileUploadResponseHandler = (res) => {
  const { success, data } = res;
  if (success) {
    store.dispatch(setUploadFilesInRoom(data));
  }
};

const miroBoardIdResponseHandler = (res) => {
  store.dispatch(setMiroBoardData(res));
};

const leaderBoardResponseHandler = (res) => {
  store.dispatch(setLeaderBoard(res?.leaderBoard));
};

const leaderBoardAnswerResponseHandler = (res) => {
  store.dispatch(setLeaderBoardAnswerPercentage(res?.averagePeersOption));
};

const endMeetReponseHandler = async () => {
  await leaveRoomHandler();
  store.dispatch(setIsMeetEnd(true));
};

const leaveRoomResponseHandler = (res) => {
  const { feedBackStatus } = res;
  const userRoleType = checkUserType(); // Need to open feedback form only for students
  if (userRoleType === userType.student && feedBackStatus) {
    if (feedBackStatus?.success && !feedBackStatus.isFeedback) {
      // Open feedback form
      store.dispatch(
        setFeedbackModalOpen(true, feedBackStatus?.feedBackTopicId)
      );
    }
  }
  // after leaving class set producerTransport to again null
  producerTransport = null;
  consumerTransport = null;
};

const isAudioStreamEnabledResponse = (res) => {
  // getting value,producerId,peerId
  const { value, peerId } = res;
  store.dispatch(setAudioStreamEnabledOrDisabled(value, peerId));
};

const kickOutResponseHandler = () => {
  store.dispatch(setKickedOutFromClass(true));
};

const blockOrUnblockMicResponseHandler = (res) => {
  // expecting here details of self as mic is blocked by mentor
  store.dispatch(setSelfDetails(res));
};
const muteMicCommandByMentorResponseHandler = (res) => {
  store.dispatch(setSelfDetails(res));
};
const questionMsgResponseHandler = (res) => {
  store.dispatch(setQuestionMessage(res));
};

const sendPollResponseHandler = (res) => {
  store.dispatch(setSendPollResponse(res));
};

const pollTimeIncreaseResponseHandler = (res) => {
  store.dispatch(setTimerIncrease(res));
};

const peerMicBlockedOrUnblockedResponseHandler = (res) => {
  // some peer mic blocked so update the peers list
  store.dispatch(setUpdatePeerDetails(res));
};

/** RESPONSE HANDLER ENDS HERE **/

// SOCKET EVENT LISTENERS AND EVENT EMITTERS:-
export const initializeSocketConnections = (roomId) => {
  const { status, data: secret_token } = getStorageData("secret_token");

  if (status) {
    socket = io(BASE_URL, {
      auth: { secret_token: secret_token },
      transports: ["websocket"],
    });
    // store the socket in redux also as we may need it later

    socket.on(SOCKET_EVENTS.CONNECT, () => socketConnectionHandler(roomId));
    socket.on(SOCKET_EVENTS.NEW_PEER_JOINED, socketNewPeerJoinedHandler);
    socket.on(SOCKET_EVENTS.ROOM_UPDATE, roomUpdateResponseHandler);
    socket.on(SOCKET_EVENTS.PEER_LEAVED, peerLeavedResponseHandler);
    socket.on(SOCKET_EVENTS.NEW_PRODUCER, newProducerResponseHandler);
    socket.on(SOCKET_EVENTS.CHAT_MSG_FROM_SERVER, chatMsgResponseHandler);
    socket.on(SOCKET_EVENTS.RAISE_HAND_FROM_SERVER, raiseHandResponseHandler);
    socket.on(SOCKET_EVENTS.UPLOAD_FILE_FROM_SERVER, uploadFileResponseHandler);
    socket.on(SOCKET_EVENTS.QUESTION_SENT_FROM_SERVER, questionResponseHandler);
    socket.on(SOCKET_EVENTS.PRODUCER_PAUSED, producerPausedResponseHandler);
    socket.on(SOCKET_EVENTS.PRODUCER_RESUMED, producerResumeResponseHandler);
    socket.on(
      SOCKET_EVENTS.POLL_TIME_INCREASE_FROM_SERVER,
      pollTimeIncreaseResponseHandler
    );
    socket.on(
      SOCKET_EVENTS.QUESTION_MSG_SENT_FROM_SERVER,
      questionMsgResponseHandler
    );
    socket.on(
      SOCKET_EVENTS.BLOCK_OR_UNBLOCK_MIC_FROM_SERVER,
      blockOrUnblockMicResponseHandler
    );
    socket.on(
      SOCKET_EVENTS.MUTE_MIC_COMMAND_BY_MENTOR_FROM_SERVER,
      muteMicCommandByMentorResponseHandler
    );
    socket.on(
      SOCKET_EVENTS.SOME_PRODUCER_CLOSED,
      someProducerClosedResponseHandler
    ); // this is explicitly triggered by backend
    socket.on(SOCKET_EVENTS.PRODUCER_CLOSED, someProducerClosedResponseHandler); // automatically triggered when any producer closes due to any reason
    socket.on(
      SOCKET_EVENTS.MIRO_BOARD_DATA_FROM_SERVER,
      miroBoardIdResponseHandler
    );
    socket.on(
      SOCKET_EVENTS.LEADERBOARD_FROM_SERVER,
      leaderBoardResponseHandler
    );
    socket.on(
      SOCKET_EVENTS.LEADERBOARD_AVERAGE_ANSWER_FROM_SERVER,
      leaderBoardAnswerResponseHandler
    );
    socket.on(
      SOCKET_EVENTS.IS_AUDIO_STREAM_ENABLED_FROM_SERVER,
      isAudioStreamEnabledResponse
    );
    socket.on(
      SOCKET_EVENTS.KICK_OUT_FROM_CLASS_FROM_SERVER,
      kickOutResponseHandler
    );
    socket.on(
      SOCKET_EVENTS.PEER_MIC_BLOCKED_OR_UNBLOCKED_FROM_SERVER,
      peerMicBlockedOrUnblockedResponseHandler
    );
    socket.on(SOCKET_EVENTS.END_MEET_FROM_SERVER, endMeetReponseHandler);
    socket.on(SOCKET_EVENTS.DISCONNECT, () => {
      producerTransport = null;
      consumerTransport = null;
    });
    socket.on(SOCKET_EVENTS.CONNECT_ERROR, (err) => {});
  }
};

/* EVENT EMIT FUNCTIONS STARTS HERE */

export const joinRoomHandler = (roomId) => {
  return new Promise((resolve, reject) => {
    const { data } = getStorageData("insp_user_profile");
    socket.emit(
      SOCKET_EVENTS.JOIN_ROOM,
      { roomId: roomId, peerDetails: data },
      (res) => joinRoomResponseHandler(res, resolve, reject)
    );
  });
};

export const initializeDeviceHandler = async (rtpCapabilities) => {
  try {
    if (device && !device.loaded) {
      await device.load({ routerRtpCapabilities: rtpCapabilities });
    }
  } catch (err) {
    console.log("error in creating device", err);
  }
};

export const createSendTransportHandler = async () => {
  //  this is basically to create transport for this person as producer of media
  // for example if the mentor sending its audio video then he will require a transport to send it to server

  return new Promise((resolve, reject) => {
    socket.emit(
      SOCKET_EVENTS.CREATE_WEB_RTC_TRANSPORT,
      { consumer: false },
      (res) => createSendTransportResponseHandler(res, resolve, reject)
    );
  });
};

export const getProducersHandler = () => {
  // This function will get all the producer from server and then create a consumer for the user so that the user can consume the media of the producers
  socket.emit(SOCKET_EVENTS.GET_PRODUCERS, getProducersResponseHandler);
};

export const stopProducing = (producerId, producerAppData) => {
  // this funtion is used to stop annykind of stream production
  // producer app data contains the details whose stream it is like teachers screen share
  socket.emit(SOCKET_EVENTS.STOP_PRODUCING, {
    producerId: producerId,
    producerAppData: producerAppData,
  });
};

export const sendChatMessage = (msg) => {
  // send chat message that will receive at server side
  socket.emit(SOCKET_EVENTS.CHAT_MSG_TO_SERVER, { msg: msg });
};

export const raiseHandHandler = (isHandRaised) => {
  // send raised hand to server
  socket.emit(SOCKET_EVENTS.RAISE_HAND_TO_SERVER, {
    isHandRaised: isHandRaised,
  });
};

export const sendFileHandler = (filesData) => {
  socket.emit(
    SOCKET_EVENTS.UPLOAD_FILE_TO_SERVER,
    filesData,
    fileUploadResponseHandler
  );
};

export const sendQuestionHandler = (data) => {
  // data will contain type may be poll or true false
  // for poll it doesn't have any question but has timer value, poll no
  socket.emit(
    SOCKET_EVENTS.QUESTION_SENT_TO_SERVER,
    data,
    sendPollResponseHandler
  );
};

export const startRecordingHandler = (data) => {
  if (data) {
    socket.emit(SOCKET_EVENTS.START_RECORDING, data);
  }
};
export const stopRecordingHandler = () => {
  socket.emit(SOCKET_EVENTS.STOP_RECORDING);
};

export const producerPauseHandler = (producer) => {
  const { appData, id } = producer;
  socket.emit(SOCKET_EVENTS.PRODUCER_PAUSE, {
    appData: appData,
    producerId: id,
  });
};

export const producerResumeHandler = (producer) => {
  const { appData, id } = producer;
  socket.emit(SOCKET_EVENTS.PRODUCER_RESUME, {
    appData: appData,
    producerId: id,
  });
};

export const leaveRoomHandler = async () => {
  await socket.emit(SOCKET_EVENTS.LEAVE_ROOM, leaveRoomResponseHandler);
};

export const endMeetHandler = async () => {
  await socket.emit(SOCKET_EVENTS.END_MEET_TO_SERVER);
};

export const sendAnswerHandler = (data) => {
  socket.emit(SOCKET_EVENTS.ANSWER_SENT_TO_SERVER, data);
};

export const sendMiroBoardData = (data) => {
  socket.emit(SOCKET_EVENTS.MIRO_BOARD_DATA_TO_SERVER, data);
};

export const setIsAudioStreamEnabled = (value, producerId) => {
  socket.emit(SOCKET_EVENTS.IS_AUDIO_STREAM_ENABLED_TO_SERVER, {
    value,
    producerId,
  });
};

export const kickOutFromClass = (peerSocketId, peerId) => {
  socket.emit(SOCKET_EVENTS.KICK_OUT_FROM_CLASS_TO_SERVER, {
    peerSocketId,
    peerId,
  });
};
export const blockOrUnblockMic = (value, peerSocketId, peerId) => {
  socket.emit(SOCKET_EVENTS.BLOCK_OR_UNBLOCK_MIC_TO_SERVER, {
    value,
    peerSocketId,
    peerId,
  });
};

export const muteMicCommandByMentor = (value, peerSocketId, peerId) => {
  socket.emit(SOCKET_EVENTS.MUTE_MIC_COMMAND_BY_MENTOR_TO_SERVER, {
    value,
    peerSocketId,
    peerId,
  });
};

export const sendQuestionMsg = (questionMsg) => {
  socket.emit(
    SOCKET_EVENTS.QUESTION_MSG_SENT_TO_SERVER,
    { questionMsg },
    (res) => {
      if (res?.success) {
        store.dispatch(setQuestionMessage(res?.data));
      }
    }
  );
};

export const sendPollTimeIncreaseToServer = (
  questionId,
  timeIncreaseBy = 10
) => {
  socket.emit(SOCKET_EVENTS.POLL_TIME_INCREASE_TO_SERVER, {
    questionId,
    timeIncreaseBy,
  });
};
/* EVENT EMIT FUNCTIONS ENDS HERE */
