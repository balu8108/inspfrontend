import React, { useState, useEffect } from "react";
import { MIRO_BOARD_PICKER_SCRIPT } from "../../../constants/staticurls";
import { Box } from "@chakra-ui/react";

const MiroBoard = ({ miroBoardId }) => {
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

  return (
    <>
      {miroBoardId && (
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
            src={`https://miro.com/app/live-embed/${miroBoardId}/?autoplay=true&moveToViewport=-23165,-5837,13803,7546`}
            allowFullScreen
          ></iframe>
        </Box>
      )}
    </>
  );
};

export default MiroBoard;
