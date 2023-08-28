import axios from "axios";
import { BASE_URL } from "../../constants/staticurls";

const API = axios.create({ baseURL: BASE_URL });

export const getAllLiveClassesApi = () =>
  API.get("/schedule-live-class/get-all");
export const createLiveClassApi = (data) =>
  API.post("/schedule-live-class/create", data);
export const getLiveClassDetailsApi = (roomId) =>
  API.get(`/schedule-live-class/get-details/${roomId}`);
