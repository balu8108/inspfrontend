import {
  Grid,
  GridItem,
  Flex,
  Box,
  useTheme,
  useDisclosure,
  HStack,
  Text,
} from "@chakra-ui/react";
import { MainBtn } from "../../../components/button";
import { scheduleClassData } from "../data/scheduleClassData";
import { scheduleClassCategory } from "../data/scheduleClassCategory";
import ScheduleInfoBox from "../components/ScheduleInfoBox";
import ScheduleCalendar from "../components/ScheduleCalendar";
import ScheduleClassPopup from "../../../components/popups/ScheduleClassPopup";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { getAllLiveClassesSchedule } from "../../../store/actions/scheduleClassActions";
import SimpleBar from "simplebar-react";
import "simplebar-react/dist/simplebar.min.css";
import { boxShadowStyles } from "../../../utils";

const ScheduleClass = () => {
  const {
    isOpen: isSchedulePopupOpen,
    onOpen: onSchedulePopupOpen,
    onClose: onScheduleClosePopupOpen,
  } = useDisclosure();
  const { primaryBlue, lightGrey } = useTheme().colors.pallete;
  const [selectedDate, setSelectedDate] = useState(""); // if clicked from calendar
  const [classTiming, setClassTiming] = useState(["", ""]);
  const dispatch = useDispatch();

  const scheduleClassClickHandler = () => {
    onSchedulePopupOpen();
  };

  useEffect(() => {
    dispatch(getAllLiveClassesSchedule());
  }, [dispatch]);
  return (
    <>
      {isSchedulePopupOpen && (
        <ScheduleClassPopup
          isOpen={isSchedulePopupOpen}
          onClose={onScheduleClosePopupOpen}
          selectedDate={selectedDate}
          classTiming={classTiming}
          setSelectedDate={setSelectedDate}
          setClassTiming={setClassTiming}
        />
      )}
      <Box px={20} pt={4} pb={4}>
        <Grid templateColumns={"20% 80%"} gap={4} alignItems={"start"}>
          <SimpleBar
            style={{
              maxHeight: "85vh",
              borderRadius: "10px",
              boxShadow: boxShadowStyles.shadowOneStyle.boxShadow,
            }}
          >
            <GridItem p={4}>
              <Flex direction={"column"}>
                <MainBtn
                  isLoading={false}
                  text={scheduleClassData.scheduleClass}
                  backColor={primaryBlue}
                  textColor={"white"}
                  onClickHandler={scheduleClassClickHandler}
                />

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
            </GridItem>
          </SimpleBar>
          <GridItem bg={lightGrey} borderRadius={"md"}>
            <ScheduleCalendar
              onSchedulePopupOpen={onSchedulePopupOpen}
              setSelectedDate={setSelectedDate}
              setClassTiming={setClassTiming}
            />
          </GridItem>
        </Grid>
      </Box>
    </>
  );
};

export default ScheduleClass;
