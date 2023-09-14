import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Box, HStack, Text, Card, Flex, Button } from "@chakra-ui/react";
import headerData from "../data/headerData";
import { fetchAllSubjectsApi } from "../../../api/inspexternalapis";
const Header = () => {
  const [subjects, setSubjects] = useState([]);
  console.log("Subjects", subjects);
  useEffect(() => {
    // Fetch subjects when the component mounts
    async function fetchSubjects() {
      try {
        const response = await fetchAllSubjectsApi(); // Call your API function
        console.log("Subjects Api", response);
        if (response.status) {
          setSubjects(response.result); // Update the state with fetched data
        }
      } catch (error) {
        console.error("Error fetching subjects:", error);
      }
    }

    fetchSubjects();
  }, []); // Empty dependency array ensures this effect runs once when the component mounts

  return (
    <Box w={"full"} bg={"#F1F5F8"} borderRadius={"2xl"}>
      <HStack spacing={"10px"}>
        <Box
          width={"12px"}
          height={"25px"}
          borderRadius={"20px"}
          bg={"#3C8DBC"}
          mt={"27px"}
          ml={"27px"}
        ></Box>
        <Text
          fontSize={"20px"}
          lineHeight={"24px"}
          fontFamily={400}
          mt={"26px"}
        >
          My Courses
        </Text>
      </HStack>

      <Flex mt={"34px"}>
        {headerData.map((headerDetails) => (
          <Card
            maxW="lg"
            borderRadius={"18px"}
            bg={"#F1F5F8"}
            ml={"20px"}
            mb={"20px"}
            mr={"20px"}
            blendMode={"multiply"}
            key={headerDetails.id}
          >
            <Text
              fontSize={"16px"}
              fontWeight={"400"}
              lineHeight={"18px"}
              color={"#2C3329"}
              ml={"13px"}
              mt={"13px"}
            >
              {headerDetails.subject}
            </Text>

            <Text
              fontSize={"12px"}
              lineHeight={"14px"}
              fontWeight={"400px"}
              color={"#2C3329"}
              mt={"14px"}
              ml={"14px"}
            >
              Description
            </Text>
            <Text
              fontSize={"11px"}
              lineHeight={"21px"}
              fontWeight={"400px"}
              ml={"13px"}
              mt={"6px"}
              color={"rgba(44, 51, 41, 0.47)"}
            >
              {headerDetails.description}
            </Text>
            <Link to={`/student/myCourses/${headerDetails.subject}`}>
              <Button
                variant={"ghost"}
                color={"#3C8DBC"}
                fontWeight={"600"}
                size={"12px"}
                fontSize={"14px"}
                lineHeight={"16px"}
                p={5}
                ml={"50px"}
              >
                View Details
              </Button>
            </Link>
          </Card>
        ))}
      </Flex>
    </Box>
  );
};
export default Header;

// import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import { Box, HStack, Text, Card, Flex, Button } from '@chakra-ui/react';
// import { fetchAllSubjectsApi } from '../../../api/inspexternalapis';

// const Header = () => {
//   const [subjects, setSubjects] = useState([]);

//   useEffect(() => {
//     async function fetchSubjects() {
//       try {
//         const response = await fetchAllSubjectsApi();
//         if (response.status) {
//           setSubjects(response.result);
//         }
//       } catch (error) {
//         console.error('Error fetching subjects:', error);
//       }
//     }

//     fetchSubjects();
//   }, []);

//   return (
//     <Box w={'full'} bg={'#F1F5F8'} borderRadius={'2xl'}>
//       <HStack spacing={'10px'}>
//         {/* ... other header content */}
//         <Box
//           width={"12px"}
//           height={"25px"}
//           borderRadius={"20px"}
//           bg={"#3C8DBC"}
//           mt={"27px"}
//           ml={"27px"}
//         ></Box>
//         <Text
//           fontSize={"20px"}
//           lineHeight={"24px"}
//           fontFamily={400}
//           mt={"26px"}
//         >
//           My Courses
//         </Text>
//       </HStack>

//       <Flex mt={'34px'}>
//         {subjects.map((subject) => (
//           <Card
//             w={"281px"}
//             h={"204px"}
//             borderRadius={'18px'}
//             bg={'#F1F5F8'}
//             ml={'20px'}
//             mb={'20px'}
//             mr={'20px'}
//             blendMode={'multiply'}
//             key={subject.id}
//           >
//             <Text
//               fontSize={'16px'}
//               fontWeight={'400'}
//               lineHeight={'18px'}
//               color={'#2C3329'}
//               ml={'13px'}
//               mt={'13px'}
//             >
//               {subject.name}
//             </Text>
//             <Text
//               fontSize={"12px"}
//               lineHeight={"14px"}
//               fontWeight={"400px"}
//               color={"#2C3329"}
//               mt={"14px"}
//               ml={"14px"}
//             >
//               Description
//             </Text>

//             {subject.description ? (
//               <Text
//                 fontSize={'12px'}
//                 lineHeight={'14px'}
//                 fontWeight={'400px'}
//                 color={'#2C3329'}
//                 mt={'14px'}
//                 ml={'14px'}
//               >
//                 {subject.description}
//               </Text>
//             ) : (
//               <Text
//                 fontSize={'12px'}
//                 lineHeight={'14px'}
//                 fontWeight={'400px'}
//                 color={'#2C3329'}
//                 mt={'14px'}
//                 ml={'14px'}
//               >
//                 No data
//               </Text>
//             )}

//             <Link  style={{  display: 'flex', justifyContent: 'center' }}  to={`/student/myCourses/${subject.name}`}>
//               <Button
//                 variant={'ghost'}
//                 color={'#3C8DBC'}
//                 fontWeight={'600'}
//                 size={'12px'}
//                 fontSize={'14px'}
//                 lineHeight={'16px'}
//                 p={5}
//                 ml={'50px'}
//               >
//                 View Details
//               </Button>
//             </Link>
//           </Card>
//         ))}
//       </Flex>
//     </Box>
//   );
// };

// export default Header;
