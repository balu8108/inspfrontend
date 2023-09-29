import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
  Flex,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  Input,
  Select,
  Button,
  Stack,
  FormControl,
  FormErrorMessage,
  Spinner,
  Textarea,
  Center,
} from "@chakra-ui/react";
import { fetchAllSubjectsApi } from "../../../../../api/inspexternalapis/index";

const SoloRecordModal = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const [subjects, setSubjects] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [topicInputValue, setTopicInputValue] = useState("");
  const [agendaInputValue, setAgendaInputValue] = useState([]);
  const [descriptionInputValue, setDescriptionInputValue] = useState("");
  const fileInputRef = useRef(null);

  useEffect(() => {
    async function fetchSubjects() {
      setIsLoading(true);
      try {
        const response = await fetchAllSubjectsApi();
        console.log("Subject Api", response);
        if (response.status) {
          setSubjects(response.result);
        }
      } catch (error) {
        console.error("Error fetching subjects:", error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchSubjects();
  }, []);
 

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = {
      selectedSubject,
      Topic: topicInputValue,
      Agenda: agendaInputValue,
      Description: descriptionInputValue,
      Files: selectedFiles,
    };
   
    navigate("/mentor/solo-lectures", { state: formData });
  };

  const handleFileSelect = (e) => {
    const files = Array.from(e.target.files);
    setSelectedFiles(files.map((file) => file.name));
   
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader fontWeight={500}>Solo Record</ModalHeader>
        <ModalBody>
          {isLoading ? (
            <Spinner size="lg" color="blue.500" />
          ) : (
            <form onSubmit={handleSubmit}>
              <Stack spacing={4}>
                <FormControl isRequired>
                  <Select
                    placeholder="Select Subjects"
                    value={selectedSubject}
                    onChange={(e) => setSelectedSubject(e.target.value)}
                  >
                    {subjects.map((subject) => (
                      <option key={subject.id} value={subject.id}>
                        {subject.name}
                      </option>
                    ))}
                  </Select>
                  <FormErrorMessage>This field is required</FormErrorMessage>
                </FormControl>
                <FormControl isRequired>
                  <Input
                    placeholder="Topic"
                    value={topicInputValue}
                    onChange={(e) => setTopicInputValue(e.target.value)}
                  />
                  <FormErrorMessage>This field is required</FormErrorMessage>
                </FormControl>

                <Textarea
                  placeholder="Agenda"
                  value={agendaInputValue.join("\n")}
                  onChange={(e) =>
                    setAgendaInputValue(e.target.value.split("\n"))
                  }
                  style={{ whiteSpace: "pre-wrap" }}
                  h="60px"
                  resize={"none"}
                />

                <FormControl isRequired>
                  <Input
                    placeholder="Description"
                    h="60px"
                    value={descriptionInputValue}
                    onChange={(e) => setDescriptionInputValue(e.target.value)}
                  />
                  <FormErrorMessage>This field is required</FormErrorMessage>
                </FormControl>

                <input
                  type="file"
                  accept=".pdf,.doc,.docx"
                  style={{ display: "none" }}
                  ref={fileInputRef}
                  onChange={handleFileSelect}
                  multiple
                />
                <Flex gap={"16px"}>
                  <Input
                    placeholder="Files To Upload"
                    value={selectedFiles.join(", ")}
                    readOnly
                  />

                  <Button
                    w={"40%"}
                    bg={"#3C8DBC"}
                    color={"#FFFFFF"}
                    fontWeight={500}
                    onClick={() => fileInputRef.current.click()}
                  >
                    Upload
                  </Button>
                </Flex>
                <Center>
                  <Button
                    type="submit"
                    w={"50%"}
                    bg={"#3C8DBC"}
                    color={"#FFFFFF"}
                    fontWeight={500}
                  >
                    Start
                  </Button>
                </Center>
              </Stack>
            </form>
          )}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default SoloRecordModal;
