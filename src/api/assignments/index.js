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

export const uploadAssignmentsApi = (formData) =>
  API.post(`/assignment/upload-assignments`, formData, config);

export const getAllAssignmentByTopicApi = (topicId) =>
  API.get(`/assignment/get-all-assignments-topic-id?topicId=${topicId}`);

export const getLatestAssignmentApi = () =>
  API.get(`/assignment/latest-assignment`);

export const getRecentAssignmentApi = () =>
  API.get(`/assignment/recent-assignment`);

export const getAssignmentWithFilesApi = () =>
  API.get(`/assignment/all-assignment-with-files`);

export const getAssignmentBySubjectNameApi = (subjectName) =>
  API.get(`/assignment/get-assignment-by-subject-name/${subjectName}`);
