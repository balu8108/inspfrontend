import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Flex, Stack, useDisclosure } from "@chakra-ui/react";
import Header from "../../Mentors/Header/components/HeaderInAllScreen";
import SubjectChapterSelector from "../Physics/components/Subject.Chapter.Selector";
import ScheduleClassList from "../../ScheduleClasses/components/ScheduleClassList";
import ScheduleClassPopup from "../../../components/popups/ScheduleClassPopup";
import LectureCardContainer from "../components/LectureCardContainer";
import { getAllLecture } from "../../../api/lecture";
import { classType, classLevel } from "../../../constants/staticvariables";
import ChemDetails from "../Chemistry/components/ChemiDetails";
import MathsDetails from "../Mathematics/components/Detailing";

const subjectArray = ["PHYSICS", "CHEMISTRY", "MATHEMATICS"];

const MyCourses = () => {
  const { coursetype } = useParams();
  const {
    isOpen: isSchedulePopupOpen,
    onOpen: onSchedulePopupOpen,
    onClose: onScheduleClosePopupOpen,
  } = useDisclosure();
  const [loading, setLoading] = useState(true);
  const [lecture, setLecture] = useState([]);

  const getAllCourse = async () => {
    try {
      let passingParams = {};
      if (coursetype === "crash-course") {
        passingParams = {
          classType: classType.CRASH_CLASS,
          classLevel: classLevel.ALL,
        };
      } else if (coursetype === "foundation-olympiad") {
        passingParams = {
          classType: classType.REGULAR_CLASS,
          classLevel: classLevel.FOUNDATION_COURSE,
        };
      } else if (coursetype === "class-11") {
        passingParams = {
          classType: classType.REGULAR_CLASS,
          classLevel: classLevel.CLASS_11,
        };
      } else if (coursetype === "class-12") {
        passingParams = {
          classType: classType.REGULAR_CLASS,
          classLevel: classLevel.CLASS_12,
        };
      }

      if (passingParams?.classType && passingParams?.classLevel) {
        const response = await getAllLecture(
          passingParams?.classType,
          passingParams?.classLevel
        );
        const { data } = response.data;
        setLecture(data);
        setLoading(false);
      }
    } catch (err) {
      console.error("Error fetching all crash course lectures:", err);
      setLoading(false);
    }
  };
  useEffect(() => {
    if (!subjectArray.includes(coursetype)) {
      getAllCourse();
    }
  }, [coursetype]);

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
          {coursetype === "PHYSICS" ? (
            <SubjectChapterSelector />
          ) : coursetype === "CHEMISTRY" ? (
            <ChemDetails />
          ) : coursetype === "MATHEMATICS" ? (
            <MathsDetails />
          ) : (
            <LectureCardContainer
              title="Crash Course"
              loading={loading}
              lecture={lecture}
              type={coursetype}
            />
          )}
        </Stack>
        <ScheduleClassList onSchedulePopupOpen={onSchedulePopupOpen} />
      </Flex>
    </>
  );
};

export default MyCourses;
