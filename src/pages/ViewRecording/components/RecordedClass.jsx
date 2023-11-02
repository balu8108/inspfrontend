import {
  Box,
  HStack,
  Text,
  Flex,
  Icon,
  Image,
  Card,
  SimpleGrid,
} from "@chakra-ui/react";
import recordedClassData from "../data/recordedClassData";
import { BsDownload } from "react-icons/bs";
import { FaCircle } from "react-icons/fa";
import defaultImageUrl from "../../../assets/images/image1.png";
import { Link } from "react-router-dom";
const RecordedClass = () => {
  return (
    <Box
      width={"400px"}
      height={"full"}
      ml={"24px"}
      borderRadius={"26px"}
      bg={"#FFFFFF"}
      boxShadow="2px 2px 13px 0px #5C5C5C1F"
    >
      <HStack spacing={"10px"}>
        <Box
          width={"12px"}
          height={"25px"}
          borderRadius={"20px"}
          bg={"#3C8DBC"}
          mt={"27px"}
          ml={"30px"}
        ></Box>
        <Text
          fontSize={"20px"}
          lineHeight={"26px"}
          fontWeight={"400"}
          mt={"26px"}
        >
          Recorded Class
        </Text>
      </HStack>
      <Box p={5}>
        <Box>
          {recordedClassData.map((recDetails) => (
            <Box>
              <Text
                fontSize={"15px"}
                lineHeight={"18px"}
                fontWeight={400}
                color={"rgba(44, 51, 41, 1)"}
                mt={"28px"}
              >
                {recDetails.chapterName}
              </Text>

              <Text
                fontSize={"12px"}
                fontWeight={400}
                lineHeight={"14px"}
                color={"rgba(44, 51, 41, 0.47)"}
              >
                {recDetails.instructorName}
              </Text>
            </Box>
          ))}
        </Box>
        <Box>
          <Text mt={"29px"} fontSize={"15px"} lineHeight={"19px"}>
            Description
          </Text>
          {recordedClassData.map((recDetails) => (
            <Text
              key={recDetails.id}
              color={"#2C332978"}
              fontSize={"12px"}
              lineHeight={"20px"}
            >
              {recDetails.description}
            </Text>
          ))}
        </Box>
        <Text mt={"26px"}>Files</Text>
        <Box
          bg={"blackAlpha.200"}
          w={"348px"}
          h={"43px"}
          mt={6}
          mr={"30px"}
          p={"6px"}
          justifyContent={"space-between"}
          borderRadius={"6px"}
          border={"1px"}
          borderColor={"#9597927D"}
        >
          <Icon ml={"290px"} w={"18px"} h={"18px"} as={BsDownload} />
        </Box>
        <Box
          bg={"blackAlpha.200"}
          w={"348px"}
          h={"43px"}
          mt={6}
          mr={"30px"}
          p={"6px"}
          justifyContent={"space-between"}
          borderRadius={"6px"}
          border={"1px"}
          borderColor={"#9597927D"}
        >
          <Icon ml={"290px"} w={"18px"} h={"18px"} as={BsDownload} />
        </Box>
        <Box>
          <Box>
            {recordedClassData.map((classAgenda) => (
              <Box key={classAgenda.id} mt="13px" p="13px" fontSize={"12px"}>
                <Text fontSize="16px" lineHeight={"19px"}>
                  Agenda
                </Text>
                <Box>
                  <Box mt={"16px"}>
                    {classAgenda.agenda.map((aim) => (
                      <Box key={aim.id} mt={"10px"}>
                        <Icon
                          boxSize={3}
                          color={"#E0E0E0"}
                          as={FaCircle}
                          mr={"10px"}
                        />

                        {aim.aim}
                      </Box>
                    ))}
                  </Box>
                </Box>
              </Box>
            ))}
          </Box>
          <Box overflowX={"auto"}>
            <Text>Recordings</Text>
            <Flex>
              {recordedClassData.map((topicInfo) => (
                <Flex key={topicInfo.id} gap={"24px"}>
                  {topicInfo.recordings.map((recording) => (
                    <Card
                      key={recording.id}
                      mt={"15px"}
                      color={"#2C332978"}
                      fontSize={"13px"}
                      w={"150px"}
                    >
                      <Link to="/view-recording">
                        <Image src={defaultImageUrl} alt="Default Image" />
                      </Link>
                    </Card>
                  ))}
                </Flex>
              ))}
            </Flex>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
export default RecordedClass;
