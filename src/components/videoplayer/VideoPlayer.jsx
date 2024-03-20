import React, { useState, useRef, useEffect } from "react";
import videojs from "video.js";
import "video.js/dist/video-js.css";
import "videojs-contrib-quality-levels";
import "videojs-contrib-eme";
import "videojs-http-quality-selector";
import "dashjs";
import "videojs-hotkeys";
import "videojs-seek-buttons";
import "videojs-seek-buttons/dist/videojs-seek-buttons.css";

import { playRecordingApi } from "../../api/recordingapi";
import WaterMark from "../watermark/WaterMark";
import { checkUserType, getStorageData } from "../../utils";
import { userType } from "../../constants/staticvariables";
const getVideoJsOptions = (browser, url, drmToken) => {
  const sources = [];

  if (browser === "Chrome") {
    sources.push({
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
    });
  } else if (browser === "Safari") {
    let modifiedUrl = url.replace(/\.mpd$/, ".m3u8");
    console.log(modifiedUrl);
    sources.push({
      src: modifiedUrl,
      type: "application/dash+xml",
      keySystems: {
        "com.apple.fps.1_0": {
          url: "https://drm-fairplay-licensing.axprod.net/AcquireLicense",
          certificateUrl: "https://vtb.axinom.com/FPScert/fairplay.cer",
          licenseHeaders: {
            "X-AxDRM-Message": drmToken,
          },
        },
      },
    });
  }

  const videoOptions = {
    autoplay: false,
    preload: "metadata",
    controls: true,
    playbackRates: [0.5, 1, 1.5],
    poster: "",
    sources: sources,
    plugins: {
      hotkeys: {
        enableModifiersForNumbers: false,
        seekStep: 10,
        volumeStep: 0.1,
        enableVolumeScroll: false,
      },
    },
    html5: {
      nativeAudioTracks: true,
      nativeVideoTracks: true,
      nativeTextTracks: true,
    },
  };

  return videoOptions;
};

const VideoPlayer = ({ browser, type, activeRecording }) => {
  const videoRef = useRef(null);
  const [player, setPlayer] = useState(undefined);

  const userRoleType = checkUserType();
  const { data: inspUserProfile } = getStorageData("insp_user_profile");

  const setPlayerConfiguration = async (activeRecording) => {
    try {
      // Update the player's source when the src prop changes

      const res = await playRecordingApi({
        type: type,
        recordId: activeRecording?.id,
      });

      const { data } = res;

      const drmToken = data?.data?.DRMjwtToken;
      const videoOptions = getVideoJsOptions(
        browser,
        activeRecording?.url,
        drmToken
      );

      if (!player) {
        const p = videojs(videoRef.current, videoOptions, (p) => {
          console.log("Player ready");
          // Add event listeners to the video element for double-click events
          videoRef.current.addEventListener("dblclick", handleVideoDoubleClick);
        });

        p.eme();

        setPlayer(p);
      } else {
        player.src(videoOptions.sources);
      }
    } catch (err) {
      console.log("error in setting player", err);
    }
  };

  useEffect(() => {
    if (activeRecording) {
      setPlayerConfiguration(activeRecording);
    }
  }, [activeRecording]);

  useEffect(() => {
    if (player) {
      player.httpQualitySelector();
    }

    if (
      player &&
      (player?.activePlugins_?.seekButtons === false ||
        player?.activePlugins_?.seekButtons === undefined)
    ) {
      player.seekButtons({
        forward: 10,
        back: 10,
      });
    }
  }, [player]);

  useEffect(() => {
    const checkWaterMark = () => {
      if (userRoleType === userType.student) {
        const watermarkUserName = document.getElementById(
          "watermark-user-name"
        );
        const watermarkUserEmail = document.getElementById(
          "watermark-user-email"
        );

        let isWaterMark = true;
        if (!watermarkUserName || !watermarkUserEmail) {
          isWaterMark = false;
        } else if (
          (watermarkUserName &&
            (watermarkUserName.style.display === "none" ||
              watermarkUserName.style.visibility === "hidden")) ||
          (watermarkUserEmail &&
            (watermarkUserEmail.style.display === "none" ||
              watermarkUserEmail.style.visibility === "hidden"))
        ) {
          isWaterMark = false;
        } else if (
          watermarkUserName.textContent !== inspUserProfile.name ||
          watermarkUserEmail.textContent !== inspUserProfile.email
        ) {
          isWaterMark = false;
        }
        if (!isWaterMark) {
          videoRef.current.srcObject = null;
        }
      }
    };
    const watermarkCheckInterval = setInterval(checkWaterMark, 2000);
    return () => {
      clearInterval(watermarkCheckInterval);
    };
  }, []);

  const handleVideoDoubleClick = (event) => {
    if (!player) return;

    const video = player.tech().el();
    const videoRect = video.getBoundingClientRect();
    const clickX = event.clientX - videoRect.left;
    const videoWidth = videoRect.width;

    // Calculate the click position as a percentage of the video width
    const clickPercentage = clickX / videoWidth;

    // If double-clicked on the right side (more than 50% of the width), seek forward
    if (clickPercentage > 0.5) {
      const currentTime = player.currentTime();
      player.currentTime(currentTime + 10); // Skip forward by 10 seconds (adjust as needed)
    }
    // If double-clicked on the left side (less than 50% of the width), seek backward
    else {
      const currentTime = player.currentTime();
      player.currentTime(currentTime - 10); // Skip backward by 10 seconds (adjust as needed)
    }
  };

  return (
    <>
      <div
        style={{
          position: "relative",
          background: "green",
          height: "73vh",
          width: "100%",
        }}
        data-vjs-player
      >
        <video
          ref={videoRef}
          className="vidPlayer video-js vjs-default-skin vjs-big-play-centered"
          playsinline
          style={{
            borderRadius: "10px",
            width: "100%",
            height: "100%",
            objectFit: "contain",
          }}
        ></video>

        {userRoleType === userType.student && (
          <WaterMark inspUserProfile={inspUserProfile} />
        )}
      </div>
    </>
  );
};

export default VideoPlayer;
