import React from "react";
import {
  Text,
  Box,
  Card,
  Icon,
  useTheme,
  useDisclosure,
} from "@chakra-ui/react";
import { HiOutlinePencilSquare } from "react-icons/hi2";
import { MdDelete } from "react-icons/md";
import { useSelector } from "react-redux";
import SingleFileComponent from "../filebox/SingleFileComponent";
import { capitalize, checkUserType } from "../../utils";
import { userType } from "../../constants/staticvariables";
import AssignmentDelete from "../../pages/StudentAssignment/components/AssignmentDelete";
import UploadAssignmentPopup from "../popups/UploadAssignmentPopup";

const AssignmentTopicBasedCard = ({ assignment, setIsAssignmentDeleted }) => {
  const { innerBackground, innerBoxShadow } = useTheme().colors.pallete;
  const { userProfile } = useSelector((state) => state.auth);
  const {
    isOpen: isOpenDeleteAssignment,
    onOpen: onOpenDeleteAssignment,
    onClose: onCloseDeleteAssignment,
  } = useDisclosure();
  const {
    isOpen: isUploadAssignmentModalOpen,
    onOpen: onOpenUploadAssignmentModal,
    onClose: closeUploadAssignmentModal,
  } = useDisclosure();
  return (
    <>
      {isOpenDeleteAssignment && (
        <AssignmentDelete
          isOpen={isOpenDeleteAssignment}
          onClose={onCloseDeleteAssignment}
          assignmentId={assignment?.id}
          setIsAssignmentDeleted={setIsAssignmentDeleted}
        />
      )}
      {isUploadAssignmentModalOpen && (
        <UploadAssignmentPopup
          isOpen={isUploadAssignmentModalOpen}
          onClose={closeUploadAssignmentModal}
          isEditScreen={true}
          scheduleData={assignment}
          setIsAssignmentDeleted={setIsAssignmentDeleted}
        />
      )}
      <Card
        w="100%"
        bg={innerBackground}
        boxShadow={innerBoxShadow}
        borderRadius={"18px"}
        p={6}
        key={assignment.id}
      >
        <Text fontSize={"15px"} lineHeight={"18px"}>
          {capitalize(assignment?.topicName)}
        </Text>
        <Text
          fontWeight={400}
          fontSize={"12px"}
          lineHeight={"14px"}
          color={"#2C332978"}
        >
          {assignment.instructorName}
        </Text>
        <Text
          fontSize={"12px"}
          lineHeight={"13px"}
          fontWeight={400}
          color={"rgba(44, 51, 41, 1)"}
          mt={4}
        >
          Description
        </Text>
        <Text
          fontSize={"12px"}
          lineHeight={"21px"}
          fontWeight={400}
          color={"#2C332978"}
          noOfLines={2}
        >
          {assignment.description}
        </Text>
        <Box flex={1} display="flex" flexWrap={"wrap"} gap={4} mt={4}>
          {assignment?.AssignmentFiles.map((file) => (
            <SingleFileComponent key={file?.id} file={file} type="assignment" />
          ))}
        </Box>
        {checkUserType(userProfile) === userType.teacher && (
          <Icon
            position={"absolute"}
            top={2}
            right={2}
            as={MdDelete}
            onClick={() => {
              onOpenDeleteAssignment();
            }}
            _hover={{ bg: "none", cursor: "pointer" }}
          />
        )}
        {checkUserType(userProfile) === userType.teacher && (
          <Icon
            position={"absolute"}
            top={2}
            right={10}
            as={HiOutlinePencilSquare}
            onClick={() => {
              onOpenUploadAssignmentModal();
            }}
            _hover={{ bg: "none", cursor: "pointer" }}
          />
        )}
      </Card>
    </>
  );
};

export default AssignmentTopicBasedCard;
