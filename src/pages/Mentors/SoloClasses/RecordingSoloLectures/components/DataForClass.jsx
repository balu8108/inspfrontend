import React ,{useState} from "react";
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
import {IoOpenOutline} from "react-icons/io5"
const DataForClass = () => {
  
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
      <Stack spacing={"25px"}>
        {topicData.map((dataforsoloclass) => (
          <Box key={dataforsoloclass.id} p={6}>
            <Text>{dataforsoloclass.title}</Text>
            <Box mt={"30px"}>
              <Flex>
                <Text>Description</Text>
                <Spacer />
                <AddIcon />
              </Flex>
              <Text
                fontSize={"12px"}
                lineHeight={"21px"}
                color={"#2C332978"}
                mt={"16px"}
              >
                {dataforsoloclass.description}
              </Text>
            </Box>
            <Box mt={"30px"}>
              <Flex>
                <Text>Agenda</Text>
                <Spacer />
                <AddIcon />
              </Flex>
              {dataforsoloclass.agenda.map((agendaItem, index) => (
                <Flex key={index} alignItems="center" mt={4} gap={1}>
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
            <Box mt={"30px"}>
              <Flex>
                <Text>Files</Text>
                <Spacer />
                <AddIcon />
              </Flex>
              {dataforsoloclass.files.map((fileItem, index) => (
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
                  <Spacer/>
                  <Flex>
                  <Button size="sm" ml="auto" variant={"ghost"}>
                    <Icon as={BsUpload} />
                  </Button>
                  <Button size="sm" ml="auto" variant={"ghost"}>
                    <Icon as={IoOpenOutline} />
                  </Button>
                  </Flex>
                 
                </Flex>
              ))}
            </Box>
          </Box>
        ))}
      </Stack>
    </Box>
  );
};

export default DataForClass;
