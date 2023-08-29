import React from "react";
import { Button } from "@chakra-ui/react";
const LeaveBtn = ({
  isLoading,
  text,
  backColor,
  textColor,
  onClickHandler,
}) => {
  return (
    <Button
      isLoading={isLoading}
      bg={backColor}
      px={8}
      py={6}
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
