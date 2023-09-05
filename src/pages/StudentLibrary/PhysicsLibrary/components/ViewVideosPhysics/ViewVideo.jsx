import { Box } from "@chakra-ui/react";
import React from "react";
import { useParams } from "react-router-dom";

const PhysicsVideoDetails = () => {
  const { chapterName } = useParams();
  return (
    <Box
      w={"100%"}
      h={"500px"}
      bg={"#FFFFFF"}
      boxShadow="2px 2px 13px 0px #5C5C5C1F"
      borderRadius={"18px"}
    ></Box>
  );
};

export default PhysicsVideoDetails;
