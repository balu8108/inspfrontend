import {
  Box,
  HStack,
  Text,
  Flex,
  Icon,
  Image,
  Card,
  useTheme,
} from "@chakra-ui/react";
import { FaCircle } from "react-icons/fa";
import defaultImageUrl from "../../../assets/images/image1.png";
import "../../../constants/scrollbar/style.css";
import FileBoxComponent from "../../../components/filebox/FileBoxComponent";
import { fileTypes } from "../../../constants/staticvariables";
import { boxShadowStyles, capitalize } from "../../../utils";
const RecordedClass = ({
  type,
  recordingDetail,
  activeRecording,
  setActiveRecording,
}) => {
  const isLive = type && (type === "live" || type === "live_specific");
  const isSolo = type && (type === "solo" || type === "solo_specific");
  const isLiveTopic = type && type === "live_topic";
  const isSoloTopic = type && type === "solo_topic";
  const { outerBackground } = useTheme().colors.pallete;

  const renderFiles = (data) => {
    let filesData = [];
    if (isLive) {
      filesData = data?.LiveClassRoomFiles;
    } else if (isSolo) {
      filesData = data?.SoloClassRoomFiles;
    } else if (isLiveTopic) {
      filesData =
        data?.responseData?.flatMap((obj) => obj?.LiveClassRoomFiles) ?? [];
    } else if (isSoloTopic) {
      filesData =
        data?.responseData?.flatMap((obj) => obj?.SoloClassRoomFiles) ?? [];
    } else {
      filesData = [];
    }

    return (
      <>
        {filesData && filesData.length > 0 ? (
          <FileBoxComponent
            data={filesData}
            type={isLive || isLiveTopic ? fileTypes.live : fileTypes.solo}
          />
        ) : (
          <Text fontSize={"0.8rem"} color={"#2C332978"}>
            No Files
          </Text>
        )}
      </>
    );
  };

  const renderAgenda = (data) => {
    let agenda = "";
    if (isLive) {
      agenda = data?.LiveClassRoomDetail.agenda;
    } else if (isSolo) {
      agenda = data?.agenda;
    } else if (isLiveTopic) {
      agenda = data?.responseData?.[0]?.LiveClassRoomDetail.agenda;
    } else if (isSoloTopic) {
      agenda = data?.responseData?.[0]?.agenda;
    } else {
      agenda = "";
    }

    return (
      <>
        {agenda ? (
          <Box>
            <Box mt={"16px"}>
              <Box mt={"10px"}>
                {agenda
                  .split("\r\n")
                  .slice(0, 4) // Take only the first 4 items
                  .map((ag, index) => (
                    <HStack key={index} pt={1}>
                      <Box
                        width={"13px"}
                        height={"13px"}
                        bg={"gray.200"}
                        borderRadius={"100%"}
                      />
                      <Text color={"rgba(44, 51, 41, 0.47)"} fontSize={"12px"}>
                        {ag}
                      </Text>
                    </HStack>
                  ))}
              </Box>
            </Box>
          </Box>
        ) : (
          <Text color={"#2C332978"} mt={2}>
            No Data
          </Text>
        )}
      </>
    );
  };

  const renderRecordings = (data, activeRecording) => {
    let recordings = [];
    if (isLive) {
      recordings = data?.LiveClassRoomRecordings;
    } else if (isSolo) {
      recordings = data?.SoloClassRoomRecordings;
    } else if (isLiveTopic) {
      recordings =
        data?.responseData?.flatMap((obj) => obj?.LiveClassRoomRecordings) ??
        [];
    } else if (isSoloTopic) {
      recordings =
        data?.responseData?.flatMap((obj) => obj?.SoloClassRoomRecordings) ??
        [];
    } else {
      recordings = [];
    }

    return (
      <>
        {recordings?.map(
          (lr) =>
            lr.id !== activeRecording?.id && (
              <Flex key={lr.id}>
                <Flex gap={"24px"}>
                  <Card
                    mt={"15px"}
                    color={"#2C332978"}
                    fontSize={"13px"}
                    w={"150px"}
                    _hover={{ cursor: "pointer" }}
                    onClick={() => setActiveRecording(lr)}
                  >
                    <Image src={defaultImageUrl} alt="Default Image" />
                  </Card>
                </Flex>
              </Flex>
            )
        )}
      </>
    );
  };
  return (
    <Box
      width={"400px"}
      height={"full"}
      ml={"24px"}
      borderRadius={"26px"}
      bg={outerBackground}
      // boxShadow={boxShadowStyles.mainBoxShadow.boxShadow}
      p={5}
    >
      <HStack spacing={"10px"}>
        <Box
          width={"12px"}
          height={"25px"}
          borderRadius={"20px"}
          bg={"#3C8DBC"}
          mt={"27px"}
        ></Box>
        <Text
          fontSize={"20px"}
          lineHeight={"26px"}
          fontWeight={"400"}
          mt={"26px"}
        >
          Recorded Class
        </Text>
      </HStack>

      <Box>
        <Box>
          <Text
            fontSize={"15px"}
            lineHeight={"18px"}
            fontWeight={400}
            color={"rgba(44, 51, 41, 1)"}
            mt={"28px"}
          >
            {isLive
              ? capitalize(recordingDetail?.LiveClassRoomDetail?.topicName)
              : isLiveTopic
              ? capitalize(
                  recordingDetail?.responseData?.[0]?.LiveClassRoomDetail
                    .topicName
                )
              : isSolo
              ? capitalize(recordingDetail?.topic)
              : isSoloTopic
              ? capitalize(recordingDetail?.responseData?.[0]?.topic)
              : capitalize("No Data")}
          </Text>

          <Text
            fontSize={"12px"}
            fontWeight={400}
            lineHeight={"14px"}
            color={"rgba(44, 51, 41, 0.47)"}
          >
            {isLive || isSolo
              ? recordingDetail?.mentorName
              : isLiveTopic || isSoloTopic
              ? recordingDetail?.responseData?.[0]?.mentorName
              : "No data"}
          </Text>
        </Box>
      </Box>

      <Box>
        <Text mt={"29px"} fontSize={"15px"} lineHeight={"19px"}>
          Description
        </Text>

        <Text
          color={"#2C332978"}
          fontSize={"12px"}
          lineHeight={"20px"}
          mt={"6px"}
        >
          {isLive
            ? recordingDetail?.LiveClassRoomDetail?.description
            : isSolo
            ? recordingDetail?.description
            : isLiveTopic
            ? recordingDetail?.responseData?.[0]?.LiveClassRoomDetail
                .description
            : isSoloTopic
            ? recordingDetail?.responseData?.[0]?.description
            : "No Data"}
        </Text>
      </Box>

      <Text mt={"26px"}>Files</Text>

      <Box my={4}>{renderFiles(recordingDetail)}</Box>

      <Box mt="26px" fontSize={"12px"}>
        <Text fontSize="16px" lineHeight={"19px"}>
          Agenda
        </Text>
        {renderAgenda(recordingDetail)}
      </Box>

      <Box mt={"16px"}>
        <Text>Recordings</Text>
        <Flex
          direction={"row"}
          mt={"10px"}
          overflowX={"auto"}
          w={"full"}
          gap={"24px"}
          className="example"
        >
          {renderRecordings(recordingDetail, activeRecording)}
          {/* {type === "live" || type === "live_specific"
            ? renderRecordings(
                recordingDetail?.LiveClassRoomRecordings,
                activeRecording
              )
            : renderRecordings(
                recordingDetail?.SoloClassRoomRecordings,
                activeRecording
              )} */}
        </Flex>
      </Box>
    </Box>
  );
};
export default RecordedClass;
