import React, { useState, useEffect, useRef } from "react";
import {
  Box,
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
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { fetchAllSubjectsApi } from "../../../../../api/inspexternalapis/index";

const SoloRecordModal = ({ isOpen, onClose ,updateLiveData }) => {
 

  const [subjects, setSubjects] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const fileInputRef = useRef(null);

  useEffect(() => {
    async function fetchSubjects() {
      setIsLoading(true);
      try {
        const response = await fetchAllSubjectsApi();
        console.log("Subject Api", response);
        if (response.status) {
          console.log("Subject Data:", subjects);
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

  const handleSubmit = () => {};

  const handleFileSelect = (e) => {
    const files = Array.from(e.target.files);
    setSelectedFiles(files.map((file) => file.name));
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Solo Record</ModalHeader>
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
                  <Input placeholder="Topic" />
                  <FormErrorMessage>This field is required</FormErrorMessage>
                </FormControl>
                <FormControl isRequired>
                  <Input placeholder="Agenda" h="60px" />
                  <FormErrorMessage>This field is required</FormErrorMessage>
                </FormControl>
                <FormControl isRequired>
                  <Input placeholder="Description" h="60px" />
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
                    value={selectedFiles.join(", ")} // Render selected file names
                    readOnly // Make the input read-only
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

                <Link
                  style={{ display: "flex", justifyContent: "center" }}
                  to={"/mentor/solo-lectures"}
                >
                  <Button
                    type="submit"
                    w={"50%"}
                    bg={"#3C8DBC"}
                    color={"#FFFFFF"}
                    fontWeight={500}
                  >
                    Start
                  </Button>
                </Link>
              </Stack>
            </form>
          )}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default SoloRecordModal;
