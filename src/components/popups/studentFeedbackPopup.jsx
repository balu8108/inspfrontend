import {
  Button,
  Stack,
  Box,
  AlertDialog,
  AlertDialogContent,
  AlertDialogOverlay,
  AlertDialogBody,
  Text,
  Textarea,
  useTheme,
  Center,
  Flex,
  FormControl,
  FormErrorMessage,
} from "@chakra-ui/react";
import { useState } from "react";
import { useToastContext } from "../toastNotificationProvider/ToastNotificationProvider";
import { useSelector, useDispatch } from "react-redux";
import { createStudentFeedback } from "../../api/studentfeedback";
import { RxCross2 } from "react-icons/rx";
import { setStudentFeedbackClose } from "../../store/actions/studentFeedbackActions";
import { getStorageData } from "../../utils";

const StudentFeedBackPopup = ({ isOpen, onClose }) => {
  const [feedback, setFeedback] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorData, setErrorData] = useState({});
  const { primaryBlue } = useTheme().colors.pallete;
  const { addNotification } = useToastContext();

  const dispatch = useDispatch();

  const checkErrors = () => {
    const errors = {};
    if (feedback.trim().length === 0) {
      errors.feedback = "Feedback required";
    }
    if (Object.keys(errors).length > 0) {
      setErrorData(errors);
      return true;
    }

    return false;
  };

  const handleFeedbackSubmit = async () => {
    const { data } = getStorageData("insp_user_profile");

    setIsLoading(true);
    const isError = checkErrors();
    if (isError) {
      setIsLoading(false);
      return;
    }
    const body = {
      studentName: data.name,
      studentEmail: data.email,
      feedback: feedback,
    };
    try {
      const res = await createStudentFeedback(body);
      if (res.status === 200) {
        addNotification("Feedback recorded successfully", "success", 3000);
      }
      setFeedback("");
    } catch (err) {
      addNotification("Something went wrong", "error", 3000);
    }
    setIsLoading(false);
    dispatch(setStudentFeedbackClose(false, null));
  };

  const handleClose = () => {
    setFeedback("");
    setErrorData({});
    dispatch(setStudentFeedbackClose(false, null));
  };

  return (
    <AlertDialog
      motionPreset="slideInBottom"
      onClose={onClose}
      isOpen={isOpen}
      size="md"
      isCentered
    >
      <AlertDialogOverlay />

      <AlertDialogContent>
        <AlertDialogBody py={4}>
          <Stack>
            <Box mb={4}>
              <Flex justifyContent={"space-between"} alignItems={"center"}>
                <Text fontSize={"18px"} fontWeight={500}>
                  Feedback
                </Text>
                <Button type="button" variant={"ghost"} onClick={handleClose}>
                  <RxCross2 />
                </Button>
              </Flex>
              <FormControl isInvalid={!!errorData.feedback}>
                <Textarea
                  mt={4}
                  value={feedback}
                  onChange={(e) => {
                    setFeedback(e.target.value);
                    setErrorData((prev) => ({ ...prev, feedback: "" }));
                  }}
                  placeholder="Feedback"
                  size="sm"
                  resize="none"
                  minH={"6rem"}
                />
                <FormErrorMessage>{errorData.feedback}</FormErrorMessage>
              </FormControl>
            </Box>
            <Button
              w={"full"}
              isLoading={isLoading}
              bg={primaryBlue}
              color={"white"}
              fontWeight={"500"}
              py={6}
              fontSize={"1rem"}
              _hover={{ bg: primaryBlue }}
              onClick={handleFeedbackSubmit}
            >
              Submit
            </Button>
          </Stack>
        </AlertDialogBody>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default StudentFeedBackPopup;
