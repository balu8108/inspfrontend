import { useState } from "react";
import { Box, Text, useTheme, useDisclosure } from "@chakra-ui/react";
import { scheduleClassData } from "../data/scheduleClassData";
import FileBoxComponent from "../../../components/filebox/FileBoxComponent";
import { StartContinueBtn } from "../../../components/button";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import formatTime from "../../../utils/formatTime";
import { generateUniqueKey } from "../../../utils";

const ScheduleInfoBox = () => {
  const { lightGreen, btnTextColor, primaryBlue } = useTheme().colors.pallete;
  const { scheduledClassesData } = useSelector((state) => state.scheduleClass);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const startContinueClickHandler = (roomId) => {
    setIsLoading(true);
    navigate(`/room-preview/${roomId}`);
    setIsLoading(false);
  };
  return (
    <>
      {scheduledClassesData.map((info) => {
        return (
          <Box
            key={generateUniqueKey()}
            bg="white"
            my={2}
            boxShadow={"md"}
            borderRadius={"md"}
          >
            <Box p={4}>
              <Text fontWeight={500} fontSize={"14px"} mb={1}>
                {info?.LiveClassRoomDetail?.topicName}
              </Text>
              <Text fontSize={"12px"} mb={1} fontWeight={400}>
                {formatTime(info.scheduledStartTime)} -{" "}
                {formatTime(info.scheduledEndTime)}
              </Text>
              {info.files ? (
                <FileBoxComponent data={info.files} />
              ) : (
                <Text fontSize={"0.8rem"}>No Files</Text>
              )}
            </Box>
            <StartContinueBtn
              isLoading={isLoading}
              // backColor={
              //   info.status === scheduleClassData.start
              //     ? primaryBlue
              //     : lightGreen
              // }
              // textColor={
              //   info.status === scheduleClassData.start ? "white" : btnTextColor
              // }
              backColor={primaryBlue}
              textColor={"white"}
              onClickHandler={() => startContinueClickHandler(info.roomId)}
              text={"START"}
            />
          </Box>
        );
      })}
    </>
  );
};

export default ScheduleInfoBox;
