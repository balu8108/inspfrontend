import React from "react";
import Header from "../../../Mentors/Header/components/HeaderInAllScreen";
import ChemDetails from "../components/ChemiDetails";
import { Flex, Stack, useDisclosure } from "@chakra-ui/react";
import ScheduleClassList from "../../../ScheduleClasses/components/ScheduleClassList";
import ScheduleClassPopup from "../../../../components/popups/ScheduleClassPopup";

const ChemScreen = () => {
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
          isCalenderScreen={false}
        />
      )}
      <Flex m={"52px"}>
        <Stack spacing={6} w={"75%"}>
          <Header />
          <ChemDetails />
        </Stack>
        <ScheduleClassList onSchedulePopupOpen={onSchedulePopupOpen} />
      </Flex>
    </>
  );
};
export default ChemScreen;
