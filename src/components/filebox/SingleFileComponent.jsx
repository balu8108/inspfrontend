import React from "react";
import { Flex, Box, Text, Icon, useTheme, Tooltip } from "@chakra-ui/react";
import { FiDownload } from "react-icons/fi";
import {
  extractFileNameFromS3URL,
  checkUserType,
  downloadFile,
} from "../../utils";
import { useDispatch, useSelector } from "react-redux";
import { userType } from "../../constants/staticvariables";
import { setIsDocModalOpen } from "../../store/actions/genericActions";
const SingleFileComponent = ({ file, type }) => {
  const { innerBackground } = useTheme().colors.pallete;
  const { userProfile } = useSelector((state) => state.auth);
  const userRoleType = checkUserType(userProfile);
  const dispatch = useDispatch();

  return (
    <Box key={file.id} w={"157px"} borderRadius={6}>
      <Flex
        borderRadius={"md"}
        justifyContent="space-between"
        border={"1px solid rgba(149, 151, 146, 0.49)"}
        bg={innerBackground}
        px={2}
        py={3}
        onClick={() =>
          dispatch(setIsDocModalOpen(file?.id, file?.key, type, true))
        }
      >
        <Tooltip
          label={extractFileNameFromS3URL(file?.key)}
          placement="bottom"
          hasArrow
          arrowSize={8}
          fontSize={"11px"}
        >
          <Text
            fontSize={"12px"}
            color={"#2C332978"}
            overflow="hidden"
            textOverflow="ellipsis"
            whiteSpace="nowrap"
          >
            {extractFileNameFromS3URL(file?.key)}
          </Text>
        </Tooltip>
        {(file?.isDownloadable || userRoleType === userType.teacher) && (
          <Icon
            as={FiDownload}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              downloadFile(file);
            }}
            _hover={{ bg: "none", cursor: "pointer" }}
          />
        )}
      </Flex>
    </Box>
  );
};

export default SingleFileComponent;
