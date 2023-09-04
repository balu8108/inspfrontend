import axios from "axios";
import { EXTERNAL_INSP_BASE_URL } from "../../constants/staticurls";

// const API = axios.create({ baseURL: EXTERNAL_INSP_BASE_URL });

// API.interceptors.request.use((config) => {
//   // Add CORS headers to the request config
//   config.headers["Access-Control-Allow-Origin"] = "*";
//   config.headers["Access-Control-Allow-Methods"] = "GET, POST, PUT, DELETE";
//   return config;
// });

// This is temporary secret key instead of this we will use clients secret key who is logged in

const secret_key = {
  secret_key: "U5Ga0Z1aaNlYHp0MjdEdXJ1aKVVVB1TP",
};

export const fetchAllChaptersApi = async () => {
  const body = secret_key;
  const requestOptions = {
    method: "POST",
    body: JSON.stringify(body),
  };
  const response = await fetch(
    EXTERNAL_INSP_BASE_URL + "/webservices/apis/chapters",
    requestOptions
  );
  const data = await response.json();
  return data;
};
export const fetchAllTopicsApi = async (chapter_id) => {
  const body = { chapter_id: chapter_id, ...secret_key };
  const requestOptions = {
    method: "POST",
    body: JSON.stringify(body),
  };
  const response = await fetch(
    EXTERNAL_INSP_BASE_URL + "/webservices/apis/topics/",
    requestOptions
  );
  const data = await response.json();
  return data;
};
