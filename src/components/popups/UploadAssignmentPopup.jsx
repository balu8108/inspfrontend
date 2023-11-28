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
  Select,
  Input,
  Flex,
  Spinner,
  Textarea,
  useTheme,
  FormErrorMessage,
} from "@chakra-ui/react";
import {
  fetchAllTopicsForSubjectApi,
  fetchAllSubjectsApi,
} from "../../api/inspexternalapis";
import axios from "axios";
import { BASE_URL } from "../../constants/staticurls";

const UploadAssignmentPopup = ({ isOpen, onClose, setAssignment }) => {
  const [isLoadingSubjects, setIsLoadingSubjects] = useState(true);
  const [isLoadingTopics, setIsLoadingTopics] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [subjects, setSubjects] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState("");
  const [subjectError, setSubjectError] = useState("");
  const [selectedChapters, setSelectedChapters] = useState("");
  const [topics, setTopics] = useState([]);
  const [selectedTopic, setSelectedTopic] = useState("");
  const [topicError, setTopicError] = useState("");
  const [description, setDescription] = useState("");
  const [descriptionError, setDescriptionError] = useState("");
  const [files, setFiles] = useState([]);
  const { primaryBlueLight } = useTheme().colors.pallete;
  const fileInputRef = useRef(null);

  const resetFormFields = () => {
    setSelectedSubject("");
    setSelectedChapters("");
    setSelectedTopic("");
    setDescription("");
    setFiles([]);
    setSubjectError("");
    setTopicError("");
    setDescriptionError("");
  };

  const handleSubjectChange = (e) => {
    setSelectedSubject(e.target.value);
    setSubjectError("");
  };

  const handleTopicChange = (e) => {
    setSelectedTopic(e.target.value);
    setTopicError("");
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
    setDescriptionError("");
  };

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    setFiles((prevFiles) => [...prevFiles, ...selectedFiles]);
  };

  const handleSubmit = async () => {
    try {
      if (!selectedSubject) {
        setSubjectError("Please select a subject");
        return;
      }

      if (!selectedTopic) {
        setTopicError("Please select a topic");
        return;
      }

      if (!description.trim()) {
        setDescriptionError("Please enter a description");
        return;
      }

      setIsSending(true);

      const formData = new FormData();
      formData.append("subjectId", selectedSubject);

      const selectedSubjectName =
        subjects.find((subject) => subject.id === selectedSubject)?.name || "";

      formData.append("subjectName", selectedSubjectName);

      formData.append("chapter", selectedChapters);

      const selectedTopicName =
        topics.find((topic) => topic.id === selectedTopic)?.name || "";

      formData.append("topicName", selectedTopicName);
      formData.append("topicId", selectedTopic);
      formData.append("description", description);

      files.forEach((file) => {
        formData.append("files", file);
      });

      const response = await axios.post(
        `${BASE_URL}/topic/upload-assignments`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Token ${"U5Ga0Z1aaNlYHp0MjdEdXJ1aKVVVB1TP"}`,
          },
        }
      );

      if (response.status === 201) {
        setAssignment((prev) => [response?.data?.assignment, ...prev]);
      } else {
        console.error("Error submitting assignment:", response.data.error);
      }

      onClose();
    } catch (error) {
      console.error("Error submitting assignment:", error);
    } finally {
      setIsSending(false);
    }
  };

  useEffect(() => {
    async function fetchSubjects() {
      setIsLoadingSubjects(true);
      try {
        const response = await fetchAllSubjectsApi();

        if (response.status) {
          setSubjects(response.result);
        }
      } catch (error) {
        console.error("Error fetching subjects:", error);
      } finally {
        setIsLoadingSubjects(false);
      }
    }

    fetchSubjects();
  }, []);

  useEffect(() => {
    async function fetchAllTopicsForSubject() {
      setIsLoadingTopics(true);
      try {
        const response = await fetchAllTopicsForSubjectApi(selectedSubject);
        if (response.status) {
          setTopics(response.result);
          setSelectedTopic("");
        }
      } catch (error) {
        console.error("Error fetching topics data:", error);
      } finally {
        setIsLoadingTopics(false);
      }
    }

    setTopics([]);
    if (selectedSubject) {
      fetchAllTopicsForSubject();
    } else {
      setTopics([]);
      setSelectedTopic("");
    }
  }, [selectedSubject]);

  useEffect(() => {
    if (!isOpen) {
      resetFormFields();
    }
  }, [isOpen]);

  return (
    <Modal isOpen={isOpen} onClose={onClose} size={"xl"}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader
          fontSize={"24px"}
          fontWeight={500}
          letterSpacing={"0.15px"}
        >
          Assignment
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl mt={4} isInvalid={subjectError !== ""}>
            <Select
              placeholder={
                isLoadingSubjects ? <Spinner size="sm" /> : "Select Subject"
              }
              value={selectedSubject}
              onChange={handleSubjectChange}
              isDisabled={isLoadingSubjects}
            >
              {isLoadingSubjects
                ? null
                : subjects.map((subject) => (
                    <option key={subject.id} value={subject.id}>
                      {subject.name}
                    </option>
                  ))}
            </Select>
            <FormErrorMessage>{subjectError}</FormErrorMessage>
          </FormControl>

          <FormControl mt={4} isInvalid={topicError !== ""}>
            <Select
              placeholder={
                isLoadingTopics ? <Spinner size="sm" /> : "Select Topic"
              }
              value={selectedTopic}
              onChange={handleTopicChange}
              isDisabled={isLoadingTopics || topics.length === 0}
            >
              {isLoadingTopics
                ? null
                : topics.map((topic) => (
                    <option key={topic.id} value={topic.id}>
                      {topic.name}
                    </option>
                  ))}
            </Select>

            <FormErrorMessage>{topicError}</FormErrorMessage>
          </FormControl>
          <FormControl mt={4} isInvalid={descriptionError !== ""}>
            <Textarea
              placeholder=" Description"
              value={description}
              onChange={handleDescriptionChange}
              resize={"none"}
            />
            <FormErrorMessage>{descriptionError}</FormErrorMessage>
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
              <Input
                placeholder="Files To Upload"
                readOnly
                value={
                  files.length > 0
                    ? files.map((file) => file.name).join(", ")
                    : ""
                }
              />
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
                Upload
              </Button>
            </Flex>
          </FormControl>
        </ModalBody>
        <ModalFooter>
          <Flex w={"full"} justifyContent={"center"}>
            {isSending ? (
              <Button
                type="submit"
                w={"30%"}
                bg={"#3C8DBC"}
                color={"#FFFFFF"}
                fontWeight={500}
                isDisabled
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
