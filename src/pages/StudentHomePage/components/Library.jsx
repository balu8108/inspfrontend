// import React from "react";
// import {
//   Box,
//   Button,
//   Flex,
//   Text,
//   Card,
//   useTheme,
//   HStack,
// } from "@chakra-ui/react";
// import libraryData from "../data/library";
// const Library = () => {
//   const { primaryBlue, mainTextColor } = useTheme().colors.pallete;
//   return (
//     <>
//       <Box
       
//         w={"full"}
//         height={"313px"}
//        bg={"#F1F5F8"}
//         borderRadius={"26px"}
//         mt={"24px"}
//       >
//         <HStack spacing={"10px"}>
//           <Box
//             bg={primaryBlue}
//             width="12px"
//             height="25px"
//             borderRadius={"20px"}
//             ml={"33px"}
//             mt={"27px"}
//           ></Box>
//           <Flex justifyContent={"space-between"}  alignItems={"center"}>
//           <Text
//             fontSize={"20px"}
//             lineHeight={"24.2px"}
//             color={mainTextColor}
//             mt={"27.5px"}
//           >
//             Library
//           </Text>
//           <Button variant={"ghost"} fontSize={"13px"} fontWeight={"400"}>
//             See All
//           </Button>
//           </Flex>
          
//         </HStack>

//         <Flex m={"24px"} gap={10} >
//           {libraryData.map((library) => (
//             <Card
//               key={library.id}
//               borderRadius={"18px"}
//               blendMode={"multiply"}
//               backgroundColor={"#F1F5F8"}
//             >
//               <Text
//                 fontSize={"14px"}
//                 fontWeight={"400px"}
//                 lineHeight={"19.36px"}
//                 color={"#2C3329"}
//                 mt={"13px"}
//                 ml={"13px"}
//               >
//                 {library.subjectName}
//               </Text>
//               <Text
//                 mt={"14px"}
//                 ml={"13px"}
//                 fontSize={"12px"}
//                 lineHeight={"14.52px"}
//               >
//                 Description
//               </Text>
//               <Text
//                 color={"#2C332978"}
//                 mt={"6px"}
//                 fontSize={"12px"}
//                 lineHeight={"21px"}
//                 ml={"13.99px"}
//                 fontWeight={"400px"}
//               >
//                 {library.description}
//               </Text>
//               <Button
//                 variant={"ghost"}
//                 color={"#3C8DBC"}
//                 mt={"10"}
//                 fontSize={"14px"}
//                 lineHeight={"16px"}
//                 fontWeight={"600px"}
//               >
//                 View Details
//               </Button>
//             </Card>
//           ))}
//         </Flex>
//       </Box>
//     </>
//   );
// };
// export default Library;


import React from "react";
import {
  Box,
  Button,
  Flex,
  Text,
  Card,
  useTheme,
  HStack,
} from "@chakra-ui/react";
import libraryData from "../data/library";

const Library = () => {
  const { primaryBlue, mainTextColor } = useTheme().colors.pallete;

  return (
    <Box w={"full"} height={"313px"} bg={"#F1F5F8"} borderRadius={"26px"} mt={"24px"}>
      <HStack spacing={"10px"}>
        <Box
          bg={primaryBlue}
          width="12px"
          height="25px"
          borderRadius={"20px"}
          ml={"33px"}
          mt={"27px"}
        ></Box>
        <Flex justifyContent={"space-between"} alignItems={"center"} width="100%" mr={4}>
          <Text
            fontSize={"20px"}
            lineHeight={"24.2px"}
            color={mainTextColor}
            mt={"27.5px"}
          >
            Library
          </Text>
          <Button variant={"ghost"} fontSize={"13px"} fontWeight={"400"}>
            See All
          </Button>
        </Flex>
      </HStack>

      <Flex m={"24px"} gap={10}>
        {libraryData.map((library) => (
          <Card
            key={library.id}
            borderRadius={"18px"}
            blendMode={"multiply"}
            backgroundColor={"#F1F5F8"}
           
          >
            <Text
              fontSize={"14px"}
              fontWeight={"400px"}
              lineHeight={"19.36px"}
              color={"#2C3329"}
              mt={"13px"}
              ml={"13px"}
            >
              {library.subjectName}
            </Text>
            <Text mt={"14px"} ml={"13px"} fontSize={"12px"} lineHeight={"14.52px"}>
              Description
            </Text>
            <Text
              color={"#2C332978"}
              mt={"6px"}
              fontSize={"12px"}
              lineHeight={"21px"}
              ml={"13.99px"}
              fontWeight={"400px"}
            >
              {library.description}
            </Text>
            <Button
              variant={"ghost"}
              color={"#3C8DBC"}
              mt={"10"}
              mb={"7px"}
              fontSize={"14px"}
              lineHeight={"16px"}
              fontWeight={"600"}
            >
              View Details
            </Button>
          </Card>
        ))}
      </Flex>
    </Box>
  );
};

export default Library;


