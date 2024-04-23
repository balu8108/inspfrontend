import React from "react";
import { Flex, Text } from "@chakra-ui/react";
import SingleFileComponent from "../../../components/filebox/SingleFileComponent";
export default function LectureFileCard({ lectureDetails }) {
  return (
    <>
      {lectureDetails?.LiveClassRoomFiles?.length > 0 ? (
        <Flex mt={4} flexWrap="wrap" gap={2}>
          {lectureDetails?.LiveClassRoomFiles?.map((file) => (
            <SingleFileComponent key={file?.id} file={file} type={"live"} />
          ))}

          {lectureDetails?.LiveClassRoomNote !== null && (
            <SingleFileComponent
              key={lectureDetails?.LiveClassRoomNote?.id}
              file={lectureDetails?.LiveClassRoomNote}
              type="note"
            />
          )}
        </Flex>
      ) : (
        <Text fontSize="12px" mt={4}>
          No Data for this topic
        </Text>
      )}
    </>
  );
}
