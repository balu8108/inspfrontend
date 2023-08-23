import React from 'react';
import { Box, Button, Card, Heading, Flex, color } from '@chakra-ui/react';
import myCourses from '../data/myCourses'; // Import the mock course data

const MyCourses = () => {
  return (
    <Box width={900} mt={10} ml={33} borderRadius={26} backgroundColor={"#F1F5F8"} height={270}>
      <Heading fontWeight={10} padding={13} fontSize={15} ml={10}>My Courses</Heading>
      
      <Flex ml={5} mt={3} >
        {myCourses.map(course => (
          <Card key={course.id} width={400} mr={3} height={188} backgroundColor={"gray.200"}>
            <Heading fontSize={15} fontWeight={600} ml={5} mt={4}>
              {course.title}
            </Heading>
            <p 
            style={{
                marginLeft:"20px",
                marginTop:"8px",
                
            }} >Description</p>
            <p 
                 style={{
                marginLeft:"20px",
                marginTop:"8px",
                color:"gray"
                
            }}
            >{course.description}</p>
            <Button variant={'ghost'} color={"blue.400"} mt={5}>{course.viewDetails}</Button>
          </Card>
        ))}
      </Flex>
    </Box>
  );
};

export default MyCourses;
