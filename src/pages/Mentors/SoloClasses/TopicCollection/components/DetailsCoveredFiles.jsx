// import React, { useState, useEffect } from "react";
// import {
//   Box,
//   HStack,
//   Text,
//   Stack,
//   Flex,
//   Button,
//   Spacer,
//   Image,
// } from "@chakra-ui/react";
// import detailsCoveredData from "../data/detailsCoveredData";
// import defaultImageUrl from "../../../../../assets/images/image1.png";
// import { Link } from "react-router-dom";
// import { BsDownload } from "react-icons/bs";
// import axios from "axios";

// const DetailsCoveredFiles = ( {viewTopic}) => {
//   const [topic, selectedTopic] = useState([]);
//   const [topicDetails, setTopicDetails] = useState(null);
//   const apiUrl = "http://localhost:5000";

// console.log("topic id  when  clicking on view details is ", viewTopic);

// const fetchTopicDetails = async (topicId) => {
//   try {
//     const response = await axios.get(
//       `${apiUrl}/solo-lecture/get-topic-details/${topicId}`
//     );
//     const topicDetailsData = response.data;

//     // Update the state with the received topic details
//     setTopicDetails(topicDetailsData);
//   } catch (error) {
//     console.error("Error fetching topic details:", error);
//     // Handle errors as needed
//   }
// };

// useEffect(() => {
//   if (viewTopic !== null) {
//     // Call the fetchTopicDetails function when viewTopic changes
//     fetchTopicDetails(viewTopic);
//   }
// }, [viewTopic]);

//   return (
//     <Box bg={"#F1F5F8"} borderRadius={"26px"} w={"100%"}>
//       <HStack spacing={"10px"} p={6}>
//         <Box
//           width={"12px"}
//           height={"25px"}
//           borderRadius={"20px"}
//           bg={"#3C8DBC"}
//         ></Box>
//         <Text fontSize={"19px"} lineHeight={"24px"}>
//           Details
//         </Text>
//       </HStack>
//       <Stack ml={"20px"}>
//         {topicDetails  (
//           <Flex key={topicDetails.id} p={4}>
//             <Box flex={1}>
//               <Text>Description</Text>

//               <Text fontSize={"12px"} color={"#2C332978"} mt={"15px"}>
//                 {topicDetails.description}
//               </Text>
//             </Box>

//             <Box flex={1} ml={"24px"}>
//               <Text fontSize="md">Agenda</Text>
//               <ul
//                 style={{
//                   listStyle: "circle",
//                   fontSize: "12px",
//                   lineHeight: "20px",
//                   color: "#2C332978",
//                   marginTop: "15px",
//                 }}
//               >
//                 {topicDetails.agenda.map((agendaItem, index) => (
//                   <li key={index}>{agendaItem}</li>
//                 ))}
//               </ul>
//             </Box>
//           </Flex>
//         )}

//         <Box p={"13px"}>
//           <Text>Recordings</Text>
//           {/* {detailsCoveredData.map((topicInfo) => (
//             <Flex
//               key={topicInfo.id}
//               mt={"15px"}
//               color={"#2C332978"}
//               fontSize={"13px"}
//               gap={"24px"}
//             >
//               {topicInfo.recordings.map((id) => (
//                 <Flex key={id} w={"15%"} h={"15%"}>
//                    <Link to="/view-recording">
//                     <Image src={defaultImageUrl} alt="Default Image" />
//                   </Link>

//                   <Link to={`/view-recording?topicId=${topicInfo.id}`}>
//                     <Image src={defaultImageUrl} alt="Default Image" />
//                   </Link>
//                 </Flex>
//               ))}
//             </Flex>
//           ))} */}
//         </Box>

// {/*
//         <Box p={"13px"}>
//           <Text>Files/Notes</Text>
//           {detailsCoveredData.map((topicInfo) => (
//             <Flex
//               key={topicInfo.id}
//               mt={"15px"}
//               color={"#2C332978"}
//               fontSize={"13px"}
//             >
//               {topicInfo.filesOrNotes.map((fileOrNote, index) => (
//                 <Flex
//                   key={index}
//                   mr={"10px"}
//                   p={"9px"}
//                   borderRadius={"6px"}
//                   border={"1px"}
//                   borderColor={"#9597927D"}
//                   boxShadow={"md"}
//                   h={"49px"}
//                   alignItems={"center"}
//                 >
//                   {fileOrNote}
//                   <Spacer />
//                   <Button
//                     rightIcon={<BsDownload />}
//                     variant={"ghost"}
//                     color={"black"}
//                     ml={2}
//                   ></Button>
//                 </Flex>
//               ))}
//             </Flex>
//           ))}
//         </Box> */}
//       </Stack>
//     </Box>
//   );
// };
// export default DetailsCoveredFiles;






// import React, { useState, useEffect } from "react";
// import {
//   Box,
//   HStack,
//   Text,
//   Stack,
//   Flex,
//   Button,
//   Spacer,
//   Image,
// } from "@chakra-ui/react";
// import defaultImageUrl from "../../../../../assets/images/image1.png";
// import { BsDownload } from "react-icons/bs";
// import axios from "axios";
// import { multiply } from "lodash";

// const DetailsCoveredFiles = ({ viewTopic }) => {
//   const [topicDetails, setTopicDetails] = useState(null);

//   const apiUrl = "http://localhost:5000";

//   // Function to fetch topic details
//   const fetchTopicDetails = async (topicId) => {
//     try {
//       const response = await axios.get(
//         `${apiUrl}/solo-lecture/get-topic-details/${topicId}`
//       );
//       const topicDetailsData = response.data;

//       // Update the state with the received topic details
//       setTopicDetails(topicDetailsData);
//     } catch (error) {
//       console.error("Error fetching topic details:", error);
//       // Handle errors as needed
//     }
//   };

//   // Use the useEffect hook to fetch topic details when the viewTopic prop changes
//   useEffect(() => {
//     if (viewTopic !== null) {
//       // Call the fetchTopicDetails function when viewTopic changes
//       fetchTopicDetails(viewTopic);
//     }
//   }, [viewTopic]);

//   return (
//     <Box bg={"#F1F5F8"} borderRadius={"26px"} w={"100%"}>
//       <HStack spacing={"10px"} p={6}>
//         <Box
//           width={"12px"}
//           height={"25px"}
//           borderRadius={"20px"}
//           bg={"#3C8DBC"}
//         />
//         <Text fontSize={"19px"} lineHeight={"24px"}>
//           Details
//         </Text>
//       </HStack>

//       {topicDetails && topicDetails.length > 0 ? (
//         // Render the sections if topicDetails is not undefined and contains data
//         topicDetails.map((topicInfo, index) => (
//           <Box ml={"20px"}>
//             <HStack key={topicInfo.id}>
//               <Box flex={1}>
//                 {index === 0 && <Text p={"13px"} >Description</Text>}
//                 {topicInfo.description.split("\n").map((item, i) => (
//                   <HStack key={i} spacing={"5px"}>
//                     <Box
//                       width={"5px"}
//                       height={"5px"}
//                       borderRadius={"50%"}
//                       bg={"#2C332978"}
//                       ml={"10px"}
//                     ></Box>
//                     <Text fontSize={"12px"} color={"#2C332978"}>
//                       {item}
//                     </Text>
//                   </HStack>
//                 ))}
//               </Box>
//               <Spacer/>
//               <Box flex={1} ml={"24px"}>
//                 {index === 0 && <Text p={"13px"}>Agenda</Text>}
//                 {topicInfo.agenda.split("\n").map((item, i) => (
//                   <HStack key={i} spacing={"5px"}>
//                     <Box
//                       width={"5px"}
//                       height={"5px"}
//                       borderRadius={"50%"}
//                       bg={"#2C332978"}
//                       ml={"10px"}
//                     ></Box>
//                     <Text fontSize={"12px"} color={"#2C332978"} lineHeight={"21px"}>
//                       {item}
//                     </Text>
//                   </HStack>
//                 ))}
//               </Box>
//             </HStack>
//           </Box>
//         ))
//       ) : (
//         // Render a message or placeholder content when topicDetails is undefined or empty
//         <Box p={4}>
//           <Text>No details available for this topic.</Text>
//         </Box>
//       )}

//       <HStack ml={"20px"}>
//         {topicDetails && topicDetails.length > 0 ? (
//           // Render the sections if topicDetails is not undefined and contains data
//           topicDetails.map((topicInfo, index) => (
//             <Box key={topicInfo.id}>
//               {index === 0 && <Text>Files</Text>}
//               <Flex>
//                 <Box flex={1} flexShrink={"1"}>
//                   {topicInfo.soloClassRoomFiles.map((file, fileIndex) => (
//                     <Box
//                       key={fileIndex}
//                       mr="10px"
//                       borderRadius={6}
//                       bg={"#F1F5F8"}
//                       blendMode={"multiply"}
//                       p={3}
//                     >
//                       <Flex>
//                         <Text fontSize={"12px"}>{file.key}</Text>
//                         <a
//                           href={file.url}
//                           target="_blank"
//                           rel="noopener noreferrer"
//                         >
//                           <Button
//                             rightIcon={<BsDownload />}
//                             variant={"ghost"}
//                             color={"black"}
//                             ml={2}
//                           >
//                             Download
//                           </Button>
//                         </a>
//                       </Flex>
//                     </Box>
//                   ))}
//                 </Box>
//               </Flex>
//             </Box>
//           ))
//         ) : (
//           // Render a message or placeholder content when topicDetails is undefined or empty
//           <Box p={4}>
//             <Text>No details available for this topic.</Text>
//           </Box>
//         )}
//       </HStack>
//     </Box>
//   );
// };

// export default DetailsCoveredFiles;




















import React, { useState, useEffect } from "react";
import {
  Box,
  HStack,
  Text,
  Stack,
  Flex,
  Button,
  Spacer,
  Image,
} from "@chakra-ui/react";
import defaultImageUrl from "../../../../../assets/images/image1.png";
import { BsDownload } from "react-icons/bs";
import axios from "axios";
import { multiply } from "lodash";

const DetailsCoveredFiles = ({ viewTopic }) => {
  const [topicDetails, setTopicDetails] = useState(null);

  const apiUrl = "http://localhost:5000";

  // Function to fetch topic details
  const fetchTopicDetails = async (topicId) => {
    try {
      const response = await axios.get(
        `${apiUrl}/solo-lecture/get-topic-details/${topicId}`
      );
      const topicDetailsData = response.data;

      // Update the state with the received topic details
      setTopicDetails(topicDetailsData);
    } catch (error) {
      console.error("Error fetching topic details:", error);
      // Handle errors as needed
    }
  };

  // Use the useEffect hook to fetch topic details when the viewTopic prop changes
  useEffect(() => {
    if (viewTopic !== null) {
      // Call the fetchTopicDetails function when viewTopic changes
      fetchTopicDetails(viewTopic);
    }
  }, [viewTopic]);

  return (
    <Box bg={"#F1F5F8"} borderRadius={"26px"} w={"100%"}>
      <HStack spacing={"10px"} p={6}>
        <Box
          width={"12px"}
          height={"25px"}
          borderRadius={"20px"}
          bg={"#3C8DBC"}
        />
        <Text fontSize={"19px"} lineHeight={"24px"}>
          Details
        </Text>
      </HStack>

      {topicDetails && topicDetails.length > 0 ? (
        // Render the sections if topicDetails is not undefined and contains data
        topicDetails.map((topicInfo, index) => (
          <Box ml={"20px"} key={topicInfo.id}>
            <HStack>
              <Box flex={1}>
                {index === 0 && <Text p={"13px"}>Description</Text>}
                {topicInfo.description.split("\n").map((item, i) => (
                  <HStack key={i} spacing={"5px"}>
                    <Box
                      width={"5px"}
                      height={"5px"}
                      borderRadius={"50%"}
                      bg={"#2C332978"}
                      ml={"10px"}
                    ></Box>
                    <Text fontSize={"12px"} color={"#2C332978"}>
                      {item}
                    </Text>
                  </HStack>
                ))}
              </Box>
              <Spacer />
              <Box flex={1} ml={"24px"}>
                {index === 0 && <Text p={"13px"}>Agenda</Text>}
                {topicInfo.agenda.split("\n").map((item, i) => (
                  <HStack key={i} spacing={"5px"}>
                    <Box
                      width={"5px"}
                      height={"5px"}
                      borderRadius={"50%"}
                      bg={"#2C332978"}
                      ml={"10px"}
                    ></Box>
                    <Text fontSize={"12px"} color={"#2C332978"} lineHeight={"21px"}>
                      {item}
                    </Text>
                  </HStack>
                ))}
              </Box>
            </HStack>
          </Box>
        ))
      ) : (
        // Render a message or placeholder content when topicDetails is undefined or empty
        <Box p={4}>
          <Text>No details available for this topic.</Text>
        </Box>
      )}

      {/* "Files" section inside the main box */}
      <HStack ml={"20px"}>
        {topicDetails && topicDetails.length > 0 ? (
          // Render the sections if topicDetails is not undefined and contains data
          topicDetails.map((topicInfo, index) => (
            <Box key={topicInfo.id}>
              {index === 0 && <Text>Files</Text>}
              <Flex>
                <Box flex={1} flexShrink={"1"}>
                  {topicInfo.soloClassRoomFiles.map((file, fileIndex) => (
                    <Box
                      key={fileIndex}
                      mr="10px"
                      borderRadius={6}
                      bg={"#F1F5F8"}
                      blendMode={"multiply"}
                      p={3}
                    >
                      <Flex>
                        <Text fontSize={"12px"}>{file.key}</Text>
                        <a
                          href={file.url}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Button
                            rightIcon={<BsDownload />}
                            variant={"ghost"}
                            color={"black"}
                            ml={2}
                          >
                            Download
                          </Button>
                        </a>
                      </Flex>
                    </Box>
                  ))}
                </Box>
              </Flex>
            </Box>
          ))
        ) : (
          // Render a message or placeholder content when topicDetails is undefined or empty
          <Box p={4}>
            <Text>No details available for this topic.</Text>
          </Box>
        )}
      </HStack>
    </Box>
  );
};

export default DetailsCoveredFiles;

