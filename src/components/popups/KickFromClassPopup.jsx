import {
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogCloseButton,
  AlertDialogHeader,
  AlertDialogBody,
  Button,
  Flex,
  useTheme,
} from "@chakra-ui/react";
import React, { useRef } from "react";
import { kickOutFromClass } from "../../socketconnections/socketconnections";

const KickFromClassPopup = ({ isOpen, onClose, kickedPersonDetails }) => {
  const cancelRef = useRef();
  const { primaryBlue, primaryBlueLight } = useTheme().colors.pallete;

  const handleKickFromClass = () => {
    try {
      kickOutFromClass(kickedPersonDetails?.socketId, kickedPersonDetails?.id);
    } catch (err) {
      console.log("error in kicking from class", err);
    }
    onClose();
  };
  return (
    <AlertDialog
      motionPreset="slideInBottom"
      leastDestructiveRef={cancelRef}
      onClose={onClose}
      isOpen={isOpen}
      size={"sm"}
      isCentered
    >
      <AlertDialogOverlay />

      <AlertDialogContent>
        <AlertDialogHeader></AlertDialogHeader>

        <AlertDialogCloseButton />

        <AlertDialogBody
          textAlign={"center"}
          fontWeight={600}
          fontSize="1.1rem"
        >
          Are you sure you want to kick this student out of the class?
        </AlertDialogBody>
        <Flex
          flexWrap={"wrap"}
          justifyContent={"center"}
          alignItems={"center"}
          p={6}
        >
          <Button
            ref={cancelRef}
            fontWeight={500}
            color={primaryBlue}
            onClick={onClose}
            flex={0.5}
          >
            No
          </Button>
          <Button
            ml={3}
            fontWeight={500}
            color="white"
            flex={0.5}
            bg={primaryBlue}
            onClick={handleKickFromClass}
            _hover={{ bg: primaryBlueLight }}
          >
            Yes
          </Button>
        </Flex>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default KickFromClassPopup;
