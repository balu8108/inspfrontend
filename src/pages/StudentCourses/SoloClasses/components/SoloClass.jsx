import React, { useState, useEffect } from "react";
import {
  Box,
  Flex,
  HStack,
  Spacer,
  Text,
  useTheme,
  SimpleGrid,
} from "@chakra-ui/react";
import { getAllSoloClassRoom } from "../../../../api/soloclassrooms";
import { useNavigate } from "react-router-dom";
import SoloCard from "../../../../components/Card/SoloCard";
const SoloClass = () => {
  const navigate = useNavigate();
  const [lectureNumber, setLectureNumber] = useState([]);
  const { outerBackground, innerBackground, innerBoxShadow } =
    useTheme().colors.pallete;
  useEffect(() => {
    async function fetchLecturesForSoloClassRoom() {
      try {
        const response = await getAllSoloClassRoom();
        if (response.status) {
          console.log("response", response);
          setLectureNumber(response.data.data);
        }
      } catch (error) {
        console.error("Error fetching lectures:", error);
      }
    }
    fetchLecturesForSoloClassRoom();
  }, []);

  const handleViewDetails = (soloClassRoomId, topic) => {
    navigate(`/my-courses/lecture-details/${topic}/${soloClassRoomId}`);
  };

  return (
    <Box
      width={"100%"}
      height={"full"}
      borderRadius={"26px"}
      bg={outerBackground}
    >
      <Flex mt={"19px"}>
        <HStack spacing={"10px"} alignItems="center" ml={"33px"}>
          <Box
            width={"12px"}
            height={"25px"}
            borderRadius={"20px"}
            bg={"#3C8DBC"}
          ></Box>
          <Text fontSize={"19px"} lineHeight={"24px"}>
            My Courses (Inpho / Olympiads)
          </Text>
        </HStack>
        <Spacer />
      </Flex>
      <Box m={"33px"}>
        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={"6"}>
          {lectureNumber &&
            lectureNumber.map((lecture) => (
              <SoloCard
                lecture={lecture}
                handleViewDetails={handleViewDetails}
              />
            ))}
        </SimpleGrid>
      </Box>
    </Box>
  );
};

export default SoloClass;
