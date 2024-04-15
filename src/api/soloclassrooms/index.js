import axios from "axios";
import { BASE_URL } from "../../constants/staticurls";
import { store } from "../../store";
const API = axios.create({ baseURL: BASE_URL });

API.interceptors.request.use((req) => {
  try {
    const { secretToken } = store.getState().auth;
    if (secretToken) {
      req.headers.Authorization = `Token ${secretToken}`;
    }
    return req;
  } catch (err) {
    console.log(err);
  }
});

const config = {
  headers: {
    "Content-Type": "multipart/form-data",
  },
};

export const createSoloLectureRoomApi = (body) =>
  API.post(`/solo-lecture/create-room`, body, config);

export const getSoloClassDetailsApi = (soloClassRoomId) =>
  API.get(`/solo-lecture/get-details-data-for-class/${soloClassRoomId}`);

export const getLatestSoloClassApi = () => API.get(`/solo-lecture/latest-room`);

export const getTopicDetailsForSoloClassApi = (topicId) =>
  API.get(`/solo-lecture/get-topic-details/${topicId}`);

export const uploadSoloClassRoomRecordingApi = (soloClassRoomId, formData) =>
  API.post(
    `/solo-lecture/solo-classroom-recording/${soloClassRoomId}`,
    formData,
    config
  );
