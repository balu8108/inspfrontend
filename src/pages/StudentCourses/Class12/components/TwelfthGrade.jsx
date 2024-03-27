import React, { useState } from "react";
import {
  Box,
  Card,
  Flex,
  Text,
  Stack,
  useTheme,
  Button,
  HStack,
  Input,
  Spacer,
  Center,
} from "@chakra-ui/react";
import VectorImage from "../../../../assets/images/Line/Vector.svg";
import classData from "../../Class11/data/classData";
const TwelfthGrade = () => {
  const { outerBackground, innerBackground, innerBoxShadow } =
    useTheme().colors.pallete;
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <Box width={"full"} h={"100%"} bg={outerBackground} borderRadius={"26px"}>
      <Flex mt={"17px"}>
        <HStack spacing={"10px"} alignItems="center" ml={"33px"}>
          <Box
            width={"12px"}
            height={"25px"}
            borderRadius={"20px"}
            bg={"#3C8DBC"}
          ></Box>
          <Text fontSize={"19px"} lineHeight={"24px"}>
            My Courses ( Class 12 <sup>th</sup> )
          </Text>
        </HStack>
        <Spacer />
        <Input
          type="text"
          value={searchTerm}
          bg={innerBackground}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search..."
          w="30%"
          border="1px solid #ccc"
          borderRadius="14px"
          px="3"
          fontWeight={400}
          py="2"
          mx={"10"}
          style={{
            backgroundImage: `url(${VectorImage})`,
            backgroundRepeat: "no-repeat",
            backgroundPosition: "10px center",
            paddingLeft: "40px",
          }}
        />
      </Flex>
      <Stack>
        <Flex flexWrap="wrap" p={6} gap={"24px"}>
          {classData.map((item) => (
            <Card
              bg={innerBackground}
              boxShadow={innerBoxShadow}
              key={item.id}
              w="30%"
              h={"204px"}
              borderRadius={"18px"}
              flexDirection={"column"}
            >
              <Text
                fontSize={"16px"}
                fontWeight={400}
                ml={"13px"}
                mt={"16px"}
                lineHeight={"19px"}
                noOfLines={1}
              >
                {item.lectureNumber}
              </Text>
              <Text
                fontWeight={400}
                fontSize={"12px"}
                lineHeight={"15px"}
                ml={"13px"}
                color={"rgba(44, 51, 41, 0.47)"}
              >
                Nitin Sachan
              </Text>
              <Text
                fontSize={"12px"}
                lineHeight={"13px"}
                ml={"13px"}
                fontWeight={400}
                color={"rgba(44, 51, 41, 1)"}
                mt={"18px"}
              >
                Description
              </Text>
              <Text
                fontSize={"12px"}
                lineHeight={"21px"}
                fontWeight={400}
                ml={13}
                color={"rgba(44, 51, 41, 0.47)"}
                noOfLines={3}
                mt={"6px"}
              >
                {item.description}
              </Text>
              <Center>
                <Button
                  fontWeight={600}
                  variant={"ghost"}
                  color={"#3C8DBC"}
                  fontSize={"14px"}
                  position="absolute"
                  bottom="5px"
                  _hover={{ bg: "white" }}
                >
                  View Details
                </Button>
              </Center>
            </Card>
          ))}
        </Flex>
      </Stack>
    </Box>
  );
};
export default TwelfthGrade;
