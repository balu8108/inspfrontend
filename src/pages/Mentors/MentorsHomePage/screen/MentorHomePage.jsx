import React from "react";
import { Box, Flex, useDisclosure, Stack, useTheme } from "@chakra-ui/react";
import Header from "../../Header/components/HeaderInAllScreen";
import MentorsUploads from "../components/Uploads";
import FeedBack from "../components/RateNFeedback";
import SoloClasses from "../components/SoloClasses";
import ScheduleClassList from "../../../ScheduleClasses/components/ScheduleClassList";
import SimpleBar from "simplebar-react";
import ScheduleClassPopup from "../../../../components/popups/ScheduleClassPopup";
const MentorHomePage = () => {
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

      <Box m={"50px"}>
        <Flex>
          <Box w={"75%"}>
            <Header />
            <Flex w={"full"}>
              <Stack spacing={"20px"} w={"full"} h={"full"}>
                <SoloClasses />
                <MentorsUploads />
              </Stack>
              <FeedBack />
            </Flex>
          </Box>

          <Box w="25%" ml={5}>
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
      </Box>
    </>
  );
};

export default MentorHomePage;
