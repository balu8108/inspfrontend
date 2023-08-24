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
        width={6300}
        backgroundColor="#F1F5F8"
      >
        <Heading as="h6" size="m" mb={4} ml={4}>
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
        width="2600px"
        height="538px"
        overflow="auto"
        ml="auto"
        backgroundColor={"#F1F5F8"}
      >
        <Flex alignItems="center" justifyContent="space-between" mb={4} ml={3}>
          <Heading as="h6" size="m">
            Ongoing Courses
          </Heading>
          <Button variant={"ghost"} fontWeight={"10px"}>
            See All
          </Button>
        </Flex>

        <Box borderRadius={10} borderWidth={1} height={180} ml={3}>
          <Flex>
            <p
              style={{
                color: "black",
                fontSize: "13px",
                fontWeight: "bold",
                marginLeft: "11px",
                marginTop: "11px",
              }}
            >
              Newton's Law
            </p>
            <p
              style={{
                color: "gray",
                fontSize: "13px",
                marginLeft: "78px",
                marginTop: "11px",
              }}
              display="flex"
            >
              6:00pm - 6:30pm{" "}
            </p>
          </Flex>
          <Flex>
            <p style={{ color: "gray", fontSize: "13px", marginLeft: "11px" }}>
              John Doe
            </p>
            <p style={{ color: "gray", fontSize: "13px", marginLeft: "129px" }}>
              (30 min)
            </p>
          </Flex>

          <p
            style={{
              color: "black",
              fontSize: "14px",
              marginTop: "10px",
              marginLeft: "11px",
            }}
          >
            Description
          </p>
          <p style={{ color: "gray", fontSize: "13px", marginLeft: "11px" }}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.{" "}
          </p>

          <Button colorScheme="blue" fontWeight={10} mt={3} ml={11} width={280}>
            Join Class
          </Button>
        </Box>

        <Flex alignItems="center" justifyContent="space-between" mb={4}>
          <Heading as="h6" size="m" ml={11} p={13}>
            Schedule for Today
          </Heading>
        </Flex>
        <Box
          borderRadius={10}
          borderWidth={1}
          width={"317px"}
          height={"151px"}
          ml={4}
        >
          <Flex>
            <p
              style={{
                color: "black",
                fontSize: "13px",
                fontWeight: "bold",
                marginLeft: "11px",
                marginTop: "11px",
              }}
            >
              Newton's Law
            </p>
            <p
              style={{
                color: "gray",
                fontSize: "13px",
                marginLeft: "78px",
                marginTop: "11px",
              }}
              display="flex"
            >
              6:00pm - 6:30pm{" "}
            </p>
          </Flex>
          <Flex>
            <p style={{ color: "gray", fontSize: "13px", marginLeft: "11px" }}>
              John Doe
            </p>
            <p style={{ color: "gray", fontSize: "13px", marginLeft: "129px" }}>
              (30 min)
            </p>
          </Flex>

          <p
            style={{
              color: "black",
              fontSize: "14px",
              marginTop: "10px",
              marginLeft: "11px",
            }}
          >
            Description
          </p>
          <p style={{ color: "gray", fontSize: "13px", marginLeft: "11px" }}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.{" "}
          </p>
        </Box>
    {/* displaying 2nd latest meeting */}

        <Box borderRadius={10} borderWidth={1} mt={4} ml={4}>
        <Flex>
            <p
              style={{
                color: "black",
                fontSize: "13px",
                fontWeight: "bold",
                marginLeft: "11px",
                marginTop:"11px"
              }}
            >
              Newton's Law
            </p>
            <p
              style={{ color: "gray", fontSize: "13px", marginLeft: "78px" , marginTop:"11px" }}
              display="flex"
            >
              6:00pm - 6:30pm{" "}
            </p>
          </Flex>
          <Flex>
            <p style={{ color: "gray", fontSize: "13px", marginLeft: "11px" }}>
              John Doe
            </p>
            <p style={{ color: "gray", fontSize: "13px", marginLeft: "129px" }}>
              (30 min)
            </p>
          </Flex>

          <p
            style={{
              color: "black",
              fontSize: "14px",
              marginTop: "10px",
              marginLeft: "11px",
            }}
          >
            Description
          </p>
          <p style={{ color: "gray", fontSize: "13px", marginLeft: "11px" }}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.{" "}
          </p>
        </Box>





        <Flex alignItems="center" justifyContent="space-between" mb={4} ml={30}>
          <Heading as="h6" size="m"  mt={14}>
            Schedule for  the Week
          </Heading>
        </Flex>

        <Box borderRadius={10} borderWidth={1} ml={11}>
        <Flex>
            <p
              style={{
                color: "black",
                fontSize: "13px",
                fontWeight: "bold",
                marginLeft: "11px",
                marginTop:"11px"
              }}
            >
              Newton's Law
            </p>
            <p
              style={{ color: "gray", fontSize: "13px", marginLeft: "78px" , marginTop:"11px" }}
              display="flex"
            >
              6:00pm - 6:30pm{" "}
            </p>
          </Flex>
          <Flex>
            <p style={{ color: "gray", fontSize: "13px", marginLeft: "11px" }}>
              John Doe
            </p>
            <p style={{ color: "gray", fontSize: "13px", marginLeft: "129px" }}>
              (30 min)
            </p>
          </Flex>

          <p
            style={{
              color: "black",
              fontSize: "14px",
              marginTop: "10px",
              marginLeft: "11px",
            }}
          >
            Description
          </p>
          <p style={{ color: "gray", fontSize: "13px", marginLeft: "11px" }}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.{" "}
          </p>
        </Box>
      </Box>
    </Flex>
  );
};

export default assignment;
