import React from "react";
import {
  Box,
  Button,
  Flex,
  Text,
  Card,
  useTheme,
  HStack,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import "../../../constants/scrollbar/style.css";
import { capitalize } from "../../../utils";
import libraryData from "../data/library";

const Library = () => {
  const { primaryBlue, mainTextColor } = useTheme().colors.pallete;

  return (
    <Box w={"full"} bg={"#F1F5F8"} borderRadius={"26px"}>
      <HStack spacing={"10px"}>
        <Box
          bg={primaryBlue}
          width="12px"
          height="25px"
          borderRadius={"20px"}
          ml={"33px"}
          mt={"27px"}
        ></Box>
        <Flex
          justifyContent={"space-between"}
          alignItems={"center"}
          width="100%"
          mr={4}
        >
          <Text
            fontSize={"20px"}
            lineHeight={"24.2px"}
            color={mainTextColor}
            mt={"27.5px"}
          >
            Library
          </Text>
          <Link to="/student/1/library/PHYSICS">
            <Button variant={"ghost"} fontSize={"13px"} fontWeight={"400"} mt={"40%"}>
              See All
            </Button>
          </Link>
        </Flex>
      </HStack>

      <Flex m={"24px"} gap={10} overflowX="auto" className="example">
        {libraryData.map((library) => (
          <Card
            key={library.id}
            w={"30%"}
            h={"200px"}
            borderRadius={"18px"}
            blendMode={"multiply"}
            backgroundColor={"#F1F5F8"}
            flexShrink={"0"}
            mb={"20px"}
          >
            <Text
              fontSize={"14px"}
              fontWeight={"400px"}
              lineHeight={"19.36px"}
              color={"#2C3329"}
              mt={"13px"}
              ml={"13px"}
            >
              {capitalize(library.subjectName)}
            </Text>
            <Text
              mt={"14px"}
              ml={"13px"}
              fontSize={"12px"}
              lineHeight={"14.52px"}
            >
              Description
            </Text>
            <Text
              color={"#2C332978"}
              mt={"6px"}
              fontSize={"12px"}
              lineHeight={"21px"}
              ml={"13px"}
              noOfLines={3}
            >
              {library.description}
            </Text>
            <Link
              style={{ display: "flex", justifyContent: "center" }}
              to={`/student/${library.subject_id}/library/${library.subjectName}`}
            >
              <Button
                color={"#3C8DBC"}
                mt={"25px"}
                fontSize={"14px"}
                lineHeight={"16px"}
                fontWeight={"600"}
              >
                View Details
              </Button>
            </Link>
          </Card>
        ))}
      </Flex>
    </Box>
  );
};

export default Library;
