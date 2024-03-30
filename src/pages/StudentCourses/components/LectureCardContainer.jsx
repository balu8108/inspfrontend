import React, { useState } from "react";
import {
  Box,
  Flex,
  Text,
  Stack,
  Spinner,
  useTheme,
  HStack,
  Input,
  Spacer,
  Center,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import VectorImage from "../../../assets/images/Line/Vector.svg";
import LectureCard from "../../../components/Card/LectureCard";

const  LectureCardContainer = ({title, loading, lecture, type}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const { outerBackground, innerBackground } =
    useTheme().colors.pallete;
  const navigate = useNavigate();

  const filteredTopics = lecture.filter((item) =>
    item?.LiveClassRoomDetail?.topicName
      ?.toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  const handleNavigate = (roomId) =>{
    navigate(`/my-courses/lecture-detail/${roomId}/${type}`)
  }

  return (
    <Box width={"full"} h={"100%"} bg={outerBackground} borderRadius={"26px"}>
      <Flex mt={"17px"}>
        <HStack spacing={"10px"} alignItems="center" ml={"33px"}>
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
        <Spacer />
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
          mx={"10"}
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
        <Stack>
          <Flex flexWrap="wrap" p={6} gap={"24px"}>
            {filteredTopics?.map(
              ({ roomId, LiveClassRoomDetail, scheduledDate, classLevel }) => (
                <LectureCard
                key={roomId}
                id={roomId}
                classRoomDetail={LiveClassRoomDetail} 
                scheduledDate={scheduledDate} 
                classLevel={classLevel} 
                route={handleNavigate}
                />
              )
            )}
          </Flex>
        </Stack>
      )}
    </Box>
  );
};
export default LectureCardContainer;
