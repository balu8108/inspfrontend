import React from "react";
import { Box, Heading, Flex, Button, HStack,VStack ,Grid, GridItem} from "@chakra-ui/react";
import MyCourses from "../components/Leftcomponent/MyCourses";
import Improvement from "../components/Leftcomponent/Improvement";
import Assignment from "../components/Leftcomponent/Assignment";
import Library from "../components/Leftcomponent/Library";
import MeetingAndRecordedLect from "../components/RightComponent/MeetingAndRecordedLect";
const HomePage = () => {
  return (
    // <Box>
    //   <MyCourses />
    //   <HStack>
    //     <Improvement />
    //     <Assignment />
    //   </HStack>
    //   <Library/>
    // </Box>


    <Grid
      templateColumns="3fr 1fr"
      gap={6}
      alignItems="start"
      justifyContent="space-between"
    >
      <Box>
        <MyCourses />
        <HStack spacing={6}>
          <Improvement />
          <Assignment />
        </HStack>
        <Library />
      </Box>
      <Box>
        <MeetingAndRecordedLect  />
      </Box>
    </Grid>
    
  );
};
export default HomePage;
