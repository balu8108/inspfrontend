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
import { fetchAllChaptersApi } from "../../../../api/inspexternalapis";
import { capitalize } from "../../../../utils";
import VectorImage from "../../../../assets/images/Line/Vector.svg";
import { getAllCrashCourseLecture } from "../../../../api/crashCourse";
import moment from "moment";
import { BiTrophy } from "react-icons/bi";

const CrashCourseDetails = () => {
  
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [lecture, setLecture] = useState([]);
  const { outerBackground, innerBackground, innerBoxShadow } =
    useTheme().colors.pallete;

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
              ({ roomId, LiveClassRoomDetail, scheduledDate, id }, index) => (
                <Card
                  bg={innerBackground}
                  boxShadow={innerBoxShadow}
                  key={id}
                  w="30%"
                  h={"204px"}
                  borderRadius={"18px"}
                >
                  <div className="flex justify-between">
                    <Text
                      fontSize={"16px"}
                      fontWeight={400}
                      ml={"13px"}
                      mt={"16px"}
                      lineHeight={"19px"}
                      noOfLines={1}
                    >
                      Lecture {LiveClassRoomDetail?.lectureNo}
                    </Text>
                    <Text
                      fontSize={"12px"}
                      fontWeight={400}
                      mr={"13px"}
                      mt={"16px"}
                      lineHeight={"19px"}
                      noOfLines={1}
                      color={"rgba(44, 51, 41, 0.47)"}
                    >
                      {moment(scheduledDate).format("L")}
                    </Text>
                  </div>
                  <Text
                    fontWeight={400}
                    fontSize={"12px"}
                    lineHeight={"15px"}
                    ml={"13px"}
                    mt={'3px'}
                    color={"rgba(44, 51, 41, 0.47)"}
                    noOfLines={1}
                  >
                    {LiveClassRoomDetail?.topicName}
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
                    fontSize={"12px"}
                    lineHeight={"21px"}
                    fontWeight={400}
                    ml={13}
                    color={"rgba(44, 51, 41, 0.47)"}
                    noOfLines={2}
                  >
                    {LiveClassRoomDetail?.description}
                  </Text>
                  <Link
                    to={`/myCourses/crash-course/${roomId}`}
                    style={{ display: "flex", justifyContent: "center" }}
                  >
                    <Button
                      variant={"ghost"}
                      color={"#3C8DBC"}
                      size={"14px"}
                      lineHeight={"16px"}
                      p={6}
                      mt={"5"}
                      _hover={{ bg: "white" }}
                    >
                      View Details
                    </Button>
                  </Link>
                </Card>
              )
            )}
          </Flex>
        </Stack>
      )}
    </Box>
  );
};
 

export default CrashCourseDetails;
