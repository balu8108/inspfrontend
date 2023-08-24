import React from "react";
import { Box, Button, Input, InputGroup, InputLeftElement,Text,Flex,Card } from "@chakra-ui/react";
import { Search2Icon } from "@chakra-ui/icons";
import completedLecturesData from "../data/recordedLecture";

const MeetingAndRecordedLect = () => {
  return (
    <Box
      width={280}
      height={800}
      borderRadius={10}
      backgroundColor={"#F1F5F8"}
      ml={960}
      mt={-870}
    >
      <InputGroup>
        <InputLeftElement pointerEvents="none">
          <Search2Icon mt={16} ml={5} color="black" />
        </InputLeftElement>
        <Input
          mt={8}
          placeholder="Search"
          size="md"
          ml={4}
          width={220}
          height={9}
        />
      </InputGroup>
      <Flex>
      <Text mt={5} ml={8} fontSize={16}>Completed</Text>
      <Button variant={"ghost"}  ml={14} fontWeight={9} fontSize={13} mt={3} >See All</Button>
      </Flex>

      {completedLecturesData.map((lecture) => (
        <Card key={lecture.id} p={4} mt={4} ml={6} width="88%">
          <Flex>
          <Text fontSize="10" fontWeight="semibold">
            {lecture.chapterName}
          </Text>
          <Text  fontSize={8} ml={4}  color="gray.500">
            {lecture.startTime} - {lecture.endTime} 
          </Text>
          </Flex>
          
          <Flex>
          <Text color="gray.500">{lecture.instructorName}</Text>
          ({lecture.duration})
          </Flex>
          
          <Text mt={2}>{lecture.description}</Text>
          <Button
            as="a"
            href={lecture.viewRecordingLink}
            target="_blank"
            rel="noopener noreferrer"
            variant="outline"
            mt={3}
          >
            View Recording
          </Button>
        </Card>
      
      ))}
     
    </Box>
  );
};

export default MeetingAndRecordedLect;
