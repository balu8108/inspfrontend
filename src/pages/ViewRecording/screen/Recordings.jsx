import { useEffect, useState } from "react";
import { Flex } from "@chakra-ui/react";
import ViewRecording from "../components/ViewRecording";
import RecordedClass from "../components/RecordedClass";
import { useLocation } from "react-router-dom";
import { viewRecordingApi } from "../../../api/recordingapi";
const Recording = () => {
  const [recordingDetail, setRecordingDetail] = useState(null);
  const [activeRecording, setActiveRecording] = useState(null);

  const location = useLocation();
  console.log("recording detail", recordingDetail);
  console.log("active recording", activeRecording);

  // Parse the query string to get the query parameters
  const queryParams = new URLSearchParams(location.search);

  // Access the query parameters by their names
  const id = queryParams.get("id");
  const type = queryParams.get("type");

  const getViewRecordingData = async () => {
    try {
      const res = await viewRecordingApi(type, id);
      if (res.status === 200) {
        const { data } = res;
        setActiveRecording(data?.data?.activeRecordingToPlay);
      }
    } catch (err) {
      console.log("error", err);
    }
  };
  useEffect(() => {
    getViewRecordingData();
  }, [id, type]);
  return (
    <Flex m={"52px"}>
      <ViewRecording type={type} activeRecording={activeRecording} />
      <RecordedClass />
    </Flex>
  );
};
export default Recording;
