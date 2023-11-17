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
  const openUploadAssignmentModal = () => {
    // Function to open the UploadAssignmentModal
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
          <Link to={`/mentor/alluploads`}>
            <Text fontSize={"20px"} lineHeight={"24px"} mt={"26px"}>
              My Uploads
            </Text>
          </Link>
        </HStack>
        <Spacer />

        <Button
          variant={"ghost"}
          fontSize={"sm"}
          fontWeight={400}
          mt={"15px"}
          mr={"10px"}
          color={"#3C8DBC"}
          onClick={openUploadAssignmentModal}
        >
          <Icon as={IoIosAdd} mr={2} boxSize={7} /> Add Assignment
        </Button>
      </Flex>
      <Flex mt={"34px"} flexWrap="wrap">
        {latestAssignment.map((mentorUploadDetails) => (
          <Box
            flexBasis="50%" // Two cards per line
            key={mentorUploadDetails.id}
          >
            <Card
              h={"170px"}
              borderRadius={"18px"}
              bg={"#F1F5F8"}
              ml={"20px"}
              mb={"20px"}
              mr={"20px"}
              blendMode={"multiply"}
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
                {capitalize(mentorUploadDetails?.topicName)}
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
                color={"#2C332978"}
                noOfLines={2}
              >
                {mentorUploadDetails.description}
              </Text>
              <Link
                to={`/mentor/alluploads`}
                style={{ display: "flex", justifyContent: "center" }}
              >
                <Button
                  variant={"ghost"}
                  color={"#3C8DBC"}
                  fontWeight={"600"}
                  size={"12px"}
                  fontSize={"14px"}
                  lineHeight={"16px"}
                  mt={"24px"}
                  mb={"10px"}
                >
                  View Details
                </Button>
              </Link>
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
