import { Flex, Box, Text, useTheme, Icon } from "@chakra-ui/react";
import { FiDownload } from "react-icons/fi";
import SimpleBar from "simplebar-react";
import {
  boxShadowStyles,
  checkUserType,
  extractFileNameFromS3URL,
  downloadFile,
} from "../../utils";
import { userType } from "../../constants/staticvariables";
import { useDispatch } from "react-redux";
import { setIsDocModalOpen } from "../../store/actions/genericActions";
const FileBoxComponent = ({ data, type }) => {
  const { secondaryTextColor } = useTheme().colors.pallete;
  const userRoleType = checkUserType();
  const dispatch = useDispatch();

  return (
    <SimpleBar
      style={{
        maxHeight: "140px",
        borderRadius: "10px",
      }}
    >
      {data.map((item) => (
        <Flex
          key={item?.id}
          justifyContent={"space-between"}
          alignItems={"center"}
          bg="white"
          mb={2}
          onClick={() =>
            dispatch(setIsDocModalOpen(item?.id, item?.key, type, true))
          }
          borderRadius={"md"}
          // border={"1px solid rgba(149, 151, 146, 0.49)"}
          boxShadow={boxShadowStyles.shadowFileBoxStyle.boxShadow}
          px={2}
          py={3}
        >
          <Box>
            <Text color={secondaryTextColor} fontSize={"10px"}>
              {extractFileNameFromS3URL(item?.key)}
            </Text>
            <Text color={secondaryTextColor} fontSize={"10px"}></Text>
          </Box>

          {(item.isDownloadable || userRoleType === userType.teacher) && (
            <Icon
              as={FiDownload}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                downloadFile(item);
              }}
              _hover={{ bg: "none", cursor: "pointer" }}
            />
          )}
        </Flex>
      ))}
    </SimpleBar>
  );
};

export default FileBoxComponent;
