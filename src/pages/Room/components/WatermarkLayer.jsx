import React, { useState, useEffect } from "react";
import { Box, Text } from "@chakra-ui/react";
import { generateUniqueKey } from "../../../utils";
const WatermarkLayer = () => {
  const [boxCount, setBoxCount] = useState(500);
  console.log(boxCount);
  //   useEffect(() => {
  //     const watermarkLayer = document.getElementById("watermark-layer");

  //     if (watermarkLayer) {
  //       const containerWidth = watermarkLayer.offsetWidth;
  //       const containerHeight = watermarkLayer.offsetHeight;
  //       console.log(containerWidth, containerHeight);
  //       const boxSize = 50; // Set the size of each box (adjust as needed)

  //       const horizontalBoxes = Math.floor(containerWidth / boxSize);
  //       const verticalBoxes = Math.floor(containerHeight / boxSize);

  //       const totalBoxes = horizontalBoxes * verticalBoxes;
  //       setBoxCount(totalBoxes);
  //     }
  //   }, []);

  const renderBoxes = () => {
    const boxes = [];
    for (let i = 0; i < boxCount; i++) {
      boxes.push(
        <Box
          key={generateUniqueKey()}
          textAlign={"center"}
          display={"inline-block"}
          fontSize={"8px"}
          color="rgba(255,255,255,0.2)"
          fontWeight={"300"}
          p={1}
          whiteSpace={"nowrap"}
        >
          <Text>Amit</Text>
          <Text letterSpacing={"3px"}>thapliyalamit2001@gmail.com</Text>
        </Box>
      );
    }
    return boxes;
  };
  return (
    <Box
      overflow={"hidden"}
      position={"absolute"}
      width="100%"
      height="100%"
      zIndex={2}
      borderRadius={"md"}
      id="watermark-layer"
    >
      {renderBoxes()}
    </Box>
  );
};

export default WatermarkLayer;
