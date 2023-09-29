// import React, { useState } from "react";
// import {
//   Box,
//   Flex,
//   HStack,
//   Text,
//   Input,
//   Spacer,
//   SimpleGrid,
//   Button,
//   Card,
// } from "@chakra-ui/react";
// import uploadedChapterDetails from "../data/uploadingDetails";
// const AllUploadedLecture = () => {
//   const [searchQuery, setSearchQuery] = useState("");

//   const handleSearchChange = (event) => {
//     setSearchQuery(event.target.value);
//     // You can perform search-related logic here
//   };

//   return (
//     <Box bg={"#F1F5F8"} width={"250%"} mt={"24px"} borderRadius={"26px"} h={"full"}>
//       <Flex>
//         <HStack spacing={"10px"} ml="27px">
//           <Box
//             width={"12px"}
//             height={"25px"}
//             borderRadius={"20px"}
//             bg={"#3C8DBC"}
//           ></Box>
//           <Text fontSize={"20px"} lineHeight={"24px"} fontFamily={400}>
//             My Uploads
//           </Text>
//         </HStack>

//         <Spacer />
//         <Input
//           type="text"
//           value={searchQuery}
//           onChange={handleSearchChange}
//           placeholder="Search"
//           w="30%"
//           border="1px solid #ccc"
//           borderRadius="md"
//           px="3"
//           py="2"
//           mx={12}
//           my={"17"}
//         />
//       </Flex>

//       <SimpleGrid
//         columns={{ base: 1, md: 2, lg: 3 }}
//         spacing={"6"}
//         p={4}
//         mr={"20px"}
//       >
//         {uploadedChapterDetails.map((chapter) => (
//           <Card
//             w={"100%"}
//             h={"200px"}
//             key={chapter.id}
//             bg={"#F1F5F8"}
//             blendMode={"multiply"}
//             borderRadius={"26px"}
//             p={4}
//             ml={"2"}
//           >
//             <Text fontSize="16px">{chapter.chapterName}</Text>
//             <Text fontSize="12px" color={"#2C332978"}>
//               {chapter.instructorName}
//             </Text>
//             <Text fontSize={"12px"} mt={"18px"}>
//               Description
//             </Text>
//             <Text fontSize="11px" color="#2C332978" noOfLines={2} mb={2}>
//               {chapter.description}
//             </Text>
//             <Button variant={"ghost"} color={"#3C8DBC"} mt={"4"}>
//               View Details
//             </Button>
//           </Card>
//         ))}
//       </SimpleGrid>
//     </Box>
//   );
// };
// export default AllUploadedLecture;



import React, { useState } from "react";
import {
  Box,
  Text,
  HStack,
  Card,
  Flex,
  Button,
  Stack,
  SimpleGrid,
  Input,
  InputGroup,
  InputLeftElement,
  Icon,
} from "@chakra-ui/react";
import { FaSearch } from "react-icons/fa";
import { BsDownload } from "react-icons/bs";
import uploadedChapterDetails from "../data/uploadingDetails";

const AllUploadedLecture = () => {
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
          My Uploads
        </Text>
        <InputGroup m={4} w={"220px"} ml={"320px"}>
          <InputLeftElement pointerEvents="none">
            <FaSearch color="#000000" />
          </InputLeftElement>
          <Input placeholder="Search" w={"240px"} />
        </InputGroup>
      </HStack>
      <SimpleGrid
        columns={{ base: 1, md: 1, lg: 1 }}
        spacing={"6"}
        p={4}
        mr={"20px"}
      >
        {uploadedChapterDetails.map((assignmentScreen) => (
          <Card
            w="100%"
            blendMode={"multiply"}
            bg={"#F1F5F8"}
            borderRadius={"18px"}
            key={assignmentScreen.id}
          >
            <Text fontSize={"15px"} lineHeight={"18px"} ml={"13px"} mt={"16px"}>
              {assignmentScreen.chapterName}
            </Text>
            <Text
              fontWeight={400}
              fontSize={"12px"}
              lineHeight={"14px"}
              ml={"13px"}
              mt={"3px"}
              color={"#2C332978"}
            >
              {assignmentScreen.instructorName}
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
              noOfLines={2}
            >
              {assignmentScreen.description}
            </Text>
            <Box
              flex={1}
              display="flex"
              justifyContent="flex-end"
              gap={4}
              my={"13px"}
              mx={"25px"}
            >
              {assignmentScreen.files.map((files, index) => (
                <Flex
                  key={index}
                  flex={1}
                  bg={"blackAlpha.100"}
                  mt={"12px"}
                  color={"#2C332978"}
                  p={"9px"}
                  borderRadius={"6px"}
                  border={"1px"}
                  borderColor={"#9597927D"}
                  boxShadow={"md"}
                  h={"49px"}
                  fontSize={"11px"}
                >
                  {files}
                  <Button
                    rightIcon={<BsDownload />}
                    variant={"ghost"}
                    size="sm"
                    color={"black"}
                    ml={2}
                  ></Button>
                </Flex>
              ))}
            </Box>
          </Card>
        ))}
      </SimpleGrid>
    </Box>
  );
};

export default AllUploadedLecture;
