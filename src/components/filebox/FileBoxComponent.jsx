import { Flex, Box, Text, useTheme, IconButton, Icon } from "@chakra-ui/react";
import { FiDownload } from "react-icons/fi";
import {
  boxShadowStyles,
  checkUserType,
  extractFileNameFromS3URL,
  generateUniqueKey,
} from "../../utils";
import { userType } from "../../constants/staticvariables";
const FileBoxComponent = ({ data }) => {
  const { secondaryTextColor } = useTheme().colors.pallete;
  const userRoleType = checkUserType();

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
          py={3}
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

          {item.isDownloadable ||
            (userRoleType === userType.teacher && (
              <Icon
                as={FiDownload}
                onClick={() => {
                  /*downloadFile(item)*/
                }}
                _hover={{ bg: "none", cursor: "pointer" }}
              />
            ))}
        </Flex>
      ))}
    </>
  );
};

export default FileBoxComponent;
