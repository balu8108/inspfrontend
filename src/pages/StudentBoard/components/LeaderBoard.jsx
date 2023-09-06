import { Box, HStack, Text } from "@chakra-ui/react";
const leaderBoard = () => {
  return (
    <Box w={"100%"} h={"100%"} bg={"#F1F5F8"} borderRadius={"26px"}>
      <HStack spacing={"10px"} alignItems="center" ml={"33px"} mt={"27px"}>
        <Box
          width={"12px"}
          height={"25px"}
          borderRadius={"20px"}
          bg={"#3C8DBC"}
        ></Box>
        <Text fontSize={"19px"} lineHeight={"24px"}>
          Details
        </Text>
      </HStack>

      <HStack spacing={"24px"} mt={"24px"}  ml={"20px"} >
        <Box p={"13px"}>
          <Text >Description</Text>
        </Box>
        <Box>
          <Text>Covered</Text>
        </Box>
      </HStack>
    </Box>
  );
};
export default leaderBoard;
