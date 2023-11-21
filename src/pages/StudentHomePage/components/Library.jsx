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
import { Link, useNavigate } from "react-router-dom";
import "../../../constants/scrollbar/style.css";
import { capitalize } from "../../../utils";
import libraryData from "../data/library";

const Library = () => {
  const navigate = useNavigate();
  const { primaryBlue, mainTextColor } = useTheme().colors.pallete;
  const isDetailView = window.location.pathname.includes("/library/");

  const handleSeeAllClick = () => {
    navigate("/student/1/library/PHYSICS");
  };

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
          {!isDetailView && (
            <Link to="/library/PHYSICS/1">
              <Button
                variant={"ghost"}
                fontSize={"13px"}
                fontWeight={"400"}
                mt={"40%"}
                onClick={handleSeeAllClick}
              >
                See All
              </Button>
            </Link>
          )}
        </Flex>
      </HStack>

      <Flex m={"24px"} gap={10} overflowX="auto" className="example">
        {libraryData.map((library) => (
          <Card
            key={library.id}
            w={"31%"}
            h={"204px"}
            borderRadius={"18px"}
            blendMode={"multiply"}
            backgroundColor={"#F1F5F8"}
            flexShrink={"0"}
            mb={"20px"}
          >
            <Text
              fontSize={"16px"}
              fontWeight={"400px"}
              color={"#2C3329"}
              mt={"13px"}
              ml={"13px"}
              lineHeight={"18px"}
            >
              {capitalize(library.subjectName)}
            </Text>
            <Text
              mt={"3px"}
              fontSize={"14px"}
              lineHeight={"18px"}
              ml={"13px"}
              color={library.color}
            >
              {library.status}
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
              fontSize={"12px"}
              lineHeight={"21px"}
              ml={"13px"}
              noOfLines={3}
            >
              {library.description}
            </Text>
            <Link
              style={{ display: "flex", justifyContent: "center" }}
              to={`/library/${library.subjectName}/${library.subject_id}`}
            >
              <Button
                variant={"ghost"}
                color={"#3C8DBC"}
                mt={"18px"}
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
