import { Flex } from "@chakra-ui/react";
import ViewRecording from "../components/ViewRecording";
import RecordedClass from "../components/RecordedClass";
const recording = () => {
  return (
    <Flex m={"52px"}>
      <ViewRecording></ViewRecording>
      <RecordedClass />
    </Flex>
  );
};
export default recording;
