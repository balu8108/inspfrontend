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
import TimePicker from "react-time-picker-input";
import "@wojtekmaj/react-timerange-picker/dist/TimeRangePicker.css";
import "react-clock/dist/Clock.css";
import { scheduleClassData } from "../../pages/ScheduleClasses/data/scheduleClassData";
import { InlineBtn } from "../button";
import { isValidTimeFormat, openFileDialog } from "../../utils";

import { useDispatch } from "react-redux";
import { setAddClassSchedule } from "../../store/actions/scheduleClassActions";
import {
  fetchAllChaptersApi,
  fetchAllSubjectsApi,
  fetchAllTopicsApi,
} from "../../api/inspexternalapis";

import "./timepickerdefaultstyles.css";

// At the moment we will add some dummy data for chapter, topic

const dataKey = [
  "subject",
  "chapter",
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
  const { extraTextLight, primaryBlue, primaryBlueLight } =
    useTheme().colors.pallete;
  const [scheduleClassFormData, setScheduleClassFormData] = useState({});
  const [scheduleClassFormErrorData, setScheduleClassFormErrorData] = useState(
    {}
  ); // for error handling
  const [date, setDate] = useState(selectedDate);
  const [isSubjectLoading, setIsSubjectLoading] = useState(false);
  const [isChaptersLoading, setIsChaptersLoading] = useState(false);
  const [isChaptersDisabled, setIsChaptersDisabled] = useState(true);
  const [subjectsData, setSubjectsData] = useState([]);
  const [selectedChapter, setSelectedChapter] = useState(null);
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [chaptersData, setChaptersData] = useState([]);
  const [isTopicsLoading, setIsTopicsLoading] = useState(false);
  const [isTopicsDisabled, setIsTopicsDisabled] = useState(true);
  const [topicsData, setTopicsData] = useState([]);

  const [selectedFiles, setSelectedFiles] = useState(null); // for file upload
  const [isSubmitLoading, setIsSubmitLoading] = useState(false);
  const [startTime, setStartTime] = useState(classTiming[0]);
  const [endTime, setEndTime] = useState(classTiming[1]);
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

  const fetchAllTopics = async (chapter_id) => {
    try {
      setIsTopicsDisabled(true);
      setIsTopicsLoading(true);
      const response = await fetchAllTopicsApi(chapter_id);
      if (response.status) {
        setTopicsData(response.result);
        setIsTopicsLoading(false);
        setIsTopicsDisabled(false);
      }
    } catch (err) {}
  };
  const handleSelectChange = (object, event) => {
    if (event.name === "subject") {
      // getting subject

      if (object?.label === "PHYSICS") {
        // On selecting physics get all chpters
        getChaptersByFetch();
      } else {
        // on selecting other than physics then we reset chapter selection and topic selection
        setScheduleClassFormData((prev) => ({
          ...prev,
          chapter: null,
          topic: null,
        }));
        setSelectedChapter(null);
        setSelectedTopic(null);
        setChaptersData([]);
        setTopicsData([]);
        setIsChaptersDisabled(true);
        setIsTopicsDisabled(true);
      }
    } else if (event.name === "chapter") {
      // means chapter changed
      setSelectedChapter(object);

      fetchAllTopics(object.value);
    } else if (event.name === "topic") {
      setSelectedTopic(object);
    }
    setScheduleClassFormData((prev) => ({ ...prev, [event.name]: object }));
    setScheduleClassFormErrorData((prev) => ({ ...prev, [event.name]: "" }));
  };

  const handleDateChange = (e) => {
    setDate(e.target.value);
    setScheduleClassFormData((prev) => ({
      ...prev,
      scheduledDate: e.target.value,
    }));
    setScheduleClassFormErrorData((prev) => ({ ...prev, scheduledDate: "" }));
  };

  const handleStartTimeChange = (value) => {
    setStartTime(value);
    setScheduleClassFormData((prev) => ({
      ...prev,
      scheduledStartTime: value,
    }));
    setScheduleClassFormErrorData((prev) => ({
      ...prev,
      scheduledStartTime: "",
    }));
  };
  const handleEndTimeChange = (value) => {
    setEndTime(value);
    setScheduleClassFormData((prev) => ({
      ...prev,
      scheduledEndTime: value,
    }));
    setScheduleClassFormErrorData((prev) => ({
      ...prev,
      scheduledEndTime: "",
    }));
  };
  const handleCheckBoxChange = (e) => {
    setScheduleClassFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.checked,
    }));
  };
  const handleSubmit = async () => {
    setIsSubmitLoading(true);
    // check if all fields are filled
    let errors = {};

    let formData = new FormData();
    for (const key in selectedFiles) {
      if (
        selectedFiles.hasOwnProperty(key) &&
        selectedFiles[key] instanceof File
      ) {
        formData.append("files", selectedFiles[key]);
      }
    }
    formData.append("subject", JSON.stringify(scheduleClassFormData.subject));
    formData.append("chapter", JSON.stringify(scheduleClassFormData.chapter));
    formData.append("topic", JSON.stringify(scheduleClassFormData.topic));
    formData.append("scheduledDate", scheduleClassFormData.scheduledDate);
    formData.append(
      "scheduledStartTime",
      scheduleClassFormData.scheduledStartTime
    );
    formData.append("scheduledEndTime", scheduleClassFormData.scheduledEndTime);
    formData.append("agenda", scheduleClassFormData.agenda);
    formData.append("description", scheduleClassFormData.description);
    formData.append(
      "muteAllStudents",
      scheduleClassFormData?.muteAllStudents || false
    );
    formData.append(
      "blockStudentsCamera",
      scheduleClassFormData?.blockStudentsCamera || false
    );

    dataKey.forEach((key) => {
      const isMissingKey = !(key in scheduleClassFormData);
      const isEmptyValue =
        scheduleClassFormData[key] === "" ||
        scheduleClassFormData[key] === null;
      const isInvalidTimeFormat =
        (key === "scheduledStartTime" || key === "scheduledEndTime") &&
        !isValidTimeFormat(scheduleClassFormData[key]);

      if (isMissingKey || isEmptyValue || isInvalidTimeFormat) {
        errors[key] = `Please select a ${key}`;
      }
    });

    if (Object.keys(errors).length > 0) {
      setScheduleClassFormErrorData(errors);
      setIsSubmitLoading(false);
      return;
    }
    try {
      await dispatch(setAddClassSchedule(formData));
    } catch (err) {
      console.log("err", err);
    }

    setScheduleClassFormData({});
    onClose();
    setIsSubmitLoading(false);
  };

  const getSubjectsByFetch = async () => {
    setIsSubjectLoading(true);
    try {
      const response = await fetchAllSubjectsApi();
      if (response.status) {
        setSubjectsData(response.result);
      }
    } catch (err) {
      console.log(err);
    }
    setIsSubjectLoading(false);
  };

  const getChaptersByFetch = async () => {
    setIsChaptersLoading(true);
    try {
      const response = await fetchAllChaptersApi();
      if (response.status) {
        setChaptersData(response.result);
      }
    } catch (err) {
      console.log(err);
    }
    setIsChaptersLoading(false);
    setIsChaptersDisabled(false);
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
      setClassTiming(["--:--", "--:--"]);
      setSelectedDate("");
    };
  }, []);

  useEffect(() => {
    getSubjectsByFetch();
  }, []);

  return (
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
                  <FormControl
                    isInvalid={scheduleClassFormErrorData["subject"]}
                  >
                    <Select
                      placeholder={
                        scheduleClassData.scheduleClassFormPlaceholder
                          .selectSubject
                      }
                      isLoading={isSubjectLoading}
                      isDisabled={isSubjectLoading}
                      name={"subject"}
                      onChange={handleSelectChange}
                      chakraStyles={chakraStyles}
                      options={subjectsData.map((subject) => {
                        let obj = {
                          value: subject.id,
                          label: subject.name,
                        };
                        return obj;
                      })}
                      useBasicStyles
                    />
                    {scheduleClassFormErrorData["subject"] && (
                      <FormErrorMessage>
                        {scheduleClassFormErrorData["subject"]}
                      </FormErrorMessage>
                    )}
                  </FormControl>
                </Box>
                <Grid
                  templateColumns={"repeat(2,1fr)"}
                  gap={2}
                  justifyContent={"space-between"}
                  alignItems={"start"}
                >
                  <FormControl
                    isInvalid={scheduleClassFormErrorData["scheduledDate"]}
                  >
                    <Input
                      type="date"
                      value={date}
                      py={6}
                      onChange={handleDateChange}
                    />
                    {scheduleClassFormErrorData["scheduledDate"] && (
                      <FormErrorMessage>Please select a date</FormErrorMessage>
                    )}
                  </FormControl>
                  <Box>
                    <Flex alignItems={"center"} gap={1}>
                      <Box
                        position={"relative"}
                        className={`schedule-start-time ${
                          scheduleClassFormErrorData["scheduledStartTime"]
                            ? "invalid"
                            : ""
                        }`}
                      >
                        <TimePicker
                          onChange={handleStartTimeChange}
                          value={startTime}
                          eachInputDropdown={true}
                          manuallyDisplayDropdown
                          hour12Format={true}
                        />
                      </Box>
                      <Text>to</Text>
                      <Box
                        className={`schedule-end-time ${
                          scheduleClassFormErrorData["scheduledEndTime"]
                            ? "invalid"
                            : ""
                        }`}
                      >
                        <TimePicker
                          onChange={handleEndTimeChange}
                          value={endTime}
                          eachInputDropdown={true}
                          manuallyDisplayDropdown
                          hour12Format={true}
                        />
                      </Box>
                    </Flex>
                    {(scheduleClassFormErrorData["scheduledStartTime"] ||
                      scheduleClassFormErrorData["scheduledEndTime"]) && (
                      <Text
                        fontSize={"14px"}
                        fontWeight={400}
                        mt={1}
                        color="#E53E3E"
                      >
                        Please select time
                      </Text>
                    )}
                  </Box>
                </Grid>
              </Box>
              <Box my={3}>
                <FormControl isInvalid={scheduleClassFormErrorData["chapter"]}>
                  <Select
                    placeholder={
                      scheduleClassData.scheduleClassFormPlaceholder
                        .selectChapter
                    }
                    isLoading={isChaptersLoading}
                    isDisabled={isChaptersDisabled}
                    onChange={handleSelectChange}
                    name="chapter"
                    value={selectedChapter}
                    chakraStyles={chakraStyles}
                    options={chaptersData.map((chapter) => {
                      let obj = {
                        value: chapter.id,
                        label: chapter.name,
                      };
                      return obj;
                    })}
                    useBasicStyles
                  />
                  {scheduleClassFormErrorData["chapter"] && (
                    <FormErrorMessage>
                      {scheduleClassFormErrorData["chapter"]}
                    </FormErrorMessage>
                  )}
                </FormControl>
              </Box>
              <Box my={3}>
                <FormControl isInvalid={scheduleClassFormErrorData["topic"]}>
                  <Select
                    placeholder={
                      scheduleClassData.scheduleClassFormPlaceholder.selectTopic
                    }
                    onChange={handleSelectChange}
                    isDisabled={isTopicsDisabled}
                    isLoading={isTopicsLoading}
                    value={selectedTopic}
                    name="topic"
                    chakraStyles={chakraStyles}
                    options={topicsData.map((topic) => {
                      let obj = {
                        value: topic.id,
                        label: topic.name,
                      };
                      return obj;
                    })}
                    useBasicStyles
                  />
                  {scheduleClassFormErrorData["topic"] && (
                    <FormErrorMessage>
                      {scheduleClassFormErrorData["topic"]}
                    </FormErrorMessage>
                  )}
                </FormControl>
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
                    <FormErrorMessage>Please select an agenda</FormErrorMessage>
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
                      scheduleClassData.scheduleClassFormPlaceholder.description
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
                    Object.keys(selectedFiles).map((key, index) => (
                      <Text fontSize={"0.7rem"} key={key} color="#718096">
                        {selectedFiles[key].name}
                        {index !== selectedFiles.length - 1 && ", "}
                      </Text>
                    ))
                  )}
                </Flex>
                <Button
                  w={"20%"}
                  bg={primaryBlue}
                  _hover={{ bg: primaryBlueLight }}
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

              <Flex pt={6}>
                <HStack mr={6}>
                  <Checkbox
                    onChange={handleCheckBoxChange}
                    name="muteAllStudents"
                  />
                  <Text fontSize={"14px"} color={"#718096"}>
                    {scheduleClassData.muteAll}
                  </Text>
                </HStack>
                {/* <HStack>
                    <Checkbox
                      onChange={handleCheckBoxChange}
                      name="blockStudentsCamera"
                    />
                    <Text fontSize={"14px"} color={"#718096"}>
                      {scheduleClassData.blockCamera}
                    </Text>
                  </HStack> */}
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
              hoverColor={primaryBlueLight}
            />
          </Flex>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ScheduleClassPopup;
