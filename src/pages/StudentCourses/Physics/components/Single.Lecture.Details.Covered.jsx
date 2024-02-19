import React from "react";
import { useParams } from "react-router-dom";
import {
  Box,
  Flex,
  HStack,
  Image,
  Stack,
  Text,
  useTheme,
} from "@chakra-ui/react";
import learderboard from "../../../../assets/images/learderboard.png";
const SingleLectureDetailsCovered = (selectedTopic) => {
  const { outerBackground, innerBackground, innerBoxShadow } =
    useTheme().colors.pallete;

  const { topicname } = useParams();
  console.log("topicName:", topicname);
  return (
    <Stack>
      <Box
        backgroundColor={outerBackground}
        width={"100%"}
        borderRadius={"26px"}
      >
        <Box pt={5} marginLeft={"33px"}>
          <HStack spacing={"10px"} alignItems="center">
            <Box
              width={"12px"}
              height={"25px"}
              borderRadius={"20px"}
              bg={"#3C8DBC"}
            ></Box>
            <Text fontSize={"19px"} lineHeight={"24px"}>
              Physics({topicname})
            </Text>
          </HStack>
        </Box>
      </Box>
      <Box
        backgroundColor={outerBackground}
        width={"100%"}
        borderRadius={"26px"}
      >
        <Flex flexDirection={"column"} gap={"18px"}>
          <HStack spacing={"10px"} alignItems="center">
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

          <Stack direction={"row"} spacing={"18px"}>
            <Box width={"55%"}>
              <Flex flexDirection={"column"} gap={"16px"}>
                <Text>Description</Text>
                <Text fontSize={"12px"} lineHeight={"21px"} color={"#2C332978"}>
                  Lorem ipsum dolor sit amet consectetur. Id egestas egestas ut
                  amet arcu. Ultrices sit odio at sapien mauris amet pretium
                  arcu. Volutpat in tellus dolor quis magna dis sed. Dictum
                  elementum eget sapien pretium ut diam tempor. Felis nibh vitae
                  porttitor lacinia in duis justo. Rutrum eleifend quis
                  facilisis odio pharetra quam cras. Velit viverra duis facilisi
                  vitae aliquam.{" "}
                </Text>
              </Flex>
              <Flex flexDirection={"column"} gap={"16px"}>
                <Text>Covered</Text>
                <Text fontSize={"12px"} lineHeight={"21px"} color={"#2C332978"}>
                  Lorem ipsum dolor sit amet consectetur. Id egestas egestas ut
                  amet arcu. Ultrices sit odio at sapien mauris amet pretium
                  arcu. Volutpat in tellus dolor quis magna dis sed. Dictum
                  elementum eget sapien pretium ut diam tempor. Felis nibh vitae
                  porttitor lacinia in duis justo. Rutrum eleifend quis
                  facilisis odio pharetra quam cras. Velit viverra duis
                  facilisi.
                </Text>
              </Flex>
            </Box>
            <Flex direction={"column"} gap={"16px"} mr={"21px"}>
              <Text>Leader Board</Text>
              <Image src={learderboard} resize={"contain"} />
            </Flex>
          </Stack>

          <Flex>
            <Text>Recordings</Text>
          </Flex>

          <Flex>
            <Text>Files/Notes</Text>
          </Flex>
          <Flex>
            <Text>Polls/QnA</Text>
          </Flex>

          <Flex>
            <Text>Assignment</Text>
          </Flex>
        </Flex>
      </Box>
    </Stack>
  );
};
export default SingleLectureDetailsCovered;
