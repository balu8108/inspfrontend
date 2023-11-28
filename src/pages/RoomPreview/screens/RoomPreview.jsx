import { useEffect } from "react";
import { Box, Flex } from "@chakra-ui/react";
import RoomPreviewVideo from "../components/RoomPreviewVideo";
import RoomPreviewJoinDescription from "../components/RoomPreviewJoinDescription";
import { initializeSocketConnections } from "../../../socketconnections/socketconnections";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getLiveClassDetails } from "../../../store/actions/socketActions";
const RoomPreview = () => {
  const { roomId } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    initializeSocketConnections(roomId);
  }, [roomId]);
  useEffect(() => {
    dispatch(getLiveClassDetails(roomId));
  }, [roomId, dispatch]);
  return (
    <Box py={8} px={[6, 8, 10, 20]}>
      <Flex
        justifyContent={"space-between"}
        gap={[8, 8, 8, 10]}
        wrap={["wrap", "wrap", "nowrap", "nowrap"]}
      >
        <RoomPreviewVideo />
        <RoomPreviewJoinDescription roomId={roomId} />
      </Flex>
    </Box>
  );
};

export default RoomPreview;
