import { useState } from "react";
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
  Flex,
  Text,
  FormControl,
} from "@chakra-ui/react";
import { scheduleClassData } from "../../pages/ScheduleClasses/data/scheduleClassData";
import { InlineBtn } from "../button";
import { openFileDialog } from "../../utils";
import { useToastContext } from "../toastNotificationProvider/ToastNotificationProvider";
import { useDispatch } from "react-redux";
import { AddClassAssignment } from "../../store/actions/scheduleClassActions";
import "./timepickerdefaultstyles.css";

// At the moment we will add some dummy data for chapter, topic
const UploadAssignmentToClass = ({ classId, isOpen, onClose, type,setIsFileAdded }) => {
  const { extraTextLight, primaryBlue, primaryBlueLight } =
    useTheme().colors.pallete;
  const [selectedFiles, setSelectedFiles] = useState(null); // for file upload
  const [isSubmitLoading, setIsSubmitLoading] = useState(false);
  const dispatch = useDispatch();
  const { addNotification } = useToastContext();

  const handleFileUpload = async () => {
    const files = await openFileDialog();
    setSelectedFiles(files);
  };

  const handleSubmit = async () => {
    setIsSubmitLoading(true);
    // check if all fields are filled
    let errors = {};

    let formData = new FormData();
    for (const key in selectedFiles) {
      if (
        selectedFiles.hasOwnProperty(key) &&
        selectedFiles[key] instanceof File
      ) {
        formData.append("files", selectedFiles[key]);
      }
    }

    if (Object.keys(errors).length > 0) {
      setIsSubmitLoading(false);
      return;
    }
    try {
      await dispatch(AddClassAssignment(type, classId, formData));
      setIsFileAdded(prevValue => !prevValue);
      addNotification("Files uploaded successfully!", "success", 1500);
    } catch (err) {
      console.log("err", err);
      addNotification("Failed to upload file!", "error", 1500);
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
          Upload Files
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl>
            <Box mt={10} mb={10}>
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
                  Choose file
                </Button>
              </Flex>
            </Box>
          </FormControl>
        </ModalBody>

        <ModalFooter>
          <Flex w={"full"} justifyContent={"center"}>
            <InlineBtn
              isLoading={isSubmitLoading}
              text="Upload"
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

export default UploadAssignmentToClass;
