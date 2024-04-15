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

export const createStudentFeedback = (body) =>
  API.post("/student-feedback/create-student-feedback", body);

export const getAllStudentFeedback = (body) =>
  API.post("/student-feedback/get-all-student-feedback", body);

export const deleteStudentFeedbackById = (id) =>
  API.delete(`/student-feedback/delete-student-feedback/${id}`);
