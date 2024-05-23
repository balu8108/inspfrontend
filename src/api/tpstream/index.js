import axios from "axios";
const API = axios.create({ baseURL: "https://app.tpstreams.com" });

API.interceptors.request.use((req) => {
  try {
    req.headers.Authorization = `Token cb5ee975c1a2a3cde54bbfe16e0ed5fc4662a8f20d1a9602a46c7229b42a5e52`;
    return req;
  } catch (err) {
    console.log(err);
  }
});

export const getActiveRecordingUrl = (assetId, body) =>
  API.post(`/api/v1/gcma48/assets/${assetId}/access_tokens/`, body);
