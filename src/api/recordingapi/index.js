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

export const viewRecordingApi = (type, id) =>
  API.get(`/recording/view-recording?type=${type}&id=${id}`);

export const playRecordingApi = (body) =>
  API.post(`/recording/play-recording`, body);
