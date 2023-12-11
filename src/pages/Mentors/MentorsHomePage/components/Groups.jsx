import {
  Avatar,
  Box,
  Card,
  Flex,
  Text,
  Button,
  HStack,
  Spacer,
} from "@chakra-ui/react";
import group from "../data/group";
import Scrollbars from "rc-scrollbars";
const MentorGroups = () => {
  return (
    <Box
      bg={"#F1F5F8"}
      borderRadius={"26px"}
      w={"300px"}
      h={"120%"}
      ml={"24px"}
    >
      <Flex>
        <HStack spacing={"10px"}>
          <Box
            width={"12px"}
            height={"25px"}
            borderRadius={"20px"}
            bg={"#3C8DBC"}
            mt={"27px"}
            ml={"27px"}
          ></Box>
          <Text fontSize={"20px"} lineHeight={"24px"} mt={"26px"}>
            Groups
          </Text>
        </HStack>
        <Spacer />
        <Button variant={"ghost"} fontWeight={400} mt={4} mr={1}   _hover={{bg:"none"}}>
          See All
        </Button>
      </Flex>

      <Box m={"13px"} maxHeight="340px">
        <Scrollbars autoHide={true} autoHeight={true} autoHeightMin={"340px"}>
          {group.map((groupItem) => (
            <Card
              key={groupItem.id}
              p={3}
              bg={"#F1F5F8"}
              blendMode={"multiply"}
              h={"60px"}
              mb={"10px"}
            >
              <Flex>
                <Avatar bg={"#3C8DBC"} boxSize="1.6em" mt={2} />
                <Box ml={2} mt={2}>
                  <Text fontSize="14px">{groupItem.groupName}</Text>
                  <Text fontSize="10px" color="#2C332978" mt={-1}>
                    {groupItem.groupdescription}
                  </Text>
                </Box>
                <Spacer />
                <Button
                  variant={"ghost"}
                  fontWeight={600}
                  color={"#3C8DBC"}
                  fontSize={"10px"}
                >
                  View Details
                </Button>
              </Flex>
            </Card>
          ))}
        </Scrollbars>
      </Box>
    </Box>
  );
};

export default MentorGroups;
