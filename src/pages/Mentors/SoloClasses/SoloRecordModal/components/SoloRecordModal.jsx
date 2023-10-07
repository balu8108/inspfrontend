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
import { fetchAllSubjectsApi } from "../../../../../api/inspexternalapis";
import axios from "axios";

const SoloRecordModal = ({ isOpen, onClose }) => {
  const [isLoadingSubjects, setIsLoadingSubjects] = useState(true);

  const [subjects, setSubjects] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState("");
  const [topics, setTopics] = useState([]);

  const [description, setDescription] = useState("");

  const [agenda, setAgenda] = useState("");

  const [files, setFiles] = useState([]);
  const navigate = useNavigate();

  const apiUrl = "http://localhost:5000";

  // Create a ref for the file input
  const fileInputRef = useRef(null);

  // const resetFormFields = () => {
  //   setSelectedSubject("");
  //   setSelectedChapters("");
  //   setSelectedTopic("");
  //   setDescription("");
  //   setFiles([]);
  // };

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    setFiles((prevFiles) => [...prevFiles, ...selectedFiles]);
    console.log("Selected Files:", selectedFiles);
  };

  const handleSubmit = async () => {
    try {
      // Create a FormData object to send files along with other data
      const formData = new FormData();
      formData.append("subjectId", selectedSubject);
      formData.append("topic", topics);
      formData.append("agenda", agenda);
      formData.append("description", description);

      files.forEach((file) => {
        formData.append("files", file);
      });
      const response = await axios.post(
        `${apiUrl}/solo-lecture/create-room`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data", // Set the content type to multipart/form-data for file uploads
            Authorization: `Token ${"U5Ga0Z1aaNlYHp0MjdEdXJ1aKVVVB1TP"}`,
          },
        }
      );

      if (response.status === 201) {
        console.log("SoloClass   created  successfully");
        // Handle any success actions (e.g., showing a success message)

        navigate("/mentor/solo-lectures");
      } else {
        console.error("Error creating soloclassroom:", response.data.error);
        // Handle the error response from the backend
      }

      onClose(); // Close the modal
    } catch (error) {
      console.error("Error  creating soloclassroom", error);
      // Handle any network or other errors that may occur during the request
    }
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
            <Input
              placeholder="Topic"
              value={topics}
              onChange={(e) => setTopics(e.target.value)}
            ></Input>
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

export default SoloRecordModal;
