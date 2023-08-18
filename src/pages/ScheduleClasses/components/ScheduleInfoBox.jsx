import { Box, Text, useTheme, useDisclosure } from "@chakra-ui/react";
import { scheduleClassData } from "../data/scheduleClassData";
import FileBoxComponent from "../../../components/filebox/FileBoxComponent";
import { StartContinueBtn } from "../../../components/button";

const ScheduleInfoBox = () => {

  const { lightGreen, btnTextColor, primaryBlue } = useTheme().colors.pallete;
  const startContinueClickHandler = () => {
    console.log("test");
  };
  return (
    <>
      {scheduleClassData.scheduleClassBoxInfo.map((info) => {
        return (
          <Box bg="white" my={2} boxShadow={"md"} borderRadius={"md"}>
            <Box p={4}>
              <Text fontWeight={500} fontSize={"14px"} mb={1}>
                {info.scheduleClassTopic}
              </Text>
              <Text fontSize={"12px"} mb={1} fontWeight={400}>
                {info.scheduleClassTiming}
              </Text>
              <FileBoxComponent data={info.fileData} />
            </Box>
            <StartContinueBtn
              isLoading={false}
              backColor={
                info.status === scheduleClassData.start
                  ? primaryBlue
                  : lightGreen
              }
              textColor={
                info.status === scheduleClassData.start ? "white" : btnTextColor
              }
              onClickHandler={startContinueClickHandler}
              text={info.status}
            />
          </Box>
        );
      })}
    </>
  );
};

export default ScheduleInfoBox;
