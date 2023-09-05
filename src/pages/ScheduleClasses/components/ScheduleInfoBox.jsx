import { useState } from "react";
import {
  Box,
  Text,
  useTheme,
  useDisclosure,
  Flex,
  Spinner,
  HStack,
  Center,
} from "@chakra-ui/react";
import { scheduleClassData } from "../data/scheduleClassData";
import FileBoxComponent from "../../../components/filebox/FileBoxComponent";
import { MainBtn, StartContinueBtn } from "../../../components/button";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { categoriseClass, formatTime, timeDifference } from "../../../utils";
import { generateUniqueKey } from "../../../utils";

const ScheduleClassInformation = ({
  scheduledClassesData,
  type,
  startContinueClickHandler,
  isLoading,
}) => {
  const { lightGrey, primaryBlue, secondaryTextColor } =
    useTheme().colors.pallete;
  return (
    <>
      {scheduledClassesData[type].map((info) => {
        return (
          <Box
            key={generateUniqueKey()}
            bg={lightGrey}
            my={2}
            px={2}
            py={4}
            boxShadow={"md"}
            borderRadius={"md"}
          >
            <Flex justifyContent={"space-between"} alignItems={"center"}>
              <Text
                fontWeight={"500"}
                fontSize={"14px"}
                color={"rgba(44, 51, 41, 1)"}
                mb={1}
              >
                {info?.LiveClassRoomDetail?.topicName}
              </Text>
              <Text
                fontSize={"10px"}
                color={secondaryTextColor}
                mb={1}
                fontWeight={400}
              >
                {formatTime(info.scheduledStartTime)} -{" "}
                {formatTime(info.scheduledEndTime)}
              </Text>
            </Flex>

            <Flex
              justifyContent={"space-between"}
              alignItems={"center"}
              mt={-1}
            >
              <Text
                fontWeight={"500"}
                fontSize={"10px"}
                color={secondaryTextColor}
                mb={1}
              >
                {info?.mentorName}
              </Text>
              <Text
                fontSize={"10px"}
                color={secondaryTextColor}
                mb={1}
                fontWeight={400}
              >
                {timeDifference(
                  info?.scheduledStartTime,
                  info?.scheduledEndTime
                )}
              </Text>
            </Flex>
            <Box my={4}>
              {info?.LiveClassRoomFiles.length > 0 ? (
                <FileBoxComponent data={info.LiveClassRoomFiles} />
              ) : (
                <Text fontSize={"0.8rem"}>No Files</Text>
              )}
            </Box>
            <MainBtn
              isLoading={isLoading}
              text={"Start"}
              backColor={primaryBlue}
              textColor={"white"}
              onClickHandler={() => startContinueClickHandler(info?.roomId)}
            />
          </Box>
        );
      })}
    </>
  );
};

const ScheduleInfoBox = ({ type }) => {
  const { secondaryTextColor } = useTheme().colors.pallete;
  const { scheduledClassesData, scheduleClassLoading } = useSelector(
    (state) => state.scheduleClass
  );
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const startContinueClickHandler = (roomId) => {
    setIsLoading(true);
    navigate(`/room-preview/${roomId}`);
    setIsLoading(false);
  };

  const renderContent = () => {
    if (scheduleClassLoading) {
      return (
        <Center my={2}>
          <Spinner />
        </Center>
      );
    } else if (scheduledClassesData[type].length === 0) {
      return (
        <Text
          fontSize={"1rem"}
          textAlign={"center"}
          color={secondaryTextColor}
          my={2}
        >
          No class
        </Text>
      );
    } else {
      return (
        <ScheduleClassInformation
          scheduledClassesData={scheduledClassesData}
          type={type}
          startContinueClickHandler={startContinueClickHandler}
          isLoading={isLoading}
        />
      );
    }
  };

  return <>{renderContent()}</>;
};

export default ScheduleInfoBox;
