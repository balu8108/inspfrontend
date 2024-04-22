import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Stack } from "@chakra-ui/react";
import Header from "../../Mentors/Header/components/HeaderInAllScreen";
import SubjectChapterSelector from "../Physics/components/Subject.Chapter.Selector";
import LectureCardContainer from "../components/LectureCardContainer";
import { getAllLecture } from "../../../api/lecture";
import { classType, classLevel } from "../../../constants/staticvariables";
import ChemDetails from "../Chemistry/components/ChemiDetails";
import MathsDetails from "../Mathematics/components/Detailing";

const subjectArray = ["PHYSICS", "CHEMISTRY", "MATHEMATICS"];

const MyCourses = () => {
  const { coursetype } = useParams();
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
    <Stack spacing={6}>
      <Header />
      {coursetype === "PHYSICS" ? (
        <SubjectChapterSelector />
      ) : coursetype === "CHEMISTRY" ? (
        <ChemDetails />
      ) : coursetype === "MATHEMATICS" ? (
        <MathsDetails />
      ) : (
        <LectureCardContainer
          title={
            coursetype === "crash-course"
              ? "Crash Course"
              : coursetype === "foundation-olympiad"
              ? "My Courses ( Foundation Class 9 & 10 )"
              : coursetype === "class-11"
              ? "My Courses ( Class 11th )"
              : coursetype === "class-12"
              ? "My Courses ( Class 12th )"
              : ""
          }
          loading={loading}
          lecture={lecture}
          type={coursetype}
        />
      )}
    </Stack>
  );
};

export default MyCourses;
