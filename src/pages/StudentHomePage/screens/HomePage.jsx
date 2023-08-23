import React from "react";
import { Box, Heading, Flex, Button } from "@chakra-ui/react";
import MyCourses from "../components/MyCourses";
import Improvement from "../components/Improvement";
const HomePage=()=>{
return (
    <Box>
       <MyCourses />
       <Improvement />

    </Box>
)
}
export default HomePage;