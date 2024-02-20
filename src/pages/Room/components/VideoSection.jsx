import { useEffect } from "react";
import { Box } from "@chakra-ui/react";
import { useSelector } from "react-redux";
const VideoSection = ({ mentorVideoRef }) => {
  const { mentorVideoShareConsumer } = useSelector((state) => state.socket);

  const renderMentorVideoStream = () => {
    const getMentorVideoStream = mentorVideoShareConsumer;
    const { track } = getMentorVideoStream;
    const stream = new MediaStream([track]);
    mentorVideoRef.current.srcObject = stream;
  };

  const removeMentorVideoStream = () => {
    if (mentorVideoRef.current) {
      mentorVideoRef.current.srcObject = null;
    }
  };
  useEffect(() => {
    if (mentorVideoShareConsumer) {
      if (mentorVideoShareConsumer.paused) {
        removeMentorVideoStream(); // Pause triggered, remove stream
      } else {
        renderMentorVideoStream(); // Play triggered, render stream
      }
    } else {
      removeMentorVideoStream();
    }
  }, [mentorVideoShareConsumer]);

  return (
    <>
      <Box
        position={"relative"}
        width={["60px", "60px", "75px", "150px"]}
        height={["60px", "60px", "75px", "120px"]}
        borderRadius={"10px"}
        bg="transparent"
      >
        <video
          ref={mentorVideoRef}
          autoPlay
          playsInline
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            objectFit: "cover",
            overflow: "hidden",
            borderRadius: "10px",
          }}
          muted={false}
        />
      </Box>
    </>
  );
};

export default VideoSection;
