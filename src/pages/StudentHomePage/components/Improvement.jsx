import React from "react";
import { Doughnut } from "react-chartjs-2";
import improvementMarks from "../data/improvement";
import { Chart, ArcElement } from "chart.js";
import {
  Box,
  Text,
  HStack,
  Circle,
  Progress,
  Flex,
  Icon,
} from "@chakra-ui/react";
import {BsThreeDotsVertical} from 'react-icons/bs'

Chart.register(ArcElement);

const Improvement = () => {
  const data = improvementMarks.map((subject) => subject.percentage);

  const chartData = {
    labels: improvementMarks.map((subject) => subject.name),
    datasets: [
      {
        data,
        cutout: "60%",
        backgroundColor: ["#E38D8D", "#95AAE0", "#EFDB6F"],
      },
    ],
  };
  const customColors = ["#E38D8D", "#95AAE0", "#EFDB6F"];
  return (
    <Box
      mt={"24px"}
      w={"555px"}
      h={"313px"}
      borderRadius={"26px"}
      bg={"#F1F5F8"}
    >
      <HStack spacing={"10px"}>
        <Box
          width={"12px"}
          height={"25px"}
          borderRadius={"20px"}
          bg={"#3C8DBC"}
          mt={"27px"}
          ml={"33px"}
        ></Box>
        <Text fontSize={"20px"} lineHeight={"26.6px"} mt={"26px"}>
          Improvement
        </Text>
        <Icon ml={340} mt={5} color={"gray"} as={BsThreeDotsVertical} />
      </HStack>

      <Flex justify="space-between" p={8} >
        <Box w={"44%"}>
          <Doughnut data={chartData}  />
        </Box>

        <Box  ml={5}  p={4}>
          {improvementMarks.map((subject, index) => (
            <HStack key={subject.id} p={3}>
              <Circle
                size={4}
                bg={
                  index === 0 ? "#E38D8D" : index === 1 ? "#95AAE0" : "#EFDB6F"
                }
              />
              <Text fontSize={"13px"} lineHeight={"15px"}>
                {subject.subject}
              </Text>
              <Progress
                value={subject.percentage}
                size="sm"
                borderRadius={4}
                width="100px"
                bg={customColors[index]}
              />
              <Text fontSize={"13px"} lineHeight={"15px"}>
                {subject.percentage}%
              </Text>
            </HStack>
          ))}
        </Box>
      </Flex>
    </Box>
  );
};

export default Improvement;






