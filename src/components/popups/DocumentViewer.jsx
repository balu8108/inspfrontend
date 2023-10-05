import React, { useEffect, useState, useRef } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  Box,
  ModalCloseButton,
} from "@chakra-ui/react";

import { useDispatch, useSelector } from "react-redux";
import { setIsDocModalOpen } from "../../store/actions/genericActions";
import { getPresignedUrlDocApi } from "../../api/genericapis";
import GoogleDocsViewer from "react-google-docs-viewer";

const DocumentViewer = ({ isOpen, onClose }) => {
  const [doc, setDoc] = useState(null);
  const { docId, docKey } = useSelector((state) => state.generic);
  const dispatch = useDispatch();

  const fetchAndSetDoc = async (docId) => {
    try {
      const { status, data } = await getPresignedUrlDocApi(docId);

      if (status) {
        const encodedUrl = encodeURIComponent(data?.data?.getUrl);
        setDoc(encodedUrl);
      }
    } catch (err) {
      console.log("Error in opening doc");
    }
  };

  useEffect(() => {
    if (docId) {
      fetchAndSetDoc(docId);
    }
  }, [docId]);

  return (
    <Modal isOpen={isOpen} onClose={onClose} size={"5xl"}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Insp document</ModalHeader>
        <ModalCloseButton
          onClick={() => dispatch(setIsDocModalOpen(null, null, false))}
        />

        <ModalBody>
          <Box>
            <GoogleDocsViewer width="100%" height="85vh" fileUrl={doc} />
          </Box>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default DocumentViewer;
