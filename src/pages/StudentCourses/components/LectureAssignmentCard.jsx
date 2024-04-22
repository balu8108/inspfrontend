import React from "react";
import { useTheme, Text, HStack, SimpleGrid, Card } from "@chakra-ui/react";
import SingleFileComponent from "../../../components/filebox/SingleFileComponent";
export default function LectureAssignmentCard(assignmentDetails) {
  const { innerBackground } = useTheme().colors.pallete;
  return (
    <>
      {assignmentDetails && assignmentDetails.length > 0 ? (
        <SimpleGrid style={{ marginTop: "16px" }} spacing={6}>
          {assignmentDetails.map((assignment, index) => (
            <Card
              key={assignment?.id}
              h={"100%"}
              flex={1}
              borderRadius={"18px"}
              bg={innerBackground}
              p={4}
            >
              <Text fontSize={"xs"}>Description</Text>
              <Text fontSize={"xs"} color={"#2C332978"} noOfLines={2} mt={2}>
                {assignment.description}
              </Text>
              <HStack mt={4}>
                {assignment.AssignmentFiles.map((file, fileIndex) => (
                  <SingleFileComponent
                    key={file?.id}
                    file={file}
                    type="assignment"
                  />
                ))}
              </HStack>
            </Card>
          ))}
        </SimpleGrid>
      ) : (
        <Text fontSize={"12px"} mt={4}>
          No assignments for this topic.
        </Text>
      )}
    </>
  );
}
