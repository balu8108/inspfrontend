import React from "react";
import {
  Button,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
} from "@chakra-ui/react";
import { deleteAssignmentById } from "../../../api/assignments";
import { useToastContext } from "../../../components/toastNotificationProvider/ToastNotificationProvider";

function AssignmentDelete({
  isOpen,
  onClose,
  assignmentId,
  setIsAssignmentDeleted,
}) {
  const cancelRef = React.useRef();
  const { addNotification } = useToastContext();

  const deleteAssignment = async () => {
    const result = await deleteAssignmentById(assignmentId);
    if (result?.status === 200) {
      addNotification("Assignment Deleted Successfully", "success", 5000);
      setIsAssignmentDeleted((prev) => !prev);
    } else {
      addNotification("Something went wrong, Please try again", "info", 5000);
    }
    onClose();
  };

  return (
    <AlertDialog
      isOpen={isOpen}
      leastDestructiveRef={cancelRef}
      onClose={onClose}
    >
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader fontSize="lg" fontWeight="bold">
            Delete Assignment
          </AlertDialogHeader>

          <AlertDialogBody>
            Are you sure? You want to delete this assignment.
          </AlertDialogBody>

          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={onClose}>
              Cancel
            </Button>
            <Button colorScheme="red" onClick={deleteAssignment} ml={3}>
              Delete
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
}

export default AssignmentDelete;
