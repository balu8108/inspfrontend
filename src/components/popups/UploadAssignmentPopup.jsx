import React, { useState, useEffect, useRef } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  FormControl,
  Input,
  Flex,
  Spinner,
  Textarea,
  useTheme,
  FormErrorMessage,
} from "@chakra-ui/react";
import { Select } from "chakra-react-select";
import { FiX } from "react-icons/fi";
import { useToastContext } from "../toastNotificationProvider/ToastNotificationProvider";
import {
  uploadAssignmentsApi,
  updateAssignmentsApi,
} from "../../api/assignments";
import { extractFileNameFromS3URL } from "../../utils";
import { useSelector } from "react-redux";

const checkIsValid = (obj) => {
  const result =
    obj === null ||
    typeof obj === "object" ||
    typeof obj === "string" ||
    typeof obj === "number"
      ? true
      : false;
  return result;
};

const dataKey = ["subject", "topic", "description"];

const UploadAssignmentPopup = ({
  isOpen,
  onClose,
  setAssignment,
  isEditScreen,
  scheduleData,
  setIsAssignmentDeleted,
}) => {
  const { topics } = useSelector((state) => state.generic);
  const [isSending, setIsSending] = useState(false);
  const [formDataValue, setFormDataValue] = useState({});
  const [assignmentError, setAssignmentError] = useState({});
  const [deletedFileIds, setDeletedFileIds] = useState([]);

  const [files, setFiles] = useState([]);

  // files state
  const [previousFile, setPreviousFiles] = useState([]); // for file upload

  const chakraStyles = {
    control: (provided) => ({
      ...provided,
      paddingBlock: "8px",
    }),
  };

  useEffect(() => {
    if (isEditScreen) {
      setFormDataValue({
        subject: {
          value: scheduleData?.subjectId,
          label: scheduleData?.subjectName,
        },
        topic: {
          value: scheduleData?.topicId,
          label: scheduleData?.topicName,
        },
        description: scheduleData?.description,
      });
      setPreviousFiles(scheduleData?.AssignmentFiles);
    } else {
      setFormDataValue({
        subject: null,
        topic: null,
        description: "",
      });
    }
  }, []);

  const { primaryBlueLight } = useTheme().colors.pallete;
  const fileInputRef = useRef(null);
  const { addNotification } = useToastContext();
  const resetFormFields = () => {
    setFormDataValue({
      subject: null,
      topic: null,
      description: "",
    });
    setFiles([]);
  };

  const handleSubjectChange = (object) => {
    setFormDataValue({
      ...formDataValue,
      subject: object,
    });
    setAssignmentError((prev) => ({ ...prev, ["subject"]: "" }));
  };

  const handleTopicChange = (object) => {
    setFormDataValue({
      ...formDataValue,
      topic: object,
    });
    setAssignmentError((prev) => ({ ...prev, ["topic"]: "" }));
  };

  const handleDescriptionChange = (e) => {
    setFormDataValue({
      ...formDataValue,
      description: e.target.value,
    });
    setAssignmentError((prev) => ({ ...prev, ["description"]: "" }));
  };

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    setFiles((prevFiles) => [...prevFiles, ...selectedFiles]);
  };

  const handleSubmit = async () => {
    try {
      // check if all fields are filled
      let errors = {};

      dataKey.forEach((key) => {
        const isMissingKey = !(key in formDataValue);
        const isEmptyValue =
          formDataValue[key] === "" || formDataValue[key] === null;
        if (isMissingKey || isEmptyValue) {
          errors[key] = `Please select a ${key}`;
        }
      });

      if (Object.keys(errors).length > 0) {
        setAssignmentError(errors);
        return;
      }

      setIsSending(true);

      const formData = new FormData();

      formData.append("subject", JSON.stringify(formDataValue?.subject));
      formData.append("topic", JSON.stringify(formDataValue?.topic));
      formData.append("description", formDataValue?.description);

      if (deletedFileIds && deletedFileIds.length > 0) {
        formData.append("deletedFileIds", JSON.stringify(deletedFileIds));
      }

      files.forEach((file) => {
        formData.append("files", file);
      });

      if (isEditScreen) {
        formData.append("assignmentId", scheduleData?.id);
        const response = await updateAssignmentsApi(formData);
        if (response.status === 200) {
          addNotification("Assignment updated successfully!", "success", 1500);
          setIsAssignmentDeleted((prev) => !prev);
        } else {
          console.error("Error submitting assignment:", response.data.error);
        }
      } else {
        const response = await uploadAssignmentsApi(formData);
        if (response.status === 201) {
          setAssignment((prev) => [response?.data?.assignment, ...prev]);
          addNotification("Assignment uploaded successfully!", "success", 1500);
        } else {
          console.error("Error submitting assignment:", response.data.error);
        }
      }

      onClose();
    } catch (error) {
      console.error("Error submitting assignment:", error);
    } finally {
      setIsSending(false);
    }
  };

  useEffect(() => {
    if (!isOpen) {
      resetFormFields();
    }
  }, [isOpen]);

  const removeFilefromPreviousList = (keyToRemove) => {
    let fileArray = previousFile;
    const deleted = deletedFileIds;
    deleted.push(keyToRemove);
    let fileList = fileArray.filter((item) => item.id !== keyToRemove);
    setPreviousFiles(fileList);
    setDeletedFileIds(deleted);
  };

  const removeFilefromNewList = (keyToRemove) => {
    let fileArray = files;
    let fileList = fileArray.filter((item) => item.name !== keyToRemove);
    setFiles(fileList);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size={"xl"}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader
          fontSize={"24px"}
          fontWeight={500}
          letterSpacing={"0.15px"}
        >
          {isEditScreen ? "Update Assignment" : "Assignment"}
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          {checkIsValid(formDataValue?.subject) && (
            <FormControl isInvalid={assignmentError["subject"]}>
              <Select
                placeholder="Select subject"
                name={"subject"}
                onChange={handleSubjectChange}
                value={formDataValue?.subject}
                chakraStyles={chakraStyles}
                options={[
                  {
                    value: "3",
                    label: "CHEMISTRY",
                  },
                  {
                    value: "2",
                    label: "MATHEMATICS",
                  },
                  {
                    value: "1",
                    label: "PHYSICS",
                  },
                ]}
                useBasicStyles
              />
              {assignmentError["subject"] && (
                <FormErrorMessage>
                  {assignmentError["subject"]}
                </FormErrorMessage>
              )}
            </FormControl>
          )}

          {checkIsValid(formDataValue?.topic) && (
            <FormControl isInvalid={assignmentError["topic"]} mt={4}>
              <Select
                placeholder="Select Topic"
                onChange={handleTopicChange}
                isDisabled={
                  formDataValue?.subject === null ||
                  formDataValue?.subject?.label !== "PHYSICS"
                }
                value={formDataValue?.topic}
                name="topic"
                chakraStyles={chakraStyles}
                options={topics.map((topic) => {
                  let obj = {
                    value: topic.id,
                    label: topic.name,
                  };
                  return obj;
                })}
                useBasicStyles
              />
              {assignmentError["topic"] && (
                <FormErrorMessage>{assignmentError["topic"]}</FormErrorMessage>
              )}
            </FormControl>
          )}
          <FormControl mt={4} isInvalid={assignmentError["description"]}>
            <Textarea
              placeholder=" Description"
              value={formDataValue?.description}
              onChange={handleDescriptionChange}
              resize={"none"}
            />
            {assignmentError["description"] && (
              <FormErrorMessage>
                {assignmentError["description"]}
              </FormErrorMessage>
            )}
          </FormControl>

          <FormControl mt={4}>
            <Input
              type="file"
              accept=".pdf,.doc,.docx"
              style={{ display: "none" }}
              ref={fileInputRef}
              onChange={handleFileChange}
              multiple
            />
            <Flex gap={"16px"}>
              <Input placeholder="Files To Upload" readOnly />
              <Button
                w={"40%"}
                bg={"#3C8DBC"}
                _hover={{ bg: primaryBlueLight }}
                color={"#FFFFFF"}
                fontWeight={500}
                onClick={() => {
                  fileInputRef.current.click();
                }}
              >
                Select Files
              </Button>
            </Flex>
            {assignmentError["file"] && (
              <FormErrorMessage>{assignmentError["file"]}</FormErrorMessage>
            )}
            <div>
              {previousFile &&
                previousFile.length > 0 &&
                previousFile.map((item) => (
                  <div key={item?.id} className="selectedfilebox">
                    <div className="selectedfileinnerbox">
                      <p>{extractFileNameFromS3URL(item?.key)}</p>
                      <FiX
                        onClick={() => removeFilefromPreviousList(item?.id)}
                        style={{ marginLeft: "10px", cursor: "pointer" }}
                      />
                    </div>
                  </div>
                ))}
              {files &&
                files.length > 0 &&
                files.map((key) => (
                  <div key={key} className="selectedfilebox">
                    <div className="selectedfileinnerbox">
                      <p>{key?.name}</p>
                      <FiX
                        onClick={() => removeFilefromNewList(key?.name)}
                        style={{ marginLeft: "10px", cursor: "pointer" }}
                      />
                    </div>
                  </div>
                ))}
            </div>
          </FormControl>
        </ModalBody>
        <ModalFooter>
          <Flex w={"full"} justifyContent={"center"}>
            {isEditScreen ? (
              <Button
                type="submit"
                w={"30%"}
                bg={"#3C8DBC"}
                color={"#FFFFFF"}
                fontWeight={500}
                onClick={handleSubmit}
                _hover={{ bg: primaryBlueLight }}
              >
                Update
              </Button>
            ) : isSending ? (
              <Button
                type="submit"
                w={"30%"}
                bg={"#3C8DBC"}
                color={"#FFFFFF"}
                fontWeight={500}
                _hover={{ bg: primaryBlueLight }}
              >
                <Spinner size="sm" color="white" />
              </Button>
            ) : (
              <Button
                type="submit"
                w={"30%"}
                bg={"#3C8DBC"}
                color={"#FFFFFF"}
                fontWeight={500}
                onClick={handleSubmit}
                _hover={{ bg: primaryBlueLight }}
              >
                Send
              </Button>
            )}
          </Flex>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default UploadAssignmentPopup;
