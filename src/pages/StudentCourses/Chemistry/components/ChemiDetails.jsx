import React from "react";
import { Box, Text, HStack, VStack, Center, Image } from "@chakra-ui/react";
import ChemistryImage from "../../../../assets/images/undraw_science_re_mnnr 1.svg";
const ChemDetails = () => {
  return (
    <Box
      width={"100%"}
      height={"full"}
      boxShadow={"2px 2px 13px 0px #5C5C5C1F "}
      borderRadius={"26px"}
    >
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
      <VStack gap={"24px"}>
        <Center>
          <Image
            boxSize="200px"
            objectFit="cover"
            src={ChemistryImage}
            alt="Mathematics"
          />
        </Center>
        <Center>
          <Text
            fontSize={"25px"}
            fontWeight={"500"}
            lineHeight={"37px"}
            p={"44px"}
            color={"#2C3329"}
          >
            Coming Soon
          </Text>
        </Center>
      </VStack>
    </Box>
  );
};
export default ChemDetails;
