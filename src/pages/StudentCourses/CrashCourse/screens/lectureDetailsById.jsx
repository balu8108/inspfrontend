import React from "react";
import {
  Box,
  Text,
  HStack,
  Card,
  Flex,
  Button,
  Stack,
  Spinner,
  Center,
  Spacer,
  Input,
  useTheme,
} from "@chakra-ui/react";
export default function LectureDetailsById() {
  const { outerBackground, innerBackground, innerBoxShadow } =
    useTheme().colors.pallete;

  return (
    <Box
      width={"full"}
      h={"100%"}
      bg={outerBackground}
      borderRadius={"26px"}
      p={"20px"}
    >
      <Flex mt={"17px"}>
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
        <Spacer />
      </Flex>
      <Flex>
        <Box width={"50%"}>
          <div className="my-4">
            <h2>Description</h2>
            <div>
              Lorem ipsum dolor sit amet consectetur. Id egestas egestas ut amet
              arcu. Ultrices sit odio at sapien mauris amet pretium arcu.
              Volutpat in tellus dolor quis magna dis sed. Dictum elementum eget
              sapien pretium ut diam tempor. Felis nibh vitae porttitor lacinia
              in duis justo. Rutrum eleifend quis facilisis odio pharetra quam
              cras. Velit viverra duis facilisi vitae aliquam.{" "}
            </div>
          </div>
          <div className="my-4">
            <h2>Covered</h2>
            <div>
              Lorem ipsum dolor sit amet consectetur. Id egestas egestas ut amet
              arcu. Ultrices sit odio at sapien mauris amet pretium arcu.
              Volutpat in tellus dolor quis magna dis sed. Dictum elementum eget
              sapien pretium ut diam tempor. Felis nibh vitae porttitor lacinia
              in duis justo. Rutrum eleifend quis facilisis odio pharetra quam
              cras. Velit viverra duis facilisi.
            </div>
          </div>
        </Box>
        <Box width={"50%"}>image</Box>
      </Flex>
      <Box>
        <h2>Recordings</h2>
        <div></div>
      </Box>
      <Box>
        <h2>Files/notes</h2>
        <div></div>
      </Box>
      <Box>
        <h2>Assignment</h2>
        <div></div>
      </Box>

      <div>lectureDetailsById</div>
    </Box>
  );
}
