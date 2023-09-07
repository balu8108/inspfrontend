import {
  Button,
  Box,
  Card,
  Flex,
  HStack,
  Icon,
  Input,
  InputLeftElement,
  InputGroup,
  Stack,
  Text,
} from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import { BsUpload } from "react-icons/bs";
import uploadAssignmentData from "../data/uploadAssigData";
const AssignmentUpload = () => {
  const {assignmentId}=useParams();
  const  selectedAssignment=uploadAssignmentData.find(
    (assignmentData)=>assignmentData.id ===assignmentId
  )
  return (
    <Box width={"100%"} h={"100%"} bg={"#F1F5F8"} borderRadius={"26px"}>
      <HStack spacing={"10px"} alignItems="center" ml={"33px"} mt={"27px"}>
        <Box
          width={"12px"}
          height={"25px"}
          borderRadius={"20px"}
          bg={"#3C8DBC"}
        ></Box>
        <Text fontSize={"19px"} lineHeight={"24px"}>
          Assignment (Physics)
        </Text>
        <InputGroup m={4} w={"220px"} ml={"310px"} borderRadius={"18px"}>
          <InputLeftElement pointerEvents="none">
            <FaSearch color="gray" />
          </InputLeftElement>
          <Input placeholder="Search..." />
        </InputGroup>
      </HStack>

      <Stack>
        <Flex flexWrap="wrap" mt={"37px"} ml={"27px"} mr={"20px"} gap={"23px"}>
          {uploadAssignmentData.map((assignmentData) => (
            <Card
              key={assignmentData.id}
              w="30%"
              blendMode={"multiply"}
              bg={"#F1F5F8"}
              borderRadius={"18px"}
            >
              <Text fontSize={"px"} fontWeight={400} ml={"13px"} mt={"16px"}>
                {assignmentData.chapterName}
              </Text>
              <Text
                fontWeight={400}
                fontSize={"12px"}
                ml={"13px"}
                color={"rgba(44, 51, 41, 0.47)"}
              >
                {assignmentData.instructorName}
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
              >
                {assignmentData.description}
              </Text>
              <Button
                variant={"ghost"}
                color={"#3C8DBC"}
                fontWeight={"600"}
                size={"14px"}
                lineHeight={"16px"}
                p={6}
              >
                View Details
              </Button>
            </Card>
          ))}
        </Flex>
      </Stack>
      <Box mt={"30px"} ml={"52px"} key={uploadAssignmentData.id}>
        {uploadAssignmentData.map((assignmentData) => (
          <Text></Text>
        ))}

        <Box mt={"179px"}>
          <Text>Files</Text>
          <Box
            bg={"blackAlpha.200"}
            w={"280px"}
            h={"43px"}
            mt={6}
            ml={"30px"}
            mr={"30px"}
            p={"6px"}
            justifyContent={"space-between"}
            borderRadius={"6px"}
            border={"1px"}
          >
            <Icon ml={"240px"} as={BsUpload} />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
export default AssignmentUpload;
