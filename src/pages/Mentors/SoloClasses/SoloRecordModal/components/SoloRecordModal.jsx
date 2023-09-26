import React from "react";
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
  Center,
  Stack,
  FormControl,
  FormLabel,
  FormErrorMessage, // Import FormErrorMessage
} from "@chakra-ui/react";
import { Link } from "react-router-dom";

const SoloRecordModal = ({ isOpen, onClose }) => {
  const handleSubmit = () => {
    // Handle form submission here
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Solo Record</ModalHeader>
        <ModalBody>
          <form onSubmit={handleSubmit}>
            <Stack spacing={4}>
              <FormControl isRequired>
                <Select placeholder="Select Subjects"></Select>
                <FormErrorMessage>This field is required</FormErrorMessage>
              </FormControl>
              <FormControl isRequired>
                <Input placeholder="Topic" />
                <FormErrorMessage>This field is required</FormErrorMessage>
              </FormControl>
              <FormControl isRequired>
                <Input
                  placeholder="Agenda"
                  h="60px" // Increase height here
                />
                <FormErrorMessage>This field is required</FormErrorMessage>
              </FormControl>
              <FormControl isRequired>
                <Input placeholder="Description" h="60px" />
                <FormErrorMessage>This field is required</FormErrorMessage>
              </FormControl>
              <Flex gap={"16px"}>
                <Input placeholder="Files To Upload" />

                <Button
                  w={"40%"}
                  bg={"#3C8DBC"}
                  color={"#FFFFFF"}
                  fontWeight={500}
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
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default SoloRecordModal;
