import React from "react";
import { Avatar, Box, Flex, HStack, Stack, Text } from "@chakra-ui/react";
import { Doughnut } from "react-chartjs-2";
import { Chart, ArcElement } from "chart.js";
import feedbackGivenByStudentList from "../../data/feedbackGivenByStudent";
import { FaCircle } from "react-icons/fa";
Chart.register(ArcElement);

const RatingAndFeedBackChart = () => {
  // Calculate the counts for each star rating
  const starCounts = {
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0,
  };

  feedbackGivenByStudentList.forEach((feedback) => {
    const starRating = feedback.star;
    starCounts[starRating]++;
  });

  // Calculate the percentages
  const totalFeedbackCount = feedbackGivenByStudentList.length;
  const starPercentages = {
    1: (starCounts[1] / totalFeedbackCount) * 100,
    2: (starCounts[2] / totalFeedbackCount) * 100,
    3: (starCounts[3] / totalFeedbackCount) * 100,
    4: (starCounts[4] / totalFeedbackCount) * 100,
    5: (starCounts[5] / totalFeedbackCount) * 100,
  };

  const data = {
    labels: [],
    datasets: [
      {
        data: [
          starPercentages[1],
          starPercentages[2],
          starPercentages[3],
          starPercentages[4],
          starPercentages[5],
        ],
        backgroundColor: [
          "#95D3E0",
          "#95AAE0",
          "#7AD679",
          "#EFDB6F",
          "#FF6384",
        ],
      },
    ],
  };

  const rows = [
    {
      stars: 5,
      color: "#FF6384",
      percentage: starPercentages[5],
    },
    {
      stars: 4,
      color: "#EFDB6F",
      percentage: starPercentages[4],
    },
    {
      stars: 3,
      color: "#7AD679",
      percentage: starPercentages[3],
    },
    {
      stars: 2,
      color: "#95AAE0",
      percentage: starPercentages[2],
    },
    {
      stars: 1,
      color: "#95D3E0",
      percentage: starPercentages[1],
    },
  ];
  const totalStars = feedbackGivenByStudentList.reduce(
    (sum, feedback) => sum + feedback.star,
    0
  );
  const averageRating = totalStars / totalFeedbackCount;

  const averageCenter = {
    beforeDraw(chart) {
      const { ctx } = chart;
      const centerX = (chart.chartArea.left + chart.chartArea.right) / 2;
      const centerY = (chart.chartArea.top + chart.chartArea.bottom) / 2;

      ctx.save();
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.font = "14px Arial";
      ctx.fillText(averageRating.toFixed(0) + "%", centerX, centerY - 10);
      ctx.fillText("Average", centerX, centerY + 5);
    },
  };

  return (
    <Box w={"100%"} h={"full"} bg={"#F1F5F8"} borderRadius={"26px"}>
      <HStack spacing={"10px"} mx="27px" mt={"25px"}>
        <Box
          width={"12px"}
          height={"25px"}
          borderRadius={"20px"}
          bg={"#3C8DBC"}
        ></Box>
        <Text fontSize={"20px"} lineHeight={"24px"}>
          Newton's Third Law
        </Text>
      </HStack>

      <Flex>
        <Stack w={"30%"} h={"30%"} p={"10px"} mt={50} ml={35}>
          <Doughnut data={data} plugins={[averageCenter]} />

          <Box mt={10}>
            <Stack spacing={4}>
              {rows.map((row, rowIndex) => (
                <HStack key={rowIndex}>
                  <FaCircle style={{ color: row.color }} />
                  <Text fontSize={"12px"} ml={2}>
                    {row.stars === 1 ? "1 Star" : `${row.stars} Stars`}
                  </Text>
                  <Box
                    width="39%"
                    height="8px"
                    backgroundColor="#EAEAEA"
                    borderRadius="10px"
                  >
                    <Box
                      width={`${(row.stars / 5) * 100}%`}
                      height="100%"
                      backgroundColor={row.color}
                      borderRadius="18px"
                    ></Box>
                  </Box>
                  <Text fontSize={"12px"} ml={2}>
                    {row.percentage.toFixed(0)}%
                  </Text>
                </HStack>
              ))}
            </Stack>
          </Box>
        </Stack>
        <Stack spacing={"19px"} p={"20px"} ml={"85px"}>
          {feedbackGivenByStudentList.map((feedback) => (
            <Box key={feedback.feedbackId} alignItems="center" mb={2}>
              <HStack>
                <Avatar bg={"#3C8DBC"} boxSize="1.6em" mr={2} />
                <Text fontSize={"15px"}>{feedback.studentName}</Text>
              </HStack>
              <Text fontSize={"12px"} color={"#2C332978"} p={"10px"}>
                {feedback.feedback}
              </Text>
            </Box>
          ))}
        </Stack>
      </Flex>
    </Box>
  );
};
export default RatingAndFeedBackChart;
