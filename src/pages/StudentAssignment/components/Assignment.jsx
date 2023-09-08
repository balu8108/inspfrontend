// import React, { useState } from "react";
// import {
//   Box,
//   Text,
//   HStack,
//   Card,
//   Flex,
//   Button,
//   Stack,
//   Input,
//   InputGroup,
//   InputLeftElement,
// } from "@chakra-ui/react";
// import { FaSearch } from "react-icons/fa";
// import assignmentData from "../data/assignmentDetails";
// const PhysDetails = () => {
//   return (
//     <Box width={"100%"} h={"100%"} bg={"#F1F5F8"} borderRadius={"26px"}>
//       <HStack spacing={"10px"} alignItems="center" ml={"33px"} mt={"27px"}>
//         <Box
//           width={"12px"}
//           height={"25px"}
//           borderRadius={"20px"}
//           bg={"#3C8DBC"}
//         ></Box>
//         <Text fontSize={"19px"} lineHeight={"24px"}>
//           Assignments (Physics)
//         </Text>
//         <InputGroup m={4} w={"220px"} ml={"320px"}>
//           <InputLeftElement pointerEvents="none">
//             <FaSearch color="#000000" />
//           </InputLeftElement>
//           <Input placeholder="Search" w={"240px"} />
//         </InputGroup>
//       </HStack>

//       <Stack>
//         <Flex flexWrap="wrap" mt={"37px"} ml={"27px"} mr={"20px"} gap={"23px"}>
//           {assignmentData.map((assignmentScreen) => (
//             <Card
//               key={assignmentScreen.id}
//               w="30%"
//               blendMode={"multiply"}
//               bg={"#F1F5F8"}
//               borderRadius={"18px"}
             
//             >
//               <Text
//                 fontSize={"15px"}
//                 lineHeight={"18px"}
//                 ml={"13px"}
//                 mt={"16px"}
//               >
//                 {assignmentScreen.chapterName}
//               </Text>
//               <Text
//                 fontWeight={400}
//                 fontSize={"12px"}
//                 lineHeight={"14px"}
//                 ml={"13px"}
//                 mt={"3px"}
//                 color={"#2C332978"}
//               >
//                 {assignmentScreen.instructorName}
//               </Text>
//               <Text
//                 fontSize={"12px"}
//                 lineHeight={"13px"}
//                 ml={"13px"}
//                 fontWeight={400}
//                 color={"rgba(44, 51, 41, 1)"}
//                 mt={"18px"}
//               >
//                 Description
//               </Text>
//               <Text
//                 fontSize={"12px"}
//                 lineHeight={"21px"}
//                 fontWeight={400}
//                 ml={13}
//                 mt={"5px"}
//                 color={"#2C332978"}
//               >
//                 {assignmentScreen.description}
//               </Text>
              
//                 <Button
//                   variant={"ghost"}
//                   color={"#3C8DBC"}
//                   fontWeight={"600"}
//                   fontSize={"14px"}
//                   lineHeight={"16px"}
//                   p={6}
//                   m={"5px"}
//                 >
//                   View Details
//                 </Button>
             
//             </Card>
//           ))}
//         </Flex>
//       </Stack>
//     </Box>
//   );
// };

// export default PhysDetails;




import React, { useState } from "react";
import {
  Box,
  Text,
  HStack,
  Card,
  Flex,
  Button,
  Stack,
  Input,
  InputGroup,
  InputLeftElement,
  Textarea,
  InputRightElement,
} from "@chakra-ui/react";
import { FaSearch } from "react-icons/fa";
import assignmentData from "../data/assignmentDetails";

const PhysDetails = () => {
  const [selectedAssignment, setSelectedAssignment] = useState(null);

  const handleViewDetails = (assignmentId) => {
    setSelectedAssignment(assignmentId);
  };

  const clearSelection = () => {
    setSelectedAssignment(null);
  };

  return (
    <Box width={"100%"} h={"100%"} bg={"#F1F5F8"} borderRadius={"26px"}>
      <HStack spacing={"10px"} alignItems="center" ml={"33px"} mt={"27px"}>
        <Box
          width={"12px"}
          height={"25px"}
          borderRadius={"20px"}
          bg={"#3C8DBC"}
        ></Box>
        <Text fontSize={"19px"} lineHeight={"24px"}>
          Assignments (Physics)
        </Text>
        <InputGroup m={4} w={"220px"} ml={"320px"}>
          <InputLeftElement pointerEvents="none">
            <FaSearch color="#000000" />
          </InputLeftElement>
          <Input placeholder="Search" w={"240px"} />
        </InputGroup>
      </HStack>

      <Stack>
        <Flex
          flexWrap="wrap"
          mt={"37px"}
          ml={"27px"}
          mr={"20px"}
          gap={"23px"}
          justifyContent="space-between" // To distribute cards evenly in a row
        >
          {assignmentData.map((assignmentScreen) => (
            <div key={assignmentScreen.id} style={{ flexBasis: "30%" }}>
              <Card
                w="100%" // Card takes up full width of its container
                blendMode={"multiply"}
                bg={"#F1F5F8"}
                borderRadius={"18px"}
              >
                {/* Card Content */}
                <Text
                  fontSize={"15px"}
                  lineHeight={"18px"}
                  ml={"13px"}
                  mt={"16px"}
                >
                  {assignmentScreen.chapterName}
                </Text>
                <Text
                fontSize={"12px"}
                lineHeight={"13px"}
                ml={"13px"}
                fontWeight={400}
                color={"rgba(44, 51, 41, 1)"}
                mt={"18px"}
              >
                Description
              </Text>
              <Text
                fontSize={"12px"}
                lineHeight={"21px"}
                fontWeight={400}
                ml={13}
                mt={"5px"}
                color={"#2C332978"}
                overflow={"hidden"}
                textOverflow={"ellipsis"}
              >
                {assignmentScreen.description}
              </Text>
              
                {/* ... other card content ... */}
                <Button
                  variant={"ghost"}
                  color={"#3C8DBC"}
                  fontWeight={"600"}
                  fontSize={"14px"}
                  lineHeight={"16px"}
                  p={6}
                  m={"5px"}
                  onClick={() => handleViewDetails(assignmentScreen.id)}
                >
                  View Details
                </Button>
              </Card>

              {/* Assignment Details Section */}
              {selectedAssignment === assignmentScreen.id && (
                <Box  mt={"20px"} w="100%">
                  <Text fontSize={"15px"} lineHeight={"18px"}>
                    Description
                  </Text>
                 <Text fontSize={"12px"}  color={"#2C332978"} wordBreak={""}>{assignmentScreen.description}</Text>
                  <Input
                    type="file"
                    mt="10px"
                    ml="13px"
                  />
                  <Button
                    variant={"ghost"}
                    color={"#3C8DBC"}
                    fontWeight={"600"}
                    fontSize={"14px"}
                    lineHeight={"16px"}
                    mt={"10px"}
                    onClick={clearSelection}
                  >
                    Close
                  </Button>
                </Box>
              )}
            </div>
          ))}
        </Flex>
      </Stack>
    </Box>
  );
};

export default PhysDetails;


// import React, { useState } from "react";
// import {
//   Box,
//   Text,
//   HStack,
//   Card,
//   Flex,
//   Button,
//   Stack,
//   Input,
//   InputGroup,
//   InputLeftElement,
//   Textarea,
//   InputRightElement,
// } from "@chakra-ui/react";
// import { FaSearch } from "react-icons/fa";
// import assignmentData from "../data/assignmentDetails";

// const PhysDetails = () => {
//   const [selectedAssignment, setSelectedAssignment] = useState(null);
//   const [selectedAssignmentDetails, setSelectedAssignmentDetails] = useState(null);

//   const handleViewDetails = (assignmentId) => {
//     const assignment = assignmentData.find((a) => a.id === assignmentId);
//     setSelectedAssignment(assignmentId);
//     setSelectedAssignmentDetails(assignment);
//   };

//   const clearSelection = () => {
//     setSelectedAssignment(null);
//     setSelectedAssignmentDetails(null);
//   };

//   return (
//     <Box width={"100%"} h={"100%"} bg={"#F1F5F8"} borderRadius={"26px"}>
//       <HStack spacing={"10px"} alignItems="center" ml={"33px"} mt={"27px"}>
//         <Box
//           width={"12px"}
//           height={"25px"}
//           borderRadius={"20px"}
//           bg={"#3C8DBC"}
//         ></Box>
//         <Text fontSize={"19px"} lineHeight={"24px"}>
//           Assignments (Physics)
//         </Text>
//         <InputGroup m={4} w={"220px"} ml={"320px"}>
//           <InputLeftElement pointerEvents="none">
//             <FaSearch color="#000000" />
//           </InputLeftElement>
//           <Input placeholder="Search" w={"240px"} />
//         </InputGroup>
//       </HStack>

//       <Stack>
//         <Flex
//           flexWrap="wrap"
//           mt={"37px"}
//           ml={"27px"}
//           mr={"20px"}
//           gap={"23px"}
//           justifyContent="space-between" // To distribute cards evenly in a row
//         >
//           {assignmentData.map((assignmentScreen) => (
//             <div key={assignmentScreen.id} style={{ flexBasis: "30%" }}>
//               <Card
//                 w="100%" // Card takes up full width of its container
//                 blendMode={"multiply"}
//                 bg={"#F1F5F8"}
//                 borderRadius={"18px"}
//               >
//                 {/* Card Content */}
//                 <Text
//                   fontSize={"15px"}
//                   lineHeight={"18px"}
//                   ml={"13px"}
//                   mt={"16px"}
//                 >
//                   {assignmentScreen.chapterName}
//                 </Text>
//                 {/* ... other card content ... */}
//                 <Button
//                   variant={"ghost"}
//                   color={"#3C8DBC"}
//                   fontWeight={"600"}
//                   fontSize={"14px"}
//                   lineHeight={"16px"}
//                   p={6}
//                   m={"5px"}
//                   onClick={() => handleViewDetails(assignmentScreen.id)}
//                 >
//                   View Details
//                 </Button>
//               </Card>
//             </div>
//           ))}
//         </Flex>
//       </Stack>
//       {/* Assignment Details Section */}
//       {selectedAssignmentDetails && (
//         <Box
//           mt={"20px"}
//           w="100%"
//           bg={"#F1F5F8"}
//           borderRadius={"26px"}
//           ml={"27px"}
//           p={"20px"}
//         >
//           <Text fontSize={"15px"} lineHeight={"18px"} fontWeight="bold">
//             Assignment Details
//           </Text>
//           <Text fontSize={"12px"} color={"#2C332978"} mt={"10px"}>
//             {selectedAssignmentDetails.description}
//           </Text>
//           <Input type="file" mt="10px" />
//           <Button
//             variant={"ghost"}
//             color={"#3C8DBC"}
//             fontWeight={"600"}
//             fontSize={"14px"}
//             lineHeight={"16px"}
//             mt={"10px"}
//             onClick={clearSelection}
//           >
//             Close
//           </Button>
//         </Box>
//       )}
//     </Box>
//   );
// };

// export default PhysDetails;




