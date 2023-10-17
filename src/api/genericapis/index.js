import axios from "axios";
import { BASE_URL } from "../../constants/staticurls";
import { getStorageType } from "../../utils";
const API = axios.create({ baseURL: BASE_URL });

export const getAllSubjectsApi = () => API.get("/generic/get-all-subjects");
export const imageToDocApi = (body) => API.post("/generic/image-to-doc", body);
export const getPresignedUrlDocApi = (docId) =>
  API.get(`/generic/open-file/${docId}`);



export const getPresignedUrlApi = (body) =>
  API.post("/generic/generate-get-presigned-url", body);

  
export const createFeedbackApi = (body) => {
  const tokenStorage = getStorageType();
  let secretToken = null;
  if (tokenStorage.getItem("secret_token")) {
    secretToken = tokenStorage.getItem("secret_token");
  }

  const config = {
    headers: {
      Authorization: `Token ${secretToken}`,
    },
  };

  return API.post("/generic/create-feedback", body, config);
};
