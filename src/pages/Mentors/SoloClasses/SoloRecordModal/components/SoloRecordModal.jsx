import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
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
  Text,
} from "@chakra-ui/react";
import {
  fetchAllSubjectsApi,
  fetchAllTopicsWithoutChapterIdApi,
} from "../../../../../api/inspexternalapis";
import DataForClass from "../../RecordingSoloLectures/components/DataForClass";
import { BASE_URL } from "../../../../../constants/staticurls";
import axios from "axios";
const SoloRecordModal = ({ isOpen, onClose }) => {
  const [isLoadingSubjects, setIsLoadingSubjects] = useState(true);
  const [isLoadingTopics, setIsLoadingTopics] = useState(true);
  const [subjects, setSubjects] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState("");
  const [allTopicList, setAllTopicList] = useState([]);
  const [selectedTopic, setSelectedTopic] = useState("");
  const [description, setDescription] = useState("");
  const [agenda, setAgenda] = useState("");
  const [files, setFiles] = useState([]);
  const [selectedTopicId, setSelectedTopicId] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();

  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    setFiles((prevFiles) => [...prevFiles, ...selectedFiles]);
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      const formData = new FormData();
      formData.append("subjectId", selectedSubject);
      formData.append("topic", selectedTopic);
      formData.append("topicId", selectedTopicId);
      formData.append("agenda", agenda);
      formData.append("description", description);

      files.forEach((file) => {
        formData.append("files", file);
      });
      const response = await axios.post(
        `${BASE_URL}/solo-lecture/create-room`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Token ${"U5Ga0Z1aaNlYHp0MjdEdXJ1aKVVVB1TP"}`,
          },
        }
      );

      if (response.status === 201) {
        setSuccessMessage("SoloCLassRoom");
        const formValues = {
          subjectId: selectedSubject,
          topic: selectedTopic,
          topicId: selectedTopicId,
          agenda: agenda,
          description: description,
          files: files.map((file) => file.name).join(", "), // Add this line
        };

        const formDataToSave = JSON.stringify(formValues);
        localStorage.setItem("formData", formDataToSave);

        navigate(`/mentor/solo-lectures/${response?.data?.soloClassRoomId}`);
      } else {
        console.error("Error creating soloclassroom:", response.data.error);
      }

      onClose();
    } catch (error) {
      console.error("Error creating soloclassroom", error);
    } finally {
      setIsSubmitting(false);
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
    async function fetchAllTopicsWithoutChapterId() {
      setIsLoadingTopics(true);
      try {
        const response = await fetchAllTopicsWithoutChapterIdApi();
        console.log("Topics Api Without the Chapter Id", response);
        if (response.status) {
          setAllTopicList(response.result);
        }
      } catch (error) {
        console.error("Error fetching topics data:", error);
      } finally {
        setIsLoadingTopics(false);
      }
    }

    fetchAllTopicsWithoutChapterId();
  }, []);

  return (
    <Modal isOpen={isOpen} onClose={onClose} size={"xl"}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader
          fontSize={"24px"}
          fontWeight={500}
          letterSpacing={"0.15px"}
        >
          Solo record
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
                isLoadingTopics ? <Spinner size="sm" /> : "Select Topic"
              }
              value={selectedTopic}
              onChange={(e) => {
                const selectedTopicValue = e.target.value;
                setSelectedTopic(selectedTopicValue);

                // Find the topic object based on the selectedTopicValue
                const selectedTopicObject = allTopicList.find(
                  (topic) => topic.name === selectedTopicValue
                );

                // Extract the topicId from the selected topic object and store it in state
                if (selectedTopicObject) {
                  const selectedTopicId = selectedTopicObject.id;
                  setSelectedTopicId(selectedTopicId);
                }
              }}
              isDisabled={isLoadingTopics}
            >
              {isLoadingTopics
                ? null
                : allTopicList.map((topic) => (
                    <option key={topic.id} value={topic.name}>
                      {topic.name}
                    </option>
                  ))}
            </Select>
          </FormControl>

          <FormControl mt={4}>
            <Textarea
              placeholder="Agenda"
              value={agenda}
              onChange={(e) => setAgenda(e.target.value)}
            ></Textarea>
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
            <Button
              type="submit"
              w={"30%"}
              bg={"#3C8DBC"}
              color={"#FFFFFF"}
              fontWeight={500}
              onClick={handleSubmit}
              disabled={isSubmitting}
            >
              {isSubmitting ? <Spinner /> : "Start"}
            </Button>
          </Flex>
          {successMessage && (
            <Text textAlign="center" mt={4}>
              {successMessage}
            </Text>
          )}
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default SoloRecordModal;
