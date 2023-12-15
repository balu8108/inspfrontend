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

export const getAllSubjectsApi = () => API.get("/generic/get-all-subjects");
export const imageToDocApi = (body) => API.post("/generic/image-to-doc", body);
export const createLiveClassNotes = (body) =>
  API.post("/generic/create-live-class-notes", body);
export const getPresignedUrlDocApi = (docId, docType) =>
  API.get(`/generic/open-file/?docId=${docId}&docType=${docType}`);

export const getPresignedUrlApi = (body) =>
  API.post("/generic/generate-get-presigned-url", body);

export const createFeedbackApi = (body) =>
  API.post("/generic/create-feedback", body);

export const getLatestCompletedLiveClassApi = () =>
  API.get("/generic/latest-completed-live-classroom");

export const getRatingDetailsByTopicIdApi = (topic_id) =>
  API.get(`/generic/topic-feedback-rating-details/${topic_id}`);
