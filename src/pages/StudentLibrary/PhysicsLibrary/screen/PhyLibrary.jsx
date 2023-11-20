import React, { useEffect } from "react";
import { Box, Flex, Stack, useDisclosure } from "@chakra-ui/react";
import PhysicsLibrary from "../components/Library";
import Library from "../../../StudentHomePage/components/Library";
import ScheduleClassList from "../../../ScheduleClasses/components/ScheduleClassList";
import SimpleBar from "simplebar-react";
import { boxShadowStyles } from "../../../../utils";
import { useDispatch } from "react-redux";
import { getAllLiveClassesSchedule } from "../../../../store/actions/scheduleClassActions";
const LibraryScreen = () => {
  const dispatch = useDispatch();
  const { onOpen: onSchedulePopupOpen } = useDisclosure();
  useEffect(() => {
    dispatch(getAllLiveClassesSchedule());
  }, [dispatch]);
  return (
    <>
      <Flex m={"52px"} gap={"24px"}>
        <Stack w={"78%"}>
          <Box>
            <Library />
          </Box>
          <PhysicsLibrary />
        </Stack>
        <Box w={"25%"}>
          <SimpleBar
            style={{
              maxHeight: "85vh",
              borderRadius: "10px",
              background: "white",
              boxShadow: boxShadowStyles.mainBoxShadow.boxShadow,
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
