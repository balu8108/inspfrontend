import { Flex, Box, Text, useTheme, IconButton } from "@chakra-ui/react";
import { FiDownload } from "react-icons/fi";
import { downloadFile, generateUniqueKey } from "../../utils";
const FileBoxComponent = ({ data }) => {
  const { secondaryTextColor } = useTheme().colors.pallete;
  return (
    <>
      {data.map((item) => (
        <Flex
          key={generateUniqueKey()}
          justifyContent={"space-between"}
          alignItems={"center"}
          bg="white"
          mb={2}
          boxShadow={"md"}
          borderRadius={"md"}
          px={2}
        >
          <Box>
            <Text color={secondaryTextColor} fontSize={"10px"}>
              {item.name}
            </Text>
            <Text color={secondaryTextColor} fontSize={"10px"}>
              {/* {file.identity} */}
            </Text>
          </Box>
          <IconButton
            icon={<FiDownload />}
            onClick={() => downloadFile(item)}
            bg={"none"}
            _hover={{ bg: "none" }}
          />
        </Flex>
      ))}
    </>
  );
};

export default FileBoxComponent;
