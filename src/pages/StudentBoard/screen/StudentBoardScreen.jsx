import {Flex, VStack} from "@chakra-ui/react";
import Header from "../components/Header";
import LeaderBoard from "../components/LeaderBoard"
import ScheduledMeeting from "../../MeetingViewer/components/ScheduledMeetings";
const studentBoardScreen=()=>{
    return (
        <Flex m={"50px"} >
            <VStack spacing={"22px"}>
                <Header/>
                <LeaderBoard/>
            </VStack>
            <ScheduledMeeting/>
        </Flex>
    )
}
export default  studentBoardScreen;