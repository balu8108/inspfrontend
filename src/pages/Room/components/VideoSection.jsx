import { useEffect, useRef } from "react";
import { Box } from "@chakra-ui/react";
import { useSelector } from "react-redux";

const VideoSection = ({ mentorVideoRef }) => {
  const { mentorVideoShareConsumer } = useSelector((state) => state.socket);
  const videoContainerRef = useRef(null);
  const isDragging = useRef(false);
  const offsetX = useRef(0);
  const offsetY = useRef(0);

  const onMouseDown = (event) => {
    isDragging.current = true;
    offsetX.current =
      event.clientX - videoContainerRef.current.getBoundingClientRect().left;
    offsetY.current =
      event.clientY - videoContainerRef.current.getBoundingClientRect().top;
  };

  const onMouseMove = (event) => {
    if (isDragging.current) {
      const x = event.clientX - offsetX.current;
      const y = event.clientY - offsetY.current;

      // Restrict dragging within screen bounds
      const maxX = window.innerWidth - videoContainerRef.current.offsetWidth;
      const maxY = window.innerHeight - videoContainerRef.current.offsetHeight;

      const clampedX = Math.min(Math.max(x, 0), maxX);
      const clampedY = Math.min(Math.max(y, 0), maxY);

      videoContainerRef.current.style.left = clampedX + "px";
      videoContainerRef.current.style.top = clampedY + "px";
    }
  };

  const onMouseUp = () => {
    isDragging.current = false;
  };

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
        ref={videoContainerRef}
        position={"fixed"} // Using fixed position to allow dragging all over the screen
        width={["60px", "60px", "75px", "150px"]}
        height={["60px", "60px", "75px", "120px"]}
        borderRadius={"10px"}
        bg="transparent"
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
        onMouseLeave={onMouseUp}
        style={{ cursor: "move" }}
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
            borderRadius: "10px",
          }}
          muted={false}
        />
      </Box>
    </>
  );
};

export default VideoSection;



