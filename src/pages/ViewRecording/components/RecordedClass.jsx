import { Box, HStack, Text, Flex, Icon, Image, Card } from "@chakra-ui/react";

import { FaCircle } from "react-icons/fa";
import defaultImageUrl from "../../../assets/images/image1.png";

import FileBoxComponent from "../../../components/filebox/FileBoxComponent";
import { fileTypes } from "../../../constants/staticvariables";
const RecordedClass = ({
  recordingDetail,
  activeRecording,
  setActiveRecording,
}) => {
  return (
    <Box
      width={"400px"}
      height={"full"}
      ml={"24px"}
      borderRadius={"26px"}
      bg={"#FFFFFF"}
      boxShadow="2px 2px 13px 0px #5C5C5C1F"
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
        <Box >
          <Text
            fontSize={"15px"}
            lineHeight={"18px"}
            fontWeight={400}
            color={"rgba(44, 51, 41, 1)"}
            mt={"28px"}
          >
            {recordingDetail?.LiveClassRoomDetail?.topicName}
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

        <Text color={"#2C332978"} fontSize={"12px"} lineHeight={"20px"}>
          {recordingDetail?.LiveClassRoomDetail?.description}
        </Text>
      </Box>
      <Text mt={"26px"}>Files</Text>

      <Box my={4}>
        {recordingDetail?.LiveClassRoomFiles.length > 0 ? (
          <FileBoxComponent
            data={recordingDetail.LiveClassRoomFiles}
            type={fileTypes.live}
          />
        ) : (
          <Text fontSize={"0.8rem"}>No Files</Text>
        )}
      </Box>

      <Box>
        <Box>
          <Box mt="13px" fontSize={"12px"}>
            <Text fontSize="16px" lineHeight={"19px"}>
              Agenda
            </Text>
            <Box>
              <Box mt={"16px"}>
                <Box mt={"10px"}>
                  <Icon
                    boxSize={3}
                    color={"#E0E0E0"}
                    as={FaCircle}
                    mr={"10px"}
                  />
                  {recordingDetail?.LiveClassRoomDetail?.agenda}
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
        <Box mt={"10px"} overflowX={"auto"}>
          <Text>Recordings</Text>
          {recordingDetail?.LiveClassRoomRecordings?.map(
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
        </Box>
      </Box>
    </Box>
  );
};
export default RecordedClass;
