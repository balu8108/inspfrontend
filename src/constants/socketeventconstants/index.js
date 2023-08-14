const SOCKET_EVENTS = {
  CONNECT: "connect",
  DISCONNECT: "disconnect",
  JOIN_ROOM_PREVIEW: "join_room_preview",
  NEW_PEER_JOINED: "new_peer_joined",
  JOIN_ROOM: "join_room",
  ROOM_UPDATE: "room_update",
  CREATE_WEB_RTC_TRANSPORT: "create_webrtc_transport",
  PRODUCE: "produce",
  CONSUME: "consume",
  TRANSPORT_SEND_CONNECT: "transport_send_connect",
  TRANSPORT_RECV_CONNECT: "transport-recv-connect",
  TRANSPORT_PRODUCE: "transport_produce",
  CONSUMER_RESUME: "consumer-resume",
  GET_PRODUCERS: "get_producers",
  NEW_PRODUCER: "new_producer",
  PEER_LEAVED: "peer_leave",
  STOP_PRODUCING: "stop_producing",
  SOME_PRODUCER_CLOSED: "some_producer_closed",
};

export default SOCKET_EVENTS;
