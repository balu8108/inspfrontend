import React, { useEffect, useRef } from "react";

const WebAudioPlayer = ({ mediaStreamTrack }) => {
  const audioRef = useRef(null);
  const audioContextRef = useRef(null);
  console.log("Remote audio track", mediaStreamTrack);

  useEffect(() => {
    if (!mediaStreamTrack || !audioRef.current) return;

    const audioContext = new AudioContext();

    const audioSource = audioContext.createMediaStreamSource(
      new MediaStream([mediaStreamTrack])
    );

    // Connect audio source to destination (speakers/headphones)
    audioSource.connect(audioContext.destination);

    // Set the audio context and start playing
    audioContextRef.current = audioContext;
    audioRef.current.srcObject = audioSource.mediaStream;
    audioRef.current.play();

    // Clean up on unmount
    return () => {
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
    };
  }, [mediaStreamTrack]);

  return <audio ref={audioRef} autoPlay playsInline controls hidden></audio>;
};

export default WebAudioPlayer;
