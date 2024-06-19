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
import {
  setAddClassSchedule,
  setUpdateClassSchedule,
} from "../../store/actions/scheduleClassActions";
import {
  fetchAllChaptersApi,
  fetchAllTopicsApi,
} from "../../api/inspexternalapis";
import { getLectureNo } from "../../api/lecture";
import "./timepickerdefaultstyles.css";

const dataKey = [
  "subject",
  "topic",
  "chapter",
  "classType",
  "classLevel",
  "scheduledDate",
  "scheduledStartTime",
  "scheduledEndTime",
  "agenda",
  "lectureNo",
  "description",
];

const classLevel = [
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
];

const checkIsValid = (obj) => {
  const result =
    obj === null ||
    typeof obj === "object" ||
    typeof obj === "string" ||
    typeof obj === "number"
      ? true
      : false;
  return result;
};

const ScheduleClassPopup = ({
  isOpen,
  onClose,
  isCalenderScreen,
  isEditScreen,
  scheduleData,
}) => {
  const { calenderPickedDate, calenderPickedTime } = useSelector(
    (state) => state.generic
  );
  const { extraTextLight, primaryBlue, primaryBlueLight } =
    useTheme().colors.pallete;

  const [formDataValue, setFormDataValue] = useState({});
  const [scheduleClassFormErrorData, setScheduleClassFormErrorData] = useState(
    {}
  ); // for error handling
  const [chaptersData, setChaptersData] = useState([]); // chapter
  const [topicsData, setTopicsData] = useState([]); // topic
  const [isFirstRender, setIsFirstRender] = useState(true);

  const [selectedFiles, setSelectedFiles] = useState(null); // for file upload
  const [isSubmitLoading, setIsSubmitLoading] = useState(false);
  const dispatch = useDispatch();

  const chakraStyles = {
    control: (provided) => ({
      ...provided,
      paddingBlock: "8px",
    }),
  };
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
    const updateFormDataValue = (updatedValues) => {
      setFormDataValue({
        ...formDataValue,
        ...updatedValues,
      });
    };

    const handlers = {
      description: () => updateFormDataValue({ description: object }),
      agenda: () => updateFormDataValue({ agenda: object }),
      subject: () => {
        if (object?.label === "PHYSICS") {
          // On selecting physics get all chapters
          updateFormDataValue({ subject: object });
        } else {
          updateFormDataValue({
            subject: object,
            chapter: null,
            topic: null,
            classLevel: null,
            classType: null,
          });
        }
      },
      chapter: () => {
        updateFormDataValue({ chapter: object });
        fetchAllTopics(object.value);
      },
      topic: () => updateFormDataValue({ topic: object }),
      classType: () => {
        updateFormDataValue({ classType: object });
      },
      classLevel: () => {
        updateFormDataValue({ classLevel: object });
      },
      scheduledStartTime: () =>
        updateFormDataValue({ scheduledStartTime: object }),
      scheduledEndTime: () => updateFormDataValue({ scheduledEndTime: object }),
      scheduledDate: () => updateFormDataValue({ scheduledDate: object }),
      muteAllStudents: () => updateFormDataValue({ muteAllStudents: object }),
    };

    if (handlers[event.name]) {
      handlers[event.name]();
    }

    setScheduleClassFormErrorData((prev) => ({ ...prev, [event.name]: "" }));
  };
  const handleSubmit = async () => {
    setIsSubmitLoading(true);
    // check if all fields are filled
    let errors = {};

    dataKey.forEach((key) => {
      const isMissingKey = !(key in formDataValue);
      const isEmptyValue =
        formDataValue[key] === "" || formDataValue[key] === null;
      const isInvalidTimeFormat =
        (key === "scheduledStartTime" || key === "scheduledEndTime") &&
        !isValidTimeFormat(formDataValue[key]);
      if (isMissingKey || isEmptyValue || isInvalidTimeFormat) {
        errors[key] = `Please select a ${key}`;
      }
    });

    if (Object.keys(errors).length > 0) {
      setScheduleClassFormErrorData(errors);
      setIsSubmitLoading(false);
      return;
    }

    let formData = new FormData();
    for (const key in selectedFiles) {
      if (
        selectedFiles.hasOwnProperty(key) &&
        selectedFiles[key] instanceof File
      ) {
        formData.append("files", selectedFiles[key]);
      }
    }

    formData.append("classId", scheduleData?.id);
    formData.append("subject", JSON.stringify(formDataValue?.subject));
    formData.append("topic", JSON.stringify(formDataValue?.topic));
    formData.append("chapter", JSON.stringify(formDataValue?.chapter));
    formData.append("classType", formDataValue?.classType?.value);
    formData.append("classLevel", formDataValue?.classLevel?.value);
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

    try {
      if (isEditScreen) {
        await dispatch(setUpdateClassSchedule(formData));
      } else {
        await dispatch(setAddClassSchedule(formData));
      }
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
    if (isEditScreen) {
      setFormDataValue({
        subject: {
          value: scheduleData?.subjectId,
          label: scheduleData?.subjectName,
        },
        chapter: {
          value: scheduleData?.LiveClassRoomDetail?.chapterId,
          label: scheduleData?.LiveClassRoomDetail?.chapterName,
        },
        scheduledDate: scheduleData?.scheduledDate.split("T")[0],
        topic: {
          value: scheduleData?.LiveClassRoomDetail?.topicId,
          label: scheduleData?.LiveClassRoomDetail?.topicName,
        },
        classType: {
          label: scheduleData?.classType,
          value: scheduleData?.classType,
        },
        classLevel: {
          label: classLevel.find(
            (value) => value.value === scheduleData?.classLevel
          )?.label,
          value: scheduleData?.classLevel,
        },
        agenda: scheduleData?.LiveClassRoomDetail?.agenda,
        description: scheduleData?.LiveClassRoomDetail?.description,
        lectureNo: scheduleData?.LiveClassRoomDetail?.lectureNo,
        scheduledStartTime: scheduleData?.scheduledStartTime.slice(0, 5),
        scheduledEndTime: scheduleData?.scheduledEndTime.slice(0, 5),
        muteAllStudents: scheduleData?.muteAllStudents,
        blockStudentsCamera: scheduleData?.blockStudentsCamera,
      });
    } else {
      setFormDataValue({
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
    }
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

  useEffect(() => {
    if (
      formDataValue?.subject !== null &&
      formDataValue?.classType !== null &&
      formDataValue?.classLevel !== null
    ) {
      if (!isFirstRender) {
        const data = {
          subjectName: formDataValue?.subject?.label,
          classType: formDataValue?.classType?.value,
          classLevel: formDataValue?.classLevel?.value,
          isSoloClass: false,
        };
        fetchLectureNo(data);
      }
      setIsFirstRender(false);
    }
  }, [
    formDataValue?.subject,
    formDataValue?.classType,
    formDataValue?.classLevel,
  ]);

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
  return (
    <Modal isOpen={isOpen} onClose={onClose} size={"xl"}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader
          fontWeight={500}
          fontSize={"1.2rem"}
          color={extraTextLight}
        >
          {isEditScreen
            ? `Update ${scheduleClassData.scheduleClassTitle}`
            : scheduleClassData.scheduleClassTitle}
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl>
            <Box>
              <Box mb={6}>
                <Box mb={3}>
                  {checkIsValid(formDataValue?.subject) && (
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
                        value={formDataValue?.subject}
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
                  )}
                </Box>
                <Grid
                  templateColumns={"repeat(2,1fr)"}
                  gap={2}
                  justifyContent={"space-between"}
                  alignItems={"start"}
                >
                  {checkIsValid(formDataValue?.scheduledDate) && (
                    <FormControl
                      isInvalid={scheduleClassFormErrorData["scheduledDate"]}
                    >
                      <Input
                        type="date"
                        value={formDataValue?.scheduledDate}
                        py={6}
                        onChange={(e) =>
                          handleSelectChange(e.target.value, {
                            name: "scheduledDate",
                          })
                        }
                      />
                      {scheduleClassFormErrorData["scheduledDate"] && (
                        <FormErrorMessage>
                          Please select a date
                        </FormErrorMessage>
                      )}
                    </FormControl>
                  )}
                  <Box>
                    <Flex alignItems={"center"} gap={1}>
                      {checkIsValid(formDataValue?.scheduledStartTime) && (
                        <Box
                          position={"relative"}
                          className={`schedule-start-time ${
                            scheduleClassFormErrorData["scheduledStartTime"]
                              ? "invalid"
                              : ""
                          }`}
                        >
                          <TimePicker
                            onChange={(value) =>
                              handleSelectChange(value, {
                                name: "scheduledStartTime",
                              })
                            }
                            value={formDataValue?.scheduledStartTime}
                            eachInputDropdown={true}
                            manuallyDisplayDropdown
                            hour12Format={true}
                          />
                        </Box>
                      )}
                      <Text>to</Text>
                      {checkIsValid(formDataValue?.scheduledEndTime) && (
                        <Box
                          className={`schedule-end-time ${
                            scheduleClassFormErrorData["scheduledEndTime"]
                              ? "invalid"
                              : ""
                          }`}
                        >
                          <TimePicker
                            onChange={(value) =>
                              handleSelectChange(value, {
                                name: "scheduledEndTime",
                              })
                            }
                            value={formDataValue?.scheduledEndTime}
                            eachInputDropdown={true}
                            manuallyDisplayDropdown
                            hour12Format={true}
                          />
                        </Box>
                      )}
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
                {checkIsValid(formDataValue?.classLevel) && (
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
                      options={classLevel}
                      useBasicStyles
                    />
                    {scheduleClassFormErrorData["classLevel"] && (
                      <FormErrorMessage>
                        {scheduleClassFormErrorData["classLevel"]}
                      </FormErrorMessage>
                    )}
                  </FormControl>
                )}
              </Box>
              <Box my={3}>
                {checkIsValid(formDataValue?.chapter) && (
                  <FormControl
                    isInvalid={scheduleClassFormErrorData["chapter"]}
                  >
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
                )}
              </Box>
              <Box my={3}>
                {checkIsValid(formDataValue?.topic) && (
                  <FormControl isInvalid={scheduleClassFormErrorData["topic"]}>
                    <Select
                      placeholder={
                        scheduleClassData.scheduleClassFormPlaceholder
                          .selectTopic
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
                )}
              </Box>
              <Box my={3}>
                {checkIsValid(formDataValue?.classType) && (
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
                )}
              </Box>
              <Box my={3}>
                {checkIsValid(formDataValue?.lectureNo) && (
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
                      <FormErrorMessage>
                        Please enter a lecture
                      </FormErrorMessage>
                    )}
                  </FormControl>
                )}
              </Box>
              <Box my={3}>
                {checkIsValid(formDataValue?.agenda) && (
                  <FormControl isInvalid={scheduleClassFormErrorData["agenda"]}>
                    <Textarea
                      name={"agenda"}
                      onChange={(e) =>
                        handleSelectChange(e.target.value, { name: "agenda" })
                      }
                      resize={"none"}
                      value={formDataValue?.agenda}
                      placeholder={
                        scheduleClassData.scheduleClassFormPlaceholder.agenda
                      }
                    />
                    {scheduleClassFormErrorData["agenda"] && (
                      <FormErrorMessage>
                        Please enter an agenda
                      </FormErrorMessage>
                    )}
                  </FormControl>
                )}
              </Box>

              <Box my={3}>
                {checkIsValid(formDataValue?.description) && (
                  <FormControl
                    isInvalid={scheduleClassFormErrorData["description"]}
                  >
                    <Textarea
                      name="description"
                      onChange={(e) =>
                        handleSelectChange(e.target.value, {
                          name: "description",
                        })
                      }
                      resize={"none"}
                      value={formDataValue?.description}
                      placeholder={
                        scheduleClassData.scheduleClassFormPlaceholder
                          .description
                      }
                    />
                    {scheduleClassFormErrorData["description"] && (
                      <FormErrorMessage>
                        Please enter a description
                      </FormErrorMessage>
                    )}
                  </FormControl>
                )}
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
                    disabled={isEditScreen}
                    value={formDataValue?.muteAllStudents}
                    onChange={(e) =>
                      handleSelectChange(e.target.checked, {
                        name: "muteAllStudents",
                      })
                    }
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
            {isEditScreen ? (
              <InlineBtn
                isLoading={isSubmitLoading}
                text={"Update class"}
                backColor={primaryBlue}
                textColor="white"
                onClickHandler={handleSubmit}
                hoverColor={primaryBlueLight}
              />
            ) : (
              <InlineBtn
                isLoading={isSubmitLoading}
                text={scheduleClassData.scheduleClassTitle}
                backColor={primaryBlue}
                textColor="white"
                onClickHandler={handleSubmit}
                hoverColor={primaryBlueLight}
              />
            )}
          </Flex>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ScheduleClassPopup;
