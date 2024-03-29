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

export const getAllLectureByTopicName = (topicName) =>
  API.get(
    `regular-classes/get-lecture-by-topic-name/${topicName}`
  );

export const getAllLectureByTopicId = (topicId) =>
  API.get(`regular-classes/get-lecture-by-topic-name/${topicId}`);

export const getLectureDetails = (roomId) =>
  API.get(`/regular-classes/get-single-lecture-detail/${roomId}`);
