import React from "react";
import { useParams } from "react-router-dom";
import { Box, HStack, Text, useTheme } from "@chakra-ui/react";
const SingleLectureDetailsCovered = (selectedTopic) => {
  const { outerBackground, innerBackground, innerBoxShadow } =
    useTheme().colors.pallete;

 const {name}=useParams();
 console.log("topicName:", name);
  return (
    <Box>
      <Box
        backgroundColor={outerBackground}
        width={"100%"}
        borderRadius={"26px"}
      >
        <Box pt={5} marginLeft={"33px"}>
          <HStack spacing={"10px"} alignItems="center">
            <Box
              width={"12px"}
              height={"25px"}
              borderRadius={"20px"}
              bg={"#3C8DBC"}
            ></Box>
            <Text fontSize={"19px"} lineHeight={"24px"}>
              Physics({name})
            </Text>
          </HStack>
        </Box>
      </Box>
      <Box backgroundColor={"yellow"} width={"100%"} borderRadius={"26px"}>
        <Text>sdfghj</Text>
      </Box>
    </Box>
  );
};
export default SingleLectureDetailsCovered;
