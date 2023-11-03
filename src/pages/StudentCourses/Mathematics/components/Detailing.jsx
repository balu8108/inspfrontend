import React from "react";
import { Box, Text, HStack, Image, Center, VStack } from "@chakra-ui/react";
import MathematicsImage from "../../../../assets/images/undraw_mathematics_-4-otb 1.svg";

const MathsDetails = () => {
  return (
    <Box width={"100%"} height={"full"} bg={"#F1F5F8"} borderRadius={"26px"}>
      <HStack spacing={"10px"}>
        <Box
          width={"12px"}
          height={"25px"}
          borderRadius={"20px"}
          bg={"#3C8DBC"}
          mt={"33px"}
          ml={"27px"}
        ></Box>
        <Text fontSize={"19px"} lineHeight={"24px"} mt={"26px"}>
          My Courses (Mathematics)
        </Text>
      </HStack>
      <VStack gap={"34px"}>
        <Center>
          <Image
            boxSize="350px"
            objectFit="cover"
            src={MathematicsImage}
            alt="Mathematics"
          />
        </Center>
        <Center>
          <Text fontSize={"32px"} fontWeight={"500"} lineHeight={"37px"}>
            Coming Soon
          </Text>
        </Center>
      </VStack>
    </Box>
  );
};

export default MathsDetails;
