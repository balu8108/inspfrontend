import React, { useState, useEffect } from "react";
import {
  Box,
  HStack,
  Text,
  Stack,
  Flex,
  Icon,
  Spacer,
  Button,
} from "@chakra-ui/react";
import { FaCircle } from "react-icons/fa";
import { BsDownload } from "react-icons/bs";
import { useDispatch } from "react-redux";
import { setIsDocModalOpen } from "../../../../../store/actions/genericActions";
const DataForClass = () => {
  const [formData, setFormData] = useState();
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedFileUrl, setSelectedFileUrl] = useState("");

  const dispatch = useDispatch();

  useEffect(() => {
    // Retrieve the form data from local storage
    const storedFormData = localStorage.getItem("formData");

    if (storedFormData) {
      const parsedFormData = JSON.parse(storedFormData);
      // Store the parsed form data in a state variable
      setFormData(parsedFormData);
    }
  }, []);
  const handleCloseDocumentViewer = () => {
    setModalIsOpen(false);
    setSelectedFileUrl("");
  };
  // Split the agenda into an array of items
  const agendaItems = formData?.agenda ? formData.agenda.split("\n") : [];
  const fileItems = formData?.files ? formData.files.split(",") : [];
  return (
    <Box w="25%" borderRadius={"12px"} bg={"#F1F5F8"}>
      <HStack spacing={"10px"}>
        <Box
          width={"12px"}
          height={"25px"}
          borderRadius={"20px"}
          bg={"#3C8DBC"}
          mt={"27px"}
          ml={"27px"}
        ></Box>
        <Text
          fontSize={"20px"}
          lineHeight={"24px"}
          fontFamily={400}
          mt={"26px"}
        >
          Solo Recording
        </Text>
      </HStack>
      {formData && (
        <Stack ml={"12px"} spacing={"25px"}>
          <Box mt={"38px"}>
            <Text p={"13px"}>{formData.topic}</Text>
          </Box>
          <Box>
            <Text p={"13px"}>Description</Text>
            <Text
              fontSize={"12px"}
              lineHeight={"21px"}
              color={"#2C332978"}
              ml={"12px"}
            >
              {formData.description}
            </Text>
          </Box>
          <Stack ml={"12px"}>
            <Text>Agenda</Text>

            {agendaItems.map((agenda, index) => (
              <Flex alignItems="center" key={index}>
                <Icon
                  as={FaCircle}
                  boxSize={3}
                  color="#EFEFEF"
                  blendMode={"multiply"}
                />
                <Text
                  fontSize={"12px"}
                  lineHeight={"14px"}
                  color={"#2C332978"}
                  ml={2}
                >
                  {agenda}
                </Text>
              </Flex>
            ))}
          </Stack>

          <Box m={"12px"}>
            <Text>Files</Text>
            {console.log("file items", fileItems)}
            {/* {fileItems.map((file, index) => (
              <Flex
                h={"40px"}
                key={index}
                alignItems="center"
                gap={2}
                boxShadow="md"
                borderRadius="6px"
                mt={"16px"}
                bg="white"
              >
                <Text color={"#2C332978"} fontSize={"12px"} p={"12px"}>
                  {file}
                </Text>
                <Spacer />

                <Button
                  rightIcon={<BsDownload />}
                  variant={"ghost"}
                  size="sm"
                  color={"black"}
                  ml={2}
                  onClick={() =>
                    dispatch(
                      setIsDocModalOpen(file?.id, file?.key, "solo", true)
                    )
                  }
                ></Button>
              </Flex>
            ))} */}
          </Box>
        </Stack>
      )}
    </Box>
  );
};

export default DataForClass;
