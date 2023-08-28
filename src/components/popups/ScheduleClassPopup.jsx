import { useEffect, useState } from "react";
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
  FormControl,
  FormErrorMessage,
} from "@chakra-ui/react";
import { Select } from "chakra-react-select";
import TimeRangePicker from "@wojtekmaj/react-timerange-picker";

import "@wojtekmaj/react-timerange-picker/dist/TimeRangePicker.css";
import "react-clock/dist/Clock.css";
import { scheduleClassData } from "../../pages/ScheduleClasses/data/scheduleClassData";
import { InlineBtn } from "../button";
import { openFileDialog } from "../../utils";

import { useDispatch } from "react-redux";
import { setAddClassSchedule } from "../../store/actions/scheduleClassActions";
import { getAllChaptersApi } from "../../api/inspexternalapis";

const options = [
  { value: "1", label: "Physics" },
  { value: "2", label: "Chemistry" },
  { value: "3", label: "Maths" },
];
// At the moment we will add some dummy data for chapter, topic

const scheduleClassFormInitData = {
  chapter: {
    value: "1",
    label: "ELECTROMAGNETISM",
  },
  topic: {
    value: "1",
    label: "MURPHY LAW",
  },
};
const dataKey = [
  "scheduledDate",
  "topic",
  "agenda",
  "description",
  "scheduledStartTime",
  "scheduledEndTime",
];
const ScheduleClassPopup = ({
  isOpen,
  onClose,
  selectedDate,
  classTiming,
  setSelectedDate,
  setClassTiming,
}) => {
  const { extraTextLight, primaryBlue } = useTheme().colors.pallete;
  const [scheduleClassFormData, setScheduleClassFormData] = useState(
    scheduleClassFormInitData
  );
  const [scheduleClassFormErrorData, setScheduleClassFormErrorData] = useState(
    {}
  ); // for error handling
  const [date, setDate] = useState(selectedDate);
  const [timeRange, setTimeRange] = useState(classTiming);
  const [selectedFiles, setSelectedFiles] = useState(null); // for file upload
  const [isSubmitLoading, setIsSubmitLoading] = useState(false);

  const dispatch = useDispatch();

  const chakraStyles = {
    control: (provided, state) => ({
      ...provided,
      paddingBlock: "8px",
    }),
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setScheduleClassFormData((prev) => ({ ...prev, [name]: value }));
    setScheduleClassFormErrorData((prev) => ({ ...prev, [name]: "" }));
  };

  const handleFileUpload = async () => {
    const files = await openFileDialog();
    setSelectedFiles(files);
    setScheduleClassFormData((prev) => ({ ...prev, files: files }));
  };

  const handleSelectChange = (object) => {
    setScheduleClassFormData((prev) => ({ ...prev, subject: object.value }));
  };

  const handleDateChange = (e) => {
    setDate(e.target.value);
    setScheduleClassFormData((prev) => ({
      ...prev,
      scheduledDate: e.target.value,
    }));
    setScheduleClassFormErrorData((prev) => ({ ...prev, scheduledDate: "" }));
  };
  const handleTimeChange = (value) => {
    setTimeRange(value);
    setScheduleClassFormData((prev) => ({
      ...prev,
      scheduledStartTime: value[0],
      scheduledEndTime: value[1],
    }));
  };

  const handleCheckBoxChange = (e) => {
    setScheduleClassFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.checked,
    }));
  };
  const handleSubmit = () => {
    setIsSubmitLoading(true);
    // check if all fields are filled
    let errors = {};
    console.log(scheduleClassFormData);
    dataKey.forEach((key) => {
      if (
        !(key in scheduleClassFormData) ||
        scheduleClassFormData[key] === ""
      ) {
        errors[key] = `Please select a ${key}`;
      }
    });
    if (Object.keys(errors).length > 0) {
      setScheduleClassFormErrorData(errors);
      setIsSubmitLoading(false);
      return;
    }

    dispatch(setAddClassSchedule(scheduleClassFormData));
    setScheduleClassFormData({});
    onClose();

    setIsSubmitLoading(false);
  };

  useEffect(() => {
    if (selectedDate) {
      setScheduleClassFormData((prev) => ({ ...prev, scheduledDate: date }));
    }
    if (classTiming && classTiming[0]) {
      setScheduleClassFormData((prev) => ({
        ...prev,
        scheduledStartTime: classTiming[0],
      }));
    }
  }, [selectedDate, classTiming]);

  useEffect(() => {
    return () => {
      // Cleanup function: Clear scheduled date and class timing if there is already
      setClassTiming(["", ""]);
      setSelectedDate("");
    };
  }, []);

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
            <FormControl>
              <Box>
                <Box mb={6}>
                  <Box mb={3}>
                    <Select
                      placeholder={
                        scheduleClassData.scheduleClassFormPlaceholder
                          .selectSubject
                      }
                      onChange={handleSelectChange}
                      chakraStyles={chakraStyles}
                      options={options}
                      useBasicStyles
                    />
                  </Box>
                  <Grid
                    templateColumns={"repeat(2,1fr)"}
                    gap={2}
                    justifyContent={"space-between"}
                    alignItems={"start"}
                  >
                    <FormControl isInvalid={scheduleClassFormErrorData["date"]}>
                      <Input
                        type="date"
                        value={date}
                        py={6}
                        onChange={handleDateChange}
                      />
                      {scheduleClassFormErrorData["date"] && (
                        <FormErrorMessage>
                          {scheduleClassFormErrorData["date"]}
                        </FormErrorMessage>
                      )}
                    </FormControl>

                    <TimeRangePicker
                      rangeDivider={"to"}
                      clearIcon={null}
                      value={timeRange}
                      disableClock={false}
                      onChange={(value) => handleTimeChange(value)}
                    />
                  </Grid>
                </Box>
                <Box my={3}>
                  {/* <FormControl isInvalid={scheduleClassFormErrorData["topic"]}>
                    <Input
                      type="text"
                      name="topic"
                      onChange={handleInputChange}
                      py={6}
                      placeholder={
                        scheduleClassData.scheduleClassFormPlaceholder.topic
                      }
                    />
                    {scheduleClassFormErrorData["topic"] && (
                      <FormErrorMessage>Please select a topic</FormErrorMessage>
                    )}
                  </FormControl> */}
                </Box>
                <Box my={3}>
                  <FormControl isInvalid={scheduleClassFormErrorData["agenda"]}>
                    <Textarea
                      name={"agenda"}
                      onChange={handleInputChange}
                      resize={"none"}
                      placeholder={
                        scheduleClassData.scheduleClassFormPlaceholder.agenda
                      }
                    />
                    {scheduleClassFormErrorData["agenda"] && (
                      <FormErrorMessage>
                        Please select an agenda
                      </FormErrorMessage>
                    )}
                  </FormControl>
                </Box>

                <Box my={3}>
                  <FormControl
                    isInvalid={scheduleClassFormErrorData["description"]}
                  >
                    <Textarea
                      name="description"
                      onChange={handleInputChange}
                      resize={"none"}
                      placeholder={
                        scheduleClassData.scheduleClassFormPlaceholder
                          .description
                      }
                    />
                    {scheduleClassFormErrorData["description"] && (
                      <FormErrorMessage>
                        Please select a description
                      </FormErrorMessage>
                    )}
                  </FormControl>
                </Box>
                <Flex>
                  <Flex
                    w={"80%"}
                    border={"1px solid #E2E8F0"}
                    marginRight={2}
                    borderRadius={"md"}
                    alignItems={"center"}
                    pl={4}
                    cursor={"pointer"}
                    overflowX="auto"
                    scrollBehavior="smooth"
                  >
                    {!selectedFiles ? (
                      <Text color="#718096">
                        {scheduleClassData.filesToUpload}
                      </Text>
                    ) : (
                      Object.keys(selectedFiles).map((key) => (
                        <Text fontSize={"0.7rem"} key={key} color="#718096">
                          {selectedFiles[key].name},
                        </Text>
                      ))
                    )}
                  </Flex>
                  <Button
                    w={"20%"}
                    bg={primaryBlue}
                    color="white"
                    fontSize={"14px"}
                    fontWeight={500}
                    py={6}
                    px={20}
                    onClick={handleFileUpload}
                  >
                    {scheduleClassData.upload}
                  </Button>
                </Flex>

                <Flex justifyContent={"center"} pt={6}>
                  <HStack mr={6}>
                    <Checkbox
                      onChange={handleCheckBoxChange}
                      name="muteAllStudents"
                    />
                    <Text fontSize={"14px"} color={"#718096"}>
                      {scheduleClassData.muteAll}
                    </Text>
                  </HStack>
                  <HStack>
                    <Checkbox
                      onChange={handleCheckBoxChange}
                      name="blockStudentsCamera"
                    />
                    <Text fontSize={"14px"} color={"#718096"}>
                      {scheduleClassData.blockCamera}
                    </Text>
                  </HStack>
                </Flex>
              </Box>
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Flex w={"full"} justifyContent={"center"}>
              <InlineBtn
                isLoading={isSubmitLoading}
                text={scheduleClassData.scheduleClassTitle}
                backColor={primaryBlue}
                textColor="white"
                onClickHandler={handleSubmit}
              />
            </Flex>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ScheduleClassPopup;
