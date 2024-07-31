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

export const getAllSubjectsApi = () => API.get("/generic/get-all-subjects");
export const getPresignedUrlDocApi = (docId, docType) =>
  API.get(`/generic/open-file/?docId=${docId}&docType=${docType}`);

export const createFeedbackApi = (body) =>
  API.post("/generic/create-feedback", body);

export const getLatestCompletedLiveClassApi = () =>
  API.get("/generic/latest-completed-live-classroom");

export const getRatingDetailsByTopicIdApi = (topic_id) =>
  API.get(`/generic/topic-feedback-rating-details/${topic_id}`);

export const addTimeTableApi = (data) =>
  API.post("/generic/upload-timetable", data);

export const getTimeTableApi = () => API.get("/generic/get-all-timetable");

export const createMauReport = (data) =>
  API.post("/generic/create-mau-report", data);
