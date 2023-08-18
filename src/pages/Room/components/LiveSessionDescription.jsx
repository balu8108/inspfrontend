import {
  Box,
  HStack,
  Text,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  useTheme,
  Flex,
  IconButton,
} from "@chakra-ui/react";

import { FiDownload } from "react-icons/fi";
import { roomData } from "../data/roomData";
import FileBoxComponent from "../../../components/filebox/FileBoxComponent";
import UploadFilePopup from "../../../components/popups/UploadFilePopup";

const ActiveRoomContent = ({ mainTextColor, secondaryTextColor }) => {
  return (
    <>
      <Box pt={6}>
        <Text fontSize={"14px"} color={mainTextColor}>
          {roomData.topic}
        </Text>
        <Text color={secondaryTextColor} fontSize={"12px"}>
          {roomData.timing}
        </Text>
      </Box>
      <Box pt={6}>
        <Text fontSize={"14px"} color={mainTextColor}>
          {roomData.agenda}
        </Text>
        {roomData.liveSessionAgendas.map((agenda, index) => (
          <HStack key={agenda.id} pt={1}>
            <Box
              width={"15px"}
              height={"15px"}
              bg={"gray.200"}
              borderRadius={"100%"}
            />
            <Text color={secondaryTextColor} fontSize={"12px"}>
              {agenda.value}
            </Text>
          </HStack>
        ))}
      </Box>
      <Box pt={6}>
        <Flex alignItems={"center"} justifyContent={"space-between"}>
          <Text fontSize={"14px"} color={mainTextColor}>
            {roomData.files}
          </Text>
          <UploadFilePopup />
        </Flex>

        <Box>
          <FileBoxComponent data={roomData.fileData} />
        </Box>
      </Box>

      <Box pt={6}>
        <Flex justifyContent={"space-between"} alignItems={"center"}>
          <Text>{roomData.notes}</Text>
          <IconButton
            icon={<FiDownload />}
            bg={"none"}
            _hover={{ bg: "none" }}
          />
        </Flex>
        <Box
          width="100%"
          height={"100px"}
          bg="gray.200"
          borderRadius={"md"}
        ></Box>
      </Box>
    </>
  );
};

const LiveSessionDescription = () => {
  const theme = useTheme();
  const { primaryBlue, mainTextColor, secondaryTextColor } =
    theme.colors.pallete;
  return (
    <>
      <Box p={4}>
        <HStack>
          <Box
            bg={primaryBlue}
            width="12px"
            height="25px"
            borderRadius={"20px"}
          ></Box>
          <Text fontWeight={"400"}>{roomData.liveSessionText}</Text>
        </HStack>

        <Tabs pt={6} colorScheme="black">
          <TabList>
            <Tab fontSize={"12px"}>{roomData.active}</Tab>
            <Tab fontSize={"12px"}>{roomData.upcoming}</Tab>
          </TabList>

          <TabPanels>
            <TabPanel p={0}>
              <ActiveRoomContent
                mainTextColor={mainTextColor}
                secondaryTextColor={secondaryTextColor}
              />
            </TabPanel>
            <TabPanel>
              <p>two!</p>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </>
  );
};

export default LiveSessionDescription;
