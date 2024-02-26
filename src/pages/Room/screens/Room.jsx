import { useEffect, useState } from "react";
import {
  Box,
  Grid,
  GridItem,
  useDisclosure,
  useMediaQuery,
  useTheme,
} from "@chakra-ui/react";
import LiveSessionDescription, {
  FilesForSmallerScreen,
} from "../components/LiveSessionDescription";
import LiveSession from "../components/LiveSession";
import LiveSessionMembers from "../components/LiveSessionMembers";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import LiveSessionInteraction from "../components/LiveSessionInteraction";
import {
  resetChatMessages,
  resetQuestionMessags,
} from "../../../store/actions/socketActions";
import LeaveOrEndClassPopup from "../../../components/popups/LeaveOrEndClassPopup";

const Room = () => {
  console.log("ROOM");
  const [isEnlarged, setIsEnlarged] = useState(false); // for enlarging screen
  const { roomId } = useParams();
  const dispatch = useDispatch();
  const theme = useTheme();

  const {
    isOpen: isOpenLeaveOrEndClass,
    onOpen: onOpenLeaveOrEndClass,
    onClose: onCloseLeaveOrEndClass,
  } = useDisclosure();

  const { primaryBlue, outerBackground } = theme.colors.pallete;

  const [isLargerThan768] = useMediaQuery([
    "(min-width: 480px)",
    "(min-width: 768px)",
  ]);

  const renderColumns = (isEnlarged) => {
    if (isEnlarged) {
      return "1fr";
    } else {
      return ["1fr", "1fr", "1.5fr 3.5fr", "1.2fr 6fr"];
    }
  };

  useEffect(() => {
    return () => {
      // clear chat box and question container on unmounting
      dispatch(resetChatMessages());
      dispatch(resetQuestionMessags());
    };
  }, [dispatch]);

  return (
    <>
      {isOpenLeaveOrEndClass && (
        <LeaveOrEndClassPopup
          isOpen={isOpenLeaveOrEndClass}
          onClose={onCloseLeaveOrEndClass}
        />
      )}
      <Box py={4} px={[2, 4, 4, 10]}>
        <Grid
          templateColumns={renderColumns(isEnlarged)}
          templateRows={[
            "repeat(12,1fr)",
            "repeat(12,1fr)",
            "repeat(6,1fr)",
            "repeat(6,1fr)",
          ]}
          gap={[2, 2, 2, 4]}
          h={[isLargerThan768 ? "85vh" : isEnlarged ? "85vh" : "100%"]}
          className="scrollbar-parent"
        >
          {!isEnlarged && (
            <GridItem
              rowSpan={[1, 1, 2, 2]}
              bg={outerBackground}
              borderRadius={"md"}
              className="scrollbar-primary"
              overflowY={["hidden", "hidden", "scroll", "scroll"]}
            >
              <LiveSessionDescription
                onOpenLeaveOrEndClass={onOpenLeaveOrEndClass}
              />
            </GridItem>
          )}

          <GridItem
            rowSpan={[isEnlarged ? 12 : 5, isEnlarged ? 12 : 5, 6, 6]}
            // bg={outerBackground}
            // p={[2, 2, 2, 4]}
            // borderRadius={"md"}
            style={{
              display: "flex",
              flexDirection: "row",
            }}
            
            gap={5}
          >
            {/* member sidebar */}

            <LiveSession
              outerBackground={outerBackground}
              roomId={roomId}
              isEnlarged={isEnlarged}
              setIsEnlarged={setIsEnlarged}
              onOpenLeaveOrEndClass={onOpenLeaveOrEndClass}
            />

            {/* member sidebar */}

            {!isEnlarged && (
              <LiveSessionMembers
                primaryBlue={primaryBlue}
                outerBackground={outerBackground}
              />
            )}
          </GridItem>

          {!isLargerThan768 && (
            <GridItem rowSpan={1} bg={outerBackground} borderRadius={"md"}>
              <FilesForSmallerScreen />
            </GridItem>
          )}

          {/* chat code */}
          {!isEnlarged && (
            <GridItem
              rowSpan={[5, 5, 4, 4]}
              bg={outerBackground}
              borderRadius={"md"}
            >
              <LiveSessionInteraction />
            </GridItem>
          )}
        </Grid>
      </Box>
    </>
  );
};

export default Room;
