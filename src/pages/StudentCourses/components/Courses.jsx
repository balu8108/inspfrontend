import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader, 
  ModalFooter, 
  ModalBody 
} from "@chakra-ui/react";
const Courses = ({ isOpen, onClose }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Box Modal with Sub-Boxes</ModalHeader>
        <ModalBody>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            {/* Create your 5 sub-boxes here */}
            <div style={{ width: "19%", backgroundColor: "red", height: "100px" }}></div>
            <div style={{ width: "19%", backgroundColor: "blue", height: "100px" }}></div>
            <div style={{ width: "19%", backgroundColor: "green", height: "100px" }}></div>
            <div style={{ width: "19%", backgroundColor: "orange", height: "100px" }}></div>
            <div style={{ width: "19%", backgroundColor: "purple", height: "100px" }}></div>
          </div>
        </ModalBody>
        <ModalFooter>
          {/* Add any footer content or buttons here */}
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default Courses;