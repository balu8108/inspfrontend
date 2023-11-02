import React from "react";
import { Flex} from "@chakra-ui/react";
import DataForClass from "../components/DataForClass";
import RecordingLectures from "../components/RecordingLectures";
const RecordedScreen=()=>{
    return (
        <Flex m={"52px"} gap={"16px"} >
        <DataForClass/>
        <RecordingLectures  />
        </Flex>
    )
}
export default RecordedScreen;





