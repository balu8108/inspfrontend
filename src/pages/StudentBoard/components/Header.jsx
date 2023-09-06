import { Box, HStack, Text } from "@chakra-ui/react";
const header = () => {
  return (
    <Box w={"880px"} h={"310px"} bg={"#F1F5F8"} borderRadius={"26px"}>
      <HStack spacing={"10px"} alignItems="center" ml={"33px"} mt={"27px"}>
        <Box
          width={"12px"}
          height={"25px"}
          borderRadius={"20px"}
          bg={"#3C8DBC"}
        ></Box>
        <Text fontSize={"19px"} lineHeight={"24px"}>
          My Courses (Physics)
        </Text>
      </HStack>
    </Box>
  );
};
export default header;
