import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { getActiveRecordingUrl } from "../../api/tpstream";

const TPStreamPlayer = ({ activeRecording }) => {
  const [player, setPlayer] = useState(null);
  const { userProfile: inspUserProfile } = useSelector((state) => state.auth);

  const getViewRecordingData = async () => {
    const watermark = {
      expires_after_first_usage: true,
      annotations: [
        {
          type: "static",
          text: inspUserProfile.email,
          x: 40,
          y: 40,
          opacity: "0.8",
          color: "#FFF",
          size: 4,
        },
        {
          type: "dynamic",
          text: inspUserProfile.name,
          opacity: "0.8",
          color: "#FFF",
          size: 4,
          interval: 5000,
          skip: 2000,
        },
      ],
    };
    try {
      const res = await getActiveRecordingUrl(
        activeRecording?.tpStreamId,
        watermark
      );
      if (res.status === 201) {
        const { data } = res;
        setPlayer(data?.playback_url);
        console.log(data);
      }
    } catch (err) {
      console.log("error", err);
    }
  };
  useEffect(() => {
    if (activeRecording && activeRecording?.tpStreamId) {
      getViewRecordingData();
    }
  }, [activeRecording]);

  return (
    <div
      style={{
        position: "relative",
        height: "73vh",
        width: "100%",
      }}
    >
      {activeRecording &&
      (activeRecording?.status === "Uploaded" ||
        activeRecording?.status === "Progress") ? (
        <div
          style={{
            background: "black",
            height: "100%",
            width: "100%",
            color: "#fff",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <p>Video is currently being processed</p>
        </div>
      ) : player ? (
        <iframe
          src={player}
          style={{
            border: 0,
            maxWidth: "100%",
            position: "absolute",
            top: 0,
            left: 0,
            height: "100%",
            width: "100%",
          }}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          title="video-player" // Add title for accessibility
        ></iframe>
      ) : (
        <div
          style={{
            background: "black",
            height: "100%",
            width: "100%",
            color: "#fff",
          }}
        ></div>
      )}
    </div>
  );
};

export default TPStreamPlayer;
