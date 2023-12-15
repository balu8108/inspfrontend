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
  const renderNotes = (data) => {
    return (
      <>
        {isLive && data && data?.LiveClassRoomQNANote ? (
          <>
            <FileBoxComponent
              data={[data?.LiveClassRoomQNANote]}
              type={"qna"}
            />
            <FileBoxComponent data={[data?.LiveClassRoomNote]} type={"note"} />
          </>
        ) : isLiveTopic && data ? (
          data?.responseData?.map((item) => (
            <>
              <FileBoxComponent
                data={[item?.LiveClassRoomQNANote]}
                type={"qna"}
              />
              <FileBoxComponent
                data={[[item?.LiveClassRoomQNANote]]}
                type={"note"}
              />
            </>
          ))
        ) : (
          <Text color={"rgba(44, 51, 41, 0.47)"} fontSize={"12px"}>
            No notes/qna available...
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
            <Box>
              <Box>
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
        {recordings?.length === 0 && (
          <Text color={"rgba(44, 51, 41, 0.47)"} fontSize={"12px"}>
            No recordings available...
          </Text>
        )}
        {recordings?.length === 1 &&
          activeRecording?.id === recordings[0]?.id && (
            <Text color={"rgba(44, 51, 41, 0.47)"} fontSize={"12px"}>
              No other recordings..
            </Text>
          )}
      </>
    );
  };
  return (
    <Box
      width={"400px"}
      height={"full"}
      borderRadius={"26px"}
      p={6}
      bg={outerBackground}
      // boxShadow={boxShadowStyles.mainBoxShadow.boxShadow}
    >
      <HStack spacing={"10px"}>
        <Box
          width={"12px"}
          height={"25px"}
          borderRadius={"20px"}
          bg={"#3C8DBC"}
        ></Box>
        <Text fontSize={"20px"} lineHeight={"26px"} fontWeight={"400"}>
          Recorded Class
        </Text>
      </HStack>

      <Box mt={6}>
        <Box>
          <Text
            fontSize={"15px"}
            lineHeight={"18px"}
            fontWeight={400}
            color={"rgba(44, 51, 41, 1)"}
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
            mt={1}
          >
            {isLive || isSolo
              ? recordingDetail?.mentorName
              : isLiveTopic || isSoloTopic
              ? recordingDetail?.responseData?.[0]?.mentorName
              : "No data"}
          </Text>
        </Box>
      </Box>

      <Box mt={6}>
        <Text fontSize={"15px"} lineHeight={"19px"}>
          Description
        </Text>

        <Text mt={1} color={"#2C332978"} fontSize={"12px"} lineHeight={"20px"}>
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
      <Box mt={6}>
        <Text>Files</Text>
        <Box mt={1}>{renderFiles(recordingDetail)}</Box>
      </Box>
      <Box mt={6}>
        <Text fontSize="15px" lineHeight={"19px"}>
          Agenda
        </Text>
        <Box mt={1}>{renderAgenda(recordingDetail)}</Box>
      </Box>

      <Box mt={6}>
        <Text>Recordings</Text>
        <Flex
          direction={"row"}
          overflowX={"auto"}
          w={"full"}
          className="example"
        >
          {renderRecordings(recordingDetail, activeRecording)}
        </Flex>
      </Box>
      {(isLive || isLiveTopic) && (
        <Box mt={6}>
          <Text>Notes</Text>
          <Box mt={1}>{renderNotes(recordingDetail)}</Box>
        </Box>
      )}
    </Box>
  );
};
export default RecordedClass;
