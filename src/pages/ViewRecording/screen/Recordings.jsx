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

  const queryParams = new URLSearchParams(location.search);

  const id = queryParams.get("id");
  const type = queryParams.get("type");

  const getViewRecordingData = async () => {
    try {
      const res = await viewRecordingApi(type, id);
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
  }, [id, type]);
  return (
    <Flex m={"52px"} h={"full"} gap={6}>
      <ViewRecording type={type} activeRecording={activeRecording} />
      <RecordedClass
        type={type}
        recordingDetail={recordingDetail}
        activeRecording={activeRecording}
        setActiveRecording={setActiveRecording}
      />
    </Flex>
  );
};
export default Recording;
