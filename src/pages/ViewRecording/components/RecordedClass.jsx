import { Box, HStack, Text, Flex, Icon, Image, Card } from "@chakra-ui/react";

import { FaCircle } from "react-icons/fa";
import defaultImageUrl from "../../../assets/images/image1.png";
import scrollbar from "../../../constants/scrollbar/style.css";
import FileBoxComponent from "../../../components/filebox/FileBoxComponent";
import { fileTypes } from "../../../constants/staticvariables";
import { boxShadowStyles, capitalize } from "../../../utils";
const RecordedClass = ({
  type,
  recordingDetail,
  activeRecording,
  setActiveRecording,
}) => {
  console.log(type, recordingDetail, activeRecording);

  const renderFiles = (files) => {
    return (
      <>
        {files && files.length > 0 ? (
          <FileBoxComponent data={files} type={fileTypes.solo} />
        ) : (
          <Text fontSize={"0.8rem"} color={"#2C332978"}>
            No Files
          </Text>
        )}
      </>
    );
  };

  const renderRecordings = (recordings, activeRecording) => {
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
      bg={"white"}
      boxShadow={boxShadowStyles.mainBoxShadow.boxShadow}
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
            {capitalize(
              type === "live" || type === "live_specific"
                ? recordingDetail?.LiveClassRoomDetail?.topicName
                : recordingDetail?.topic
            )}
          </Text>

          <Text
            fontSize={"12px"}
            fontWeight={400}
            lineHeight={"14px"}
            color={"rgba(44, 51, 41, 0.47)"}
          >
            {recordingDetail?.mentorName}
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
          {type === "live" || type === "live_specific"
            ? recordingDetail?.LiveClassRoomDetail?.description || "No Data"
            : recordingDetail?.description || "No Data"}
        </Text>
      </Box>

      <Text mt={"26px"}>Files</Text>

      <Box my={4}>
        {type === "live" || type === "live_specific"
          ? renderFiles(recordingDetail?.LiveClassRoomFiles)
          : renderFiles(recordingDetail?.SoloClassRoomFiles)}
      </Box>

      <Box mt="26px" fontSize={"12px"}>
        <Text fontSize="16px" lineHeight={"19px"}>
          Agenda
        </Text>
        {recordingDetail?.LiveClassRoomDetail?.agenda ||
        recordingDetail?.agenda ? (
          <Box>
            <Box mt={"16px"}>
              <Box mt={"10px"}>
                <Icon boxSize={3} color={"#E0E0E0"} as={FaCircle} mr={"10px"} />
                {type === "live" || type === "live_specific"
                  ? recordingDetail?.LiveClassRoomDetail?.agenda || "No Data"
                  : recordingDetail?.agenda || "No Data"}
              </Box>
            </Box>
          </Box>
        ) : (
          <Text color={"#2C332978"} mt={2}>
            No Data
          </Text>
        )}
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
          {type === "live" || type === "live_specific"
            ? renderRecordings(
                recordingDetail?.LiveClassRoomRecordings,
                activeRecording
              )
            : renderRecordings(
                recordingDetail?.SoloClassRoomRecordings,
                activeRecording
              )}
        </Flex>
      </Box>
    </Box>
  );
};
export default RecordedClass;
