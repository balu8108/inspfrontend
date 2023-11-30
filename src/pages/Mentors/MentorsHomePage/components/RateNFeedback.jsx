// this component functionality is that latest three  finished lecture will come here
import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Card,
  Flex,
  HStack,
  Spacer,
  Text,
  useTheme,
} from "@chakra-ui/react";
import axios from "axios";
import { Link } from "react-router-dom";
import { BASE_URL } from "../../../../constants/staticurls";
import { capitalize } from "../../../../utils";
const FeedBack = () => {
  const [feedbackData, setFeedbackData] = useState([]);
  const { outerBackground, innerBackground, innerBoxShadow } =
    useTheme().colors.pallete;

  useEffect(() => {
    axios
      .get(`${BASE_URL}/generic/latest-completed-live-classroom`)
      .then((response) => {
        setFeedbackData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching feedback data:", error);
      });
  }, [BASE_URL]);

  return (
    <Box
      // boxShadow={boxShadowStyles.mainBoxShadow.boxShadow}
      mt={"23px"}
      borderRadius={"25px"}
      w={"58%"}
      h={"30%"}
      bg={outerBackground}
    >
      <Flex>
        <HStack spacing={"10px"}>
          <Box
            width={"12px"}
            height={"25px"}
            borderRadius={"20px"}
            bg={"#3C8DBC"}
            mt={"16px"}
            ml={"27px"}
          ></Box>
          <Text fontSize={"18px"} mt={"16px"}>
            Rating & Feedback
          </Text>
        </HStack>
        <Spacer />
        <Link to={`/mentor/rating&feedback`}>
          <Button
            variant={"ghost"}
            fontSize={"sm"}
            fontWeight={400}
            mt={"15px"}
            p={6}
          >
            See All
          </Button>
        </Link>
      </Flex>
      <Flex mt={"34px"} flexWrap="wrap">
        {feedbackData.map((rateNfeedebackOfAChapter) => (
          <Box flexBasis="100%" key={rateNfeedebackOfAChapter.id}>
            <Card
              h={"175px"}
              borderRadius={"18px"}
              bg={innerBackground}
              boxShadow={innerBoxShadow}
              ml={"20px"}
              mb={"20px"}
              mr={"20px"}
            >
              <Text
                fontSize={"16px"}
                fontWeight={"400"}
                lineHeight={"18px"}
                color={"#2C3329"}
                ml={"13px"}
                mt={"13px"}
                noOfLines={1}
              >
                {capitalize(
                  rateNfeedebackOfAChapter?.LiveClassRoomDetail?.topicName
                )}
              </Text>
              <Text
                fontSize={"12px"}
                lineHeight={"18px"}
                color={"#2C332978"}
                ml={"13px"}
              >
                {rateNfeedebackOfAChapter.mentorName}
              </Text>

              <Text
                fontSize={"12px"}
                lineHeight={"14px"}
                fontWeight={"400px"}
                color={"#2C3329"}
                mt={"14px"}
                ml={"14px"}
              >
                Description
              </Text>
              <Text
                fontSize={"11px"}
                lineHeight={"21px"}
                fontWeight={"400px"}
                ml={"13px"}
                mt={"6px"}
                color={"rgba(44, 51, 41, 0.47)"}
                noOfLines={2}
              >
                {rateNfeedebackOfAChapter.LiveClassRoomDetail.description}
              </Text>
              <Link
                to={`/mentor/view/rating&feedback/${rateNfeedebackOfAChapter.LiveClassRoomDetail.topicId}/${rateNfeedebackOfAChapter.LiveClassRoomDetail.topicName}`}
                style={{ display: "flex", justifyContent: "center" }}
              >
                <Button
                  variant={"ghost"}
                  color={"#3C8DBC"}
                  fontWeight={"600"}
                  fontSize={"14px"}
                  lineHeight={"16px"}
                  mt={"17px"}
                >
                  View Details
                </Button>
              </Link>
            </Card>
          </Box>
        ))}
      </Flex>
    </Box>
  );
};

export default FeedBack;
