import axios from "axios";
import { BASE_URL } from "../../constants/staticurls";

const API = axios.create({ baseURL: BASE_URL });
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
