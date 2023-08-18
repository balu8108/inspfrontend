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
} from "@chakra-ui/react";
import { Select } from "chakra-react-select";
import TimeRangePicker from "@wojtekmaj/react-timerange-picker";

import "@wojtekmaj/react-timerange-picker/dist/TimeRangePicker.css";
import "react-clock/dist/Clock.css";
import { scheduleClassData } from "../../pages/ScheduleClasses/data/scheduleClassData";
import { InlineBtn, MainBtn } from "../button";
import { openFileDialog } from "../../utils";
import SimpleBar from "simplebar-react";
import { useDispatch } from "react-redux";
import { setAddClassSchedule } from "../../store/actions/scheduleClassActions";

const options = [
  { value: "Physics", label: "Physics" },
  { value: "Chemistry", label: "Chemistry" },
  { value: "Maths", label: "Maths" },
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
  const [scheduleClassFormData, setScheduleClassFormData] = useState({});
  const [date, setDate] = useState(selectedDate);
  const [timeRange, setTimeRange] = useState(classTiming);
  const [selectedFiles, setSelectedFiles] = useState(null); // for file upload
  const [isSubmitLoading, setIsSubmitLoading] = useState(false);
  const dispatch = useDispatch();
  console.log("scheduleClassFormData", scheduleClassFormData);
  const chakraStyles = {
    control: (provided, state) => ({
      ...provided,
      paddingBlock: "8px",
    }),
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setScheduleClassFormData((prev) => ({ ...prev, [name]: value }));
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
    setScheduleClassFormData((prev) => ({ ...prev, date: e.target.value }));
  };
  const handleTimeChange = (value) => {
    setTimeRange(value);
    setScheduleClassFormData((prev) => ({
      ...prev,
      startTime: value[0],
      endTime: value[1],
    }));
  };
  const handleSubmit = () => {
    setIsSubmitLoading(true);
    // attach date and time range if not attached
    dispatch(setAddClassSchedule(scheduleClassFormData));
    setScheduleClassFormData({});
    onClose();

    setIsSubmitLoading(false);
  };

  useEffect(() => {
    if (selectedDate) {
      setScheduleClassFormData((prev) => ({ ...prev, date: date }));
    }
    if (classTiming && classTiming[0]) {
      setScheduleClassFormData((prev) => ({
        ...prev,
        startTime: classTiming[0],
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
                  >
                    <Input
                      type="date"
                      value={date}
                      py={6}
                      onChange={handleDateChange}
                    />
                    <TimeRangePicker
                      clearIcon={null}
                      value={timeRange}
                      disableClock={false}
                      onChange={(value) => handleTimeChange(value)}
                      style={{ borderRadius: "50px" }}
                    />
                  </Grid>
                </Box>
                <Box my={3}>
                  <Input
                    type="text"
                    name="topic"
                    onChange={handleInputChange}
                    py={6}
                    placeholder={
                      scheduleClassData.scheduleClassFormPlaceholder.topic
                    }
                  />
                </Box>
                <Box my={3}>
                  <Textarea
                    name={"agenda"}
                    onChange={handleInputChange}
                    resize={"none"}
                    placeholder={
                      scheduleClassData.scheduleClassFormPlaceholder.agenda
                    }
                  />
                </Box>

                <Box my={3}>
                  <Textarea
                    name="description"
                    onChange={handleInputChange}
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
                    cursor={"pointer"}
                    onClick={handleFileUpload}
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
