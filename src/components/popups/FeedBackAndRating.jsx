import {
  Button,
  Stack,
  Box,
  AlertDialog,
  AlertDialogContent,
  AlertDialogOverlay,
  AlertDialogCloseButton,
  AlertDialogBody,
  AlertDialogHeader,
  AlertDialogFooter,
  Text,
  Textarea,
  useTheme,
  Center,
} from "@chakra-ui/react";
import { useState } from "react";
import StarRatings from "react-star-ratings";

const FeedBackAndRating = ({ onClose }) => {
  const [rating, setRating] = useState(0);
  const { primaryBlue } = useTheme().colors.pallete;
  return (
    <>
      <AlertDialog
        motionPreset="slideInBottom"
        onClose={onClose}
        isOpen={true}
        size="xs"
        isCentered
      >
        <AlertDialogOverlay />

        <AlertDialogContent>
          <AlertDialogBody py={4}>
            <Stack>
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
                    changeRating={(rating) => setRating(rating)}
                  />
                </Center>
              </Box>
              <Box mb={4}>
                <Text fontSize={"18px"} fontWeight={500}>
                  Feedback
                </Text>
                <Textarea
                  mt={4}
                  placeholder="Feedback"
                  size="sm"
                  resize="none"
                  minH={"6rem"}
                />
              </Box>
              <Button
                w={"full"}
                bg={primaryBlue}
                color={"white"}
                fontWeight={"500"}
                py={6}
                fontSize={"1rem"}
                _hover={{ bg: primaryBlue }}
                onClick={() => {}}
              >
                Submit
              </Button>
            </Stack>
          </AlertDialogBody>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default FeedBackAndRating;
