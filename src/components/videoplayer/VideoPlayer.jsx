import React, { useState, useRef, useEffect } from "react";
import videojs from "video.js";
import "video.js/dist/video-js.css";
import "videojs-contrib-quality-levels";
import "videojs-quality-selector-hls";
const getVideoJsOptions = (url) => {
  const videoOptions = {
    autoplay: false,
    preload: "metadata",
    controls: true,
    poster: "",

    sources: [
      {
        src: url,
        type: "application/x-mpegURL",
        withCredentials: false,
      },
    ],
    html5: {
      nativeAudioTracks: true,
      nativeVideoTracks: true,
      nativeTextTracks: true,
    },
  };
  return videoOptions;
};

const VideoPlayer = ({ videoUrl }) => {
  const videoRef = useRef(null);
  const [player, setPlayer] = useState(undefined);

  useEffect(() => {
    if (player) {
      // Update the player's source when the src prop changes
      player.src({
        videoUrl,
        type: "application/x-mpegURL",
        withCredentials: false,
      });
      console.log("player", player);
    }
  }, [videoUrl, player]);

  useEffect(() => {
    const videoOptions = getVideoJsOptions(videoUrl);
    const p = videojs(videoRef.current, videoOptions);
    setPlayer(p);

    return () => {
      if (player) player.dispose();
    };
  }, []);

  useEffect(() => {
    if (player) {
      player.qualitySelectorHls({
        displayCurrentQuality: true,
      });
    }
  }, [player]);

  return (
    <>
      <div data-vjs-player>
        <video
          ref={videoRef}
          className="vidPlayer video-js vjs-default-skin vjs-big-play-centered"
        ></video>
      </div>
    </>
  );
};

export default VideoPlayer;
