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
import { checkUserType } from "../../utils";
import { userType } from "../../constants/staticvariables";
import { useSelector } from "react-redux";
const getVideoJsOptions = (browser, url, hlsUrl, drmToken, HlsDrmToken) => {
  const sources = [];
  // if (process.env.REACT_APP_ENVIRON === "production") {
  if (browser === "Safari") {
    sources.push({
      src: hlsUrl,
      keySystems: {
        "com.apple.fps.1_0": {
          certificateUri: process.env.REACT_APP_FAIRPLAY_CERTIFICATE_URL,
          getContentId: function (emeOptions, initData) {
            return new TextDecoder().decode(
              initData.filter((item) => item !== 0 && item !== 150)
            );
          },
          licenseUri: process.env.REACT_APP_FAIRPLAY_LICENSE_URL,
          licenseHeaders: {
            "X-AxDrm-Message": HlsDrmToken,
          },
        },
      },
    });
  } else {
    sources.push({
      src: url,
      type: "application/dash+xml",
      keySystems: {
        "com.widevine.alpha": {
          url: process.env.REACT_APP_WIDEVINE_LICENSE_URL,
          licenseHeaders: {
            "X-AxDRM-Message": drmToken,
          },
        },
      },
    });
  }
  // } else {
  //   sources.push({
  //     src: url,
  //     type: "video/webm",
  //   });
  // }

  const videoOptions = {
    autoplay: false,
    preload: "metadata",
    controls: true,
    playbackRates: [0.5, 1, 1.5, 2],
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
  const { userProfile: inspUserProfile } = useSelector((state) => state.auth);
  const userRoleType = checkUserType(inspUserProfile);
  const setPlayerConfiguration = async (activeRecording) => {
    try {
      // Update the player's source when the src prop changes

      const res = await playRecordingApi({
        type: type,
        recordId: activeRecording?.id,
      });

      const { data } = res;

      const drmToken = data?.data?.DRMjwtToken;
      const HlsDrmToken = data?.data?.HlsDRMJwtToken;
      const videoOptions = getVideoJsOptions(
        browser,
        activeRecording?.key,
        activeRecording?.hlsDrmUrl,
        drmToken,
        HlsDrmToken
      );

      if (!player) {
        const p = videojs(videoRef.current, videoOptions);
        if (process.env.REACT_APP_ENVIRON === "production") {
          p.eme();
        }

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
