import React, { useState, useRef, useEffect } from "react";
import videojs from "video.js";
import "video.js/dist/video-js.css";
import "videojs-contrib-quality-levels";
import "videojs-quality-selector-hls";
import "videojs-contrib-eme";
import "videojs-contrib-dash";
import "dashjs";
import { playRecordingApi } from "../../api/recordingapi";
const getVideoJsOptions = (url, drmToken) => {
  const videoOptions = {
    autoplay: false,
    preload: "metadata",
    controls: true,
    poster: "",

    sources: [
      {
        src: url,
        type: "application/dash+xml",
        keySystems: {
          "com.widevine.alpha": {
            url: "https://drm-widevine-licensing.axprod.net/AcquireLicense",
            licenseHeaders: {
              "X-AxDRM-Message": drmToken,
            },
          },
        },
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

const VideoPlayer = ({ type, activeRecording }) => {
  const videoRef = useRef(null);
  const [player, setPlayer] = useState(undefined);

  console.log("player", player);

  const setPlayerConfiguration = async (activeRecording) => {
    try {
      // Update the player's source when the src prop changes

      const url = activeRecording?.url;
      console.log("url player", url);
      console.log("type ", type);
      const res = await playRecordingApi({
        type: type,
        recordId: activeRecording?.id,
      });

      const { data } = res;
      console.log("data", data);
      const drmToken = data?.data?.DRMjwtToken;
      console.log("drm toke", drmToken);

      const videoOptions = getVideoJsOptions(activeRecording?.url, drmToken);
      const p = videojs(videoRef.current, videoOptions);
      console.log("p", p);
      console.log("vide option", videoOptions.sources);
      p.eme();
      p.src(videoOptions.sources);

      setPlayer(p);
    } catch (err) {
      console.log("error in setting player", err);
    }
  };

  // useEffect(() => {
  //   if (player && activeRecording) {
  //     console.log("setting");
  //     setPlayerConfiguration(player, activeRecording);
  //   }
  // }, [activeRecording, player]);

  useEffect(() => {
    if (activeRecording) {
      // const videoOptions = getVideoJsOptions(activeRecording?.url, "token");
      // const p = videojs(videoRef.current, videoOptions);
      // setPlayer(p);
      setPlayerConfiguration(activeRecording);
    }

    return () => {
      if (player) player.dispose();
    };
  }, [activeRecording]);

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
