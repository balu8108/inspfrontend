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
// import GoogleDocsViewer from "react-google-docs-viewer";
// import { fileConverter } from "../../utils";

const PSDDocumentViewer = ({ doc }) => {
  const docRef = useRef(null);
  const PSDFdocument = (instance) => {
    if (instance) {
      const iframeDoc = instance.contentWindow.document;
      const printButton = iframeDoc.querySelector(
        ".PSPDFKit-Toolbar-Button-Print"
      );
      const exportButton = iframeDoc.querySelector(
        ".PSPDFKit-Toolbar-Button-Export-PDF"
      );
      const annotationButton = iframeDoc.querySelector(
        ".PSPDFKit-Toolbar-Button-Annotate"
      );
      const docEditorButton = iframeDoc.querySelector(
        ".PSPDFKit-Toolbar-Button-Document-Editor"
      );
      const searchButton = iframeDoc.querySelector(
        ".PSPDFKit-Toolbar-Button-Search"
      );
      if (printButton) {
        printButton.style.display = "none";
      }
      if (exportButton) {
        exportButton.style.display = "none";
      }
      if (annotationButton) {
        annotationButton.style.display = "none";
      }
      if (docEditorButton) {
        docEditorButton.style.display = "none";
      }
      if (searchButton) {
        searchButton.style.display = "none";
      }
    }
  };
  useEffect(() => {
    if (doc) {
      const container = docRef.current; // This `useRef` instance will render the PDF.
      let PSPDFKit, instance;
      (async function () {
        PSPDFKit = await import("pspdfkit");
        PSPDFKit.unload(container); // Ensure that there's only one PSPDFKit instance.
        instance = await PSPDFKit.load({
          disableWebAssemblyStreaming: true,
          container,
          document: doc,
          // Use the public directory URL as a base URL. PSPDFKit will download its library assets from here.
          baseUrl: `${window.location.protocol}//${window.location.host}/${process.env.PUBLIC_URL}`,
        });
        PSDFdocument(instance);
      })();
      return () => PSPDFKit && PSPDFKit.unload(container);
    }
  }, [doc]);
  return <div ref={docRef} style={{ width: "100%", height: "70vh" }} />;
};

const DocumentViewer = ({ isOpen, onClose }) => {
  const [doc, setDoc] = useState(null);
  const { docId, docKey } = useSelector((state) => state.generic);
  const dispatch = useDispatch();

  const fetchAndSetDoc = async (docId) => {
    try {
      const { status, data } = await getPresignedUrlDocApi(docId);

      if (status) {
        setDoc(data?.data?.getUrl);
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
            <PSDDocumentViewer doc={doc} />
            {/* <GoogleDocsViewer width="100%" height="85vh" fileUrl={doc} /> */}
          </Box>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default DocumentViewer;
