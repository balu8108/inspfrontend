import React, { useState } from "react";
import {
  Box,
  Text,
  HStack,
  VStack,
  Center,
  Image,
  Input,
  Spacer,
  Flex,
} from "@chakra-ui/react";
import ChemistryImage from "../../../../assets/images/undraw_science_re_mnnr 1.svg";
import { boxShadowStyles } from "../../../../utils";

const ChemDetails = () => {
  const [searchTerm, setSearchTerm] = useState("");

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
            My Courses (Chemistry)
          </Text>
        </HStack>
        <Spacer />
        {/* <Input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search..."
          w="30%"
          border="1px solid #ccc"
          borderRadius="md"
          px="3"
          py="2"
          mx={"10"}
        /> */}
      </Flex>
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
