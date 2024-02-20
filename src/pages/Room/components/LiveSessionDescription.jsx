import {
  Box,
  HStack,
  Text,
  useTheme,
  Flex,
  useMediaQuery,
} from "@chakra-ui/react";
import { roomData } from "../data/roomData";
import FileBoxComponent from "../../../components/filebox/FileBoxComponent";
import UploadFilePopup from "../../../components/popups/UploadFilePopup";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  getLiveClassDetails,
  getUpcomingClassDetails,
} from "../../../store/actions/socketActions";
import { capitalize, checkUserType, formatTime } from "../../../utils";
import { userType, fileTypes } from "../../../constants/staticvariables";
import { LeaveBtn } from "../../../components/button";
import SingleFileComponent from "../../../components/filebox/SingleFileComponent";
import Scrollbars from "rc-scrollbars";
const RoomContent = ({
  mainTextColor,
  secondaryTextColor,
  type,
  onOpenLeaveOrEndClass,
}) => {
  const [isLeaveLoading, setIsLeaveLoading] = useState(false);
  const { redBtnColor } = useTheme().colors.pallete;
  const { roomPreviewData, upcomingClassData } = useSelector(
    (state) => state.socket
  );
  const [isLargerThan480, isLargerThan768] = useMediaQuery([
    "(min-width: 480px)",
    "(min-width: 768px)",
  ]);
  const userRoleType = checkUserType();

  const leaveRoomOrEndMeetHandler = async () => {
    setIsLeaveLoading(true);
    onOpenLeaveOrEndClass();
    setIsLeaveLoading(false);
  };

  const renderContent = () => {
    if (type === "active") {
      return roomPreviewData;
    } else {
      return upcomingClassData;
    }
  };
  return (
    <>
      <Flex
        direction={["row", "row", "column", "column"]}
        justifyContent={"space-between"}
        alignItems={["center", "center", "stretch", "stretch"]}
      >
        <Box pt={[0, 0, 0, 6]}>
          <Text fontSize={"14px"} color={mainTextColor}>
            {capitalize(renderContent()?.LiveClassRoomDetail?.topicName) ||
              roomData.noData}
          </Text>
          <Text color={secondaryTextColor} fontSize={"12px"}>
            {formatTime(renderContent()?.scheduledStartTime)} -
            {formatTime(renderContent()?.scheduledEndTime)}
          </Text>
        </Box>
        {!isLargerThan768 && (
          <LeaveBtn
            isLoading={isLeaveLoading}
            text={
              userRoleType === userType.teacher ? roomData.end : roomData.leave
            }
            backColor={redBtnColor}
            textColor="white"
            px={6}
            py={1}
            fontSize="0.8rem"
            onClickHandler={leaveRoomOrEndMeetHandler}
          />
        )}

        {isLargerThan768 && (
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
        )}
      </Flex>
    </>
  );
};

const LiveSessionDescription = ({ onOpenLeaveOrEndClass }) => {
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
    <Box p={[2, 2, 4, 4]}>
      <HStack display={["none", "none", "none", "flex"]}>
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
          onOpenLeaveOrEndClass={onOpenLeaveOrEndClass}
        />
      </Box>
    </Box>
  );
};

export const FilesForSmallerScreen = () => {
  const { roomId } = useParams();
  const dispatch = useDispatch();

  const { roomPreviewData } = useSelector((state) => state.socket);

  useEffect(() => {
    if (roomId) {
      dispatch(getLiveClassDetails(roomId));
    }
  }, [roomId, dispatch]);
  return (
    <>
      <Scrollbars>
        <Flex
          px={2}
          height={"100%"}
          overflowY="scroll"
          alignItems={"center"}
          gap={2}
        >
          {roomPreviewData?.LiveClassRoomFiles.length > 0 ? (
            roomPreviewData.LiveClassRoomFiles.map((data) => (
              <SingleFileComponent key={data.id} file={data} type="live" />
            ))
          ) : (
            <Text fontSize={"12px"}>No Files</Text>
          )}
        </Flex>
      </Scrollbars>
    </>
  );
};

export default LiveSessionDescription;
