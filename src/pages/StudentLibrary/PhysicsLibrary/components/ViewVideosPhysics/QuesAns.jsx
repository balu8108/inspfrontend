import { Box, HStack, Text, Button } from "@chakra-ui/react";
import qaData from "../../data/qaData";
import React from "react";

const QuesAnsOfVideo = () => {
  return (
    <Box
      w={"500px"}
      h={"800px"}
      bg={"#FFFFFF"}
      ml={"36px"}
      borderRadius={"26px"}
      boxShadow="2px 2px 13px 0px #5C5C5C1F"
      overflow={"auto"}
    >
      <HStack spacing={"10px"}>
        <Box
          width={"12px"}
          height={"40px"}
          borderRadius={"20px"}
          bg={"#3C8DBC"}
          mt={"43px"}
          ml={"35px"}
        />
        <Box mt={"40px"}>
          {qaData.map((quesAndAns) => (
            <Text key={quesAndAns.id}>{quesAndAns.question}</Text>
          ))}
        </Box>
      </HStack>
      <Box>
        {qaData.map((quesAndAns) => (
          <Box key={quesAndAns.id}>
            <Text m={"30px"}>Answer</Text>
            <Text m={"30px"}> {quesAndAns.answer}</Text>
            <Text ml={"30px"}> {quesAndAns.explanation}</Text>
          </Box>
        ))}
      </Box>
      <Box display="flex" justifyContent="space-between" p={5} mt={380}>
        <Button bg={"#FFFFFF"} color={"#3C8DBC"} fontSize={"14px"}>
          {" "}
          Previous
        </Button>
        <Button bg={"#3C8DBC"} color={"white"} fontSize={"14px"}>
          Next
        </Button>
      </Box>
    </Box>
  );
};

export default QuesAnsOfVideo;
