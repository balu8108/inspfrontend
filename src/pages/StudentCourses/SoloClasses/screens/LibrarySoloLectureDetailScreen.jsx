import { Stack } from "@chakra-ui/react";
import React from "react";
import { useLocation } from "react-router-dom";
import SoloClassLectureDetails from "../components/SoloClassLectureDetails";
import SoloClassLectureHeader from "../components/SoloClassLectureHeader";

const LibrarySoloLectureDetailsScreen = () => {
  const location = useLocation();
  const soloLecturesData = location.state?.soloLecturesData || [];
  return (
    <Stack gap={6}>
      <SoloClassLectureHeader soloLecturesData={soloLecturesData} />
      <SoloClassLectureDetails />
    </Stack>
  );
};

export default LibrarySoloLectureDetailsScreen;
