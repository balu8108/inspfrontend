import { Flex, Box, Text, useTheme, IconButton } from "@chakra-ui/react";
import { FiDownload } from "react-icons/fi";
const FileBoxComponent = ({ data }) => {
  const { secondaryTextColor } = useTheme().colors.pallete;
  return (
    <>
      {data.map((file) => (
        <Flex
          key={file.id}
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
              {file.name}
            </Text>
            <Text color={secondaryTextColor} fontSize={"10px"}>
              {file.identity}
            </Text>
          </Box>
          <IconButton
            icon={<FiDownload />}
            bg={"none"}
            _hover={{ bg: "none" }}
          />
        </Flex>
      ))}
    </>
  );
};

export default FileBoxComponent;
