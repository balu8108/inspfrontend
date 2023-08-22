import React from "react";
import { Box, Heading, Flex, Button } from "@chakra-ui/react";
import StudentAssignment from "../components/Assignment";
import data from "../data/assignmentData";

const assignment = () => {
  const assignmentGroups = [];

  for (let i = 0; i < data.length; i += 3) {
    assignmentGroups.push(data.slice(i, i + 3));
  }

  return (
    <Flex>
      <Box
        p={4}
        borderWidth="1px"
        borderRadius="md"
        ml={5}
        mt={6}
        mr={50}
        height="580px"
        overflow="auto"
        width={6000}
        backgroundColor="#F1F5F8"
      >
        <Heading as="h6" size="m" mb={4}>
          Assignments
        </Heading>
        <Box display="flex" flexWrap="wrap">
          {assignmentGroups.map((group, groupIndex) => (
            <Box key={groupIndex} display="flex" width="100%" height={270}>
              {group.map((assignment) => (
                <StudentAssignment
                  key={assignment.id}
                  assignment={assignment}
                />
              ))}
            </Box>
          ))}
        </Box>
      </Box>

      <Box
        p={1}
        borderWidth="1px"
        borderRadius="md"
        mt={6}
        mr={30}
        width="2000px"
        height="538px"
        overflow="auto"
        ml="auto"
        backgroundColor={"#F1F5F8"}
      >
        <Flex alignItems="center" justifyContent="space-between" mb={4} ml={3}>
          <Heading as="h6" size="m">
            Ongoing Courses
          </Heading>
          <Button variant={"ghost"}>See All</Button>
        </Flex>

        <Box borderRadius={10} borderWidth={1}   height={200} ml={3}>
          <Flex>
            <p style={{ color: "black", fontSize: "15px", fontWeight: "bold", marginLeft:"3px"}}>
              Newton's Law
            </p>
            <p style={{ color: "gray", fontSize: "13px",marginLeft:"70px" }} display="flex">
              6:00pm - 6:30{" "}
            </p>
          </Flex>
          <Flex>
            <p style={{ color: "gray", fontSize: "12px" }}>John Doe</p>
            <p style={{ color: "gray", fontSize: "13px",marginLeft:"150px" }}>(30 min)</p>
          </Flex>

          <p style={{ color: "black", fontSize: "14px" }}>Description</p>
          <p style={{ color: "gray", fontSize: "13px" }}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.{" "}
          </p>

          <Button  colorScheme="blue" fontWeight={10}  >Join Class</Button>
        </Box>

        <Flex alignItems="center" justifyContent="space-between" mb={4}>
          <Heading as="h6" size="m">
            Schedule for Today
          </Heading>
        </Flex>
        <Box borderRadius={10} borderWidth={1}  width={"317px"} height={"151px"}>
          <Flex>
            <p>Newtons Law</p>
            <p display="flex">6:00pm - 6:30 </p>
          </Flex>
          <Flex>
            <p>John Doe</p>
            <p>(30min)</p>
          </Flex>

          <p>
            {" "}
            Description <br />
            Lorem ipsum dolor sit amet, consectetur adipiscing elit,{" "}
          </p>
        </Box>

        <Box borderRadius={10} borderWidth={1}>
          <Flex>
            <p>Newtons Law</p>
            <p display="flex">6:00pm - 6:30 </p>
          </Flex>
          <Flex>
            <p>John Doe</p>
            <p>(30min)</p>
          </Flex>

          <p>
            {" "}
            Description <br />
            Lorem ipsum dolor sit amet, consectetur adipiscing elit,{" "}
          </p>
        </Box>

        <Flex alignItems="center" justifyContent="space-between" mb={4}>
          <Heading as="h6" size="m">
            Schedule for Week
          </Heading>
        </Flex>

        <Box borderRadius={10} borderWidth={1}>
          <Flex>
            <p>Newtons Law</p>
            <p display="flex">6:00pm - 6:30 </p>
          </Flex>
          <Flex>
            <p>John Doe</p>
            <p>(30min)</p>
          </Flex>

          <p>
            {" "}
            Description <br />
            Lorem ipsum dolor sit amet, consectetur adipiscing elit,{" "}
          </p>
        </Box>
      </Box>
    </Flex>
  );
};

export default assignment;
