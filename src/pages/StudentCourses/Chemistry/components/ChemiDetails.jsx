import React from "react";
import { Box, Text, HStack, VStack, Center, Image } from "@chakra-ui/react";
import ChemistryImage from "../../../../assets/images/undraw_science_re_mnnr 1.svg";
const ChemDetails = () => {
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
        <Text fontSize={"19px"} lineHeight={"24px"} mt={"28px"}>
          My Courses (Chemistry)
        </Text>
      </HStack>
      <VStack gap={"34px"}>
        <Center>
          <Image
            boxSize="350px"
            objectFit="cover"
            src={ChemistryImage}
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
export default ChemDetails;
