import { Box, HStack, Text, useTheme, Flex } from "@chakra-ui/react";
import { roomData } from "../data/roomData";
import FileBoxComponent from "../../../components/filebox/FileBoxComponent";
import UploadFilePopup from "../../../components/popups/UploadFilePopup";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  getLiveClassDetails,
  getUpcomingClassDetails,
} from "../../../store/actions/socketActions";
import { capitalize, checkUserType, formatTime } from "../../../utils";
import { userType, fileTypes } from "../../../constants/staticvariables";

const RoomContent = ({ mainTextColor, secondaryTextColor, type }) => {
  const { roomPreviewData, upcomingClassData } = useSelector(
    (state) => state.socket
  );
  const userRoleType = checkUserType();

  const renderContent = () => {
    if (type === "active") {
      return roomPreviewData;
    } else {
      return upcomingClassData;
    }
  };
  return (
    <>
      <Box pt={6}>
        <Text fontSize={"14px"} color={mainTextColor}>
          {capitalize(renderContent()?.LiveClassRoomDetail?.topicName) ||
            roomData.noData}
        </Text>
        <Text color={secondaryTextColor} fontSize={"12px"}>
          {formatTime(renderContent()?.scheduledStartTime)} -
          {formatTime(renderContent()?.scheduledEndTime)}
        </Text>
      </Box>
      <Box pt={6}>
        <Flex py={2} alignItems={"center"} justifyContent={"space-between"}>
          <Text fontSize={"14px"} color={mainTextColor}>
            {roomData.files}
          </Text>
          {userRoleType === userType.teacher && (
            <UploadFilePopup type={type} roomId={renderContent()?.roomId} />
          )}
        </Flex>

        <Box>
          {renderContent()?.LiveClassRoomFiles.length > 0 ? (
            <FileBoxComponent
              data={renderContent()?.LiveClassRoomFiles}
              type={fileTypes.live}
            />
          ) : (
            <Text fontSize={"12px"}>No Files</Text>
          )}
        </Box>
      </Box>
    </>
  );
};

const LiveSessionDescription = () => {
  const theme = useTheme();
  const { primaryBlue, mainTextColor, secondaryTextColor } =
    theme.colors.pallete;

  const { roomId } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    if (roomId) {
      dispatch(getLiveClassDetails(roomId));
      dispatch(getUpcomingClassDetails(roomId));
    }
  }, [roomId, dispatch]);
  return (
    <Box p={4}>
      <HStack>
        <Box
          bg={primaryBlue}
          width="12px"
          height="25px"
          borderRadius={"20px"}
        ></Box>
        <Text fontWeight={"400"}>{roomData.liveSessionText}</Text>
      </HStack>
      <Box>
        <RoomContent
          mainTextColor={mainTextColor}
          secondaryTextColor={secondaryTextColor}
          type={"active"}
        />
      </Box>
    </Box>
  );
};

export default LiveSessionDescription;
