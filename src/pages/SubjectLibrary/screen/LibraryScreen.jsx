import React from "react";
import { Box } from "@chakra-ui/react";
import Library from "../../StudentHomePage/components/Library";
import SubjectLibrary from "../components/Library";
const LibraryScreen = () => {
  return (
    <>
      <Box>
        <Library />
      </Box>
      <SubjectLibrary />
    </>
  );
};
export default LibraryScreen;
