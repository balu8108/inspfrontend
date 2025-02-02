import React, { useState } from "react";
import { Flex } from "@chakra-ui/react";
import DataForClass from "../components/DataForClass";
import RecordingLectures from "../components/RecordingLectures";

const RecordedScreen = () => {
  const [isDataVisible, setIsDataVisible] = useState(true);
  const [isTheatreMode, setIsTheatreMode] = useState(false);
  const toggleDataVisibility = () => {
    setIsDataVisible((prevVisibility) => !prevVisibility);
    setIsTheatreMode((prevMode) => !prevMode);
  };

  return (
    <Flex m={"52px"} gap={"16px"}>
      {isDataVisible && <DataForClass />}
      <RecordingLectures
        toggleDataVisibility={toggleDataVisibility}
        isTheatreMode={isTheatreMode}
      />
    </Flex>
  );
};

export default RecordedScreen;
