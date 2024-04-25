import React, { useState, useEffect } from "react";
import {
  Box,
  Flex,
  useTheme,
  UnorderedList,
  ListItem,
  HStack,
  Text,
  IconButton,
  Image,
} from "@chakra-ui/react";
import { useParams,useNavigate } from "react-router-dom";
import { capitalize } from "../../../../utils";
import { BsPlayFill } from "react-icons/bs";
import defaultImageUrl from "../../../../assets/images/image1.png";
import SingleFileComponent from "../../../../components/filebox/SingleFileComponent";
import { getSoloClassDetailsApi } from "../../../../api/soloclassrooms";
import detailsCoveredData from "../../../Mentors/SoloClasses/TopicCollection/data/detailsCoveredData";
import topicDescriptionConstants from "../../../../constants/topicDescriptionConstants";
const SoloClassLectureDetails = () => {
  const { topic, soloClassRoomId } = useParams();
  const topicDescription = topicDescriptionConstants[topic];
  const { outerBackground } = useTheme().colors.pallete;
  const [detailSoloClassroom, setDetailSoloClassroom] = useState("");
  const navigate=useNavigate();
  

  useEffect(() => {
    const fetchSoloClassroomDetails = async (soloClassRoomId) => {
      setDetailSoloClassroom(null);
      try {
        const response = await getSoloClassDetailsApi(soloClassRoomId);
        if (response.status === 200) {
          const detailSoloClassroom = response.data;
          setDetailSoloClassroom(detailSoloClassroom);
        }
      } catch (error) {
        console.error("Error fetching solo classroom details:", error);
      }
    };
    fetchSoloClassroomDetails(soloClassRoomId);
  }, [soloClassRoomId]);

  const handleViewRecording = (recording) => {
    navigate(`/view-recording?type=solo&id=${recording.soloClassRoomId}`);
  };




  return (
    <Box p={8} bg={outerBackground} borderRadius={"26px"} h={"full"}>
      <Box>
        <HStack spacing={"10px"} alignItems="center">
          <Box
            width={"12px"}
            height={"25px"}
            borderRadius={"20px"}
            bg={"#3C8DBC"}
          ></Box>
          <Text fontSize={"19px"} lineHeight={"24px"}>
            Details: {capitalize(topic)}
          </Text>
        </HStack>
      </Box>

      <Flex gap={4} mt={10}>
        <Box flex={1} w={"50%"}>
          <Text>Description</Text>
          {detailSoloClassroom && (
            <Text
              mt={4}
              fontSize="12px"
              lineHeight={"21px"}
              color={"#2C332978"}
            >
              {detailSoloClassroom.soloClassroomDetails.description}
            </Text>
          )}
        </Box>
        <Box flex={1}>
          <Text fontSize="md">Agenda</Text>
          <UnorderedList fontSize={"12px"} color={"#2C332978"} pt={2}>
          {detailSoloClassroom && (
              <ListItem my={2}>
              {detailSoloClassroom.soloClassroomDetails.agenda}
              </ListItem>
          )}
          </UnorderedList>
        </Box>
      </Flex>

      <Box mt={8}>
        <Text>Recording</Text>
        <Flex gap={"24px"} overflowX="auto">
          {detailSoloClassroom &&
          detailSoloClassroom.soloClassRoomRecordings &&
          detailSoloClassroom.soloClassRoomRecordings.length > 0 ? (
            <Flex gap={4} mt={4}>
              {detailSoloClassroom.soloClassRoomRecordings.map(
                (recording, index) => (
                  <Flex
                    alignItems="center"
                    w={"160px"}
                    key={recording.id}
                    onClick={() => handleViewRecording(recording)}
                    position={"relative"}
                    cursor={"pointer"}
                  >
                    <Image
                      src={defaultImageUrl}
                      alt="Video Thumbnail"
                      width={"100%"}
                      height={"100%"}
                    />
                    <IconButton
                      icon={<BsPlayFill />}
                      fontSize="24px"
                      position="absolute"
                      top="50%"
                      left="50%"
                      borderRadius={"100%"}
                      transform="translate(-50%, -50%)"
                    />
                  </Flex>
                )
              )}
            </Flex>
          ) : (
            <Text fontSize={"12px"} mt={4}>
              No recordings available for this topic.
            </Text>
          )}
        </Flex>
      </Box>

      <Box mt={8}>
        <Text>Files/Notes</Text>
        {detailSoloClassroom &&
        detailSoloClassroom.soloClassRoomFile &&
        detailSoloClassroom.soloClassRoomFile.length > 0 ? (
          <Flex mt={4} flexWrap="wrap" gap={2}>
            {detailSoloClassroom.soloClassRoomFile.map((file) => (
              <SingleFileComponent key={file.id} file={file} type={"solo"} />
            ))}
          </Flex>
        ) : (
          <Text fontSize="12px" mt={4}>
            No Data for this topic
          </Text>
        )}
      </Box>
    </Box>
  );
};

export default SoloClassLectureDetails;
