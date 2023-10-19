import { Flex } from "@chakra-ui/react";
import ViewRecording from "../components/ViewRecording";
import RecordedClass from "../components/RecordedClass";
const Recording = () => {
  return (
    <Flex m={"52px"}>
      <ViewRecording />
      <RecordedClass />
    </Flex>
  );
};
export default Recording;
