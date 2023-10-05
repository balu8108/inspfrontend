// // this is the screen where all the topics will come  of the chapters.
// import React, { useState, useEffect } from "react";
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
// import { Link } from "react-router-dom";
// import { fetchAllTopicsWithoutChapterIdApi } from "../../../../api/inspexternalapis/index";
// import rateNFeedbackDetails from "../data/feedbackData";
// const AllUploadedLecture = () => {
//   const [allTopicList, setAllTopicList] = useState([]);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [topics, setTopics] = useState([]);

//   const handleSearchChange = (event) => {
//     setSearchQuery(event.target.value);
//   };

//   useEffect(() => {
//     async function fetchAllTopicsWithoutChapterId() {
//       try {
//         const response = await fetchAllTopicsWithoutChapterIdApi(); // Fetch topics without the Chapter Id
//         console.log("Topics Api Without the Chapter Id", response);
//         if (response.status) {
//           setAllTopicList(response.result);
//         }
//       } catch (error) {
//         console.error("Error fetching topics data:", error);
//       }
//     }

//     fetchAllTopicsWithoutChapterId();
//   }, []);

//   return (
//     <Box
//       bg={"#F1F5F8"}
//       width={"250%"}
//       h={"full"}
//       mt={"24px"}
//       borderRadius={"26px"}
//     >
//       <Flex>
//         <HStack spacing={"10px"} ml="27px">
//           <Box
//             width={"12px"}
//             height={"25px"}
//             borderRadius={"20px"}
//             bg={"#3C8DBC"}
//           ></Box>
//           <Text fontSize={"20px"} lineHeight={"24px"}>
//             Rating & feedback
//           </Text>
//         </HStack>

//         <Spacer />
//         <Input
//           type="text"
//           value={searchQuery}
//           onChange={handleSearchChange}
//           placeholder="Search..."
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
//         {allTopicList.map((chapter) => (
//           <Card
//             w={"100%"}
//             h={"204px"}
//             key={chapter.id}
//             bg={"#F1F5F8"}
//             blendMode={"multiply"}
//             borderRadius={"26px"}
//             p={4}
//             ml={"2"}
//           >
//             <Text fontSize="16px" noOfLines={1}>
//               {chapter.name}
//             </Text>
//             <Text fontSize="12px" color={"#2C332978"}>
//               {chapter.instructorName} No Data
//             </Text>
//             <Text fontSize={"12px"} mt={"18px"}>
//               Description
//             </Text>
//             <Text fontSize="11px" color="#2C332978" noOfLines={2} mb={2}>
//               {chapter.description} No Data
//             </Text>
//             <Link
//               to={"/mentor/view/rating&feedback/:topic_id/:topic_name"}
//               style={{ display: "flex", justifyContent: "center" }}
//             >
//               <Button variant={"ghost"} color={"#3C8DBC"} mt={"4"}>
//                 View Details
//               </Button>
//             </Link>
//           </Card>
//         ))}
//       </SimpleGrid>
//     </Box>
//   );
// };

// export default AllUploadedLecture;



import React, { useState, useEffect } from "react";
import {
  Box,
  Flex,
  HStack,
  Text,
  Input,
  Spacer,
  SimpleGrid,
  Button,
  Card,
  Spinner, // Import the Spinner component
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { fetchAllTopicsWithoutChapterIdApi } from "../../../../api/inspexternalapis/index";
import rateNFeedbackDetails from "../data/feedbackData";

const AllUploadedLecture = () => {
  const [allTopicList, setAllTopicList] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  // const [topics, setTopics] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // Add loading state

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  useEffect(() => {
    async function fetchAllTopicsWithoutChapterId() {
      try {
        const response = await fetchAllTopicsWithoutChapterIdApi();
        console.log("Topics Api Without the Chapter Id", response);
        if (response.status) {
          setAllTopicList(response.result);
        }
      } catch (error) {
        console.error("Error fetching topics data:", error);
      } finally {
        setIsLoading(false); // Set loading to false when data is fetched
      }
    }

    fetchAllTopicsWithoutChapterId();
  }, []);

  return (
    <Box
      bg={"#F1F5F8"}
      width={"250%"}
      h={"full"}
      mt={"24px"}
      borderRadius={"26px"}
    >
      <Flex>
        <HStack spacing={"10px"} ml="27px">
          <Box
            width={"12px"}
            height={"25px"}
            borderRadius={"20px"}
            bg={"#3C8DBC"}
          ></Box>
          <Text fontSize={"20px"} lineHeight={"24px"}>
            Rating & feedback
          </Text>
        </HStack>

        <Spacer />
        <Input
          type="text"
          value={searchQuery}
          onChange={handleSearchChange}
          placeholder="Search..."
          w="30%"
          border="1px solid #ccc"
          borderRadius="md"
          px="3"
          py="2"
          mx={12}
          my={"17"}
        />
      </Flex>

      {isLoading ? ( // Show the spinner while loading
        <Flex justify="center" align="center" h="200px">
          <Spinner size="xl" color="blue.500" />
        </Flex>
      ) : (
        <SimpleGrid
          columns={{ base: 1, md: 2, lg: 3 }}
          spacing={"6"}
          p={4}
          mr={"20px"}
        >
          {allTopicList.map((chapter) => (
            <Card
              w={"100%"}
              h={"204px"}
              key={chapter.id}
              bg={"#F1F5F8"}
              blendMode={"multiply"}
              borderRadius={"26px"}
              p={4}
              ml={"2"}
            >
              <Text fontSize="16px" noOfLines={1}>
                {chapter.name}
              </Text>
              <Text fontSize="12px" color={"#2C332978"}>
                {chapter.instructorName} No Data
              </Text>
              <Text fontSize={"12px"} mt={"18px"}>
                Description
              </Text>
              <Text fontSize="11px" color="#2C332978" noOfLines={2} mb={2}>
                {chapter.description} No Data
              </Text>
              <Link
                to={`/mentor/view/rating&feedback/${chapter.id}/${chapter.name}`}
                style={{ display: "flex", justifyContent: "center" }}
              >
                <Button variant={"ghost"} color={"#3C8DBC"} mt={"4"}>
                  View Details
                </Button>
              </Link>
            </Card>
          ))}
        </SimpleGrid>
      )}
    </Box>
  );
};

export default AllUploadedLecture;
