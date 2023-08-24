import React from "react";
import { Box, Button, Flex, Text, Card, Heading } from "@chakra-ui/react";
import libraryData from "../data/library";
const Library = () => {
  return (
    <>
      <Box
        width={900}
        height={280}
        backgroundColor={"#F1F5F8"}
        borderRadius={10}
        mt={10}
        ml={37}
      >
        <Flex>
          <Text p={4} ml={50} fontSize={20}>
            Library
          </Text>
          <Button variant={"ghost"} fontWeight={10} ml={660}>
            See All
          </Button>
        </Flex>

        <Flex ml={5} mt={3}>
          {libraryData.map((library) => (
            <Card
              key={library.id}
              width={400}
              mr={3}
              height={188}
              backgroundColor={"gray.200"}
            >
              <Heading fontSize={15} fontWeight={600} ml={5} mt={4}>
                {library.subjectName}
              </Heading>
              <p
                style={{
                  marginLeft: "20px",
                  marginTop: "8px",
                }}
              >
                Description
              </p>
              <p
                style={{
                  marginLeft: "20px",
                  marginTop: "8px",
                  color: "gray",
                  fontSize: "15px",
                }}
              >
                {library.description}
              </p>
              <Button variant={"ghost"} color={"blue.400"} mt={3} fontSize={13}>
                View Details
              </Button>
            </Card>
          ))}
        </Flex>
      </Box>
    </>
  );
};
export default Library;
