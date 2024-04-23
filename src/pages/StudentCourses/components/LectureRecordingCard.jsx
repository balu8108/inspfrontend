import React from "react";
import { Flex, Text, Image, IconButton } from "@chakra-ui/react";
import { BsPlayFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import defaultImageUrl from "../../../assets/images/image1.png";
export default function LectureRecordingCard({ lectureDetails }) {
  const navigate = useNavigate();
  const handleViewRecording = (liveClassData) => {
    navigate(`/view-recording?type=live&id=${liveClassData?.id}`);
  };
  return (
    <Flex gap={"24px"} overflowX="auto" className="example">
      {lectureDetails?.LiveClassRoomRecordings?.length > 0 ? (
        <Flex gap={4} mt={4}>
          {lectureDetails?.LiveClassRoomRecordings.map((recording) => (
            <Flex
              alignItems="center"
              w={"160px"}
              key={recording?.id}
              onClick={() => handleViewRecording(lectureDetails)}
              position={"relative"}
              cursor={"pointer"}
            >
              <Image
                src={defaultImageUrl}
                alt="Video Thumbnail"
                width={"100%"}
                height={"100%"}
              />
              <IconButton
                icon={<BsPlayFill />}
                fontSize="24px"
                position="absolute"
                top="50%"
                left="50%"
                borderRadius={"100%"}
                transform="translate(-50%, -50%)"
              />
            </Flex>
          ))}
        </Flex>
      ) : (
        <Text fontSize={"12px"} mt={4}>
          No recording are available for this topic.
        </Text>
      )}
    </Flex>
  );
}
