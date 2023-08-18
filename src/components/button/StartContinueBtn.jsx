import { Button } from "@chakra-ui/react";

const StartContinueBtn = ({
  isLoading,
  backColor,
  textColor,
  onClickHandler,
  text,
}) => {
  return (
    <Button
      w={"full"}
      isLoading={isLoading}
      bg={backColor}
      color={textColor}
      fontWeight={"500"}
      fontSize={"14px"}
      borderTopLeftRadius={"0px"}
      borderTopRightRadius={"0px"}
      _hover={{ bg: backColor }}
      onClick={() => onClickHandler()}
    >
      {text}
    </Button>
  );
};

export default StartContinueBtn;
