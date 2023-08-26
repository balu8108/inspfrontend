import React from "react";
import Header from "../components/Header";
import Details from "../components/Detailing";
import Scheduling from "../components/Scheduling";
import { Flex, VStack } from "@chakra-ui/react";
const mathsScreen=()=>{
    return (
        <Flex >
            <VStack>
                <Header/>
                <Details/>
            </VStack>
            <Scheduling/>
        </Flex>
    )
}
export default mathsScreen