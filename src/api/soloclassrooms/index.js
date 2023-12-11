import axios from "axios";
import { BASE_URL } from "../../constants/staticurls";

import { getStorageType } from "../../utils";

const API = axios.create({ baseURL: BASE_URL });

API.interceptors.request.use((req) => {
  try {
    const tokenStorage = getStorageType();
    if (tokenStorage.getItem("secret_token")) {
      const secretToken = tokenStorage.getItem("secret_token");
      req.headers.Authorization = `Token ${secretToken}`;
    }
    return req;
  } catch (err) {}
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
