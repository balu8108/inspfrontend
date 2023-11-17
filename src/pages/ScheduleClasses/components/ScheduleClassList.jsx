import {
  Flex,
  Box,
  useTheme,
  HStack,
  Text,
  Stack,
  VStack,
} from "@chakra-ui/react";
import React from "react";
import { MainBtn } from "../../../components/button";
import { scheduleClassData } from "../data/scheduleClassData";
import { scheduleClassCategory } from "../data/scheduleClassCategory";
import ScheduleInfoBox from "../components/ScheduleInfoBox";
import { checkUserType } from "../../../utils";
import { userType } from "../../../constants/staticvariables";

const ScheduleClassList = ({ onSchedulePopupOpen }) => {
  const { primaryBlue, primaryBlueLight } = useTheme().colors.pallete;

  const scheduleClassClickHandler = () => {
    onSchedulePopupOpen();
  };
  return (
    <>
      {checkUserType() === userType.teacher && (
        <MainBtn
          isLoading={false}
          text={scheduleClassData.scheduleClass}
          backColor={primaryBlue}
          textColor={"white"}
          onClickHandler={scheduleClassClickHandler}
          hoverColor={primaryBlueLight}
        />
      )}
      <Flex
        direction={"column"}
        justifyContent={"space-between"}
        height={"100%"}
      >
        {scheduleClassCategory.classCategories.map((category) => (
          <Box key={category.id} my={4}>
            <HStack>
              <Box
                bg={primaryBlue}
                width="10px"
                height="24px"
                borderRadius={"20px"}
              ></Box>
              <Text fontWeight={"400"} fontSize={"15px"}>
                {category.label}
              </Text>
            </HStack>
            <ScheduleInfoBox type={category.category} />
          </Box>
        ))}
      </Flex>
    </>
  );
};

export default ScheduleClassList;
