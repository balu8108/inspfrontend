import {
  Grid,
  GridItem,
  Flex,
  Box,
  useTheme,
  useDisclosure,
} from "@chakra-ui/react";
import { MainBtn } from "../../../components/button";
import { scheduleClassData } from "../data/scheduleClassData";
import ScheduleInfoBox from "../components/ScheduleInfoBox";
import ScheduleCalendar from "../components/ScheduleCalendar";
import ScheduleClassPopup from "../../../components/popups/ScheduleClassPopup";

const ScheduleClass = () => {
  const {
    isOpen: isSchedulePopupOpen,
    onOpen: onSchedulePopupOpen,
    onClose: onScheduleClosePopupOpen,
  } = useDisclosure();
  const { primaryBlue, lightGrey } = useTheme().colors.pallete;
  const scheduleClassClickHandler = () => {
    onSchedulePopupOpen();
  };
  return (
    <>
      {isSchedulePopupOpen && (
        <ScheduleClassPopup
          isOpen={isSchedulePopupOpen}
          onClose={onScheduleClosePopupOpen}
        />
      )}
      <Box px={20} pt={4} pb={4}>
        <Grid templateColumns={"20% 80%"} gap={4} alignItems={"start"}>
          <GridItem p={4} borderRadius={"md"} bg={lightGrey}>
            <Flex direction={"column"}>
              <MainBtn
                isLoading={false}
                text={scheduleClassData.scheduleClass}
                backColor={primaryBlue}
                textColor={"white"}
                onClickHandler={scheduleClassClickHandler}
              />

              <ScheduleInfoBox />
            </Flex>
          </GridItem>
          <GridItem bg={lightGrey} borderRadius={"md"}>
            <ScheduleCalendar />
          </GridItem>
        </Grid>
      </Box>
    </>
  );
};

export default ScheduleClass;
