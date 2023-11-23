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
} from "@chakra-ui/react";
import {
  fetchAllChaptersApi,
  fetchAllSubjectsApi,
  fetchAllTopicsApi,
} from "../../api/inspexternalapis";
import axios from "axios";
import { BASE_URL } from "../../constants/staticurls";
const UploadAssignmentPopup = ({ isOpen, onClose, setAssignment }) => {
  const [isLoadingSubjects, setIsLoadingSubjects] = useState(true);
  const [isLoadingChapters, setIsLoadingChapters] = useState(false);
  const [isLoadingTopics, setIsLoadingTopics] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [subjects, setSubjects] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState("");
  const [chapters, setChapters] = useState([]);
  const [selectedChapters, setSelectedChapters] = useState("");
  const [topics, setTopics] = useState([]);
  const [selectedTopic, setSelectedTopic] = useState("");
  const [description, setDescription] = useState("");
  const [files, setFiles] = useState([]);
  const { primaryBlueLight } = useTheme().colors.pallete;
  const fileInputRef = useRef(null);

  const resetFormFields = () => {
    setSelectedSubject("");
    setSelectedChapters("");
    setSelectedTopic("");
    setDescription("");
    setFiles([]);
  };

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    setFiles((prevFiles) => [...prevFiles, ...selectedFiles]);
  };

  const handleSubmit = async () => {
    try {
      setIsSending(true);
      // Create a FormData object to send files along with other data
      const formData = new FormData();
      formData.append("subjectId", selectedSubject);

      const selectedSubjectName =
        subjects.find((subject) => subject.id === selectedSubject)?.name || "";

      formData.append("subjectName", selectedSubjectName);

      formData.append("chapter", selectedChapters);

      const selectedTopicName =
        topics.find((topic) => topic.id === selectedTopic)?.name || "";

      formData.append("topicName", selectedTopicName); // Use the topic name
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
      console.log("assignment response", response);
      if (response.status === 201) {
        setAssignment(response.data.assignmentFiles);
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
    async function fetchChapters() {
      setIsLoadingChapters(true);
      try {
        const response = await fetchAllChaptersApi();

        if (response.status) {
          setChapters(response.result);
        }
      } catch (error) {
        console.error("Error fetching chapters:", error);
      } finally {
        setIsLoadingChapters(false);
      }
    }

    fetchChapters();
  }, []);

  useEffect(() => {
    async function fetchtopics(chapter_id) {
      setIsLoadingTopics(true);
      try {
        const response = await fetchAllTopicsApi(chapter_id);

        if (response.status) {
          setTopics(response.result);
        }
      } catch (error) {
        console.error("Error fetching topics:", error);
      } finally {
        setIsLoadingTopics(false);
      }
    }

    if (selectedChapters) {
      fetchtopics(selectedChapters);
    } else {
      setTopics([]);
    }
  }, [selectedChapters]);

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
          <FormControl>
            <Select
              placeholder={
                isLoadingSubjects ? <Spinner size="sm" /> : "Select Subject"
              }
              value={selectedSubject}
              onChange={(e) => setSelectedSubject(e.target.value)}
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
          </FormControl>
          <FormControl mt={4}>
            <Select
              placeholder={
                isLoadingChapters ? <Spinner size="sm" /> : "Select Chapter"
              }
              value={selectedChapters}
              onChange={(e) => setSelectedChapters(e.target.value)}
              isDisabled={isLoadingChapters}
            >
              {isLoadingChapters
                ? null
                : chapters.map((chapter) => (
                    <option key={chapter.id} value={chapter.id}>
                      {chapter.name}
                    </option>
                  ))}
            </Select>
          </FormControl>
          <FormControl mt={4}>
            <Select
              placeholder={
                isLoadingTopics ? <Spinner size="sm" /> : "Select Topic"
              }
              value={selectedTopic}
              onChange={(e) => setSelectedTopic(e.target.value)}
              isDisabled={isLoadingTopics}
            >
              {isLoadingTopics
                ? null
                : topics.map((topic) => (
                    <option key={topic.id} value={topic.id}>
                      {topic.name}
                    </option>
                  ))}
            </Select>
          </FormControl>
          <FormControl mt={4}>
            <Textarea
              placeholder=" Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              resize={"none"}
            />
          </FormControl>
          <FormControl mt={4}>
            <Input
              type="file"
              accept=".pdf,.doc,.docx"
              style={{ display: "none" }}
              ref={fileInputRef} // Attach the ref to the input element
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
        {/* <ModalFooter>
          <Flex w={"full"} justifyContent={"center"}>
            <Button
              type="submit"
              w={"30%"}
              bg={"#3C8DBC"}
              color={"#FFFFFF"}
              fontWeight={500}
              onClick={handleSubmit}
            >
              Send
            </Button>
          </Flex>
        </ModalFooter> */}
        <ModalFooter>
          <Flex w={"full"} justifyContent={"center"}>
            {isSending ? ( // Render the spinner inside the button
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
