import { useState } from "react";
import {
  Box,
  Text,
  useTheme,
  Flex,
  Icon,
  Tooltip,
  useDisclosure,
} from "@chakra-ui/react";
import { HiOutlinePencilSquare } from "react-icons/hi2";
import { scheduleClassData } from "../data/scheduleClassData";
import FileBoxComponent from "../../../components/filebox/FileBoxComponent";
import { ScheduleClassBtn } from "../../../components/button";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { checkUserType, formatTime, capitalize } from "../../../utils";
import {
  classStatus,
  userType,
  fileTypes,
} from "../../../constants/staticvariables";
import { className } from "../../../constants/className";
import ScheduleClassPopup from "../../../components/popups/ScheduleClassPopup";
const ScheduleClassInformation = ({ scheduledClassesData, type, label }) => {
  const { primaryBlue, secondaryTextColor, innerBackground } =
    useTheme().colors.pallete;
  const [isLoading, setIsLoading] = useState(false);
  const { userProfile } = useSelector((state) => state.auth);
  const [scheduleData, setScheduleData] = useState({});
  const navigate = useNavigate();
  const {
    isOpen: isSchedulePopupOpen,
    onOpen: onSchedulePopupOpen,
    onClose: onScheduleClosePopupOpen,
  } = useDisclosure();

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
      {isSchedulePopupOpen && (
        <ScheduleClassPopup
          isOpen={isSchedulePopupOpen}
          onClose={onScheduleClosePopupOpen}
          isCalenderScreen={false}
          isEditScreen={true}
          scheduleData={scheduleData}
        />
      )}
      {scheduledClassesData[type].map((info) => {
        return (
          <Box
            position={"relative"}
            key={info?.id}
            bg={innerBackground}
            my={2}
            px={2}
            py={4}
            borderRadius={"md"}
          >
            <Flex justifyContent={"space-between"} alignItems={"center"}>
              <Tooltip
                label={capitalize(info?.LiveClassRoomDetail?.topicName)}
                placement="top"
              >
                <Text
                  fontWeight="500"
                  fontSize="14px"
                  color="rgba(44, 51, 41, 1)"
                  mb={1}
                  noOfLines={1}
                  w="50%"
                  _hover={{ textDecoration: "underline", cursor: "pointer" }}
                >
                  {capitalize(info?.LiveClassRoomDetail?.topicName)}
                </Text>
              </Tooltip>
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
                {capitalize(info?.mentorName)}
              </Text>
              <Text
                fontSize={"10px"}
                color={secondaryTextColor}
                mb={1}
                fontWeight={400}
              >
                {new Date(info.scheduledDate).toLocaleDateString()}
              </Text>
            </Flex>
            <Text
              fontWeight={"500"}
              fontSize={"10px"}
              color={secondaryTextColor}
              mb={1}
            >
              {className[info.classLevel]}
            </Text>
            {checkUserType(userProfile) === userType.teacher && (
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
            {checkUserType(userProfile) === userType.student && (
              <Box
                mt={2}
                mb={(type === "Ongoing" || type === "Completed") && 4}
              >
                <Text fontSize={"12px"} fontWeight={500}>
                  {scheduleClassData.description}
                </Text>
                <Text fontSize={"12px"} color={secondaryTextColor}>
                  {renderSlicedString(info?.description)}
                </Text>
              </Box>
            )}
            {(type === "Ongoing" ||
              type === "Completed" ||
              checkUserType(userProfile) === userType.teacher) && (
              <ScheduleClassBtn
                isLoading={isLoading}
                status={info.classStatus}
                backColor={primaryBlue}
                textColor={"white"}
                onClickHandler={() => startContinueClickHandler(info)}
              />
            )}
            {checkUserType(userProfile) === userType.teacher &&
              label !== 1 &&
              label !== 4 && (
                <Icon
                  position={"absolute"}
                  top={1}
                  right={1}
                  as={HiOutlinePencilSquare}
                  onClick={() => {
                    setScheduleData(info);
                    onSchedulePopupOpen();
                  }}
                  _hover={{ bg: "none", cursor: "pointer" }}
                />
              )}
          </Box>
        );
      })}
    </>
  );
};

const ScheduleInfoBox = ({ type, label }) => {
  const { secondaryTextColor } = useTheme().colors.pallete;
  const { scheduledClassesData } = useSelector((state) => state.scheduleClass);

  return (
    <>
      {scheduledClassesData[type].length === 0 ? (
        <Text
          fontSize={"1rem"}
          textAlign={"center"}
          color={secondaryTextColor}
          my={2}
        >
          No class
        </Text>
      ) : (
        <ScheduleClassInformation
          scheduledClassesData={scheduledClassesData}
          type={type}
          label={label}
        />
      )}
    </>
  );
};

export default ScheduleInfoBox;
