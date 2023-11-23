import { useState } from "react";
import { Box, Text, useTheme, Flex, Spinner, Center } from "@chakra-ui/react";
import { scheduleClassData } from "../data/scheduleClassData";
import FileBoxComponent from "../../../components/filebox/FileBoxComponent";
import { ScheduleClassBtn } from "../../../components/button";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  checkUserType,
  formatTime,
  timeDifference,
  capitalize,
} from "../../../utils";
import {
  classStatus,
  userType,
  fileTypes,
} from "../../../constants/staticvariables";

const ScheduleClassInformation = ({ scheduledClassesData, type }) => {
  const { lightGrey, primaryBlue, secondaryTextColor } =
    useTheme().colors.pallete;
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const startContinueClickHandler = (info) => {
    setIsLoading(true);
    if (info?.classStatus === classStatus.FINISHED) {
      navigate(`/view-recording?type=live&id=${info?.id}`);
    } else {
      navigate(`/room-preview/${info?.roomId}`);
    }

    setIsLoading(false);
  };

  const renderSlicedString = (str) => {
    if (str) {
      if (str.length >= 100) {
        return str.slice(0, 100) + "...";
      }
      return str;
    } else {
      return "";
    }
  };
  return (
    <>
      {scheduledClassesData[type].map((info) => {
        return (
          <Box
            key={info?.id}
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
                {capitalize(info?.LiveClassRoomDetail?.topicName)}
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
            {checkUserType() === userType.teacher && (
              <Box my={4}>
                {info?.LiveClassRoomFiles.length > 0 ? (
                  <FileBoxComponent
                    data={info.LiveClassRoomFiles}
                    type={fileTypes.live}
                  />
                ) : (
                  <Text fontSize={"0.8rem"}>No Files</Text>
                )}
              </Box>
            )}
            {checkUserType() === userType.student && (
              <Box
                mt={2}
                mb={(type === "Ongoing" || type === "Completed") && 4}
              >
                <Text fontSize={"12px"} fontWeight={500}>
                  {scheduleClassData.description}
                </Text>
                <Text fontSize={"12px"} color={secondaryTextColor}>
                  {renderSlicedString(info?.LiveClassRoomDetail?.description)}
                </Text>
              </Box>
            )}
            {(type === "Ongoing" ||
              type === "Completed" ||
              checkUserType() === userType.teacher) && (
              <ScheduleClassBtn
                isLoading={isLoading}
                status={info.classStatus}
                backColor={primaryBlue}
                textColor={"white"}
                onClickHandler={() => startContinueClickHandler(info)}
              />
            )}
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
        />
      );
    }
  };

  return <>{renderContent()}</>;
};

export default ScheduleInfoBox;
