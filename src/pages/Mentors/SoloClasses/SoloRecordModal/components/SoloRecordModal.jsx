// import React from "react";
// import {
//   Box,
//   Flex,
//   Modal,
//   ModalOverlay,
//   ModalContent,
//   ModalHeader,
//   ModalBody,
//   Input,
//   Select,
//   Button,
//   Center,
//   Stack, // Import the Stack component for spacing
// } from "@chakra-ui/react";

// const SoloRecordModal = ({ isOpen, onClose }) => {
//   return (
//     <Modal isOpen={isOpen} onClose={onClose}>
//       <ModalOverlay />
//       <ModalContent>
//         <ModalHeader>Solo Record</ModalHeader>
//         <ModalBody>
//           <Stack>
//             <Box>
//               <Select placeholder="Select Subjects"></Select>
//             </Box>
//             <Box mt={8}>
//               <label placeholder="Topic" />
//             </Box>
//             <Box mt={4}>
//               <Input placeholder="Agenda" />
//             </Box>
//             <Box>
//               <Input placeholder="Enter your description" />
//             </Box>
//             <Flex gap={"26px"}>
//               <Input placeholder="Files To Upload" />
//               <Button
//                 w={"35%"}
//                 bg={"#3C8DBC"}
//                 color={"#FFFFFF"}
//                 fontWeight={500}
//               >
//                 Upload
//               </Button>
//             </Flex>
//             <Center>
//               <Button
//                 w={"35%"}
//                 bg={"#3C8DBC"}
//                 color={"#FFFFFF"}
//                 fontWeight={500}
//               >
//                 Start
//               </Button>
//             </Center>
//           </Stack>
//         </ModalBody>
//       </ModalContent>
//     </Modal>
//   );
// };

// export default SoloRecordModal;


import React from "react";
import {
  Box,
  Flex,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  FormControl,
  FormLabel,
  Input,
  Select,
  Button,
  Center,
  Stack,
} from "@chakra-ui/react";

const SoloRecordModal = ({ isOpen, onClose }) => {
  // Define an array of topics and their related information
  const topics = [
    { label: "Select Subjects", placeholder: "Select Subjects" },
    { label: "Topic", placeholder: " Topic" },
    { label: "Agenda", placeholder: "Agenda" },
    { label: "Description", placeholder: "Description" },
  ];

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Solo Record</ModalHeader>
        <ModalBody>
          <Stack spacing={4}>
            {topics.map((topic, index) => (
              <FormControl isRequired key={index}>
                <FormLabel>{topic.label}</FormLabel>
                <Input placeholder={topic.placeholder} />
              </FormControl>
            ))}
            <Flex gap={"26px"}>
              <Input placeholder="Files To Upload" />
              <Button
                w={"35%"}
                bg={"#3C8DBC"}
                color={"#FFFFFF"}
                fontWeight={500}
              >
                Upload
              </Button>
            </Flex>
            <Center>
              <Button
                w={"35%"}
                bg={"#3C8DBC"}
                color={"#FFFFFF"}
                fontWeight={500}
              >
                Start
              </Button>
            </Center>
          </Stack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default SoloRecordModal;
