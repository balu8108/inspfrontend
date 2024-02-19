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



export const getAllCrashCourseLecture = () =>
  API.get("/crash-course/get-all-lecture");