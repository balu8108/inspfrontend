import { BASE_URL } from "../constants/staticurls";
import io from "socket.io-client";
import { store } from "../store";
import {
  setAllPeers,
  setAudioConsumers,
  setChatMessage,
  setConsumers,
  setMentorScreenShareConsumer,
  setMentorVideoShareConsumer,
  setNewPeerJoined,
  setPeerLeaved,
  setSocket,
} from "../store/actions/socketActions";

import SOCKET_EVENTS from "../constants/socketeventconstants";
import { Device } from "mediasoup-client";
import { staticVariables } from "../constants/staticvariables";
import { SET_RAISE_HAND } from "../store/constants";

// socket variables

let socket = null;
export let producerTransport = null;
export let consumerTransports = []; // TODO later on we need to change as multiple tranport is not required to create
export const device = new Device();
// require one transport per user for sending and receiving media streams and they can receive any data

// SOCKET METHOD/CALLBACK/RESPONSE HANDLERS:-

const socketConnectionHandler = (roomId) => {
  console.log("Socket connected successfully with id ", socket.id);

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
    resolve(res);
  } else {
    reject(new Error(res));
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
        console.log("Send transport connected successfully!!!");
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
            console.log("Producer exists", producerExist);
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
    },
    async ({ params }) => {
      if (params.err) {
        console.log("Error in getting consume params", params.err);
        return;
      }
      const consumer = await consumerTransport.consume({
        id: params.id,
        producerId: params.producerId,
        kind: params.kind,
        rtpParameters: params.rtpParameters,
        appData: appData,
      });
      // TODO
      // If we use single consumer transport later on then we don't need the below

      consumerTransports = [
        ...consumerTransports,
        {
          consumerTransport,
          serverConsumerTransportId: params.id,
          producerId: params.id,
          consumer,
        },
      ];
      // in redux we are storing all consumers
      console.log("consumer", consumer);
      console.log("consumer kind", consumer.kind);
      console.log("consumer appData", consumer.appData);
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

const createRecvTransport = async (remoteProducerId, appData) => {
  socket.emit(
    SOCKET_EVENTS.CREATE_WEB_RTC_TRANSPORT,
    { consumer: true },
    ({ params }) => {
      if (params.err) {
        console.log("Error in recv transport", params.err);

        return;
      }
      let consumerTransport = null;
      try {
        consumerTransport = device.createRecvTransport(params);
      } catch (err) {
        console.log("Error in initializing recv transport");

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
            console.log("Error in Transport recv connect", err);
          }
        }
      );

      consumeMediaFromProducer(
        consumerTransport,
        remoteProducerId,
        params.id,
        appData
      );
    }
  );
};

// const consumeMediaFromProducer = async (remoteProducerId) => {
//   // consume media from the producer
// };

const getProducersResponseHandler = async (producersIds) => {
  // expecting an array of producer ids
  if (producersIds.length) {
    // if (consumerTransport === null) {

    //   try {
    //     await createRecvTransport();
    //   } catch (err) {
    //     console.log("error in creating consumer transport");
    //     return;
    //   }
    // }
    console.log("producers in get producers", producersIds);

    producersIds.forEach((producer) => {
      createRecvTransport(producer.producerId, producer.appData);
    });
  }
};

const newProducerResponseHandler = async ({ producerId, appData }) => {
  await createRecvTransport(producerId, appData);
};

const peerLeavedResponseHandler = (res) => {
  const { peerLeaved } = res;
  // dispatch peer leaved action to remove the peer from peers list of redux stores
  store.dispatch(setPeerLeaved(peerLeaved));
};

const someProducerClosedResponseHandler = (res) => {
  const { producerId, producerAppData } = res;
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

// SOCKET EVENT LISTENERS AND EVENT EMITTERS:-
export const initializeSocketConnections = (roomId) => {
  socket = io(BASE_URL);
  // store the socket in redux also as we may need it later

  socket.on(SOCKET_EVENTS.CONNECT, () => socketConnectionHandler(roomId));
  socket.on(SOCKET_EVENTS.NEW_PEER_JOINED, socketNewPeerJoinedHandler);
  socket.on(SOCKET_EVENTS.ROOM_UPDATE, roomUpdateResponseHandler);
  socket.on(SOCKET_EVENTS.PEER_LEAVED, peerLeavedResponseHandler);
  socket.on(SOCKET_EVENTS.NEW_PRODUCER, newProducerResponseHandler);
  socket.on(SOCKET_EVENTS.CHAT_MSG_FROM_SERVER, chatMsgResponseHandler);
  socket.on(SOCKET_EVENTS.RAISE_HAND_FROM_SERVER, raiseHandResponseHandler);
  socket.on(
    SOCKET_EVENTS.SOME_PRODUCER_CLOSED,
    someProducerClosedResponseHandler
  );
  socket.on(SOCKET_EVENTS.DISCONNECT, () => {
    console.log("socket disconnected with id", socket.id);
  });
};

export const joinRoomHandler = (roomId) => {
  return new Promise((resolve, reject) => {
    socket.emit(SOCKET_EVENTS.JOIN_ROOM, { roomId: roomId }, (res) =>
      joinRoomResponseHandler(res, resolve, reject)
    );
  });
};

export const initializeDeviceHandler = async (rtpCapabilities) => {
  try {
    await device.load({ routerRtpCapabilities: rtpCapabilities });
    console.log("from initialize device", device);
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
  console.log("i was triggered in get Producers");
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
