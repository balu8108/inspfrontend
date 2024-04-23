import { Flex, Box, useTheme, HStack, Text } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { MainBtn } from "../../../components/button";
import { scheduleClassData } from "../data/scheduleClassData";
import { scheduleClassCategory } from "../data/scheduleClassCategory";
import ScheduleInfoBox from "../components/ScheduleInfoBox";
import { checkUserType } from "../../../utils";
import { userType } from "../../../constants/staticvariables";
import { getAllLiveClassesSchedule } from "../../../store/actions/scheduleClassActions";

const ScheduleClassList = ({ onSchedulePopupOpen }) => {
  const dispatch = useDispatch();
  const { primaryBlue, primaryBlueLight, outerBackground } =
    useTheme().colors.pallete;
  const { isClassScheduleChange } = useSelector((state) => state.generic);
  const { userProfile } = useSelector((state) => state.auth);

  const scheduleClassClickHandler = () => {
    onSchedulePopupOpen();
  };

  const POLLING_INTERVAL = 10000; // 5 seconds (adjust as needed)

  const fetchDataWithLongPolling = (dispatch) => {
    dispatch(getAllLiveClassesSchedule());
    setTimeout(() => {
      fetchDataWithLongPolling(dispatch);
    }, POLLING_INTERVAL);
  };

  useEffect(() => {
    fetchDataWithLongPolling(dispatch);
    return () => clearTimeout(fetchDataWithLongPolling);
  }, [dispatch, isClassScheduleChange]);

  return (
    <Box w="25%" ml={5}>
      <Box
        className="scroll-container"
        style={{
          maxHeight: "85vh",
          borderRadius: "26px",
          background: outerBackground,
          overflowY: "auto",
        }}
      >
        <Box p={4}>
          {checkUserType(userProfile) === userType.teacher && (
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
                <ScheduleInfoBox type={category.category} label={category.id} />
              </Box>
            ))}
          </Flex>
        </Box>
      </Box>
    </Box>
  );
};

export default ScheduleClassList;
