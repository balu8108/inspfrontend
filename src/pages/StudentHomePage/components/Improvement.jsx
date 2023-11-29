import React from "react";
import { Doughnut } from "react-chartjs-2";
import improvementMarks from "../data/improvement";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import {
  Box,
  Text,
  HStack,
  Spacer,
  Flex,
  Icon,
  useTheme,
} from "@chakra-ui/react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { boxShadowStyles } from "../../../utils";
import "../Styling/progress.css";
ChartJS.register(ArcElement, Tooltip, Legend);

const Improvement = () => {
  const { outerBackground } = useTheme().colors.pallete;
  const data = improvementMarks.map((subject) => subject.percentage);
  const averagePercentage =
    data.reduce((total, percentage) => total + percentage, 0) / data.length;

  const chartData = {
    labels: [],
    datasets: [
      {
        data,
        cutout: "60%",
        backgroundColor: ["#E38D8D", "#95AAE0", "#EFDB6F"],
      },
    ],
  };

  const averageCenter = {
    beforeDraw(chart) {
      const { ctx } = chart;
      const centerX = (chart.chartArea.left + chart.chartArea.right) / 2;
      const centerY = (chart.chartArea.top + chart.chartArea.bottom) / 2;

      ctx.save();
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.font = "14px Arial";
      ctx.fillText(averagePercentage.toFixed(0) + "%", centerX, centerY - 10);
      ctx.fillText("Average", centerX, centerY + 5);
    },
  };

  return (
    <Box
      mt={"24px"}
      w={"130%"}
      h={"313px"}
      borderRadius={"26px"}
      bg={outerBackground}
      // boxShadow={boxShadowStyles.mainBoxShadow.boxShadow}
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
          Attendance
        </Text>
        <Spacer />
        <Icon mt={5} mr={5} color={"gray"} as={BsThreeDotsVertical} />
      </HStack>

      <Flex justify="space-between" p={8}>
        <Box w={"204px"} h={"204px"}>
          <Doughnut data={chartData} plugins={[averageCenter]} />
        </Box>

        <div className="outer-div">
          {improvementMarks.map((subject, index) => (
            <div key={index} className="mainDiv">
              <div
                className="circle-icon"
                style={{ backgroundColor: subject.color }}
              ></div>
              <div className="subject-name">{subject.subjectName}</div>
              <div className="progress-container">
                <div
                  className="progress-bar"
                  style={{
                    width: `${subject.percentage}%`,
                    backgroundColor: subject.color,
                  }}
                ></div>
              </div>
              <div className="percentage">
                <span>{subject.percentage}%</span>
              </div>
            </div>
          ))}
        </div>
      </Flex>
    </Box>
  );
};

export default Improvement;
