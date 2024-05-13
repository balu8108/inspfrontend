import axios from "axios";
import { BASE_URL } from "../../constants/staticurls";
const API = axios.create({ baseURL: "https://app.tpstreams.com" });

API.interceptors.request.use((req) => {
  try {
    req.headers.Authorization = `Token f5de8035cede32839353f02f35de33afd62df2c6f6c00c45f6502a05019800b3`;
    return req;
  } catch (err) {
    console.log(err);
  }
});

export const getActiveRecordingUrl = (assetId, body) =>
  API.post(`/api/v1/878aja/assets/${assetId}/access_tokens/`, body);
