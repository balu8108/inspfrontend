import axios from "axios";
import { BASE_URL } from "../../constants/staticurls";
const API = axios.create({ baseURL: BASE_URL });

export const loginApi = (secret_token) =>
  API.post(`/auth/login/${secret_token}`);
