import { Box } from "@chakra-ui/react";
import image1 from "../../../assets/images/image1.png";

const ViewRecording = () => {
  return (
    <Box
      w={"100%"}
      h={"500px"}
      bg={"#FFFFFF"}
      boxShadow="2px 2px 13px 0px #5C5C5C1F"
      borderRadius={"18px"}
    >
      <img src={image1} alt="Image 1" width="100%" />
    </Box>
  );
};

export default ViewRecording;
