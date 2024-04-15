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
import {
  endMeetHandler,
  leaveRoomHandler,
} from "../../socketconnections/socketconnections";
import { useSelector } from "react-redux";
import { checkUserType } from "../../utils";
import { userType } from "../../constants/staticvariables";
import { useNavigate, useParams } from "react-router-dom";
const LeaveOrEndClassPopup = ({ isOpen, onClose }) => {
  const cancelRef = useRef();
  const { primaryBlue, primaryBlueLight } = useTheme().colors.pallete;
  const { userProfile } = useSelector((state) => state.auth);
  const userRoleType = checkUserType(userProfile);
  const { roomId } = useParams();
  const navigate = useNavigate();

  const handleLeaveRoom = () => {
    try {
      if (userRoleType === userType.teacher) {
        endMeetHandler();
      } else {
        leaveRoomHandler();
        navigate(`/room-preview/${roomId}`);
      }
    } catch (err) {
      console.log("Error in leavng room", err);
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
          Are you sure you want to{" "}
          {userRoleType === userType.teacher ? "end" : "leave"} the class?
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
            onClick={handleLeaveRoom}
            _hover={{ bg: primaryBlueLight }}
          >
            Yes
          </Button>
        </Flex>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default LeaveOrEndClassPopup;
