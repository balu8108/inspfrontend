// import { Box, Flex, VStack } from "@chakra-ui/react";
// import Header from "../../../Header/components/HeaderInAllScreen";
// import SchedulingClass from "../../../SchedulingClass/components/MentorSchedule";
// import PhysicsCourse from "../components/MentorPhysics";
// const Physics = () => {
//   return (
//     <Box m={"52px"}>
//       <Flex>
//         <Box>
//           <VStack spacing={"24px"}>
//             <Header />
//             <PhysicsCourse />
//           </VStack>
//         </Box>
//         <Box>
//           <SchedulingClass />
//         </Box>
//       </Flex>
//     </Box>
//   );
// };
// export default Physics;

import { Box, Flex, Stack } from "@chakra-ui/react";
import Header from "../../../Header/components/HeaderInAllScreen";
import SchedulingClass from "../../../SchedulingClass/components/MentorSchedule";
import PhysicsCourse from "../components/MentorPhysics";
const Physics = () => {
  return (
    <Flex m={"52px"}>
      <Stack spacing={"24px"} w={"100%"}>
        <Header />
        <PhysicsCourse />
      </Stack>
      <Box mt={-5}>
        <SchedulingClass />
      </Box>
    </Flex>
  );
};
export default Physics;
