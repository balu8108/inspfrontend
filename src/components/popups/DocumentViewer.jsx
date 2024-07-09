import React, { useEffect, useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Button,
  Flex,
  Text,
  Spinner,
  Box,
  Tooltip,
} from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { setIsDocModalOpen } from "../../store/actions/genericActions";
import { getPresignedUrlDocApi } from "../../api/genericapis";
import { Document, Page, pdfjs } from "react-pdf";
import PropTypes from "prop-types";
import {
  IoChevronForward,
  IoChevronBackOutline,
  IoAdd,
  IoRemove,
} from "react-icons/io5";
import "./PdfViewer.css";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const PDFDocumentViewer = ({ docUrl, userProfile }) => {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [scale, setScale] = useState(1);

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };

  const nextPage = () => {
    if (pageNumber < numPages) {
      setPageNumber(pageNumber + 1);
    }
  };

  const prevPage = () => {
    if (pageNumber > 1) {
      setPageNumber(pageNumber - 1);
    }
  };

  const zoomIn = () => {
    setScale(scale + 0.1);
  };

  const zoomOut = () => {
    setScale(scale > 0.4 ? scale - 0.1 : scale);
  };

  return (
    <>
      <Flex
        justifyContent="left"
        gap={6}
        className="controls"
        alignItems="center"
      >
        <Button onClick={prevPage} disabled={pageNumber === 1}>
          <IoChevronBackOutline size={15} />
        </Button>
        <Text>
          Page {pageNumber} of {numPages}
        </Text>
        <Button onClick={nextPage} disabled={pageNumber === numPages}>
          <IoChevronForward size={15} />
        </Button>
        <Tooltip label="Zoom In" aria-label="Zoom In">
          <Button onClick={zoomIn}>
            <IoAdd size={15} />
          </Button>
        </Tooltip>
        <Tooltip label="Zoom Out" aria-label="Zoom Out">
          <Button onClick={zoomOut} disabled={scale <= 0.4}>
            <IoRemove size={15} />
          </Button>
        </Tooltip>
      </Flex>

      <div className="pdf-viewer-container">
        <div className="pdf-container">
          <Document
            file={docUrl}
            onLoadSuccess={onDocumentLoadSuccess}
            onContextMenu={(e) => e.preventDefault()}
          >
            <div
              className="pdf-scroll-container"
              style={{
                overflow: "auto",
                width: "100%",
                height: "100%",
              }}
            >
              <Box
                className="pdf-content"
                style={{
                  transform: `scale(${scale})`,
                  transformOrigin: "top left",
                }}
              >
                <Page pageNumber={pageNumber} renderTextLayer={false} />
                <div className="watermark-container">
                  <Text className="watermarked">
                    {userProfile?.name} - {userProfile?.email}
                  </Text>
                </div>
              </Box>
            </div>
          </Document>
        </div>
      </div>
    </>
  );
};

const DocumentViewer = ({ isOpen, onClose }) => {
  const [docUrl, setDocUrl] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { docId, docType } = useSelector((state) => state.generic);
  const { userProfile } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchAndSetDoc = async (docId) => {
      try {
        setLoading(true);
        setError(null);
        const { status, data } = await getPresignedUrlDocApi(docId, docType);
        if (status) {
          setDocUrl(data?.data?.getUrl);
        } else {
          setError("Error fetching document");
          console.error("Error fetching document:", data);
        }
      } catch (err) {
        setError("Error fetching document");
        console.error("Error fetching document:", err);
      } finally {
        setLoading(false);
      }
    };

    if (docId) {
      fetchAndSetDoc(docId);
    }

    return () => {
      dispatch(setIsDocModalOpen(null, null, null, false));
    };
  }, [docId, docType, dispatch]);

  return (
    <Modal isOpen={isOpen} onClose={onClose} size={"2xl"}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Document Viewer</ModalHeader>
        <ModalCloseButton
          onClick={() => dispatch(setIsDocModalOpen(null, null, null, false))}
        />
        <ModalBody>
          <>
            {loading ? (
              <Flex justifyContent="center" alignItems="center" height="100%">
                <Spinner size="xl" />
                <Text ml={4}>Loading PDF...</Text>
              </Flex>
            ) : error ? (
              <Text color="red.500">{error}</Text>
            ) : (
              <PDFDocumentViewer docUrl={docUrl} userProfile={userProfile} />
            )}
          </>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

PDFDocumentViewer.propTypes = {
  docUrl: PropTypes.string.isRequired,
  userProfile: PropTypes.object.isRequired,
};

DocumentViewer.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default DocumentViewer;
