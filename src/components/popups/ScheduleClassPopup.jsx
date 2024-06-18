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
import { openFileDialog } from "../../utils";

import { useDispatch, useSelector } from "react-redux";
import { setAddClassSchedule } from "../../store/actions/scheduleClassActions";
import {
  fetchAllChaptersApi,
  fetchAllTopicsApi,
} from "../../api/inspexternalapis";
import { getLectureNo } from "../../api/lecture";
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

  const [formDataValue, setFormDataValue] = useState({
    subject: null,
    chapter: null,
    scheduledDate: "",
    topic: null,
    classType: null,
    classLevel: null,
    agenda: "",
    description: "",
    lectureNo: "",
    scheduledStartTime: "--:--",
    scheduledEndTime: "--:--",
    muteAllStudents: false,
    blockStudentsCamera: false,
  });
  const [scheduleClassFormErrorData, setScheduleClassFormErrorData] = useState(
    {}
  ); // for error handling
  const [chaptersData, setChaptersData] = useState([]); // chapter
  const [topicsData, setTopicsData] = useState([]); // topic

  const [chapter, setChapter] = useState(null); // topic

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
    if (name === "description") {
      setFormDataValue({
        ...formDataValue,
        description: value,
      });
    }
    if (name === "agenda") {
      setFormDataValue({
        ...formDataValue,
        agenda: value,
      });
    }
    setScheduleClassFormErrorData((prev) => ({ ...prev, [name]: "" }));
  };
  console.log(formDataValue);

  const handleFileUpload = async () => {
    const files = await openFileDialog();
    setSelectedFiles(files);
  };

  const fetchAllTopics = async (chapter_id) => {
    try {
      const response = await fetchAllTopicsApi(chapter_id);
      if (response.status) {
        setTopicsData(response.result);
      }
    } catch (err) {}
  };
  const handleSelectChange = (object, event) => {
    if (event.name === "subject") {
      if (object?.label === "PHYSICS") {
        // On selecting physics get all chpters
        setFormDataValue({
          ...formDataValue,
          subject: object,
        });
      } else {
        setFormDataValue({
          ...formDataValue,
          chapter: null,
          topic: null,
          classLevel: null,
          classType: null,
        });
      }
    } else if (event.name === "chapter") {
      setChapter(object);
      setFormDataValue({
        ...formDataValue,
        chapter: object,
      });
      fetchAllTopics(object.value);
    } else if (event.name === "topic") {
      setFormDataValue({
        ...formDataValue,
        topic: object,
      });
    } else if (event.name === "classType") {
      setFormDataValue({
        ...formDataValue,
        classType: object,
      });
    } else if (event.name === "classLevel") {
      setFormDataValue({
        ...formDataValue,
        classLevel: object,
      });
    }
    setScheduleClassFormErrorData((prev) => ({ ...prev, [event.name]: "" }));
  };

  const handleDateChange = (e) => {
    setFormDataValue({
      ...formDataValue,
      scheduledDate: e.target.value,
    });
    setScheduleClassFormErrorData((prev) => ({ ...prev, scheduledDate: "" }));
  };

  const handleStartTimeChange = (value) => {
    setFormDataValue({
      ...formDataValue,
      scheduledStartTime: value,
    });
    setScheduleClassFormErrorData((prev) => ({
      ...prev,
      scheduledStartTime: "",
    }));
  };
  const handleEndTimeChange = (value) => {
    setFormDataValue({
      ...formDataValue,
      scheduledEndTime: value,
    });
    setScheduleClassFormErrorData((prev) => ({
      ...prev,
      scheduledEndTime: "",
    }));
  };
  const handleCheckBoxChange = (e) => {
    setFormDataValue({
      ...formDataValue,
      muteAllStudents: e.target.checked,
    });
  };
  console.log(typeof formDataValue?.subject);
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

    console.log(JSON.stringify(formDataValue?.subject));
    formData.append("subject", formDataValue?.subject);
    formData.append("chapter", JSON.stringify(chapter));
    formData.append("topic", formDataValue?.topic);
    formData.append("classType", formDataValue?.classType);
    formData.append("classLevel", formDataValue?.classLevel);
    formData.append("scheduledDate", formDataValue?.scheduledDate);
    formData.append("scheduledStartTime", formDataValue?.scheduledStartTime);
    formData.append("scheduledEndTime", formDataValue?.scheduledEndTime);
    formData.append("agenda", formDataValue?.agenda);
    formData.append("lectureNo", formDataValue?.lectureNo);
    formData.append("description", formDataValue?.description);
    formData.append("muteAllStudents", formDataValue?.muteAllStudents || false);
    formData.append(
      "blockStudentsCamera",
      formDataValue?.blockStudentsCamera || false
    );

    // dataKey.forEach((key) => {
    //   const isMissingKey = !(key in scheduleClassFormData);
    //   const isEmptyValue =
    //     scheduleClassFormData[key] === "" ||
    //     scheduleClassFormData[key] === null;
    //   const isInvalidTimeFormat =
    //     (key === "scheduledStartTime" || key === "scheduledEndTime") &&
    //     !isValidTimeFormat(scheduleClassFormData[key]);

    //   if (isMissingKey || isEmptyValue || isInvalidTimeFormat) {
    //     errors[key] = `Please select a ${key}`;
    //   }
    // });

    if (Object.keys(errors).length > 0) {
      setScheduleClassFormErrorData(errors);
      setIsSubmitLoading(false);
      return;
    }
    try {
      console.log("FF", formData);
      await dispatch(setAddClassSchedule(formDataValue));
    } catch (err) {
      console.log("err", err);
    }
    onClose();
    setIsSubmitLoading(false);
  };

  const getChaptersByFetch = async () => {
    try {
      const response = await fetchAllChaptersApi();
      if (response.status) {
        setChaptersData(response.result);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getChaptersByFetch();
  }, []);

  useEffect(() => {
    if (isCalenderScreen) {
      if (calenderPickedDate) {
        setFormDataValue({
          ...formDataValue,
          scheduledDate: calenderPickedDate,
        });
      }
      if (calenderPickedTime) {
        setFormDataValue({
          ...formDataValue,
          scheduledStartTime: calenderPickedTime,
        });
      }
    }
  }, [calenderPickedDate, calenderPickedTime]);

  const fetchLectureNo = async (data) => {
    try {
      const response = await getLectureNo(data);
      const { data: lectureNo } = response.data;
      setFormDataValue({
        ...formDataValue,
        lectureNo: lectureNo + 1,
      });
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (
      formDataValue?.subject !== null &&
      formDataValue?.classType !== null &&
      formDataValue?.classLevel !== null &&
      formDataValue?.chapter !== null &&
      formDataValue?.topic !== null
    ) {
      const data = {
        subjectName: formDataValue?.subject?.label,
        classType: formDataValue?.classType?.value,
        classLevel: formDataValue?.classLevel?.value,
        chapterName: formDataValue?.chapter?.label,
        topicName: formDataValue?.topic?.label,
        isSoloClass: false,
      };
      fetchLectureNo(data);
    }
  }, [
    formDataValue?.subject,
    formDataValue?.classType,
    formDataValue?.classLevel,
    formDataValue?.chapter,
    formDataValue?.topic,
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
                      value={formDataValue?.scheduledDate}
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
                          value={formDataValue?.scheduledStartTime}
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
                          value={formDataValue?.scheduledEndTime}
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
                    value={formDataValue?.classLevel}
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
                    isDisabled={formDataValue?.subject === null}
                    onChange={handleSelectChange}
                    name="chapter"
                    value={formDataValue?.chapter}
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
                    isDisabled={formDataValue?.chapter === null}
                    value={formDataValue?.topic}
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
                    isDisabled={formDataValue?.subject === null}
                    value={formDataValue?.classType}
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
                    value={
                      formDataValue?.lectureNo != null
                        ? `Lecture ${formDataValue?.lectureNo}`
                        : ""
                    }
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
