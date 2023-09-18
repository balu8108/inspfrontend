import React, { useState, useEffect, useRef } from "react";
import { MIRO_BOARD_PICKER_SCRIPT } from "../../../constants/staticurls";
import { Box, Button, Image } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { miroViewMode } from "../../../constants/staticvariables";
import html2canvas from "html2canvas";

const MiroBoard = () => {
  const { miroBoard } = useSelector((state) => state.socket);
  const [img, setImg] = useState(null);
  const iframeRef = useRef(null);
  console.log(
    `https://miro.com/app/live-embed/${miroBoard?.boardId}/?autoplay=true&moveToViewport=-23165,-5837,13803,7546`
  );

  const captureScreenshot = () => {
    const iframe = iframeRef.current;
    console.log("iframe", iframe);
    console.log("iframe document", iframe.contentDocument);

    if (iframe) {
      // Use html2canvas to capture the iframe
      html2canvas(iframe).then((canvas) => {
        // Convert the canvas to an image URL
        const screenshotUrl = canvas.toDataURL("image/png");

        // You can now use the screenshotUrl as needed, e.g., display it in an image tag or save it.
        console.log("screenshot", screenshotUrl);
        setImg(screenshotUrl);
      });
    }
  };

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
        <>
          <Button onClick={captureScreenshot}> click screenshot </Button>
          {img && <Image src={img} alt="ss" />}
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
              ref={iframeRef}
              title="Miro board"
              width="100%"
              height="100%"
              src={renderMiroBoardUrl(miroBoard)}
              allowFullScreen
            ></iframe>
          </Box>
        </>
      )}
    </>
  );
};

export default MiroBoard;
