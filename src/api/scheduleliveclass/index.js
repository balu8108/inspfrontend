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
export const getAllLiveClassesApi = () =>
  API.get("/schedule-live-class/get-all");
export const createLiveClassApi = (data) =>
  API.post("/schedule-live-class/create", data, config);
export const getLiveClassDetailsApi = (roomId) =>
  API.get(`/schedule-live-class/get-details/${roomId}`);
export const getUpcomingClassApi = (roomId) =>
  API.get(`/schedule-live-class/get-upcoming-class/${roomId}`);

export const setLiveClassScheduledApi = (data) =>
  API.post("/schedule-live-class/update-schedule-data", data);
export const addClassAssignmentApi = (type, classId, data) =>
  API.post(
    `/schedule-live-class/upload-assignment-to-class/${type}/${classId}`,
    data
  );
