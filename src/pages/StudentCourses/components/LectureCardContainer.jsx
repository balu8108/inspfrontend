import React, { useState } from "react";
import {
  Box,
  Flex,
  Text,
  Spinner,
  useTheme,
  HStack,
  Input,
  Center,
  SimpleGrid,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import VectorImage from "../../../assets/images/Line/Vector.svg";
import LectureCard from "../../../components/Card/LectureCard";

const LectureCardContainer = ({ title, loading, lecture, type }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const { outerBackground, innerBackground } = useTheme().colors.pallete;
  const navigate = useNavigate();

  const filteredTopics = lecture.filter((item) => {
    if (!item?.LiveClassRoomDetail || !item?.LiveClassRoomDetail?.topicName) {
      return true; // Pass the item directly if LiveClassRoomDetail or topicName is null
    }
    item?.LiveClassRoomDetail?.topicName
      ?.toLowerCase()
      .includes(searchTerm.toLowerCase());
  });

  const handleNavigate = (roomId) => {
    navigate(`/my-courses/lecture-detail/${roomId}/${type}`);
  };

  return (
    <Box bg={outerBackground} p={"30px"} borderRadius={"26px"}>
      <Flex justifyContent={"space-between"} mb={"20px"}>
        <HStack spacing={"10px"} alignItems="center">
          <Box
            width={"12px"}
            height={"25px"}
            borderRadius={"20px"}
            bg={"#3C8DBC"}
          ></Box>
          <Text fontSize={"19px"} lineHeight={"24px"}>
            {title}
          </Text>
        </HStack>
        <Input
          type="text"
          value={searchTerm}
          bg={innerBackground}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search..."
          w="30%"
          border="1px solid #ccc"
          borderRadius="14px"
          px="3"
          fontWeight={400}
          py="2"
          style={{
            backgroundImage: `url(${VectorImage})`,
            backgroundRepeat: "no-repeat",
            backgroundPosition: "10px center",
            paddingLeft: "40px",
          }}
        />
      </Flex>
      {loading ? (
        <Center>
          <Spinner size={"md"} />
        </Center>
      ) : (
        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={"6"}>
          {filteredTopics?.map(
            ({ roomId, LiveClassRoomDetail, scheduledDate, classLevel }) => (
              <LectureCard
                key={roomId}
                id={roomId}
                width={"100%"}
                classRoomDetail={LiveClassRoomDetail}
                scheduledDate={scheduledDate}
                classLevel={classLevel}
                route={handleNavigate}
              />
            )
          )}
        </SimpleGrid>
      )}
    </Box>
  );
};
export default LectureCardContainer;
