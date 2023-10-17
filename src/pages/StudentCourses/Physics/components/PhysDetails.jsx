import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Box,
  Text,
  HStack,
  Card,
  Flex,
  Button,
  Stack,
  Spinner,
  Center,
  Spacer,
  Input,
} from "@chakra-ui/react";
import physDetailsData from "../data/physicsDetails";
import { fetchAllTopicsWithoutChapterIdApi } from "../../../../api/inspexternalapis";

const PhysDetails = () => {
  const [topics, setTopics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    async function fetchPhysicsTopics() {
      try {
        const response = await fetchAllTopicsWithoutChapterIdApi("Physics");
        if (response.status) {
          setTopics(response.result);
        }
      } catch (error) {
        console.error("Error fetching physics topics:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchPhysicsTopics();
  }, []);
  const filteredTopics = topics.filter((physScreen) =>
    physScreen.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Box width={"full"} bg={"#F1F5F8"} borderRadius={"26px"}>
      <Flex mt={"17px"} >
        <HStack spacing={"10px"} alignItems="center" ml={"33px"} >
          <Box
            width={"12px"}
            height={"25px"}
            borderRadius={"20px"}
            bg={"#3C8DBC"}
          ></Box>
          <Text fontSize={"19px"} lineHeight={"24px"} >
            My Courses (Physics)
          </Text>
        </HStack>
        <Spacer />
        <Input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search..."
          w="30%"
          border="1px solid #ccc"
          borderRadius="md"
          px="3"
          py="2"
          mx={"10"}
        />
      </Flex>

      {loading ? (
        <Center>
          <Spinner size={"md"} />
        </Center>
      ) : (
        <Stack>
          <Flex flexWrap="wrap" p={6} gap={"24px"}>
            {filteredTopics.map((physScreen) => (
              <Card
                key={physScreen.id}
                w="30%"
                h={"204px"}
                blendMode={"multiply"}
                bg={"#F1F5F8"}
                borderRadius={"18px"}
              >
                <Text
                  fontSize={"16px"}
                  fontWeight={400}
                  ml={"13px"}
                  mt={"16px"}
                  lineHeight={"19px"}
                  noOfLines={1}
                >
                  {physScreen.name}
                </Text>
                <Text
                  fontWeight={400}
                  fontSize={"12px"}
                  lineHeight={"15px"}
                  ml={"13px"}
                  color={"rgba(44, 51, 41, 0.47)"}
                >
                  {/* {physScreen.instructorName} */}
                  Nitin Sachan
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
                  color={"rgba(44, 51, 41, 0.47)"}
                >
                  {/* {physScreen.description} */}
                  No Data
                </Text>
                <Link
                  to={`/student/chapter`}
                  style={{ display: "flex", justifyContent: "center" }}
                >
                  <Button
                    variant={"ghost"}
                    color={"#3C8DBC"}
                   
                    size={"14px"}
                    lineHeight={"16px"}
                    p={6}
                    mt={"10"}
                  >
                    View Details
                  </Button>
                </Link>
              </Card>
            ))}
          </Flex>
        </Stack>
      )}
    </Box>
  );
};

export default PhysDetails;
