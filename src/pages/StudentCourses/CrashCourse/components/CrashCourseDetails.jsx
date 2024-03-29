import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Box,
  Text,
  HStack,
  Card,
  Flex,
  Button,
  Stack,
  Spinner,
  Center,
  Spacer,
  Input,
  useTheme,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import VectorImage from "../../../../assets/images/Line/Vector.svg";
import { getAllCrashCourseLecture } from "../../../../api/crashCourse";
import LectureCard from "../../../../components/Card/LectureCard";

const CrashCourseDetails = () => {
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [lecture, setLecture] = useState([]);
  const { outerBackground, innerBackground, innerBoxShadow } =
    useTheme().colors.pallete;
  const navigate = useNavigate();

  const getAllCrashCourse = async () => {
    try {
      const response = await getAllCrashCourseLecture();

      const { data } = response.data;

      setLecture(data);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching all crash course lectures:", err);
      setLoading(false);
    }
  };
  useEffect(() => {
    getAllCrashCourse();
  }, []);

  const filteredTopics = lecture.filter((item) =>
    item?.LiveClassRoomDetail?.topicName
      ?.toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  const handleNavigate = (roomId) =>{
    navigate(`/myCourses/crash-course/${roomId}`)
  }

  return (
    <Box width={"full"} h={"100%"} bg={outerBackground} borderRadius={"26px"}>
      <Flex mt={"17px"}>
        <HStack spacing={"10px"} alignItems="center" ml={"33px"}>
          <Box
            width={"12px"}
            height={"25px"}
            borderRadius={"20px"}
            bg={"#3C8DBC"}
          ></Box>
          <Text fontSize={"19px"} lineHeight={"24px"}>
            My Courses (Crash Course)
          </Text>
        </HStack>
        <Spacer />
        <Input
          type="text"
          value={searchTerm}
          bg={innerBackground}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search..."
          w="30%"
          border="1px solid #ccc"
          borderRadius="14px"
          px="3"
          fontWeight={400}
          py="2"
          mx={"10"}
          style={{
            backgroundImage: `url(${VectorImage})`,
            backgroundRepeat: "no-repeat",
            backgroundPosition: "10px center",
            paddingLeft: "40px",
          }}
        />
      </Flex>

      {loading ? (
        <Center>
          <Spinner size={"md"} />
        </Center>
      ) : (
        <Stack>
          <Flex flexWrap="wrap" p={6} gap={"24px"}>
            {filteredTopics?.map(
              ({ roomId, LiveClassRoomDetail, scheduledDate, classLevel }) => (
                <LectureCard
                id={roomId}
                classRoomDetail={LiveClassRoomDetail} 
                scheduledDate={scheduledDate} 
                classLevel={classLevel} 
                route={handleNavigate}
                />
              )
            )}
          </Flex>
        </Stack>
      )}
    </Box>
  );
};

export default CrashCourseDetails;
