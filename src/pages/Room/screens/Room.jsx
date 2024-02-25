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
import {
  liveSessionMemberViewType,
} from "../../../constants/staticvariables";
import { useParams } from "react-router-dom";
import LiveSessionInteraction from "../components/LiveSessionInteraction";
import LeaveOrEndClassPopup from "../../../components/popups/LeaveOrEndClassPopup";
import KickFromClassPopup from "../../../components/popups/KickFromClassPopup";
import {
  resetChatMessages,
  resetQuestionMessags,
} from "../../../store/actions/socketActions";

const Room = () => {
  const [isEnlarged, setIsEnlarged] = useState(false); // for enlarging screen
  const [peersViewType, setPeersViewType] = useState(
    liveSessionMemberViewType.compact
  );
  const [kickedPersonDetails, setKickedPersonDetails] = useState(null);
  const { roomId } = useParams();
  const dispatch = useDispatch();
  const theme = useTheme();
  const {
    isOpen: isOpenLeaveOrEndClass,
    onOpen: onOpenLeaveOrEndClass,
    onClose: onCloseLeaveOrEndClass,
  } = useDisclosure();
  const {
    isOpen: isOpenKickFromClass,
    onOpen: onOpenKickFromClass,
    onClose: onCloseKickFromClass,
  } = useDisclosure();
  const { primaryBlue, outerBackground } = theme.colors.pallete;

  const [ isLargerThan768] = useMediaQuery([
    "(min-width: 480px)",
    "(min-width: 768px)",
  ]);

  const renderColumns = (peersViewType, isEnlarged) => {
    if (isEnlarged) {
      return "1fr";
    } else if (peersViewType === liveSessionMemberViewType.compact) {
      return ["1fr", "1fr", "1.5fr 3.5fr 0.25fr", "0.9fr 4fr 0.25fr"];
    } else if (peersViewType === liveSessionMemberViewType.expanded) {
      return ["1fr", "1fr", "1.5fr 3.5fr 0.25fr", "1.2fr 6fr 1fr"];
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
      {isOpenKickFromClass && (
        <KickFromClassPopup
          isOpen={isOpenKickFromClass}
          onClose={onCloseKickFromClass}
          kickedPersonDetails={kickedPersonDetails}
        />
      )}

      <Box py={4} px={[2, 4, 4, 10]}>
        <Grid
          templateColumns={renderColumns(peersViewType, isEnlarged)}
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

          <LiveSession 
            outerBackground={outerBackground}
            roomId={roomId} 
            isEnlarged={isEnlarged} 
            setIsEnlarged={setIsEnlarged} 
            onOpenLeaveOrEndClass={onOpenLeaveOrEndClass}
          />

          {/* member sidebar */}
          {!isEnlarged && (
            <GridItem
              rowSpan={[1, 1, 6, 6]}
              cursor={"pointer"}
              onClick={() => {
                if (peersViewType === liveSessionMemberViewType.compact) {
                  setPeersViewType(liveSessionMemberViewType.expanded);
                } else {
                  setPeersViewType(liveSessionMemberViewType.compact);
                }
              }}
            >
              <LiveSessionMembers
                primaryBlue={primaryBlue}
                outerBackground={outerBackground}
                viewType={peersViewType}
                onOpenKickFromClass={onOpenKickFromClass}
                setKickedPersonDetails={setKickedPersonDetails}
              />
            </GridItem>
          )}

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
