import React from "react";
import Header from "../../../Mentors/Header/components/HeaderInAllScreen";
import ChemDetails from "../components/ChemiDetails";
import { Flex, Stack, Box, useDisclosure, useTheme } from "@chakra-ui/react";
import ScheduleClassList from "../../../ScheduleClasses/components/ScheduleClassList";
import SimpleBar from "simplebar-react";
import ScheduleClassPopup from "../../../../components/popups/ScheduleClassPopup";

const ChemScreen = () => {
  const {
    isOpen: isSchedulePopupOpen,
    onOpen: onSchedulePopupOpen,
    onClose: onScheduleClosePopupOpen,
  } = useDisclosure();
  const { outerBackground } = useTheme().colors.pallete;
  return (
    <>
      {isSchedulePopupOpen && (
        <ScheduleClassPopup
          isOpen={isSchedulePopupOpen}
          onClose={onScheduleClosePopupOpen}
          isCalenderScreen={false}
        />
      )}
      <Flex gap={"24px"} m={"52px"}>
        <Stack spacing={6} w={"75%"}>
          <Header />
          <ChemDetails />
        </Stack>
        <Box w={"25%"}>
          <SimpleBar
            style={{
              maxHeight: "85vh",
              borderRadius: "26px",
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
export default ChemScreen;
