import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Import useHistory
import { Box, Button, Flex, HStack, useDisclosure } from "@chakra-ui/react";
// import MyCourses from "../../MyCourses/components/Header";
import Header from "../../Mentors/Header/components/HeaderInAllScreen";
import Improvement from "../components/Improvement";
import Assignment from "../components/Assignment";
import Library from "../components/Library";
import ScheduleClassList from "../../ScheduleClasses/components/ScheduleClassList";
import SimpleBar from "simplebar-react";
import { boxShadowStyles } from "../../../utils";
import { useDispatch } from "react-redux";
import { getAllLiveClassesSchedule } from "../../../store/actions/scheduleClassActions";

const StudentHomePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { onOpen: onSchedulePopupOpen } = useDisclosure();
  useEffect(() => {
    dispatch(getAllLiveClassesSchedule());
  }, [dispatch]);
  const handleViewCalendarClick = () => {
    // Use history.push to navigate to "/schedule-class" when the button is clicked
    navigate("/schedule-class");
  };
  return (
    <>
      <Flex m={"52px"} justifyContent={"space-between"} gap={6}>
        <Box w="75%">
          <Header />
          <HStack spacing={"24px"}>
            <Improvement />
            <Assignment />
          </HStack>
          <Box mt={"24px"}>
            <Library />
          </Box>
        </Box>
        <Box w={"25%"}>
          <SimpleBar
            style={{
              maxHeight: "85vh",
              borderRadius: "10px",
              boxShadow: boxShadowStyles.shadowOneStyle.boxShadow,
            }}
          >
            <Box p={4}>
              <ScheduleClassList onSchedulePopupOpen={onSchedulePopupOpen} />
            </Box>
          </SimpleBar>
          {/* <Box bg={"gray"} position="relative">
            <Button
              w={"100%"}
              variant="solid"
              colorScheme="blue"
              fontWeight={500}
              size="md"
              position={"absolute"}
              mt={-10}
              onClick={handleViewCalendarClick}
            >
              View Calendar
            </Button>
          </Box> */}
        </Box>
      </Flex>
    </>
  );
};
export default StudentHomePage;
