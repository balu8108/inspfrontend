// DataForClass.js
import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import {
  Box,
  Text,
  HStack,
  Stack,
  Flex,
  Spacer,
  Icon,
  Button,
} from "@chakra-ui/react";
import topicData from "../data/topicData";
import { AddIcon } from "@chakra-ui/icons";
import { FaCircle } from "react-icons/fa";
import { BsUpload } from "react-icons/bs";
import { IoOpenOutline } from "react-icons/io5";
const DataForClass = ({topic}) => {
  const location = useLocation();
  const formData = location.state;
  return (
    <Box w="25%" borderRadius={"12px"} bg={"#F1F5F8"}>
      <HStack spacing={"10px"}>
        <Box
          width={"12px"}
          height={"25px"}
          borderRadius={"20px"}
          bg={"#3C8DBC"}
          mt={"27px"}
          ml={"27px"}
        ></Box>
        <Text
          fontSize={"20px"}
          lineHeight={"24px"}
          fontFamily={400}
          mt={"26px"}
        >
          Solo Recording
        </Text>
      </HStack>
      {/* <Stack spacing={"25px"}>
        {topicData.map((dataforsoloclass) => (
          <Box key={dataforsoloclass.id} p={6}>
            <Text>{formData.Topic}</Text>
            <Box mt={"30px"}>
              <Flex>
                <Text>Description</Text>
              </Flex>
              <Text
                fontSize={"12px"}
                lineHeight={"21px"}
                color={"#2C332978"}
                mt={"16px"}
              >
                {formData.Description}
              </Text>
            </Box>
            <Box mt={"30px"}>
              <Flex>
                <Text>Agenda</Text>
              </Flex>

              {formData.Agenda.map((agendaItem, index) => (
                <Flex alignItems="center" mt={4} gap={1} key={index}>
                  <Icon
                    as={FaCircle}
                    boxSize={3}
                    color="#EFEFEF"
                    blendMode={"multiply"}
                  />
                  <Text
                    fontSize={"12px"}
                    lineHeight={"14px"}
                    color={"#2C332978"}
                    ml={2}
                  >
                    {agendaItem}
                  </Text>
                </Flex>
              ))}
            </Box>

            {formData.Files && (
              <Box mt={"30px"}>
                <Flex>
                  <Text>Files</Text>
                </Flex>
                {formData.Files.map((fileItem, index) => (
                  <Flex
                    key={index}
                    alignItems="center"
                    mt={4}
                    gap={2}
                    boxShadow="md"
                    borderRadius="6px"
                    p="2"
                    bg="white"
                  >
                    <Text color={"#2C332978"} fontSize={"12px"}>
                      {fileItem}
                    </Text>
                    <Spacer />

                    <Button size="sm" ml="auto" variant={"ghost"}>
                      <Icon as={BsUpload} />
                    </Button>
                  </Flex>
                ))}
              </Box>
            )}
          </Box>
        ))}
      </Stack> */}
     
    </Box>
  );
};

export default DataForClass;








