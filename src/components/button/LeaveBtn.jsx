import React from "react";
import { Button } from "@chakra-ui/react";
const LeaveBtn = ({
  isLoading,
  text,
  backColor,
  textColor,
  onClickHandler,
  px = 7,
  py = 5,
  fontSize = "0.8rem",
}) => {
  return (
    <Button
      fontSize={fontSize}
      isLoading={isLoading}
      bg={backColor}
      color={textColor}
      _hover={{ bg: backColor }}
      borderRadius={"full"}
      px={px}
      py={py}
      size={"sm"}
      onClick={onClickHandler}
    >
      {text}
    </Button>
  );
};

export default LeaveBtn;
