import React from "react";
import { Box, Text, Button } from "@chakra-ui/react";

const StudentAssignment = ({ assignment }) => {
  return (
    <Box width="300px" p={4} borderWidth="1px" borderRadius="md" m={2} backgroundColor={"gray.200"}>
      <Text fontSize="xl"  mb={2}>
        {" "}
        {assignment.name}
      </Text>
      <Text  mt={-3} color={"GrayText"}>{assignment.instructor}</Text>
      <Text  color={"black"} mt={2}>
        Description
       
       <Text color={"GrayText"}>{assignment.description}</Text> 
      </Text>
      <Button  colorScheme='blue' color={"blue.600"} size="sm" mt={2}  marginLeft={10} variant='ghost'>
        {assignment.viewDetails}
      </Button>
    </Box>
  );
};

export default StudentAssignment;