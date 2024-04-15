import { Flex, useTheme, Button, Stack, useDisclosure } from "@chakra-ui/react";
import ScheduleCalendar from "../components/ScheduleCalendar";
import ScheduleClassPopup from "../../../components/popups/ScheduleClassPopup";
import ScheduleClassList from "../components/ScheduleClassList";
import UploadTimeTable from "../../../components/popups/UploadTimeTable";
import TimeTableViewer from "../../../components/popups/TimeTableViewer";
import { userType } from "../../../constants/staticvariables";
import { checkUserType } from "../../../utils";
import { useSelector } from "react-redux";

const ScheduleClass = () => {
  const { primaryBlue } = useTheme().colors.pallete;
  const { userProfile } = useSelector((state) => state.auth);
  const userRoleType = checkUserType(userProfile);
  const {
    isOpen: isSchedulePopupOpen,
    onOpen: onSchedulePopupOpen,
    onClose: onScheduleClosePopupOpen,
  } = useDisclosure();
  const {
    isOpen: isTimeTablePopupOpen,
    onOpen: onTimeTablePopupOpen,
    onClose: onTimeTableClosePopupOpen,
  } = useDisclosure();
  const {
    isOpen: isTimeTableViewerOpen,
    onOpen: onTimeTableViewerOpen,
    onClose: onTimeTableCloseViewerOpen,
  } = useDisclosure();

  return (
    <>
      {isTimeTablePopupOpen && (
        <UploadTimeTable
          isOpen={isTimeTablePopupOpen}
          onClose={onTimeTableClosePopupOpen}
        />
      )}
      {isSchedulePopupOpen && (
        <ScheduleClassPopup
          isOpen={isSchedulePopupOpen}
          onClose={onScheduleClosePopupOpen}
          isCalenderScreen={true}
        />
      )}
      {isTimeTableViewerOpen && (
        <TimeTableViewer
          isOpen={isTimeTableViewerOpen}
          onClose={onTimeTableCloseViewerOpen}
        />
      )}
      <Flex mx={"42px"} my={"10px"} gap={4}>
        <ScheduleClassList onSchedulePopupOpen={onSchedulePopupOpen} />
        <Stack w={"80%"}>
          <Flex gap={4}>
            {userRoleType === userType.teacher && (
              <Button
                w={"20%"}
                bg={primaryBlue}
                color="white"
                fontSize={"14px"}
                fontWeight={500}
                py={4}
                px={15}
                onClick={onTimeTablePopupOpen}
                _hover={{
                  opacity: 0.8,
                  bg: primaryBlue,
                }}
              >
                Upload Time Table
              </Button>
            )}
            <Button
              w={"20%"}
              bg={primaryBlue}
              color="white"
              fontSize={"14px"}
              fontWeight={500}
              py={4}
              px={15}
              onClick={onTimeTableViewerOpen}
              _hover={{
                opacity: 0.8,
                bg: primaryBlue,
              }}
            >
              View Time Table
            </Button>
          </Flex>
          <ScheduleCalendar onSchedulePopupOpen={onSchedulePopupOpen} />
        </Stack>
      </Flex>
    </>
  );
};

export default ScheduleClass;
