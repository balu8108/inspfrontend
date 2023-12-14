import { Flex, Box, Text, useTheme, Icon, Tooltip } from "@chakra-ui/react";
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
  const { secondaryTextColor, innerBackground } = useTheme().colors.pallete;
  const userRoleType = checkUserType();
  const dispatch = useDispatch();

  return (
    <>
      <SimpleBar style={{ maxHeight: "140px", width: "100%" }}>
        {data.map((item) => (
          <Flex
            key={item?.id}
            justifyContent={"space-between"}
            alignItems={"center"}
            mb={2}
            gap={4}
            onClick={() =>
              dispatch(setIsDocModalOpen(item?.id, item?.key, type, true))
            }
            borderRadius={"md"}
            border={"1px solid rgba(149, 151, 146, 0.49)"}
            bg={innerBackground}
            // boxShadow={boxShadowStyles.shadowFileBoxStyle.boxShadow}
            px={2}
            py={3}
          >
            <Tooltip
              label={extractFileNameFromS3URL(item?.key)}
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
                {extractFileNameFromS3URL(item?.key)}
              </Text>
            </Tooltip>

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
    </>
  );
};

export default FileBoxComponent;
