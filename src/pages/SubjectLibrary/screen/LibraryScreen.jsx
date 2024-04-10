import React from "react";
import { Box, Flex, Stack, useDisclosure } from "@chakra-ui/react";
import Library from "../../StudentHomePage/components/Library";
import SubjectLibrary from "../components/Library";
import ScheduleClassList from "../../ScheduleClasses/components/ScheduleClassList";
const LibraryScreen = () => {
  const { onOpen: onSchedulePopupOpen } = useDisclosure();
  return (
    <Flex m={"52px"}>
      <Stack w={"75%"}>
        <Box>
          <Library />
        </Box>
        <SubjectLibrary />
      </Stack>
      <ScheduleClassList onSchedulePopupOpen={onSchedulePopupOpen} />
    </Flex>
  );
};
export default LibraryScreen;
