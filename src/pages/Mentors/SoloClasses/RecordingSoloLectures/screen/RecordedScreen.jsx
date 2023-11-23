// import React from "react";
// import { Flex } from "@chakra-ui/react";
// import DataForClass from "../components/DataForClass";
// import RecordingLectures from "../components/RecordingLectures";
// const RecordedScreen = () => {
//   return (
//     <Flex m={"52px"} gap={"16px"}>
//       <DataForClass />
//       <RecordingLectures />
//     </Flex>
//   );
// };
// export default RecordedScreen;


// RecordedScreen.jsx
import React, { useState } from "react";
import { Flex } from "@chakra-ui/react";
import DataForClass from "../components/DataForClass";
import RecordingLectures from "../components/RecordingLectures";

const RecordedScreen = () => {
  const [isDataVisible, setIsDataVisible] = useState(true);

  const toggleDataVisibility = () => {
    setIsDataVisible((prevVisibility) => !prevVisibility);
  };

  return (
    <Flex m={"52px"} gap={"16px"}>
      {isDataVisible && <DataForClass />}
      <RecordingLectures toggleDataVisibility={toggleDataVisibility} />
    </Flex>
  );
};

export default RecordedScreen;
