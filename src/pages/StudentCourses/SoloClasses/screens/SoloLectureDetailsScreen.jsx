import { Stack } from "@chakra-ui/react";
import React from "react";
import SoloClassLectureDetails from "../components/SoloClassLectureDetails";
import Header from "../../../Mentors/Header/components/HeaderInAllScreen";

const SoloLectureDetailsScreen = () => {
  return (
    <Stack gap={6}>
      <Header />
      <SoloClassLectureDetails />
    </Stack>
  );
};

export default SoloLectureDetailsScreen;
