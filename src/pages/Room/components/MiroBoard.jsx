import React, { useState, useEffect } from "react";
import { MIRO_BOARD_PICKER_SCRIPT } from "../../../constants/staticurls";
import { Box } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { miroViewMode } from "../../../constants/staticvariables";

const MiroBoard = () => {
  const { miroBoard } = useSelector((state) => state.socket);

  //   const [miroBoardId, setMiroBoardId] = useState(null);

  //   const openMiroBoardAuth = () => {
  //     window.miroBoardsPicker.open({
  //       clientId: "3458764563018758552", // Replace it with your app ClientId
  //       action: "select",
  //       success: (data) => {
  //         setMiroBoardId(data.id);
  //       },
  //     });
  //   };
  //   useEffect(() => {
  //     const script = document.createElement("script");

  //     script.src = MIRO_BOARD_PICKER_SCRIPT;
  //     script.async = true;

  //     document.body.appendChild(script);

  //     return () => {
  //       document.body.removeChild(script);
  //     };
  //   }, []);
  const renderMiroBoardUrl = (miroBoard) => {
    if (miroBoard?.boardId && miroBoard?.mode === miroViewMode.edit) {
      return `https://miro.com/app/live-embed/${miroBoard?.boardId}/?autoplay=true&moveToViewport=-23165,-5837,13803,7546`;
    } else if (miroBoard?.boardId && miroBoard?.mode === miroViewMode.view) {
      return `https://miro.com/app/live-embed/${miroBoard?.boardId}/?embedMode=view_only_without_ui&moveToViewport=-23165,-5837,13803,7546`;
    }
  };
  return (
    <>
      {miroBoard.boardId && (
        <Box
          zIndex={20}
          position={"absolute"}
          borderRadius={"md"}
          w={"75%"}
          py={4}
          mx={"auto"}
          height={"full"}
          top={"50%"}
          left={"50%"}
          transform={"translate(-50%,-50%)"}
        >
          <iframe
            title="Miro board"
            width="100%"
            height="100%"
            src={renderMiroBoardUrl(miroBoard)}
            allowFullScreen
          ></iframe>
        </Box>
      )}
    </>
  );
};

export default MiroBoard;
