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
export const viewRecordingApi = (type, id) =>
  API.get(`/recording/view-recording?type=${type}&id=${id}`);

export const playRecordingApi = (body) =>
  API.post(`/recording/play-recording`, body);

export const allLiveRecordingDetailsApi = (topicId) =>
  API.get(`/recording/all-live-recordings?type=topic&id=${topicId}`);
