import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Flex,
  HStack,
  Text,
  useTheme,
  Button,
  Card,
  Spacer,
} from "@chakra-ui/react";
import { useLocation } from "react-router-dom";
import { getAllLectureByTopicId } from "../../../../api/lecture";
import { capitalize } from "../../../../utils";
import moment from "moment";

const SingleLectureDetailsCovered = () => {
  const { outerBackground, innerBackground, innerBoxShadow } =
    useTheme().colors.pallete;
  const navigate = useNavigate();
  const location = useLocation();
  const lectures = location.state?.lecture || [];
  const topicname = location.state?.topicname || "";

  const [lecturesData, setLecturesData] = useState(lectures);

  const getAllLecture = async () => {
    try {
      const response = await getAllLectureByTopicId({ topic: topicname });
      const { data } = response.data;

      setLecturesData(data);
    } catch (err) {
      console.error("Error fetching all crash course lectures:", err);
    }
  };
  const handleView = (roomId) => {
    if (topicname) {
      navigate(`/my-courses/lecture-detail/${roomId}/Physics`, {
        state: {
          lecture: lectures,
          topicname: topicname,
        },
      });
    }
  };

  useEffect(() => {
    if (topicname && lectures.length === 0) {
      getAllLecture();
    }
  }, [topicname]);

  return (
    <Box borderRadius={"25px"} backgroundColor={outerBackground}>
      <HStack spacing={"10px"} alignItems="center" p={"20px"}>
        <Box
          width={"12px"}
          height={"25px"}
          borderRadius={"20px"}
          bg={"#3C8DBC"}
        ></Box>
        <Text fontSize={"19px"} lineHeight={"24px"}>
          Physic({topicname})
        </Text>
      </HStack>
      <Flex gap={"24px"} overflowX="auto" className="example" mx={5}>
        {lecturesData.map((lecture, index) => (
          <Card
            minW={"30%"}
            h={"200px"}
            borderRadius={"16px"}
            bg={innerBackground}
            key={lecture.id}
            boxShadow={innerBoxShadow}
            mb={5}
          >
            <Flex>
              <Box>
                <Text
                  fontSize={"15px"}
                  ml={"13px"}
                  lineHeight={"19px"}
                  noOfLines={1}
                  mt={"16px"}
                >
                  Lecture {lecture?.LiveClassRoomDetail?.lectureNo}
                </Text>
                <Text
                  fontWeight={400}
                  fontSize={"11px"}
                  ml={"13px"}
                  color={"rgba(44, 51, 41, 0.47)"}
                  noOfLines={1}
                >
                  {capitalize(topicname)}
                </Text>
              </Box>
              <Spacer />

              <Text
                fontWeight={400}
                fontSize={"11px"}
                lineHeight={"15px"}
                color={"#2C332978"}
                mr={"13px"}
                mt={"16px"}
              >
                {moment(lecture.scheduledDate).format("L")}
              </Text>
            </Flex>

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
              {lecture?.LiveClassRoomDetail?.description}
            </Text>

            <Button
              variant={"ghost"}
              color={"#3C8DBC"}
              fontWeight={"600"}
              size={"14px"}
              lineHeight={"16px"}
              m={"20px"}
              _hover={{ bg: "white" }}
              onClick={() => handleView(lecture?.roomId)}
              mt={"auto"}
            >
              View Details
            </Button>
          </Card>
        ))}
      </Flex>
    </Box>
  );
};
export default SingleLectureDetailsCovered;
