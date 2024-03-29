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
export const getAllLiveClassesApi = () =>
  API.get("/schedule-live-class/get-all");
export const createLiveClassApi = (data) =>
  API.post("/schedule-live-class/create", data, config);
export const getLiveClassDetailsApi = (roomId) =>
  API.get(`/schedule-live-class/get-details/${roomId}`);
export const getUpcomingClassApi = (roomId) =>
  API.get(`/schedule-live-class/get-upcoming-class/${roomId}`);
export const getLectureNo = (data) =>
  API.post("/schedule-live-class/get-lecture-no", data);
export const addClassAssignmentApi = (type, classId, data) =>
  API.post(
    `/schedule-live-class/upload-assignment-to-class/${type}/${classId}`,
    data
  );
