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

export const getAllLecture = (classType, classLevel) =>
  API.get(`/lecture/get-all-lecture/${classType}/${classLevel}`);

export const getAllLectureByTopicId = (topicId, topicType) =>
  API.get(`lecture/get-lecture-by-topic-name/${topicId}/${topicType}`);

export const getAllLectureDetails = (roomId) =>
  API.get(`/lecture/get-lecture-by-id/${roomId}`);


  export const getLectureNo = (data) =>
  API.post("/lecture/get-lecture-no", data);