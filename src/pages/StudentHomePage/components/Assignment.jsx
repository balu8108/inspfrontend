//This component is for the displaying one latest assignment on student homepage
import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Text,
  HStack,
  Flex,
  Card,
  useTheme,
} from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import { capitalize } from "../../../utils";
import { getRecentAssignmentApi } from "../../../api/assignments";
const Assignment = () => {
  const navigate = useNavigate();
  const [recentAssignments, setRecentAssignments] = useState([]);
  const { outerBackground, innerBackground, innerBoxShadow } =
    useTheme().colors.pallete;
  const handleViewDetail = () => {
    navigate(`/student/assignments/PHYSICS`);
  };
  useEffect(() => {
    const fetchRecentAssignment = async () => {
      try {
        const response = await getRecentAssignmentApi();
        if (response.status === 200) {
          setRecentAssignments(response?.data?.data);
        }
      } catch (err) {}
    };
    fetchRecentAssignment();
  }, []);

  return (
    <Box
      w={"50%"}
      h="313px"
      mt="24px"
      borderRadius="26px"
      background={outerBackground}
    >
      <HStack spacing="10px">
        <Box
          width="12px"
          height="25px"
          borderRadius="20px"
          bg="#3C8DBC"
          mt="27px"
          ml="33px"
        ></Box>
        <Text fontSize="20px" lineHeight="26.6px" mt="26px">
          Assignment
        </Text>
        <Link to="/student/assignments/PHYSICS">
          <Button
            variant={"ghost"}
            fontSize={"13px"}
            mt={5}
            ml={12}
            fontWeight={400}
            _hover={{ bg: "none" }}
          >
            See All
          </Button>
        </Link>
      </HStack>

      <Flex mt={5}>
        {recentAssignments.map((homepageAssignment) => (
          <Card
            key={homepageAssignment.id}
            borderRadius="18px"
            w={"100%"}
            h={"200px"}
            bg={innerBackground}
            boxShadow={innerBoxShadow}
            ml="26px"
            mr="20px"
          >
            <Text
              fontSize="16px"
              fontWeight="400"
              color="#2C3329"
              ml="13px"
              mt="13px"
              noOfLines={1}
            >
              {capitalize(homepageAssignment?.topicName)}
            </Text>
            <Text fontSize="12px" fontWeight="400" color="gray" ml="13px">
              {homepageAssignment.instructorName}
            </Text>

            <Text
              fontSize="12px"
              fontWeight="400"
              color="#2C3329"
              mt="14px"
              ml="14px"
            >
              Description
            </Text>
            <Text
              fontSize="11px"
              lineHeight="21px"
              fontWeight="400"
              ml="13px"
              mt="6px"
              color="rgba(44, 51, 41, 0.47)"
              noOfLines={2}
            >
              {homepageAssignment.description}
            </Text>

            <Button
              variant="ghost"
              color="#3C8DBC"
              fontWeight="600"
              size="sm"
              lineHeight="1.5"
              p={6}
              mt={4}
              _hover={{ bg: "white" }}
              onClick={handleViewDetail}
            >
              View Details
            </Button>
          </Card>
        ))}
      </Flex>
    </Box>
  );
};

export default Assignment;
