import React, { useState, useEffect } from "react";
import { Box, HStack, Text, Stack, useTheme } from "@chakra-ui/react";

import { BASE_URL } from "../../../../../constants/staticurls";
import { boxShadowStyles, capitalize } from "../../../../../utils";
import { fileTypes } from "../../../../../constants/staticvariables";
import FileBoxComponent from "../../../../../components/filebox/FileBoxComponent";
import axios from "axios";
import { useParams } from "react-router";

const DataForClass = () => {
  const [data, setData] = useState({
    topic: "",
    description: "",
    agenda: "",
    soloClassRoomFile: [],
  });
  const { outerBackground } = useTheme().colors.pallete;

  const { soloClassRoomId } = useParams();

  useEffect(() => {
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
      bg={outerBackground}
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
          <Text p={"13px"}>{capitalize(data?.topic)}</Text>
        </Box>
        <Box>
          <Text p={"13px"}>Description</Text>
          <Text
            fontSize={"12px"}
            lineHeight={"21px"}
            color={"#2C332978"}
            ml={"12px"}
          >
            {data.description ? data.description : "No Data"}
          </Text>
        </Box>

        <Box m={"12px"}>
          <Text fontSize={"16px"} lineHeight={"19px"}>
            Agenda
          </Text>

          <Box mt={"16px"}>
            {data.agenda.split("\r\n").map((agendaItem, index) => (
              <Stack
                key={index}
                spacing={1}
                direction="row"
                alignItems="center"
                mt={"10px"}
              >
                <Box
                  w={"15px"}
                  h={"15px"}
                  bg="#C3C3C3"
                  borderRadius="20px"
                  mr={2}
                  blendMode={"multiply"}
                  display={agendaItem ? "block" : "none"}
                ></Box>
                <Text fontSize={"12px"} lineHeight={"14px"} color={"#2C332978"}>
                  {agendaItem ? agendaItem : "No Data"}
                </Text>
              </Stack>
            ))}
          </Box>
        </Box>

        <Box m={"12px"}>
          <Text>Files</Text>

          {data.soloClassRoomFile.length > 0 ? (
            <FileBoxComponent
              data={data.soloClassRoomFile}
              type={fileTypes.solo}
            />
          ) : (
            <Text
              fontSize={"12px"}
              lineHeight={"14px"}
              color={"#2C332978"}
              mt={3}
            >
              No Data.
            </Text>
          )}
        </Box>
      </Stack>
    </Box>
  );
};

export default DataForClass;
