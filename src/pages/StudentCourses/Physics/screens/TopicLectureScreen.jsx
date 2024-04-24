import React from "react";
import { useParams } from "react-router-dom";
import LectureListPage from "../components/LectureListPage";
const TopicLectureScreen = () => {
  const { lectureId, lectureName } = useParams();

  return <LectureListPage lectureId={lectureId} lectureName={lectureName} />;
};
export default TopicLectureScreen;
