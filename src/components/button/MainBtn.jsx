import React from "react";
import { Button } from "@chakra-ui/react";
const MainBtn = ({
  isLoading,
  text,
  backColor,
  textColor,
  onClickHandler,
  hoverColor,
}) => {
  return (
    <Button
      w={"full"}
      isLoading={isLoading}
      bg={backColor}
      color={textColor}
      fontWeight={"500"}
      fontSize={"14px"}
      _hover={{ bg: hoverColor }}
      onClick={() => onClickHandler()}
    >
      {text}
    </Button>
  );
};

export default MainBtn;
