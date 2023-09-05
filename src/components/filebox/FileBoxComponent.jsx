import { Flex, Box, Text, useTheme, IconButton } from "@chakra-ui/react";
import { FiDownload } from "react-icons/fi";
import {
  boxShadowStyles,
  downloadFile,
  extractFileNameFromS3URL,
  generateUniqueKey,
} from "../../utils";
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
          boxShadow={boxShadowStyles.shadowFileBoxStyle.boxShadow}
          borderRadius={"md"}
          px={2}
        >
          <Box>
            <Text color={secondaryTextColor} fontSize={"10px"}>
              {/* {item.name} */}
              {extractFileNameFromS3URL(item.url)}
            </Text>
            <Text color={secondaryTextColor} fontSize={"10px"}>
              {/* {file.identity} */}
            </Text>
          </Box>
          <IconButton
            icon={<FiDownload />}
            onClick={() => {
              /*downloadFile(item)*/
            }}
            bg={"none"}
            _hover={{ bg: "none" }}
          />
        </Flex>
      ))}
    </>
  );
};

export default FileBoxComponent;
