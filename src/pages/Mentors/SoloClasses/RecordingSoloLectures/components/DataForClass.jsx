import React, { useState, useEffect } from "react";
import {
  Box,
  HStack,
  Text,
  Stack,
  Flex,
  Icon,
  Spacer,
  Button,
} from "@chakra-ui/react";
import { FaCircle } from "react-icons/fa";
import { BsDownload } from "react-icons/bs";
import { BASE_URL } from "../../../../../constants/staticurls";
import { boxShadowStyles, checkUserType } from "../../../../../utils";
import { userType, fileTypes } from "../../../../../constants/staticvariables";
import FileBoxComponent from "../../../../../components/filebox/FileBoxComponent";
import axios from "axios";
import { useParams } from "react-router";

const DataForClass = () => {
  const userRoleType = checkUserType();
  const [data, setData] = useState({
    topic: "",
    description: "",
    agenda: "",
    soloClassRoomFile: [],
  });

  const { soloClassRoomId } = useParams();

  useEffect(() => {
    // Fetch data from your API
    axios
      .get(
        `${BASE_URL}/solo-lecture/get-details-data-for-class/${soloClassRoomId}`
      )
      .then((response) => {
        const { topic, description, agenda } =
          response.data.soloClassroomDetails;
        const soloClassRoomFile = response.data.soloClassRoomFile;

        setData({
          topic,
          description,
          agenda,
          soloClassRoomFile,
        });
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setData({ topic: "", description: "", agenda: "", files: [] });
      });
  }, [soloClassRoomId]);

  return (
    <Box
      w="25%"
      h={"full"}
      borderRadius={"12px"}
      boxShadow={boxShadowStyles.mainBoxShadow.boxShadow}
      bg="white"
    >
      <HStack spacing={"10px"}>
        <Box
          width={"12px"}
          height={"25px"}
          borderRadius={"20px"}
          bg={"#3C8DBC"}
          mt={"27px"}
          ml={"27px"}
        ></Box>
        <Text
          fontSize={"20px"}
          lineHeight={"24px"}
          fontFamily={400}
          mt={"26px"}
        >
          Solo Recording
        </Text>
      </HStack>

      <Stack ml={"12px"} spacing={"25px"}>
        <Box mt={"38px"}>
          <Text p={"13px"}> {data.topic}</Text>
        </Box>
        <Box>
          <Text p={"13px"}>Description</Text>
          <Text
            fontSize={"12px"}
            lineHeight={"21px"}
            color={"#2C332978"}
            ml={"12px"}
          >
            {data.description}
          </Text>
        </Box>
        <Stack ml={"12px"}>
          <Text>Agenda</Text>
          <Text
            fontSize={"12px"}
            lineHeight={"14px"}
            color={"#2C332978"}
            ml={2}
          >
            {data.agenda}
          </Text>
        </Stack>

        <Box m={"12px"}>
          <Text>Files</Text>
          {/* {userRoleType === userType.teacher && ( */}
          <FileBoxComponent
            data={data.soloClassRoomFile}
            type={fileTypes.solo}
          />
          {/* )} */}
        </Box>
      </Stack>
    </Box>
  );
};

export default DataForClass;
