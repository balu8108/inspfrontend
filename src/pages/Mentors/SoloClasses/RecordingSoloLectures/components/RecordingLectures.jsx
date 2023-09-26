import React from "react";
import { Box, Text,Image } from "@chakra-ui/react";
import defaultImage from "../../../../../assets/images/image1.png"
const RecordingLectures = () => {
  return (
    <Box  h={"full"} w="80%" borderRadius={"12px"} boxShadow={"md"}>
       <Image 
       p={5}  
       w="100%" // Set width to 100% to cover the container's width
        h="100%" // Set height to 100% to cover the container's height
        objectFit="cover" 
        src={defaultImage}
      />
    </Box>
  );
};

export default RecordingLectures;
