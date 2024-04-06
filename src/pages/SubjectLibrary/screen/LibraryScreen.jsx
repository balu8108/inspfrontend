import React from "react";
import { Box, Flex, Stack, useDisclosure, useTheme } from "@chakra-ui/react";
import Library from "../../StudentHomePage/components/Library";
import SubjectLibrary from "../components/Library";
import ScheduleClassList from "../../ScheduleClasses/components/ScheduleClassList";
import SimpleBar from "simplebar-react";
const LibraryScreen = () => {
  const { onOpen: onSchedulePopupOpen } = useDisclosure();
  const { outerBackground } = useTheme().colors.pallete;
  return (
    <>
      <Flex m={"52px"} gap={"24px"}>
        <Stack w={"78%"}>
          <Box>
            <Library />
          </Box>
          <SubjectLibrary />
        </Stack>
        <Box w={"25%"}>
          <SimpleBar
            style={{
              maxHeight: "85vh",
              borderRadius: "10px",
              background: outerBackground,
            }}
          >
            <Box p={4}>
              <ScheduleClassList onSchedulePopupOpen={onSchedulePopupOpen} />
            </Box>
          </SimpleBar>
        </Box>
      </Flex>
    </>
  );
};
export default LibraryScreen;
