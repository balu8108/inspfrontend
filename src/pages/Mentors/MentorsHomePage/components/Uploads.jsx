import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Card,
  Flex,
  HStack,
  Spacer,
  Text,
  Icon,
} from "@chakra-ui/react";
import upload from "../data/uploads";
import { IoIosAdd } from "react-icons/io";
import { Link } from "react-router-dom";
import axios from "axios";
import UploadAssignmentPopup from "../../../../components/popups/UploadAssignmentPopup";
import { BASE_URL } from "../../../../constants/staticurls";
import { boxShadowStyles, capitalize } from "../../../../utils";
const MentorsUploads = () => {
  const [latestAssignment, setLatestAssignment] = useState([]);
  const [isUploadAssignmentModalOpen, setUploadAssignmentModalOpen] =
    useState(false);
  const openUploadAssignmentModal = (e) => {
    // Function to open the UploadAssignmentModal
    e.preventDefault();
    e.stopPropagation();

    setUploadAssignmentModalOpen(true);
  };

  const closeUploadAssignmentModal = () => {
    // Function to close the UploadAssignmentModal
    setUploadAssignmentModalOpen(false);
  };
  useEffect(() => {
    axios.get(`${BASE_URL}/topic/latest-assignment`).then((response) => {
      setLatestAssignment(response.data.data);
    });
  }, []);
  return (
    <Box
      w={"95%"}
      borderRadius={"26px"}
      bg="white"
      boxShadow={boxShadowStyles.mainBoxShadow.boxShadow}
    >
      <Flex>
        <HStack spacing={"10px"}>
          <Box
            width={"12px"}
            height={"25px"}
            borderRadius={"20px"}
            bg={"#3C8DBC"}
            mt={"27px"}
            ml={"27px"}
          ></Box>

          <Text fontSize={"20px"} lineHeight={"24px"} mt={"26px"}>
            My Uploads
          </Text>
        </HStack>
        <Spacer />
        <Box>
          <Button
            fontSize={"sm"}
            fontWeight={400}
            mt={"15px"}
            mr={"10px"}
            color={"#3C8DBC"}
            onClick={(e) => openUploadAssignmentModal(e)}
          >
            <Icon as={IoIosAdd} mr={2} boxSize={7} /> Add Assignment
          </Button>
        </Box>
      </Flex>
      <Flex mt={"34px"} flexWrap="wrap">
        {latestAssignment.map((mentorUploadDetails) => (
          <Box flexBasis="50%" key={mentorUploadDetails.id}>
            <Card
              h={"170px"}
              borderRadius={"18px"}
              bg={"#F1F5F8"}
              ml={"20px"}
              mb={"20px"}
              mr={"20px"}
              blendMode={"multiply"}
              justifyContent={"space-between"}
              flexDirection={"column"}
            >
              <Box>
                <Text
                  fontSize={"16px"}
                  fontWeight={"400"}
                  lineHeight={"18px"}
                  color={"#2C3329"}
                  ml={"13px"}
                  mt={"13px"}
                  noOfLines={1}
                >
                  {capitalize(mentorUploadDetails.topicName)}
                </Text>
                <Text
                  fontSize={"11px"}
                  lineHeight={"18px"}
                  color={"#2C332978"}
                  ml={3}
                >
                  {mentorUploadDetails.instructorName}
                </Text>

                <Text
                  fontSize={"12px"}
                  lineHeight={"14px"}
                  fontWeight={"400px"}
                  color={"#2C3329"}
                  ml={"14px"}
                  mt={"18px"}
                >
                  Description
                </Text>

                <Text
                  fontSize={"11px"}
                  lineHeight={"21px"}
                  fontWeight={"400px"}
                  ml={"13px"}
                  mt={"6px"}
                  color={"#2C332978"}
                  noOfLines={2}
                >
                  {mentorUploadDetails.description}
                </Text>
              </Box>
              <Button
                variant={"ghost"}
                color={"#3C8DBC"}
                fontWeight={"600"}
                size={"12px"}
                fontSize={"14px"}
                lineHeight={"16px"}
                mb={"10px"}
              >
                View Details
              </Button>
            </Card>
          </Box>
        ))}
      </Flex>
      <UploadAssignmentPopup
        isOpen={isUploadAssignmentModalOpen}
        onClose={closeUploadAssignmentModal}
      />
    </Box>
  );
};

export default MentorsUploads;
