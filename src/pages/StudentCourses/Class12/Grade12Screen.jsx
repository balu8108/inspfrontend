import React, { useEffect, useState } from "react";
import { Box, Stack, Flex, useTheme, useDisclosure } from "@chakra-ui/react";
import Header from "../../Mentors/Header/components/HeaderInAllScreen";
import ScheduleClassList from "../../ScheduleClasses/components/ScheduleClassList";
import SimpleBar from "simplebar-react";
import ScheduleClassPopup from "../../../components/popups/ScheduleClassPopup";
import LectureCardContainer from "../components/LectureCardContainer";
import { getAllLecture } from "../../../api/lecture";
import { classType, classLevel } from "../../../constants/staticvariables";

const Grade12Screen = () => {
  const {
    isOpen: isSchedulePopupOpen,
    onOpen: onSchedulePopupOpen,
    onClose: onScheduleClosePopupOpen,
  } = useDisclosure();
  const { outerBackground } = useTheme().colors.pallete;
  const [loading, setLoading] = useState(true);
  const [lecture, setLecture] = useState([]);

  const getAllEleventhCourse = async () => {
    try {
      const response = await getAllLecture(
        classType.REGULAR_CLASS,
        classLevel.CLASS_12
      );
      const { data } = response.data;
      setLecture(data);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching all crash course lectures:", err);
      setLoading(false);
    }
  };
  useEffect(() => {
    getAllEleventhCourse();
  }, []);

  return (
    <>
      {isSchedulePopupOpen && (
        <ScheduleClassPopup
          isOpen={isSchedulePopupOpen}
          onClose={onScheduleClosePopupOpen}
          isCalenderScreen={false}
        />
      )}

      <Flex gap={"24px"} m={"52px"}>
        <Stack spacing={6} w={"75%"}>
          <Header />
          <LectureCardContainer
            title="My Courses ( Class 12th )"
            loading={loading}
            lecture={lecture}
            type="class-12"
          />
        </Stack>
        <Box w={"25%"}>
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
    </>
  );
};
export default Grade12Screen;
