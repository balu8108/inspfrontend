//This component will show chapters for chemistry but there is no data for chemistry.
import React from "react";
import {
  Box,
  Text,
  HStack,
  VStack,
  Center,
  Image,
  Flex,
  useTheme,
} from "@chakra-ui/react";
import ChemistryImage from "../../../../assets/images/undraw_science_re_mnnr 1.svg";
const ChemDetails = () => {
  const { outerBackground } = useTheme().colors.pallete;
  return (
    <Box
      width={"100%"}
      height={"full"}
      borderRadius={"26px"}
      bg={outerBackground}
    >
      <Flex mt={"19px"}>
        <HStack spacing={"10px"} alignItems="center" ml={"33px"}>
          <Box
            width={"12px"}
            height={"25px"}
            borderRadius={"20px"}
            bg={"#3C8DBC"}
          ></Box>
          <Text fontSize={"19px"} lineHeight={"24px"}>
            My Courses (Chemistry)
          </Text>
        </HStack>
      </Flex>
      <VStack gap={"24px"}>
        <Center>
          <Image
            boxSize="200px"
            objectFit="cover"
            src={ChemistryImage}
            alt="Chemistry"
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
