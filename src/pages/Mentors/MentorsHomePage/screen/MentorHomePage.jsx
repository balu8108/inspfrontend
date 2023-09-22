// import { Box, Flex, VStack } from "@chakra-ui/react";
// import Header from "../../Header/components/HeaderInAllScreen";
// import MentorsUploads from "../components/Uploads";
// import FeedBack from "../components/RateNFeedback";
// import MentorSchedulingClass from "../../SchedulingClass/components/MentorSchedule";
// import MentorGroups from "../components/Groups";

// const MentorHomePage = () => {
//   return (
//     <Box m={"50px"}>
//       <Flex>
//         <Box>
//           <Header />
//           <Flex gap={"24px"}>
//             <MentorsUploads />
//             <FeedBack />
//           </Flex>
//         </Box>
//         <Box>
//           <VStack>
//             <MentorGroups />
//             <MentorSchedulingClass />
//           </VStack>
//         </Box>
//       </Flex>
//     </Box>
//   );
// };

// export default MentorHomePage;

import React, { useEffect } from "react";
import { Box, Flex, VStack, useDisclosure } from "@chakra-ui/react";
import Header from "../../Header/components/HeaderInAllScreen";
import MentorsUploads from "../components/Uploads";
import FeedBack from "../components/RateNFeedback";
import MentorSchedulingClass from "../../SchedulingClass/components/MentorSchedule";
import MentorGroups from "../components/Groups";
import ScheduleClassList from "../../../ScheduleClasses/components/ScheduleClassList";
import SimpleBar from "simplebar-react";
import { boxShadowStyles } from "../../../../utils";
import { useDispatch } from "react-redux";
import { getAllLiveClassesSchedule } from "../../../../store/actions/scheduleClassActions";

const MentorHomePage = () => {
  const dispatch = useDispatch();

  const { onOpen: onSchedulePopupOpen } = useDisclosure();
  useEffect(() => {
    dispatch(getAllLiveClassesSchedule());
  }, [dispatch]);
  return (
    <Box m={"50px"}>
      <Flex>
        <Box>
          <Header />
          <Flex gap={"24px"}>
            <MentorsUploads />
            <FeedBack />
          </Flex>
        </Box>
        <Box>
          <VStack gap={"24px"}>
            <MentorGroups />
            <Box w="90%" ml={5}>
              <SimpleBar
                style={{
                  maxHeight: "85vh",
                  borderRadius: "26px",
                  bg: "#F1F5F8",
                  backgroundBlendMode: "multiply",
                  boxShadow: boxShadowStyles.shadowOneStyle.boxShadow,
                }}
              >
                <Box p={4}>
                  <ScheduleClassList
                    onSchedulePopupOpen={onSchedulePopupOpen}
                  />
                </Box>
              </SimpleBar>
              {/* <StudentHomePageRightSection /> */}
            </Box>
          </VStack>
        </Box>
      </Flex>
    </Box>
  );
};

export default MentorHomePage;
