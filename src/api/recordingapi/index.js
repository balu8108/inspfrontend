import axios from "axios";
import { BASE_URL } from "../../constants/staticurls";

const API = axios.create({ baseURL: BASE_URL });

export const viewRecordingApi = (type, id) =>
  API.get(`/recording/view-recording?type=${type}&id=${id}`);

export const playRecordingApi = (body) =>
  API.post(`/recording/play-recording`, body);
