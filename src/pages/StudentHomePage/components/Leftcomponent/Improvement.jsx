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
  Stack,
  HStack,
  VStack,
  useTheme,
  Image,
} from "@chakra-ui/react";
import { HiDotsVertical } from "react-icons/hi";
import improgress from "../../../../assets/images/Group 11.png";
import improvementMarks from "../../data/improvement";
const Improvement = () => {
  const theme = useTheme();
  const { primaryBlue, mainTextColor, secondaryTextColor } =
    theme.colors.pallete;
  const colorSchemes = {
    Physics: "#E38D8D",
    Chemistry: "#95AAE0",
    Mathematics: "#EFDB6F",
  };

  const averagePercentage =
    improvementMarks.reduce((total, subject) => total + subject.percentage, 0) /
    improvementMarks.length;
  return (
    <Box
      width={561.42}
      height={313}
      mt={"24px"}
      ml={"52px"}
      borderRadius={26}
      backgroundColor={"#F1F5F8"}
    >
      <HStack gap={"10px"}>
        <Box
          bg={primaryBlue}
          width="12px"
          height="25px"
          borderRadius={"20px"}
          ml={"33px"}
          mt={"27px"}
        ></Box>
        <Text
          fontWeight={"400px"}
          fontSize={"20px"}
          lineHeight={"24.2px"}
          mt={"27.5px"}
        >
          Improvement
        </Text>
        <Icon color={"#3A35418A"} mt={"27.5px"} ml={320} as={HiDotsVertical} />
      </HStack>

      <Box
        width={"244.39px"}
        height={"204px"}
        justifyContent={"space-between"}
        ml={"20px"}
        mt={"37.5px"}
      >
        <Image width={"204px"} height={"204px"} src={improgress} />

       </Box>
    </Box>
  );
};
export default Improvement;
