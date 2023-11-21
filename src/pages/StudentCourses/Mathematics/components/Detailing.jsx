import React, { useState } from "react";
import {
  Box,
  Text,
  HStack,
  Image,
  Center,
  VStack,
  Flex,
  Spacer,
  Input,
} from "@chakra-ui/react";
import MathematicsImage from "../../../../assets/images/undraw_mathematics_-4-otb 1.svg";
import { boxShadowStyles } from "../../../../utils";

const MathsDetails = () => {
  return (
    <Box
      width={"100%"}
      boxShadow={boxShadowStyles.mainBoxShadow.boxShadow}
      height={"full"}
      borderRadius={"26px"}
      bg="white"
    >
      <Flex mt={"17px"}>
        <HStack spacing={"10px"} alignItems="center" ml={"33px"}>
          <Box
            width={"12px"}
            height={"25px"}
            borderRadius={"20px"}
            bg={"#3C8DBC"}
          ></Box>
          <Text fontSize={"19px"} lineHeight={"24px"}>
            My Courses (Mathematics)
          </Text>
        </HStack>
        <Spacer />
      </Flex>
      <VStack gap={"24px"}>
        <Center>
          <Image
            boxSize="200px"
            objectFit="cover"
            src={MathematicsImage}
            alt="Mathematics"
          />
        </Center>
        <Center>
          <Text
            fontSize={"25px"}
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

export default MathsDetails;
