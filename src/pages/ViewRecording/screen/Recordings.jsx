import { useEffect, useState } from "react";
import { Flex } from "@chakra-ui/react";
import ViewRecording from "../components/ViewRecording";
import RecordedClass from "../components/RecordedClass";
import { useLocation } from "react-router-dom";
import { viewRecordingApi } from "../../../api/recordingapi";
const Recording = () => {
  const [isFileAdded, setIsFileAdded] = useState(false);
  const [recordingDetail, setRecordingDetail] = useState(null);
  const [activeRecording, setActiveRecording] = useState(null);

  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);

  const id = queryParams.get("id");
  const type = queryParams.get("type");
  const topicId = queryParams.get("topicId");

  const getViewRecordingData = async () => {
    try {
      const res = await viewRecordingApi(type, id, topicId);
      if (res.status === 200) {
        const { data } = res;

        setActiveRecording(data?.data?.activeRecordingToPlay);
        setRecordingDetail(data?.data);
      }
    } catch (err) {
      console.log("error", err);
    }
  };
  useEffect(() => {
    getViewRecordingData();
  }, [id, type, topicId, isFileAdded]);

  const [browser, setBrowser] = useState("");

  useEffect(() => {
    // Check for the browser type
    const userAgent = navigator.userAgent;
    let detectedBrowser = "Unknown";

    if (userAgent.indexOf("Chrome") !== -1) {
      detectedBrowser = "Chrome";
    } else if (userAgent.indexOf("Safari") !== -1) {
      detectedBrowser = "Safari";
    } else if (userAgent.indexOf("Firefox") !== -1) {
      detectedBrowser = "Firefox";
    } else if (
      userAgent.indexOf("MSIE") !== -1 ||
      userAgent.indexOf("Trident/") !== -1
    ) {
      detectedBrowser = "Internet Explorer";
    }

    setBrowser(detectedBrowser);
  }, []); // Run only once when component mounts

  return (
    <Flex m={"52px"} h={"full"} gap={6}>
      <ViewRecording
        browser={browser}
        type={type}
        activeRecording={activeRecording}
      />
      <RecordedClass
        type={type}
        recordingDetail={recordingDetail}
        activeRecording={activeRecording}
        setActiveRecording={setActiveRecording}
        setIsFileAdded={setIsFileAdded}
      />
    </Flex>
  );
};
export default Recording;
