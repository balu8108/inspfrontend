import React from "react";
import { Button, useTheme } from "@chakra-ui/react";
import { classStatus, classStatusText } from "../../constants/staticvariables";
import { getStorageData } from "../../utils";
const ScheduleClassBtn = ({ isLoading, status, onClickHandler }) => {
  const {
    notStartedBtnColor,
    ongoingBtnColor,
    scheduledBtnColor,
    finishedBtnColor,
    notConductedBtnColor,
    btnTextColor,
  } = useTheme().colors.pallete;
  const { data: inspUserProfile } = getStorageData("insp_user_profile");
  let backColor = scheduledBtnColor;
  let textColor = "white";
  let text = "Start";
  let btnDisabled = false;

  if (inspUserProfile) {
    // Means teacher then render teacher button text
    text =
      inspUserProfile.user_type === 1
        ? classStatusText.teacher[status]
        : classStatusText.student[status];
  }

  if (status === classStatus.ONGOING) {
    backColor = ongoingBtnColor;
    textColor = btnTextColor;
  } else if (status === classStatus.NOT_STARTED) {
    if (inspUserProfile.user_type === 0) {
      backColor = notStartedBtnColor;
    }
  } else if (status === classStatus.FINISHED) {
    backColor = finishedBtnColor;
    textColor = btnTextColor;
    btnDisabled = false;
  } else if (status === classStatus.NOT_CONDUCTED) {
    backColor = notConductedBtnColor;
    textColor = btnTextColor;
    btnDisabled = true;
  }

  return (
    <Button
      w={"full"}
      isLoading={isLoading}
      bg={backColor}
      isDisabled={btnDisabled}
      color={textColor}
      fontWeight={"500"}
      fontSize={"14px"}
      _hover={{
        opacity:
          status === classStatus.SCHEDULED ||
          status === classStatus.ONGOING ||
          status === classStatus.NOT_STARTED
            ? 0.8
            : "none",
        bg: backColor,
      }}
      onClick={() => onClickHandler()}
    >
      {text}
    </Button>
  );
};

export default ScheduleClassBtn;
