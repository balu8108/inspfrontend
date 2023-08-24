import {
  IconButton,
  Popover,
  PopoverContent,
  PopoverTrigger,
  PopoverCloseButton,
  useDisclosure,
  Text,
  Flex,
  useTheme,
  HStack,
  Checkbox,
  Box,
} from "@chakra-ui/react";
import { BiPlus } from "react-icons/bi";
import { MdClose } from "react-icons/md";
import { roomData } from "../../pages/Room/data/roomData";
import { MainBtn } from "../button";
import { openFileDialog } from "../../utils";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { setUploadFiles } from "../../store/actions/socketActions";
import { sendFileHandler } from "../../socketconnections/socketconnections";

const UploadFilePopup = () => {
  const [files, setFiles] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { onOpen, onClose, isOpen } = useDisclosure();
  const dispatch = useDispatch();
  const { lightBorderColor, primaryBlue } = useTheme().colors.pallete;
  const handleUploadFileClick = async () => {
    try {
      const files = await openFileDialog();

      setFiles(files);
    } catch (err) {
      console.log("error in uploading file", err);
    }
  };

  const uploadDocs = () => {
    setIsLoading(true);
    if (files) {
      let fileArray = [];
      for (let i = 0; i < files.length; i++) {
        fileArray.push(files[i]);
      }

      dispatch(setUploadFiles(files));
      sendFileHandler(fileArray);
    }

    setIsLoading(false);
    setFiles(null);
    onClose();
  };
  return (
    <>
      <Popover
        placement="right"
        isOpen={isOpen}
        onOpen={onOpen}
        onClose={onClose}
      >
        <PopoverTrigger>
          <IconButton icon={<BiPlus />} bg="none" _hover={{ bg: "none" }} />
        </PopoverTrigger>
        <PopoverContent px={4} py={2}>
          <Flex justifyContent={"space-between"} alignItems={"center"} mb={4}>
            <Text fontWeight={500} fontSize={"1rem"}>
              {roomData.uploadFileTitle}
            </Text>
            <IconButton
              icon={<MdClose size={20} />}
              bg="none"
              onClick={() => {
                setFiles(null);
                onClose();
              }}
              _hover={{ bg: "none" }}
            />
          </Flex>
          <Flex
            borderWidth={"1px"}
            borderStyle={"solid"}
            borderColor={lightBorderColor}
            borderRadius={"md"}
            p={2}
            mb={2}
            onClick={handleUploadFileClick}
          >
            {files ? (
              Object.keys(files).map((file) => <Text>{files[file].name}</Text>)
            ) : (
              <Text
                fontWeight={600}
                fontSize={"0.8rem"}
                color={lightBorderColor}
              >
                {roomData.selectFileToUpload}
              </Text>
            )}
          </Flex>
          <HStack my={2}>
            <Checkbox />
            <Text
              fontSize={"0.85rem"}
              fontWeight={500}
              color={lightBorderColor}
            >
              {roomData.allowStudentToDownloadFile}
            </Text>
          </HStack>
          <HStack my={2}>
            <Checkbox />
            <Text
              fontSize={"0.85rem"}
              fontWeight={500}
              color={lightBorderColor}
            >
              {roomData.allowStudentToShareFile}
            </Text>
          </HStack>
          <Box mt={4} mb={2} px={6}>
            <MainBtn
              isLoading={isLoading}
              text={roomData.upload}
              backColor={primaryBlue}
              textColor={"white"}
              onClickHandler={() => uploadDocs()}
            />
          </Box>
        </PopoverContent>
      </Popover>
    </>
  );
};

export default UploadFilePopup;
