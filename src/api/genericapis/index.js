import axios from "axios";
import { BASE_URL } from "../../constants/staticurls";
const API = axios.create({ baseURL: BASE_URL });

export const getAllSubjectsApi = () => API.get("/generic/get-all-subjects");
export const imageToDocApi = (body) => API.post("/generic/image-to-doc", body);
