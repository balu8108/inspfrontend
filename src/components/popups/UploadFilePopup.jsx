import {
  IconButton,
  Popover,
  PopoverContent,
  PopoverTrigger,
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
import { generateUniqueKey, openFileDialog } from "../../utils";
import { useState } from "react";
import { useDispatch } from "react-redux";

import { sendFileHandler } from "../../socketconnections/socketconnections";

const UploadFilePopup = ({ type, roomId }) => {
  console.log("type and room id in upload file popup", type, roomId);
  const [files, setFiles] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { onOpen, onClose, isOpen } = useDisclosure();
  const dispatch = useDispatch();
  const { lightBorderColor, primaryBlue } = useTheme().colors.pallete;
  const handleUploadFileClick = async (e) => {
    e.preventDefault();
    e.stopPropagation();
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
      let fileObj = { roomType: type, roomId: roomId, files: [] }; // need to send room type and files array that contains name and data buffer

      for (const key in files) {
        if (files.hasOwnProperty(key) && files[key] instanceof File) {
          let obj = {
            name: files[key].name,
            mimetype: files[key].type,
            data: files[key],
          };
          fileObj = { ...fileObj, files: [...fileObj.files, obj] };
        }
      }

      sendFileHandler(fileObj); // sending type of room description whether active one or upcoming one
      // dispatch(setUploadFilesInRoom(files));
      // dispatch(setUploadFiles(files));
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
          <IconButton
            icon={<BiPlus />}
            bg="none"
            boxSize={"1.2em"}
            _hover={{ bg: "none", cursor: "pointer" }}
          />
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
            w={"100%"}
            p={2}
            mb={2}
            onClick={(e) => handleUploadFileClick(e)}
            cursor={"pointer"}
            zIndex={1000}
          >
            {files ? (
              Object.keys(files).map((file) => (
                <Text key={generateUniqueKey()}>{files[file].name}</Text>
              ))
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
              onClickHandler={uploadDocs}
            />
          </Box>
        </PopoverContent>
      </Popover>
    </>
  );
};

export default UploadFilePopup;
