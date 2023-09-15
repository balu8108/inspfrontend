import React, { useState } from "react";
import {
  Box,
  Flex,
  HStack,
  Text,
  Input,
  Spacer,
  SimpleGrid,
  Button,
  Card,
} from "@chakra-ui/react";
import rateNFeedbackDetails from "../data/feedbackData";
const AllUploadedLecture = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
    // You can perform search-related logic here
  };

  return (
    <Box bg={"#F1F5F8"} width={"250%"} mt={"24px"} borderRadius={"26px"}>
      <Flex>
        <HStack spacing={"10px"} ml="27px">
          <Box
            width={"12px"}
            height={"25px"}
            borderRadius={"20px"}
            bg={"#3C8DBC"}
          ></Box>
          <Text fontSize={"20px"} lineHeight={"24px"} fontFamily={400}>
            Rating & feedback
          </Text>
        </HStack>

        <Spacer />
        <Input
          type="text"
          value={searchQuery}
          onChange={handleSearchChange}
          placeholder="Search..."
          w="30%"
          border="1px solid #ccc"
          borderRadius="md"
          px="3"
          py="2"
          mx={12}
          my={"17"}
        />
      </Flex>

      <SimpleGrid
        columns={{ base: 1, md: 2, lg: 3 }}
        spacing={"6"}
        p={4}
        mr={"20px"}
      >
        {rateNFeedbackDetails.map((chapter) => (
          <Card
            w={"100%"}
            h={"200px"}
            key={chapter.id}
            bg={"#F1F5F8"}
            blendMode={"multiply"}
            borderRadius={"26px"}
            p={4}
            ml={"2"}
          >
            <Text fontSize="16px">{chapter.chapterName}</Text>
            <Text fontSize="12px" color={"#2C332978"}>
              {chapter.instructorName}
            </Text>
            <Text fontSize={"12px"} mt={"18px"}>
              Description
            </Text>
            <Text fontSize="11px" color="#2C332978" noOfLines={2} mb={2}>
              {chapter.description}
            </Text>
            <Button variant={"ghost"} color={"#3C8DBC"} mt={"4"}>
              View Details
            </Button>
          </Card>
        ))}
      </SimpleGrid>
    </Box>
  );
};

export default AllUploadedLecture;
