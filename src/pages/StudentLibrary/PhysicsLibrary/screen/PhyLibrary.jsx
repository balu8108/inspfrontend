
import React,{useEffect,useState} from "react"
import { Box, Flex, Stack,useDisclosure } from "@chakra-ui/react";
import ScheduledMeetings from "../../../MeetingViewer/components/ScheduledMeetings";
import Header from "../../../MyCourses/components/Header";
import PhysicsVideos from "../components/PhysicsVideos";
import Library from "../../../StudentHomePage/components/Library";
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
   
      <>
      <Flex m={"50px"} gap={"24px"}>
      <Stack spacing={6} w={"78%"}>
          <Library  />
          <PhysicsVideos />
        </Stack>
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
        </Box>
      </Flex>
        
      </>
  );
};
export default PhyScreen;
