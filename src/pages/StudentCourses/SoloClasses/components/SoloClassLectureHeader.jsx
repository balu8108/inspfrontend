import React from "react";
import { useNavigate } from "react-router-dom";
import { Box, Flex, HStack, Text, useTheme } from "@chakra-ui/react";
import SoloCard from "../../../../components/Card/SoloCard";

const SoloClassLectureHeader = ({ soloLecturesData }) => {
  const { outerBackground } = useTheme().colors.pallete;
  const navigate = useNavigate();

  const handleViewDetails = (soloClassRoomId, topic) => {
    navigate(`/library/lecture-details/${topic}/${soloClassRoomId}`, {
      state: {
        soloLecturesData: soloLecturesData,
      },
    });
  };

  return (
    <Box borderRadius={"25px"} backgroundColor={outerBackground}>
      <HStack spacing={"10px"} alignItems="center" p={"20px"}>
        <Box
          width={"12px"}
          height={"25px"}
          borderRadius={"20px"}
          bg={"#3C8DBC"}
        ></Box>
        <Text fontSize={"19px"} lineHeight={"24px"}>
          Topic based recording
        </Text>
      </HStack>
      <Flex
        gap={"24px"}
        overflow="auto"
        className="example"
        mx={5}
        paddingBottom={5}
      >
        {soloLecturesData.map((lecture) => (
          <SoloCard
            id={lecture?.id}
            lecture={lecture}
            handleViewDetails={handleViewDetails}
          />
        ))}
      </Flex>
    </Box>
  );
};
export default SoloClassLectureHeader;
