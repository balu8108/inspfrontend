import React, { useEffect, useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import DocViewer, { DocViewerRenderers } from "@cyntler/react-doc-viewer";

import { useDispatch, useSelector } from "react-redux";
import { setIsDocModalOpen } from "../../store/actions/genericActions";
import { getPresignedUrlDocApi } from "../../api/genericapis";
import { fileConverter } from "../../utils";
const DocumentViewer = ({ isOpen, onClose }) => {
  const [docs, setDocs] = useState([]);
  const { docId } = useSelector((state) => state.generic);
  const dispatch = useDispatch();

  const fetchAndSetDoc = async (docId) => {
    try {
      const { status, data } = await getPresignedUrlDocApi(docId);

      if (status) {
        await fileConverter(data?.data?.getUrl, setDocs);
      }
    } catch (err) {
      console.log("Error in opening doc");
    }
  };

  useEffect(() => {
    if (docId) {
      fetchAndSetDoc(docId);
    }
    return () => {
      setDocs([]);
    };
  }, [docId]);

  useEffect(() => {
    // Ensure the component has rendered before selecting and removing the element
    if (docs) {
      // Wait for the element to become available in the DOM
      const waitForElement = () => {
        const downloadBtn = document.querySelector("#pdf-download");
        if (downloadBtn) {
          // If the element is found, remove it

          downloadBtn.remove();
        } else {
          // If the element is not found, try again after a short delay
          setTimeout(waitForElement, 5000);
        }
      };

      waitForElement();
    }
  }, [docs]);
  return (
    <Modal isOpen={isOpen} onClose={onClose} size={"5xl"}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Insp document</ModalHeader>
        <ModalCloseButton
          onClick={() => dispatch(setIsDocModalOpen(null, false))}
        />
        <ModalBody>
          <DocViewer
            documents={docs.map((file) => {
              const url = window.URL.createObjectURL(file);
              const obj = {
                uri: url,
                fileType: "docx",
              };
              return obj;
            })}
            theme={{
              primary: "#5296d8",
              secondary: "#ffffff",
              tertiary: "#5296d899",
              textPrimary: "#ffffff",
              textSecondary: "#5296d8",
              textTertiary: "#00000099",
              disableThemeScrollbar: false,
            }}
            id="my-doc-viewer"
            prefetchMethod="GET"
            pluginRenderers={DocViewerRenderers}
            style={{ width: "100%" }}
          />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default DocumentViewer;
