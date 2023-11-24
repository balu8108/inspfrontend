import React, { useState, useRef, useEffect } from "react";
import videojs from "video.js";
import "video.js/dist/video-js.css";
import "videojs-contrib-quality-levels";
import "videojs-quality-selector-hls";
import "videojs-contrib-eme";
import "videojs-contrib-dash";
import "dashjs";

import { playRecordingApi } from "../../api/recordingapi";
import WaterMark from "../watermark/WaterMark";
import { checkUserType, getStorageData } from "../../utils";
import { userType } from "../../constants/staticvariables";
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

  const userRoleType = checkUserType();
  const { data: inspUserProfile } = getStorageData("insp_user_profile");

  const setPlayerConfiguration = async (activeRecording) => {
    try {
      // Update the player's source when the src prop changes

      const url = activeRecording?.url;

      const res = await playRecordingApi({
        type: type,
        recordId: activeRecording?.id,
      });

      const { data } = res;

      const drmToken = data?.data?.DRMjwtToken;

      const videoOptions = getVideoJsOptions(activeRecording?.url, drmToken);

      if (!player) {
        const p = videojs(videoRef.current, videoOptions);

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

  return (
    <>
      <div style={{ position: "relative" }} data-vjs-player>
        <video
          ref={videoRef}
          className="vidPlayer video-js vjs-default-skin vjs-big-play-centered"
          style={{ borderRadius: "10px", height: "73vh", width: "100%" }}
        ></video>

        {userRoleType === userType.student && (
          <WaterMark inspUserProfile={inspUserProfile} />
        )}
      </div>
    </>
  );
};

export default VideoPlayer;
