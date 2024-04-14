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
import { scheduleClassData } from "../../pages/ScheduleClasses/data/scheduleClassData";
import { InlineBtn } from "../button";
import { isValidTimeFormat, openFileDialog } from "../../utils";

import { useDispatch, useSelector } from "react-redux";
import { setAddClassSchedule } from "../../store/actions/scheduleClassActions";
import {
  fetchAllChaptersApi,
  fetchAllTopicsApi,
} from "../../api/inspexternalapis";
import { getLectureNo } from "../../api/scheduleliveclass";
import "./timepickerdefaultstyles.css";

// At the moment we will add some dummy data for chapter, topic

const dataKey = [
  "subject",
  "chapter",
  "scheduledDate",
  "topic",
  "classType",
  "classLevel",
  "agenda",
  "description",
  "scheduledStartTime",
  "scheduledEndTime",
];
const ScheduleClassPopup = ({ isOpen, onClose, isCalenderScreen }) => {
  const { calenderPickedDate, calenderPickedTime } = useSelector(
    (state) => state.generic
  );
  const { extraTextLight, primaryBlue, primaryBlueLight } =
    useTheme().colors.pallete;
  const [selectedDate, setSelectedDate] = useState(""); // if clicked from calendar
  const [classTiming, setClassTiming] = useState(["--:--", "--:--"]);
  const [scheduleClassFormData, setScheduleClassFormData] = useState({});
  const [scheduleClassFormErrorData, setScheduleClassFormErrorData] = useState(
    {}
  ); // for error handling

  const [selectedChapter, setSelectedChapter] = useState(null);
  const [isChapterStatus, setIsChapterStatus] = useState({
    loading: false,
    disabled: true,
  });

  const [selectedTopic, setSelectedTopic] = useState(null);
  const [isTopicStatus, setIsTopicStatus] = useState({
    loading: false,
    disabled: true,
  });

  const [chaptersData, setChaptersData] = useState([]); // chapter
  const [topicsData, setTopicsData] = useState([]); // topic
  const [selectedClassType, setSelectedClassType] = useState(null); // class type
  const [selectedClassLevel, setSelectedClassLevel] = useState(null); // class level

  const [lectureNo, setLectureNo] = useState(null);
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
      setIsTopicStatus({
        loading: true,
        disabled: true,
      });
      const response = await fetchAllTopicsApi(chapter_id);
      if (response.status) {
        setTopicsData(response.result);
        setIsTopicStatus({
          loading: false,
          disabled: false,
        });
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
        setIsChapterStatus({
          loading: false,
          disabled: true,
        });
        setIsTopicStatus({
          loading: false,
          disabled: true,
        });
      }
    } else if (event.name === "chapter") {
      // means chapter changed
      setSelectedChapter(object);

      fetchAllTopics(object.value);
    } else if (event.name === "topic") {
      setSelectedTopic(object);
    } else if (event.name === "classType") {
      setSelectedClassType(object);
    } else if (event.name === "classLevel") {
      setSelectedClassLevel(object);
    }
    setScheduleClassFormData((prev) => ({ ...prev, [event.name]: object }));
    setScheduleClassFormErrorData((prev) => ({ ...prev, [event.name]: "" }));
  };

  const handleDateChange = (e) => {
    setSelectedDate(e.target.value);
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
    formData.append(
      "classType",
      JSON.stringify(scheduleClassFormData.classType)
    );
    formData.append(
      "classLevel",
      JSON.stringify(scheduleClassFormData.classLevel)
    );
    formData.append("scheduledDate", scheduleClassFormData.scheduledDate);
    formData.append(
      "scheduledStartTime",
      scheduleClassFormData.scheduledStartTime
    );
    formData.append("scheduledEndTime", scheduleClassFormData.scheduledEndTime);
    formData.append("agenda", scheduleClassFormData.agenda);
    formData.append("lectureNo", lectureNo);
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

  const getChaptersByFetch = async () => {
    setIsChapterStatus({
      loading: true,
      disabled: true,
    });
    try {
      const response = await fetchAllChaptersApi();
      if (response.status) {
        setChaptersData(response.result);
      }
    } catch (err) {
      console.log(err);
    }
    setIsChapterStatus({
      loading: false,
      disabled: false,
    });
  };

  useEffect(() => {
    if (isCalenderScreen) {
      if (calenderPickedDate) {
        setSelectedDate(calenderPickedDate);
      }
      if (calenderPickedTime) {
        setClassTiming(calenderPickedTime);
      }
    }
  }, [calenderPickedDate, calenderPickedTime]);

  useEffect(() => {
    if (selectedDate) {
      setScheduleClassFormData((prev) => ({
        ...prev,
        scheduledDate: selectedDate,
      }));
    }
    if (classTiming && classTiming[0]) {
      setScheduleClassFormData((prev) => ({
        ...prev,
        scheduledStartTime: classTiming[0],
      }));
    }
  }, [selectedDate, classTiming]);

  const fetchLectureNo = async (data) => {
    try {
      const response = await getLectureNo(data);
      const { data: lectureNo } = response.data;

      setLectureNo(+lectureNo + 1);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (
      selectedClassType &&
      selectedClassLevel &&
      selectedChapter &&
      selectedChapter &&
      selectedTopic
    ) {
      const data = {
        subjectName: scheduleClassFormData["subject"].label,
        classType: scheduleClassFormData["classType"].value,
        classLevel: scheduleClassFormData["classLevel"].value,
        chapterName: scheduleClassFormData["chapter"].label,
        topicName: scheduleClassFormData["topic"].label,
      };
      fetchLectureNo(data);
    }
  }, [
    selectedClassType,
    selectedClassLevel,
    selectedChapter,
    selectedChapter,
    selectedTopic,
  ]);

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
                      name={"subject"}
                      onChange={handleSelectChange}
                      chakraStyles={chakraStyles}
                      options={[
                        {
                          value: "3",
                          label: "CHEMISTRY",
                        },
                        {
                          value: "2",
                          label: "MATHEMATICS",
                        },
                        {
                          value: "1",
                          label: "PHYSICS",
                        },
                      ]}
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
                      value={selectedDate}
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
                <FormControl
                  isInvalid={scheduleClassFormErrorData["classLevel"]}
                >
                  <Select
                    placeholder={
                      scheduleClassData.scheduleClassFormPlaceholder
                        .selectClassLevel
                    }
                    onChange={handleSelectChange}
                    isDisabled={false}
                    name="classLevel"
                    value={selectedClassLevel}
                    chakraStyles={chakraStyles}
                    options={[
                      {
                        value: "Class_11",
                        label: "Class_11",
                      },
                      {
                        value: "Class_12",
                        label: "Class_12",
                      },
                      {
                        value: "Foundation_Olympiad",
                        label: "Foundation_Olympiad",
                      },
                    ]}
                    useBasicStyles
                  />
                  {scheduleClassFormErrorData["classLevel"] && (
                    <FormErrorMessage>
                      {scheduleClassFormErrorData["classLevel"]}
                    </FormErrorMessage>
                  )}
                </FormControl>
              </Box>
              <Box my={3}>
                <FormControl isInvalid={scheduleClassFormErrorData["chapter"]}>
                  <Select
                    placeholder={
                      scheduleClassData.scheduleClassFormPlaceholder
                        .selectChapter
                    }
                    isLoading={isChapterStatus.loading}
                    isDisabled={isChapterStatus.disabled}
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
                    isDisabled={isTopicStatus.disabled}
                    isLoading={isTopicStatus.loading}
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
                <FormControl
                  isInvalid={scheduleClassFormErrorData["classType"]}
                >
                  <Select
                    placeholder={
                      scheduleClassData.scheduleClassFormPlaceholder
                        .selectClassType
                    }
                    onChange={handleSelectChange}
                    isDisabled={false}
                    isLoading={isTopicStatus.loading}
                    value={selectedClassType}
                    name="classType"
                    chakraStyles={chakraStyles}
                    options={[
                      {
                        value: "CRASHCOURSE",
                        label: "Crash Course",
                      },
                      {
                        value: "REGULARCLASS",
                        label: "Regular Classes",
                      },
                    ]}
                    useBasicStyles
                  />
                  {scheduleClassFormErrorData["classType"] && (
                    <FormErrorMessage>
                      {scheduleClassFormErrorData["classType"]}
                    </FormErrorMessage>
                  )}
                </FormControl>
              </Box>
              <Box my={3}>
                <FormControl
                  isInvalid={scheduleClassFormErrorData["lectureNo"]}
                >
                  <Input
                    name={"lectureNo"}
                    onChange={handleInputChange}
                    value={lectureNo != null ? `Lecture ${lectureNo}` : ""}
                    disabled={true}
                    type="text"
                    placeholder={
                      scheduleClassData.scheduleClassFormPlaceholder.lectureNo
                    }
                  />
                  {scheduleClassFormErrorData["lectureNo"] && (
                    <FormErrorMessage>Please enter a lecture</FormErrorMessage>
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
                    <FormErrorMessage>Please enter an agenda</FormErrorMessage>
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
                      Please enter a description
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
