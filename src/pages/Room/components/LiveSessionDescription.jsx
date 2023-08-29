import {
  Box,
  HStack,
  Text,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  useTheme,
  Flex,
  IconButton,
} from "@chakra-ui/react";

import { FiDownload } from "react-icons/fi";
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
import { formatTime } from "../../../utils";

const RoomContent = ({ mainTextColor, secondaryTextColor, type }) => {
  const { uploadedFiles } = useSelector((state) => state.socket);
  const { roomPreviewData, upcomingClassData } = useSelector(
    (state) => state.socket
  );
  console.log("upcoming class Data", upcomingClassData);

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
          {renderContent()?.LiveClassRoomDetail?.topicName || roomData.noData}
        </Text>
        <Text color={secondaryTextColor} fontSize={"12px"}>
          {formatTime(renderContent()?.scheduledStartTime)} -
          {formatTime(renderContent()?.scheduledEndTime)}
        </Text>
      </Box>
      <Box pt={6}>
        <Text fontSize={"14px"} color={mainTextColor}>
          {roomData.agenda}
        </Text>
        {/* {roomData.liveSessionAgendas.map((agenda, index) => (
          <HStack key={agenda.id} pt={1}>
            <Box
              width={"15px"}
              height={"15px"}
              bg={"gray.200"}
              borderRadius={"100%"}
            />
            <Text color={secondaryTextColor} fontSize={"12px"}>
              {agenda.value}
            </Text>
          </HStack>
        ))} */}
        <HStack pt={1}>
          <Box
            width={"15px"}
            height={"15px"}
            bg={"gray.200"}
            borderRadius={"100%"}
          />
          <Text color={secondaryTextColor} fontSize={"12px"}>
            {renderContent()?.LiveClassRoomDetail?.agenda || roomData.noData}
          </Text>
        </HStack>
      </Box>
      <Box pt={6}>
        <Flex alignItems={"center"} justifyContent={"space-between"}>
          <Text fontSize={"14px"} color={mainTextColor}>
            {roomData.files}
          </Text>
          <UploadFilePopup />
        </Flex>

        <Box>
          {renderContent()?.LiveClassRoomFiles.length > 0 ? (
            <FileBoxComponent data={renderContent()?.LiveClassRoomFiles} />
          ) : (
            <Text fontSize={"12px"}>No Files</Text>
          )}
        </Box>
      </Box>

      <Box pt={6}>
        <Flex justifyContent={"space-between"} alignItems={"center"}>
          <Text>{roomData.notes}</Text>
          <IconButton
            icon={<FiDownload />}
            bg={"none"}
            _hover={{ bg: "none" }}
          />
        </Flex>
        <Box
          width="100%"
          height={"100px"}
          bg="gray.200"
          borderRadius={"md"}
        ></Box>
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
    <>
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

        <Tabs pt={6} colorScheme="black">
          <TabList>
            <Tab fontSize={"12px"}>{roomData.active}</Tab>
            <Tab fontSize={"12px"}>{roomData.upcoming}</Tab>
          </TabList>

          <TabPanels>
            <TabPanel p={0}>
              <RoomContent
                mainTextColor={mainTextColor}
                secondaryTextColor={secondaryTextColor}
                type={"active"}
              />
            </TabPanel>
            <TabPanel p={0}>
              <RoomContent
                mainTextColor={mainTextColor}
                secondaryTextColor={secondaryTextColor}
                type={"upcoming"}
              />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </>
  );
};

export default LiveSessionDescription;
