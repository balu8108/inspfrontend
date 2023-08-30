import { Box, HStack, Text, Flex, Icon } from "@chakra-ui/react";
import recordedClassData from "../data/recordedClassData";
import { BsDownload } from "react-icons/bs";
import { FaCircle } from "react-icons/fa";
const recordedClass = () => {
  return (
    <Box
      width={"400px"}
      height={"832px"}
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
          lineHeight={"26.6px"}
          fontFamily={"Segoe UI"}
          mt={"26px"}
        >
          Recorded Class
        </Text>
      </HStack>
      <Box>
        {recordedClassData.map((recDetails) => (
          <Flex>
            <Box key={recDetails.id} ml={"30px"}>
              <Text fontSize={"15px"} color={"rgba(44, 51, 41, 1)"} mt={"28px"}>
                {recDetails.chapterName}
              </Text>

              <Text fontSize={"12px"} color={"rgba(44, 51, 41, 0.47)"}>
                {recDetails.instructorName}
              </Text>
            </Box>

            <Box ml={"130px"}>
              <Text
                fontSize={"12px"}
                color={"rgba(44, 51, 41, 0.47)"}
                mt={"29px"}
              >
                {recDetails.fromTime}-{recDetails.toTime}
              </Text>

              <Text fontSize={"12px"} color={"rgba(44, 51, 41, 0.47)"}>
                {recDetails.totalTime}
              </Text>
            </Box>
          </Flex>
        ))}
      </Box>
      <Box ml={"30px"}>
        <Text mt={"29px"}>Description</Text>
        {recordedClassData.map((recDetails) => (
          <Text key={recDetails.id} color={"#2C332978"} fontSize={"12px"}>
            {recDetails.description}
          </Text>
        ))}
      </Box>
      <Text mt={"26px"} ml={"30px"}>
        Files
      </Text>
      <Box
        bg={"blackAlpha.200"}
        w={"348px"}
        h={"43px"}
        mt={6}
        ml={"30px"}
        mr={"30px"}
        p={"6px"}
        justifyContent={"space-between"}
        borderRadius={"6px"}
        border={"1px"}
      >
        <Icon ml={"290px"} as={BsDownload} />
      </Box>
      <Box
        bg={"blackAlpha.200"}
        w={"348px"}
        h={"43px"}
        mt={6}
        ml={"30px"}
        mr={"30px"}
        p={"6px"}
        justifyContent={"space-between"}
        borderRadius={"6px"}
        border={"1px"}
      >
        <Icon ml={"290px"} as={BsDownload} />
      </Box>
      <Box>
        <Box>
          {recordedClassData.map((classAgenda) => (
            <Box
              key={classAgenda.id}
              mt="13px"
              ml="30px"
              p="13px"
              fontSize={"12px"}
            >
              <Text fontSize="16px">Agenda</Text>
              <Box>
                <Box mt={"16px"}>
                  {classAgenda.agenda.map((aim) => (
                    <Box key={aim.id} mt={"10px"}>
                      <Icon
                        boxSize={3}
                        color={"gray"}
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
        <Text ml={"31px"} mt={4}>
          Recordings
        </Text>
        <Text mt={120} ml={"31px"}>
          Notes
        </Text>
        <Box
          bg={"blackAlpha.200"}
          w={"348px"}
          h={"43px"}
          mt={3}
          ml={"30px"}
          mr={"30px"}
          p={"6px"}
          justifyContent={"space-between"}
          borderRadius={"6px"}
          border={"1px"}
        >
          <Icon ml={"290px"} as={BsDownload} />
        </Box>
      </Box>
    </Box>
  );
};
export default recordedClass;
