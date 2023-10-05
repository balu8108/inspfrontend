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
  FormLabel,
  Select,
  Input,
  Box,
  InputGroup,
  InputRightAddon,
  Center,
  Flex,
  Text,
  Spinner,
  Textarea,
} from "@chakra-ui/react";
import {
  fetchAllChaptersApi,
  fetchAllSubjectsApi,
  fetchAllTopicsApi,
} from "../../api/inspexternalapis";

const UploadAssignmentPopup = ({ isOpen, onClose }) => {
  const [isLoadingSubjects, setIsLoadingSubjects] = useState(true);
  const [isLoadingChapters, setIsLoadingChapters] = useState(false);
  const [isLoadingTopics, setIsLoadingTopics] = useState(false);

  const [subjects, setSubjects] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState("");
  const [chapters, setChapters] = useState([]);
  const [selectedChapters, setSelectedChapters] = useState("");
  const [topics, setTopics] = useState([]);
  const [selectedTopic, setSelectedTopic] = useState("");
  const [description, setDescription] = useState("");
  const [files, setFiles] = useState([]);

  // Create a ref for the file input
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
    setFiles((prevFiles) => [...prevFiles, ...selectedFiles]); // Append to the existing files
  };

  const handleSubmit = () => {
    console.log("Selected Subject:", selectedSubject);
    console.log("Selected Chapter:", selectedChapters);
    console.log("Selected Topic:", selectedTopic);
    console.log("Description:", description);
    console.log("Selected File:", files);
    onClose();
  };

  useEffect(() => {
    async function fetchSubjects() {
      setIsLoadingSubjects(true);
      try {
        const response = await fetchAllSubjectsApi();
        console.log("Subject Api", response);
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
        console.log("Chapter Api", response);
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
        console.log("Topic Api", response);
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
    // Reset form fields when the modal is closed
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
                color={"#FFFFFF"}
                fontWeight={500}
                onClick={() => {
                  // Trigger the file input click event using the ref
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
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default UploadAssignmentPopup;
