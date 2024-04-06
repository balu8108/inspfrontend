import { Flex, Stack, useDisclosure } from "@chakra-ui/react";
import ScheduleCalendar from "../components/ScheduleCalendar";
import ScheduleClassPopup from "../../../components/popups/ScheduleClassPopup";
import ScheduleClassList from "../components/ScheduleClassList";

const ScheduleClass = () => {
  const {
    isOpen: isSchedulePopupOpen,
    onOpen: onSchedulePopupOpen,
    onClose: onScheduleClosePopupOpen,
  } = useDisclosure();

  return (
    <>
      {isSchedulePopupOpen && (
        <ScheduleClassPopup
          isOpen={isSchedulePopupOpen}
          onClose={onScheduleClosePopupOpen}
          isCalenderScreen={true}
        />
      )}
      <Flex m={"42px"} gap={4}>
        <ScheduleClassList onSchedulePopupOpen={onSchedulePopupOpen} />
        <Stack w={"80%"}>
          <ScheduleCalendar onSchedulePopupOpen={onSchedulePopupOpen} />
        </Stack>
      </Flex>
    </>
  );
};

export default ScheduleClass;
