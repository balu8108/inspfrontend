import {Flex, VStack} from "@chakra-ui/react";
import LeaderBoardHeader from "../components/Header";
import LeaderBoard from "../components/LeaderBoard"
import ScheduledMeeting from "../../MeetingViewer/components/ScheduledMeetings";
const studentBoardScreen=()=>{
    return (
        <Flex m={"50px"} >
            <VStack spacing={"22px"}>
                <LeaderBoardHeader/>
                <LeaderBoard/>
            </VStack>
            <ScheduledMeeting/>
        </Flex>
    )
}
export default  studentBoardScreen;