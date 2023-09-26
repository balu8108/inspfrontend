import {
  Box,
  HStack,
  Text,
  Stack,
  Flex,
  Button,
  Spacer,
  Image,
} from "@chakra-ui/react";
import detailsCoveredData from "../data/detailsCoveredData";
import { PiUploadSimpleLight } from "react-icons/pi";
import defaultImageUrl from "../../../../../assets/images/image1.png";

const DetailsCoveredFiles = () => {
  return (
    <Box bg={"#F1F5F8"} borderRadius={"26px"} w={"100%"}>
      <HStack spacing={"10px"} p={6}>
        <Box
          width={"12px"}
          height={"25px"}
          borderRadius={"20px"}
          bg={"#3C8DBC"}
        ></Box>
        <Text fontSize={"19px"} lineHeight={"24px"}>
          Details
        </Text>
      </HStack>
      <Stack ml={"20px"}>
        {detailsCoveredData.map((topicInfo) => (
          <Flex key={topicInfo.id} p={4}>
            <Box flex={1}>
              <Text>Description</Text>

              <Text fontSize={"12px"} color={"#2C332978"} mt={"15px"}>
                {topicInfo.description}
              </Text>
            </Box>

            <Box flex={1} ml={"24px"}>
              <Text fontSize="md">Covered</Text>
              <ul
                style={{
                  listStyle: "circle",
                  fontSize: "12px",
                  lineHeight: "20px",
                  color: "#2C332978",
                  marginTop: "15px",
                }}
              >
                {topicInfo.covered.map((topic, index) => (
                  <li key={index}>{topic}</li>
                ))}
              </ul>
            </Box>
          </Flex>
        ))}

        <Box p={"13px"} >
          <Text>Recordings</Text>
          {detailsCoveredData.map((topicInfo) => (
            <Flex
              key={topicInfo.id}
              mt={"15px"}
              color={"#2C332978"}
              fontSize={"13px"}
              gap={"24px"}
             
            >
              {topicInfo.recordings.map((id) => (
                <Flex key={id} w={"15%"} h={"15%"} >
                  <Image src={defaultImageUrl} alt="Default Image" />
                </Flex>
              ))}
            </Flex>
          ))}
        </Box>

        <Box p={"13px"}>
          <Text>Files/Notes</Text>
          {detailsCoveredData.map((topicInfo) => (
            <Flex
              key={topicInfo.id}
              mt={"15px"}
              color={"#2C332978"}
              fontSize={"13px"}
            >
              {topicInfo.filesOrNotes.map((fileOrNote, index) => (
                <Flex
                  key={index}
                  mr={"10px"}
                  p={"9px"}
                  borderRadius={"6px"}
                  border={"1px"}
                  borderColor={"#9597927D"}
                  boxShadow={"md"}
                  h={"49px"}
                  alignItems={"center"}
                >
                  {fileOrNote}
                  <Spacer />
                  <Button
                    rightIcon={<PiUploadSimpleLight />}
                    variant={"ghost"}
                    color={"black"}
                    ml={2}
                  ></Button>
                </Flex>
              ))}
            </Flex>
          ))}
        </Box>
      </Stack>
    </Box>
  );
};
export default DetailsCoveredFiles;
