//This is the modal for creating solo-lecture .
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
  useTheme,
  FormErrorMessage,
} from "@chakra-ui/react";
import { fetchAllSubjectsApi } from "../../../../../api/inspexternalapis";
import { createSoloLectureRoomApi } from "../../../../../api/soloclassrooms";
import { getLectureNo } from "../../../../../api/lecture";
import { useSelector } from "react-redux";
const SoloRecordModal = ({ isOpen, onClose }) => {
  const [isLoadingSubjects, setIsLoadingSubjects] = useState(true);
  const [subjects, setSubjects] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState("");
  const [allTopicList, setAllTopicList] = useState([]);
  const [selectedTopic, setSelectedTopic] = useState("");
  const [description, setDescription] = useState("");
  const [agenda, setAgenda] = useState("");
  const [files, setFiles] = useState([]);
  const [selectedTopicId, setSelectedTopicId] = useState("");
  const [lectureNo, setLectureNo] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const { primaryBlueLight } = useTheme().colors.pallete;
  const navigate = useNavigate();
  const { topics } = useSelector((state) => state.generic);

  const fileInputRef = useRef(null);
  const [subjectError, setSubjectError] = useState(false);
  const [topicError, setTopicError] = useState(false);

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    setFiles((prevFiles) => [...prevFiles, ...selectedFiles]);
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);

    try {
      // Validate subject and topic fields
      if (!selectedSubject) {
        setSubjectError(true);
      }

      if (!selectedTopic) {
        setTopicError(true);
      }

      if (!selectedSubject || !selectedTopic) {
        return;
      }

      const formData = new FormData();
      formData.append("subjectId", selectedSubject);
      formData.append("topic", selectedTopic);
      formData.append("topicId", selectedTopicId);
      formData.append("agenda", agenda);
      formData.append("description", description);
      formData.append("lectureNo", lectureNo);

      files.forEach((file) => {
        formData.append("files", file);
      });

      const response = await createSoloLectureRoomApi(formData);

      if (response.status === 201) {
        setSuccessMessage("SoloCLassRoom");
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
    async function fetchLectureNo() {
      try {
        const response = await getLectureNo({ isSoloClass: true });
        if (response.status) {
          const { data: lectureNo } = response.data;

          setLectureNo(+lectureNo + 1);
        }
      } catch (error) {
        console.log("Error fetching lecture no", error);
      }
    }
    fetchLectureNo();
  }, []);

  useEffect(() => {
    setAllTopicList(topics);
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
          <FormControl isInvalid={subjectError}>
            <Select
              placeholder={
                isLoadingSubjects ? <Spinner size="sm" /> : "Select Subject"
              }
              value={selectedSubject}
              onChange={(e) => {
                setSelectedSubject(e.target.value);
                setSubjectError(false);
                setSelectedTopic("");
              }}
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

            <FormErrorMessage>Select subject is required.</FormErrorMessage>
          </FormControl>

          <FormControl mt={4} isInvalid={topicError}>
            <Select
              placeholder="Select Topic"
              value={selectedTopic}
              onChange={(e) => {
                const selectedTopicValue = e.target.value;
                setSelectedTopic(selectedTopicValue);
                const selectedTopicObject = allTopicList.find(
                  (topic) => topic.name === selectedTopicValue
                );
                if (selectedTopicObject) {
                  setSelectedTopicId(selectedTopicObject.id);
                }
                setTopicError(false);
              }}
              isDisabled={allTopicList.length === 0 || selectedSubject != 1}
            >
              {allTopicList.map((topic) => (
                <option key={topic.id} value={topic.name}>
                  {topic.name}
                </option>
              ))}
              {allTopicList.length === 0 && (
                <option value="" disabled>
                  No topics available
                </option>
              )}
            </Select>
            <FormErrorMessage>Select topic is required.</FormErrorMessage>
          </FormControl>

          <FormControl mt={4}>
            <Input
              placeholder="Lecture No"
              resize={"none"}
              isDisabled={true}
              value={
                lectureNo != null && selectedSubject && selectedTopic
                  ? `Lecture ${lectureNo}`
                  : ""
              }
              type="text"
            ></Input>
          </FormControl>

          <FormControl mt={4}>
            <Textarea
              placeholder="Agenda"
              value={agenda}
              resize={"none"}
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
                fontSize={"11px"}
                color={"gray"}
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
            <Button
              type="submit"
              w={"30%"}
              _hover={{ bg: primaryBlueLight }}
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
