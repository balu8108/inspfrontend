import { Grid, GridItem, Box, useDisclosure, useTheme } from "@chakra-ui/react";

import ScheduleCalendar from "../components/ScheduleCalendar";
import ScheduleClassPopup from "../../../components/popups/ScheduleClassPopup";
import ScheduleClassList from "../components/ScheduleClassList";
import { Scrollbars } from "rc-scrollbars";

const ScheduleClass = () => {
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
          isCalenderScreen={true}
        />
      )}
      <Box px={10} pt={4} pb={4}>
        <Grid templateColumns={"20% 80%"} gap={6} alignItems={"start"}>
          <Scrollbars
            style={{
              height: "100%",

              borderRadius: "10px",
              background: outerBackground,
            }}
            autoHide={true}
          >
            <GridItem p={4} height={"100%"}>
              <ScheduleClassList onSchedulePopupOpen={onSchedulePopupOpen} />
            </GridItem>
          </Scrollbars>
          <GridItem borderRadius={"md"}>
            <ScheduleCalendar onSchedulePopupOpen={onSchedulePopupOpen} />
          </GridItem>
        </Grid>
      </Box>
    </>
  );
};

export default ScheduleClass;
