import {
  Box,
  Text,
  Card,
  useTheme,
  Button,
  Flex,
  HStack,
  Input,
  Spacer,
} from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { capitalize } from "../../../../utils";
import VectorImage from "../../../../assets/images/Line/Vector.svg";
import topicDescriptionConstants from "../../../../constants/topicDescriptionConstants";
import { getAllLectureByTopicId } from "../../../../api/lecture";
import LectureCard from "../../../../components/Card/LectureCard";

const LectureListPage = ({ lectureId, lectureName }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const topics = location.state?.topics || [];
  const [selectedTopic, setSelectedTopic] = useState(lectureId);
  const [selectedTopicName, setSelectedTopicName] = useState(lectureName);
  const [searchTerm, setSearchTerm] = useState("");
  const [lecturesData, setLecturesData] = useState([]);
  const { outerBackground, innerBackground, innerBoxShadow } =
    useTheme().colors.pallete;

  const selectedChapterName =
    location.state?.selectedChapterName || "Select a Chapter";

  const lectures = selectedTopic ? lecturesData : [];

  const handleTopicClick = (topic) => {
    setSelectedTopic(topic?.id);
    setSelectedTopicName(topic?.name);
  };

  const handleView = (roomId) => {
    if (selectedTopic && lectures.length > 0) {
      navigate(`/my-courses/lecture-detail/${roomId}/Physics`, {
        state: {
          lecture: lectures,
          topicname: selectedTopicName,
        },
      });
    }
  };
  const filterLectures = (lecture) => {
    const lowerCaseSearchTerm = searchTerm.toLowerCase();
    const lectureNumber = lecture?.LiveClassRoomDetail?.lectureNo
      ?.toString()
      .toLowerCase();

    return lectureNumber.includes(lowerCaseSearchTerm);
  };

  const getAllLecture = async () => {
    try {
      const response = await getAllLectureByTopicId(selectedTopic, "regular");
      const { data } = response.data;
      setLecturesData(data);
    } catch (err) {
      console.error("Error fetching all crash course lectures:", err);
    }
  };

  useEffect(() => {
    if (selectedTopic) {
      getAllLecture();
    }
  }, [selectedTopic]);

  return (
    <Box width={"100%"}>
      <Box bg={outerBackground} borderRadius={"26px"} className="example">
        <Box pt={5} marginLeft={"33px"}>
          <HStack spacing={"10px"} alignItems="center">
            <Box
              width={"12px"}
              height={"25px"}
              borderRadius={"20px"}
              bg={"#3C8DBC"}
            ></Box>
            <Text fontSize={"19px"} lineHeight={"24px"}>
              Physics({selectedChapterName})
            </Text>
          </HStack>
        </Box>
        <Flex
          flexDirection={"row"}
          gap={23}
          overflowX={"auto"}
          className="example"
          m={"24px"}
        >
          {topics.map((topic) => (
            <Card
              key={topic.id}
              w={"30%"}
              boxShadow={innerBoxShadow}
              borderRadius={"18px"}
              flexShrink={"0"}
              display="flex"
              flexDirection="column"
            >
              <Text
                fontSize={"15px"}
                ml={"13px"}
                mt={"16px"}
                lineHeight={"19px"}
                noOfLines={1}
              >
                {capitalize(topic.name)}
              </Text>
              <Text
                fontWeight={400}
                fontSize={"11px"}
                lineHeight={"15px"}
                ml={"13px"}
                color={"rgba(44, 51, 41, 0.47)"}
              >
                Nitin Sachan
              </Text>
              <Text
                fontSize={"12px"}
                lineHeight={"13px"}
                ml={"13px"}
                fontWeight={400}
                color={"rgba(44, 51, 41, 1)"}
                mt={"18px"}
              >
                Description
              </Text>
              <Text
                fontSize={"11px"}
                lineHeight={"21px"}
                fontWeight={400}
                ml={13}
                noOfLines={"3"}
                color={"rgba(44, 51, 41, 0.47)"}
              >
                {topicDescriptionConstants[topic.id]}
              </Text>

              <Button
                variant={"ghost"}
                color={"#3C8DBC"}
                fontWeight={"600"}
                size={"14px"}
                lineHeight={"16px"}
                m={"20px"}
                _hover={{ bg: "white" }}
                onClick={() => handleTopicClick(topic)}
              >
                View Details
              </Button>
            </Card>
          ))}
        </Flex>
      </Box>
      {selectedTopic ? (
        <Box bg={outerBackground} borderRadius={"26px"} mt={"24px"}>
          <Flex>
            <HStack spacing={"10px"} ml="27px">
              <Box
                width={"12px"}
                height={"25px"}
                borderRadius={"20px"}
                bg={"#3C8DBC"}
              ></Box>
              <Text fontSize={"19px"} lineHeight={"24px"}>
                Topic({capitalize(selectedTopicName)})
              </Text>
            </HStack>

            <Spacer />

            <Input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search..."
              w="30%"
              border="1px solid #ccc"
              borderRadius="14px"
              px="3"
              bg={innerBackground}
              py="2"
              mx={12}
              my={"17"}
              style={{
                backgroundImage: `url(${VectorImage})`,
                backgroundRepeat: "no-repeat",
                backgroundPosition: "10px center",
                paddingLeft: "40px",
              }}
            />
          </Flex>
          <Flex p={6} gap={"24px"} flexWrap={"wrap"}>
            {lectures.filter(filterLectures).map((lecture) => (
              <LectureCard
                id={lecture?.roomId}
                classRoomDetail={lecture?.LiveClassRoomDetail}
                scheduledDate={lecture?.scheduledDate}
                classLevel={lecture?.classLevel}
                route={handleView}
              />
            ))}
            {lectures.length === 0 && (
              <Box
                h={"204px"}
                width={"100%"}
                justifyContent={"center"}
                alignItems={"center"}
                display={"flex"}
              >
                No Lecture for this topic
              </Box>
            )}
          </Flex>
        </Box>
      ) : (
        <Box
          width={"100%"}
          bg={outerBackground}
          borderRadius={"26px"}
          mt={"24px"}
        >
          <Flex
            align="center"
            justify="center"
            direction="column"
            height="300px"
            color="gray.500"
          >
            <Text fontSize="18px">Please select a topic !!</Text>
          </Flex>
        </Box>
      )}
    </Box>
  );
};

export default LectureListPage;
