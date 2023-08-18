import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  useTheme,
  Box,
  Input,
  Flex,
  Grid,
  Textarea,
  Text,
  HStack,
  Checkbox,
} from "@chakra-ui/react";
import { Select } from "chakra-react-select";
import TimeRangePicker from "@wojtekmaj/react-timerange-picker";

import "@wojtekmaj/react-timerange-picker/dist/TimeRangePicker.css";
import "react-clock/dist/Clock.css";
import { scheduleClassData } from "../../pages/ScheduleClasses/data/scheduleClassData";
import { InlineBtn, MainBtn } from "../button";

const options = [
  { value: "Physics", label: "Physics" },
  { value: "Chemistry", label: "Chemistry" },
  { value: "Maths", label: "Maths" },
];
const ScheduleClassPopup = ({ isOpen, onClose }) => {
  const { extraTextLight, primaryBlue } = useTheme().colors.pallete;
  const chakraStyles = {
    control: (provided, state) => ({
      ...provided,
      paddingBlock: "8px",
    }),
  };
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} size={"xl"}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader
            fontWeight={500}
            fontSize={"1.2rem"}
            color={extraTextLight}
          >
            {scheduleClassData.scheduleClassTitle}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Box>
              <Box mb={6}>
                <Box mb={3}>
                  <Select
                    placeholder={
                      scheduleClassData.scheduleClassFormPlaceholder
                        .selectSubject
                    }
                    chakraStyles={chakraStyles}
                    options={options}
                    useBasicStyles
                  />
                </Box>
                <Grid
                  templateColumns={"repeat(2,1fr)"}
                  gap={2}
                  justifyContent={"space-between"}
                >
                  <Input type="date" py={6} />
                  <TimeRangePicker
                    clearIcon={null}
                    style={{ borderRadius: "50px" }}
                  />
                </Grid>
              </Box>
              <Box my={3}>
                <Input
                  type="text"
                  py={6}
                  placeholder={
                    scheduleClassData.scheduleClassFormPlaceholder.topic
                  }
                />
              </Box>
              <Box my={3}>
                <Textarea
                  resize={"none"}
                  placeholder={
                    scheduleClassData.scheduleClassFormPlaceholder.agenda
                  }
                />
              </Box>

              <Box my={3}>
                <Textarea
                  resize={"none"}
                  placeholder={
                    scheduleClassData.scheduleClassFormPlaceholder.description
                  }
                />
              </Box>
              <Flex>
                <Flex
                  w={"80%"}
                  border={"1px solid #E2E8F0"}
                  marginRight={2}
                  borderRadius={"md"}
                  alignItems={"center"}
                  pl={4}
                >
                  <Text color="#718096">{scheduleClassData.filesToUpload}</Text>
                </Flex>
                <Button
                  w={"20%"}
                  bg={primaryBlue}
                  color="white"
                  fontSize={"14px"}
                  fontWeight={500}
                  py={6}
                  px={20}
                >
                  {scheduleClassData.upload}
                </Button>
              </Flex>

              <Flex justifyContent={"center"} pt={6}>
                <HStack mr={6}>
                  <Checkbox />
                  <Text fontSize={"14px"} color={"#718096"}>
                    {scheduleClassData.muteAll}
                  </Text>
                </HStack>
                <HStack>
                  <Checkbox />
                  <Text fontSize={"14px"} color={"#718096"}>
                    {scheduleClassData.blockCamera}
                  </Text>
                </HStack>
              </Flex>
            </Box>
          </ModalBody>

          <ModalFooter>
            <Flex w={"full"} justifyContent={"center"}>
              <InlineBtn
                isLoading={false}
                text={scheduleClassData.scheduleClassTitle}
                backColor={primaryBlue}
                textColor="white"
                onClickHandler={() => {}}
              />
            </Flex>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ScheduleClassPopup;
