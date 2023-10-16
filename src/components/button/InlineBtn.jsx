import { Button } from "@chakra-ui/react";

const InlineBtn = ({
  isLoading,
  text,
  backColor,
  textColor,
  onClickHandler,
  hoverColor,
}) => {
  return (
    <>
      <Button
        isLoading={isLoading}
        bg={backColor}
        px={10}
        py={6}
        color={textColor}
        onClick={onClickHandler}
        _hover={{ bg: hoverColor }}
      >
        {text}
      </Button>
    </>
  );
};

export default InlineBtn;
