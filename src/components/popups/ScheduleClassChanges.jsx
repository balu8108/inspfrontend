import { useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useTheme,
  Box,
  Input,
  Flex,
  Grid,
  Text,
  FormControl,
  FormErrorMessage,
} from "@chakra-ui/react";
import { useDispatch } from "react-redux";
import TimePicker from "react-time-picker-input";
import { scheduleClassData } from "../../pages/ScheduleClasses/data/scheduleClassData";
import { InlineBtn } from "../button";
import { setLiveClassScheduledApi } from "../../api/scheduleliveclass";
import { setClassChanges } from "../../store/actions/genericActions";
import { useToastContext } from "../toastNotificationProvider/ToastNotificationProvider";
import "./timepickerdefaultstyles.css";

// At the moment we will add some dummy data for chapter, topic
const ScheduleClassChanges = ({ isOpen, onClose, scheduleData }) => {
  const { addNotification } = useToastContext();
  const dispatch = useDispatch();
  const { extraTextLight, primaryBlue, primaryBlueLight } =
    useTheme().colors.pallete;
  const [scheduleClassFormErrorData, setScheduleClassFormErrorData] = useState(
    {}
  ); // for error handling
  const [date, setDate] = useState(scheduleData.date);
  const [startTime, setStartTime] = useState(scheduleData.startTime);
  const [endTime, setEndTime] = useState(scheduleData.endTime);

  const [isSubmitLoading, setIsSubmitLoading] = useState(false);

  const handleDateChange = (e) => {
    setDate(e.target.value);
    setScheduleClassFormErrorData((prev) => ({ ...prev, scheduledDate: "" }));
  };

  const handleStartTimeChange = (value) => {
    setStartTime(value);
    setScheduleClassFormErrorData((prev) => ({
      ...prev,
      scheduledStartTime: "",
    }));
  };
  const handleEndTimeChange = (value) => {
    setEndTime(value);
    setScheduleClassFormErrorData((prev) => ({
      ...prev,
      scheduledEndTime: "",
    }));
  };
  const handleSubmit = async () => {
    setIsSubmitLoading(true);
    const data = {
      classId: scheduleData?.classId,
      scheduledDate: date,
      scheduledStartTime: startTime,
      scheduledEndTime: endTime,
    };
    try {
      const response = await setLiveClassScheduledApi(data);
      if (response?.status === 200) {
        addNotification("Class Schduled Change", "info", 5000);
        dispatch(setClassChanges());
      }
    } catch (err) {
      console.log("err", err);
    }
    onClose();
    setIsSubmitLoading(false);
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
          {scheduleClassData.changeClassSchedule}
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl>
            <Box>
              <Box mb={6}>
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
            </Box>
          </FormControl>
        </ModalBody>

        <ModalFooter>
          <Flex w={"full"} justifyContent={"center"}>
            <InlineBtn
              isLoading={isSubmitLoading}
              text={scheduleClassData.changeSchedule}
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

export default ScheduleClassChanges;
