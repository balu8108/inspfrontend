import {
  Box,
  Flex,
  Heading,
  Icon,
  CircularProgress,
  CircularProgressLabel,
  Progress,
  Text,
  Circle,
} from "@chakra-ui/react";
import { HiDotsVertical } from "react-icons/hi";
const Improvement = () => {
  const subjects = [
    { name: "Physics", percentage: 68, colorScheme: "pink" },
    { name: "Mathematics", percentage: 69, colorScheme: "yellow" },
    { name: "Chemistry", percentage: 68, colorScheme: "green" },
  ];
  const averagePercentage =
    subjects.reduce((sum, subject) => sum + subject.percentage, 0) /
    subjects.length;

  return (
    <>
      <Box
        width={530}
        height={250}
        mt={30}
        ml={10}
        borderRadius={26}
        backgroundColor={"#F1F5F8"}
      >
        <Flex>
          <Heading fontWeight={10} fontSize={20} ml={10} p={3}>
            Improvement
          </Heading>
          <Icon ml={300} mt={4} color={"gray"} as={HiDotsVertical} />
        </Flex>

        <CircularProgress
          value={subjects.percentage}
          size="190px"
          thickness="10px"
          color={subjects.color}
          trackColor="pink.100"
          ml={5}
        >
          <CircularProgressLabel fontSize={18}>
            {Math.round(averagePercentage)}%<Text fontSize={14}>Average</Text>
          </CircularProgressLabel>
        </CircularProgress>

        <Box width={280} ml={60} fontSize={13} marginTop={-150}>
          {subjects.map((subject) => (
            <Box
              key={subject.name}
              display="flex"
              mb="2"
              p={3}
              alignItems={"center"}
            >
              <Circle size="4" bg={subject.colorScheme} mr="2" />
              <Text>{subject.name}</Text>
              <Box flex="1" ml="4">
                <Progress
                  value={subject.percentage}
                  size="xs"
                  colorScheme={subject.colorScheme}
                  borderRadius={2}
                />
              </Box>
              <Text ml="2">{subject.percentage}%</Text>
            </Box>
          ))}
        </Box>
      </Box>
    </>
  );
};
export default Improvement;


