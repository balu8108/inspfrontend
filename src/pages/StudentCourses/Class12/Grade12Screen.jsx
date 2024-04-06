import React, { useEffect, useState } from "react";
import { Stack, Flex, useDisclosure } from "@chakra-ui/react";
import Header from "../../Mentors/Header/components/HeaderInAllScreen";
import ScheduleClassList from "../../ScheduleClasses/components/ScheduleClassList";
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

      <Flex m={"52px"}>
        <Stack spacing={6} w={"75%"}>
          <Header />
          <LectureCardContainer
            title="My Courses ( Class 12th )"
            loading={loading}
            lecture={lecture}
            type="class-12"
          />
        </Stack>
        <ScheduleClassList onSchedulePopupOpen={onSchedulePopupOpen} />
      </Flex>
    </>
  );
};
export default Grade12Screen;
