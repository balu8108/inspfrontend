import { Avatar, Box, Flex, HStack, Stack, Text } from "@chakra-ui/react";
import { Doughnut } from "react-chartjs-2";
import { Chart, ArcElement } from "chart.js";
import feedbackGivenByStudentList from "../../data/feedbackGivenByStudent";
import { FaCircle } from "react-icons/fa";
Chart.register(ArcElement);
const RatingAndFeedBackChart = () => {
  const data = {
    labels: [],
    datasets: [
      {
        data: [5, 4, 3, 2, 1],
        backgroundColor: [
          "#FF6384",
          "#EFDB6F",
          "#7AD679",
          "#95AAE0",
          "#95D3E0",
        ],
      },
    ],
  };

  const rows = [
    { stars: 5, color: "#FF6384" },
    { stars: 4, color: "#EFDB6F" },
    { stars: 3, color: "#7AD679" },
    { stars: 2, color: "#95AAE0" },
    { stars: 1, color: "#95D3E0" },
  ];

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
          <Doughnut data={data} />

          <Box mt={10}>
            <Stack spacing={4}>
              {rows.map((row, rowIndex) => (
                <HStack key={rowIndex}>
                  <FaCircle style={{ color: row.color }} />
                  <Text fontSize={"13px"} ml={2}>
                    {row.stars === 1 ? "1 Star" : `${row.stars} Stars`}
                  </Text>
                  <Box
                    width="60%"
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
                </HStack>
              ))}
            </Stack>
          </Box>
        </Stack>
        <Stack spacing={"19px"} p={"20px"} ml={"60px"}>
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
