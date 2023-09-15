import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
} from "@chakra-ui/react";
import DocViewer, { DocViewerRenderers } from "@cyntler/react-doc-viewer";
import sample2 from "../../assets/docs/sample2.pdf";
const DocumentViewer = ({ isOpen, onClose }) => {
  const documents = [{ uri: sample2 }];
  return (
    <Modal isOpen={isOpen} onClose={onClose} size={"5xl"}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Modal Title</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <DocViewer
            documents={documents}
            prefetchMethod="GET"
            pluginRenderers={DocViewerRenderers}
            style={{ width: "100%", height: "100%" }}
          />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default DocumentViewer;
