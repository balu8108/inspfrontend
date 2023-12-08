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
  useTheme,
} from "@chakra-ui/react";
import { IoIosAdd } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import UploadAssignmentPopup from "../../../../components/popups/UploadAssignmentPopup";
import { BASE_URL } from "../../../../constants/staticurls";
import { capitalize } from "../../../../utils";
const MentorsUploads = () => {
  const navigate = useNavigate();
  const [assignment, setAssignment] = useState([]);
  const [isUploadAssignmentModalOpen, setIsUploadAssignmentModalOpen] =
    useState(false);
  const { outerBackground, innerBackground, innerBoxShadow } =
    useTheme().colors.pallete;
  const openUploadAssignmentModal = () => {
    setIsUploadAssignmentModalOpen(true);
  };

  const closeUploadAssignmentModal = () => {
    setIsUploadAssignmentModalOpen(false);
  };

  const handleViewDetail = () => {
    navigate(`/mentor/allUploads`);
  };
  useEffect(() => {
    axios.get(`${BASE_URL}/topic/latest-assignment`).then((response) => {
      console.log("response is ", response.data.data);
      setAssignment(response.data.data);
    });
  }, []);

  return (
    <Box
      w={"95%"}
      borderRadius={"26px"}
      bg={outerBackground}
      // boxShadow={boxShadowStyles.mainBoxShadow.boxShadow}
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

        <Button
          variant={"ghost"}
          fontSize={"sm"}
          fontWeight={400}
          mt={"15px"}
          mr={"10px"}
          color={"#3C8DBC"}
          onClick={openUploadAssignmentModal}
          _hover={{ bg: "none" }}
        >
          <Icon as={IoIosAdd} mr={2} boxSize={7} /> Add Assignment
        </Button>
      </Flex>

      <Flex mt={"34px"} flexWrap="wrap" position="relative">
        {assignment?.slice(0, 2)?.map((mentorUploadDetails) => (
          <Box flexBasis="50%" key={mentorUploadDetails.id}>
            <Card
              h={"170px"}
              borderRadius={"18px"}
              bg={innerBackground}
              boxShadow={innerBoxShadow}
              ml={"20px"}
              mb={"20px"}
              mr={"20px"}
              display="flex"
              flexDirection="column"
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

              <Button
                variant={"ghost"}
                color={"#3C8DBC"}
                fontWeight={"600"}
                size={"12px"}
                fontSize={"14px"}
                lineHeight={"16px"}
                mb={"15px"}
                mt={"auto"}
                onClick={handleViewDetail}
                _hover={{ bg: "white" }}
              >
                View Details
              </Button>
            </Card>
          </Box>
        ))}
      </Flex>
      <UploadAssignmentPopup
        setAssignment={setAssignment}
        isOpen={isUploadAssignmentModalOpen}
        onClose={closeUploadAssignmentModal}
      />
    </Box>
  );
};

export default MentorsUploads;
