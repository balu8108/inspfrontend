import React, { useEffect, useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Button,
  Box,
  Flex,
  Text,
} from "@chakra-ui/react";
import { Document, Page, pdfjs } from "react-pdf";
import { IoChevronForward, IoChevronBackOutline } from "react-icons/io5";
import "./PdfViewer.css";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { getTimeTable } from "../../store/actions/genericActions";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
const PDFDocumentViewer = ({ docUrl, userProfile }) => {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
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
      </Flex>

      <Document
        file={docUrl}
        onLoadSuccess={onDocumentLoadSuccess}
        onContextMenu={(e) => e.preventDefault()}
        className="pdf-container"
      >
        <div className="watermark-container">
          <Text className="watermarked">
            {userProfile?.name} - {userProfile?.email}
          </Text>
        </div>
        <Page pageNumber={pageNumber} renderTextLayer={false} />
      </Document>
    </>
  );
};

const TimeTableViewer = ({ isOpen, onClose }) => {
  const [doc, setDoc] = useState([]);
  const dispatch = useDispatch();
  const { userProfile } = useSelector((state) => state.auth);

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
    <Modal isOpen={isOpen} onClose={onClose} size={"2xl"}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Insp Time Table</ModalHeader>
        <ModalCloseButton onClick={() => {}} />

        <ModalBody>
          <Box>
            {doc ? (
              doc.map((item) => (
                <PDFDocumentViewer
                  key={item?.id}
                  docUrl={item?.url}
                  userProfile={userProfile}
                />
              ))
            ) : (
              <div>Error: Invalid URL or document not found</div>
            )}
          </Box>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
PDFDocumentViewer.propTypes = {
  docUrl: PropTypes.string.isRequired,
  userProfile: PropTypes.object.isRequired,
};
export default TimeTableViewer;
