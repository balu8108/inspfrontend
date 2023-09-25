import React, { useEffect } from "react";
import PhysDetails from "../components/PhysDetails";
import Header from "../../../MyCourses/components/Header";
import ScheduledMeetings from "../../../MeetingViewer/components/ScheduledMeetings";
import { Flex, VStack, Box, useDisclosure } from "@chakra-ui/react";
import ScheduleClassList from "../../../ScheduleClasses/components/ScheduleClassList";
import SimpleBar from "simplebar-react";
import { boxShadowStyles } from "../../../../utils";
import { useDispatch } from "react-redux";
import { getAllLiveClassesSchedule } from "../../../../store/actions/scheduleClassActions";
const PhyScreen = () => {
  const dispatch = useDispatch();
  const { onOpen: onSchedulePopupOpen } = useDisclosure();
  useEffect(() => {
    dispatch(getAllLiveClassesSchedule());
  }, [dispatch]);
  return (
    <Box ml={"52px"} mr={"52px"} mt={"52px"} mb={10} w={"93%"}>
      <Flex gap={"23px"}>
        <VStack spacing={6}>
          <Header />
          <PhysDetails />
        </VStack>
        <Box w={"97%"}>
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
        </Box>
      </Flex>
    </Box>
  );
};
export default PhyScreen;
