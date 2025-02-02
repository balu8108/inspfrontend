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
  FormControl,
  FormErrorMessage,
} from "@chakra-ui/react";
import { useState } from "react";
import StarRatings from "react-star-ratings";
import { useToastContext } from "../toastNotificationProvider/ToastNotificationProvider";
import { createFeedbackApi } from "../../api/genericapis";
import { useSelector, useDispatch } from "react-redux";
import { setFeedbackModalOpen } from "../../store/actions/genericActions";

const FeedBackAndRating = ({ isOpen, onClose }) => {
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorData, setErrorData] = useState({});
  const { primaryBlue } = useTheme().colors.pallete;
  const { addNotification } = useToastContext();
  const { feedbackTopicId } = useSelector((state) => state.generic);

  const dispatch = useDispatch();

  const checkErrors = () => {
    const errors = {};
    if (rating === 0) {
      errors.rating = "Rating required";
    }

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
    setIsLoading(true);
    const isError = checkErrors();
    if (isError) {
      setIsLoading(false);
      return;
    }
    const data = { topicId: feedbackTopicId, rating, feedback };
    try {
      const res = await createFeedbackApi(data);
      if (res.status === 200) {
        addNotification("Feedback recorded successfully", "success", 3000);
      }
    } catch (err) {
      addNotification("Something went wrong", "error", 3000);
    }
    setIsLoading(false);
    dispatch(setFeedbackModalOpen(false, null));
  };
  return (
    <AlertDialog
      motionPreset="slideInBottom"
      onClose={onClose}
      isOpen={isOpen}
      size="xs"
      isCentered
    >
      <AlertDialogOverlay />

      <AlertDialogContent>
        <AlertDialogBody py={4}>
          <Stack>
            <FormControl isInvalid={!!errorData.rating}>
              <Box mb={4}>
                <Text fontSize={"18px"} fontWeight={500}>
                  Rating
                </Text>

                <Center mt={4}>
                  <StarRatings
                    rating={rating}
                    starDimension="2rem"
                    starRatedColor="rgba(255, 179, 0, 1)"
                    numberOfStars={5}
                    starHoverColor={"rgba(255, 179, 0, 1)"}
                    changeRating={(rating) => {
                      setRating(rating);
                      setErrorData((prev) => ({ ...prev, rating: 0 }));
                    }}
                  />
                </Center>
              </Box>
              <FormErrorMessage>{errorData.rating}</FormErrorMessage>
            </FormControl>
            <Box mb={4}>
              <Text fontSize={"18px"} fontWeight={500}>
                Feedback
              </Text>
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

export default FeedBackAndRating;
