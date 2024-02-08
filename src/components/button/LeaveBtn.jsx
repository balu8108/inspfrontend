import React from "react";
import { Button } from "@chakra-ui/react";
const LeaveBtn = ({
  isLoading,
  text,
  backColor,
  textColor,
  onClickHandler,
  px = 8,
  py = 6,
  fontSize = "1rem",
}) => {
  return (
    <Button
      fontSize={fontSize}
      isLoading={isLoading}
      bg={backColor}
      px={px}
      py={py}
      color={textColor}
      _hover={{ bg: backColor }}
      borderRadius={"full"}
      onClick={onClickHandler}
    >
      {text}
    </Button>
  );
};

export default LeaveBtn;
