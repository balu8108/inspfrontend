import React, { useEffect, useState } from "react";
import {
  Avatar,
  Box,
  Flex,
  HStack,
  Stack,
  Text,
  Center,
} from "@chakra-ui/react";
import { Doughnut } from "react-chartjs-2";
import { Chart, ArcElement } from "chart.js";
import { FaCircle } from "react-icons/fa";
import { useParams } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../../../../../constants/staticurls";
import { boxShadowStyles, capitalize } from "../../../../../utils";
Chart.register(ArcElement);

const RatingAndFeedBackChart = () => {
  let averageRating = 0;
  const { topic_id, topic_name } = useParams();

  const [feedbackData, setFeedbackData] = useState(); // State to store feedback data

  useEffect(() => {
    axios
      .get(`${BASE_URL}/generic/topic-feedback-rating-details/${topic_id}`)
      .then((response) => {
        setFeedbackData(response.data.topicDetails);
      })
      .catch((error) => {
        console.error("Error fetching feedback data:", error);
      });
  }, [topic_id]);

  if (!feedbackData) {
    return null;
  }
  const starCounts = {
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0,
  };

  feedbackData.forEach((feedback) => {
    const starRating = feedback.rating;
    starCounts[starRating]++;
  });

  const totalFeedbackCount = feedbackData.length;

  const totalStars = feedbackData.reduce(
    (sum, feedbackData) => sum + feedbackData.rating,
    0
  );
  averageRating = totalStars / feedbackData.length;

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

  const averageCenter = {
    beforeDraw(chart) {
      const { ctx } = chart;
      const centerX = (chart.chartArea.left + chart.chartArea.right) / 2;
      const centerY = (chart.chartArea.top + chart.chartArea.bottom) / 2;

      ctx.save();
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.font = "14px Arial";
      ctx.fillText(averageRating.toFixed(1), centerX, centerY - 10);
      ctx.fillText("Average", centerX, centerY + 5);
    },
  };
  if (!feedbackData || feedbackData.length === 0) {
    return (
      <Box
        w={"100%"}
        h={"full"}
        borderRadius={"26px"}
        bg="white"
        boxShadow={boxShadowStyles.mainBoxShadow.boxShadow}
      >
        <Center>
          <Text fontSize={"20px"} textAlign="center" mt={5}>
            No feedback and ratings available.
          </Text>
        </Center>
      </Box>
    );
  }
  return (
    <Box
      w={"100%"}
      h={"full"}
      boxShadow={boxShadowStyles.mainBoxShadow.boxShadow}
      borderRadius={"26px"}
    >
      <HStack spacing={"10px"} mx="27px" mt={"25px"}>
        <Box
          width={"12px"}
          height={"25px"}
          borderRadius={"20px"}
          bg={"#3C8DBC"}
        ></Box>
        <Text fontSize={"20px"} lineHeight={"24px"}>
          {capitalize(topic_name)}
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
                  {/* <Box
                    width={`${(row.percentage / 100) * 100}%`} // Use percentage to calculate the width
                    height="8px"
                    backgroundColor={row.color}
                    borderRadius="10px"
                  ></Box> */}

                  <Box
                    width="39%"
                    height="8px"
                    backgroundColor="#EAEAEA"
                    borderRadius="10px"
                  >
                    <Box
                      width={`${(row.percentage / 100) * 100}%`}
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
          {feedbackData.map((feedback) => (
            <Box key={feedback.feedbackId} alignItems="center" mb={2}>
              <HStack>
                <Avatar bg={"#3C8DBC"} boxSize="1.6em" mr={2} />
                <Text fontSize={"15px"}>{feedback.raterName}</Text>
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
