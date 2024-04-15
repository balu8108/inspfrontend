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
import { getTimeTable } from "../../store/actions/genericActions";

const PSDDocumentViewer = ({ doc }) => {
  const docRef = useRef(null);
  const { userProfile: inspUserProfile } = useSelector((state) => state.auth);

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

  function addWatermark(ctx, pageIndex, pageSize) {
    // Add a Confidential watermark on the page.

    ctx.translate(100, 450);
    ctx.rotate(-0.4);

    ctx.font = "1rem Arial";
    ctx.fillStyle = "rgba(76, 130, 212,.6)";
    ctx.fillText(
      `${inspUserProfile.name} - ${inspUserProfile.email} - ${inspUserProfile.mobile}`,
      0,
      0
    );
  }
  useEffect(() => {
    if (doc) {
      const container = docRef.current; // This `useRef` instance will render the PDF.
      let PSPDFKit, instance;
      (async function () {
        PSPDFKit = await import("pspdfkit");
        PSPDFKit.unload(container); // Ensure that there's only one PSPDFKit instance.
        instance = await PSPDFKit.load({
          disableWebAssemblyStreaming: true,
          licenseKey: process.env.REACT_APP_PSPSPDFKIT_LICENSE_KEY,
          container,
          document: doc?.url,
          renderPageCallback: addWatermark,
          // Use the public directory URL as a base URL. PSPDFKit will download its library assets from here.
          baseUrl: `${window.location.protocol}//${window.location.host}/${process.env.PUBLIC_URL}`,
        });
        const items = instance.toolbarItems;
        // Hide the toolbar item with the type "export-pdf" by removing it from the array of items.
        instance.setToolbarItems(
          items.filter(
            (item) => item.type !== "export-pdf" && item.type !== "print"
          )
        );
        PSDFdocument(instance);
      })();
      return () => PSPDFKit && PSPDFKit.unload(container);
    }
  }, [doc]);
  return <div ref={docRef} style={{ width: "100%", height: "70vh" }} />;
};

const TimeTableViewer = ({ isOpen, onClose }) => {
  const [doc, setDoc] = useState([]);
  const dispatch = useDispatch();

  const fetchAndSetDoc = async () => {
    try {
      const { status, data } = await dispatch(getTimeTable());
      if (status) {
        setDoc(data?.data);
      }
    } catch (err) {}
  };

  useEffect(() => {
    fetchAndSetDoc();
  }, [dispatch]);

  return (
    <Modal isOpen={isOpen} onClose={onClose} size={"5xl"}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Insp Time Table</ModalHeader>
        <ModalCloseButton onClick={() => {}} />

        <ModalBody>
          <Box>
            {doc.length > 0 ? (
              doc.map((item) => <PSDDocumentViewer key={item?.id} doc={item} />)
            ) : (
              <Box>
                <p>There is no time table uploaded </p>
              </Box>
            )}
          </Box>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default TimeTableViewer;
